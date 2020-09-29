import introspectionQueryResultData from '@/types/gql-schema.json';
import { provide } from '@/util/container';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { from } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { withScalars } from 'apollo-link-scalars';
import { buildClientSchema, IntrospectionQuery } from 'graphql';
import { API_CLIENT } from '.';
import { AUTHORIZATION, CREDENTIALS_STORAGE } from '../model';
import { Moment } from 'moment';

export default provide(API_CLIENT, async () => {
  const endpoint = new URL(process.env.VUE_APP_API_ENDPOINT || '/graphql', window.location.href);
  delete endpoint.username;
  delete endpoint.password;

  const httpLink = createHttpLink({ uri: endpoint.toString() });

  const authHttpLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: CREDENTIALS_STORAGE.getItem(AUTHORIZATION) || '',
      },
    };
  }).concat(httpLink);

  const subscriptionEndpoint = new URL(endpoint.toString());
  subscriptionEndpoint.protocol = endpoint.protocol === 'https:' ? 'wss:' : 'ws:';

  const wsLink = new WebSocketLink({
    uri: subscriptionEndpoint.toString(),
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: () => ({
        authorization: CREDENTIALS_STORAGE.getItem(AUTHORIZATION),
      }),
    },
  });

  const splitLink = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);

      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    authHttpLink,
  );

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  });
  const cache = new InMemoryCache({ fragmentMatcher });

  const scalarsLink = withScalars({
    schema: buildClientSchema((introspectionQueryResultData as unknown) as IntrospectionQuery),
    typesMap: {
      DateTime: {
        serialize: (parsed: Date | Moment) => parsed.toISOString(),
        parseValue: (raw: string | null): Date | null => (raw === null ? null : new Date(raw)),
      },
    },
  });

  const link = from([scalarsLink, splitLink]);

  return new ApolloClient({ link, cache });
});

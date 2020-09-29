module.exports = {
  client: {
    service: {
      name: 'iot-portal',
      url: 'http://localhost:8081/graphql',
      headers: {
        // default user: "iot@iot.iot:19iot20"
        Authorization: `Basic aW90QGlvdC5pb3Q6MTlpb3QyMA==`,
      },
    },
  },
};

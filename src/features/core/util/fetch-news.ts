const ENDPOINT = 'https://newsfeed.smartwowi.de/current.json';

export interface News {
  headline: string;
  content: string;
  link?: string;
  date: string;
}

export async function fetchNews(): Promise<News[]> {
  const response = await fetch(ENDPOINT);
  if (response.status !== 200) {
    throw new Error(`Could not get news from ${ENDPOINT}`);
  }

  return await response.json();
}

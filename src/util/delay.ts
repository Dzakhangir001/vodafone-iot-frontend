export default function delay(ms: number): Promise<void> {
  return new Promise((res) => void setTimeout(res, ms));
}

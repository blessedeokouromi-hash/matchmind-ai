
const BASE_URL =
  process.env.SPORTS_API_BASE_URL ||
  "https://v3.football.api-sports.io";

export async function getFixtures(date) {
  const apiKey = process.env.SPORTS_API_KEY;

  if (!apiKey) {
    throw new Error("Sports API key is not configured on the server.");
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("A valid date in YYYY-MM-DD format is required.");
  }

  const response = await fetch(
    `${BASE_URL}/fixtures?date=${encodeURIComponent(date)}`,
    {
      headers: {
        "x-apisports-key": apiKey
      },
      signal: AbortSignal.timeout(10000)
    }
  );

  if (!response.ok) {
    throw new Error(`Football API returned status ${response.status}.`);
  }

  const data = await response.json();

  if (!Array.isArray(data.response)) {
    throw new Error("Football API returned an unexpected response.");
  }

  return data.response;
}

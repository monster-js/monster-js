export function getURLQueryParams() {
  const queryString = window.location.search; // Get the query string from the URL
  const urlParams = new URLSearchParams(queryString); // Parse the query string
  const params: Record<string, string> = {};

  return Array.from(urlParams.entries()).reduce(
    (accumulator, [key, value]) => {
      accumulator[key] = value;
      return accumulator;
    },
    params,
  );
}

export function getURLQueryParams() {
    const queryString = window.location.search; // Get the query string from the URL
    const urlParams = new URLSearchParams(queryString); // Parse the query string
    const params = {};
    for (const [key, value] of urlParams) {
        params[key] = value; // Add each key-value pair to the object
    }
    return params;
}
//# sourceMappingURL=get-url-query-params.js.map
export function evaluateRoute(path: string, newUrl: string, pathMatch: 'full' | 'prefix') {
    const removeSlashes = (str: string) => str.replace(/^\/+|\/+$/g, '');
    const cleanedUrl = removeSlashes(newUrl);
    const cleanedPath = removeSlashes(path);
    const urlArray = cleanedUrl.split('/');
    const pathArray = cleanedPath.split('/');

    if (pathArray.length > urlArray.length) return null;
    if (pathMatch === 'full' && pathArray.length !== urlArray.length) return null;

    return matchAndExtractVariables(cleanedPath, cleanedUrl);
}

function matchAndExtractVariables(routePath: string, currentPath: string) {
    // Normalize paths by removing trailing slashes
    const normalizedRoutePath = routePath.replace(/\/$/, '');
    const normalizedCurrentPath = currentPath.replace(/\/$/, '');

    // Convert the route path to a regex pattern
    const pathRegex = normalizedRoutePath
        .replace(/{([^/]+)}/g, '([^/]+)') // Replace {id} with a capturing group
        .replace(/\//g, '\\/'); // Escape slashes

    // Create the regex pattern for the whole path
    const regex = new RegExp(`^${pathRegex}$`);

    // Match the current path against the route path
    const match = normalizedCurrentPath.match(regex);

    if (!match) {
        return null; // No match found
    }

    // Extract path variables from the match result
    const variableNames = (routePath.match(/{([^/]+)}/g) || []).map(pathVar => pathVar.slice(1, -1)); // Get variable names from {id}
    const extractedVariables: Record<string, string> = {};

    // Fill in the extracted variables
    variableNames.forEach((varName, index) => {
        extractedVariables[varName] = match[index + 1]; // Skip the full match at index 0
    });

    return extractedVariables;
}

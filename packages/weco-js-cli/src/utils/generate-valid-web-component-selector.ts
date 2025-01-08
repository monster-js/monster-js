// Utility function to generate a valid custom element selector
export function generateValidWebComponentSelector(filename: string, prefix: string = 'app'): string {
    // Ensure the name is lowercase and includes a hyphen
    const baseName = filename.replace(/[^a-z0-9]/gi, '-').toLowerCase();

    // Return the valid selector
    return `${prefix}-${baseName}`;
}
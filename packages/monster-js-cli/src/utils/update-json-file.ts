import fs from "fs";

export function updateJsonFile(filePath: string, updateCallback: (data: any) => any) {
  try {
    // Read the JSON file
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);

    // Update the JSON data using the callback
    const updatedData = updateCallback(jsonData);

    // Write the updated JSON data back to the file
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');

  } catch (error) {
    console.error('Error updating JSON file:', error);
    throw error;
  }
}
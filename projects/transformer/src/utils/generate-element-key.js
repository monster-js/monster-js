const nodePath = require("path");
const { fileWriter } = require("../utils/file-writer");
const { fileExistsChecker } = require("../utils/file-exists-checker");

module.exports.generateElementKey = function (filePath) {
  const cacheFilePath = nodePath.resolve(process.cwd(), ".monster/cache.json");

  if (!fileExistsChecker(cacheFilePath)) fileWriter(cacheFilePath, JSON.stringify({}));

  const contentReader = () => require(cacheFilePath);
  const cacheContent = contentReader();
  const originalCacheName = filePath.replace(process.cwd(), "");

  if (originalCacheName.endsWith(".component.tsx")) {
    const cacheName = originalCacheName
      .replace(/(\.component.tsx)$/, "")
      .replace(/\\/g, "-")
      .replace(/\//g, "-")
      .replace(/\./g, "-");

    if (cacheContent[cacheName] === null || cacheContent[cacheName] === undefined) {
      cacheContent[cacheName] = Object.keys(cacheContent).length;
      fileWriter(cacheFilePath, JSON.stringify(cacheContent));
    }

    return `el${cacheContent[cacheName]}`;
  } else {
    return null;
  }
};

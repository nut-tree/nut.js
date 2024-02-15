const { exec } = require("child_process");
const { readFile, writeFile } = require("fs");
const { join } = require("path");

const args = process.argv.slice(2);
const version = args[0];

if (version == null || version === "") {
  throw new Error("Version is required");
}

exec("pnpm m ls --json --depth=-1", (_, stdout) => {
  const modules = JSON.parse(stdout).filter(
    (module) => module.private !== true,
  );

  for (const module of modules) {
    const filePath = join(module.path, "package.json");

    readFile(filePath, "utf8", (err, data) => {
      if (err) {
        throw new Error(err);
      }
      // Parse JSON
      const obj = JSON.parse(data);

      // Change a property
      obj.version = version;

      // Convert object back to JSON
      const json = JSON.stringify(obj, null, 2);

      // Write JSON file
      writeFile(filePath, json, "utf8", (err) => {
        if (err) {
          throw new Error(err);
        } else {
          console.log("File successfully updated.");
        }
      });
    });
  }
});

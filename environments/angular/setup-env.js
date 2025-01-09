const fs = require("fs");
const path = require("path");

// Path to the environments directory
const environmentsDir = path.join(__dirname, "src", "environments");

// Ensure the environments directory exists
if (!fs.existsSync(environmentsDir)) {

  fs.mkdirSync(environmentsDir, { recursive: true });

}

// Content for the environment.ts file
const envFileContent = `
export const environment = {
  CMA_ACCESS_TOKEN: '${process.env.CMA_ACCESS_TOKEN}'
};
`;

// Write the environment.ts file
const envFilePath = path.join(environmentsDir, "environment.ts");
fs.writeFileSync(envFilePath, envFileContent, "utf8");

console.log(`Environment file written to ${envFilePath}`);

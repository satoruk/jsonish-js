const pack = require("./package");
const path = require("path");

const packDirName = path.basename(__dirname);

module.exports = {
  collectCoverage: true,
  coverageDirectory: `<rootDir>/coverage`,
  displayName: pack.name,
  name: pack.name,
  preset: "ts-jest",
  rootDir: ".",
  testEnvironment: "node",
  testMatch: ["<rootDir>/**/*.test.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/.*/",
    "<rootDir>/coverage/",
    "<rootDir>/node_modules/",
  ],
};

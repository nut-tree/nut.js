module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverageFrom: [
        "index.ts",
        "lib/**/*.ts",
        "!lib/**/*.spec.ts",
        "!<rootDir>/node_modules/",
        "!<rootDir>/path/to/dir/"
    ],
    testPathIgnorePatterns: [
      "/node_modules/",
      "/dist/"
    ],
    testMatch: process.env.E2E_TEST ?
        [ "**/__tests__/?(e2e)/**/*.[jt]s?(x)", "**/?(*.)?(e2e.)+(spec|test).[jt]s?(x)" ] :
        [ "**/__tests__/!(e2e)/**/*.[jt]s?(x)", "**/!(*.e2e.*)+(spec|test).[jt]s?(x)" ]
};
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["lib"],
    collectCoverageFrom: [
        "index.ts",
        "lib/**/*.ts",
        "!lib/**/*.spec.ts",
        "!<rootDir>/node_modules/",
        "!<rootDir>/path/to/dir/"
    ],
    testMatch: process.env.E2E_TEST ?
        [ "**/__tests__/?(e2e)/**/*.[jt]s?(x)", "**/?(*.)?(e2e.)+(spec|test).[jt]s?(x)" ] :
        [ "**/__tests__/!(e2e)/**/*.[jt]s?(x)", "**/!(*.e2e.*)+(spec|test).[jt]s?(x)" ]
};
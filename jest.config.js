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
};
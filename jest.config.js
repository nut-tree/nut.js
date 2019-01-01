module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverageFrom: [
        "index.ts",
        "lib/**/*.ts",
        "!<rootDir>/node_modules/",
        "!<rootDir>/path/to/dir/"
    ],
    coverageReporters: ["text"],
};
import type { Config } from "jest";

export default async (): Promise<Config> => {
  return {
    verbose: true,
    testEnvironment: "node",
    setupFiles: ["dotenv/config"],
    testTimeout: 30000,
    collectCoverage: true,
    collectCoverageFrom: ["./src/**"],
    automock: true,
    preset: "ts-jest",
    coverageThreshold: {
      global: {
        lines: 85,
      },
    },
    coveragePathIgnorePatterns: [
      "/node_modules/",
      "/public",
      "/src/config",
      "/src/util",
      "/src/swagger",
      "/src/models",
      "/src/uploads",
    ],
  };
};

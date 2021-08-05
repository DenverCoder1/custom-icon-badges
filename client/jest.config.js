module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    // transform files with ts-jest
    "^.+\\.(js|ts|jsx|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: [
    // allow transformation
    "node_modules/(?!bootstrap)",
    "node_modules/(?!react-bootstrap)"
  ],
  globals: {
    "ts-jest": {
      tsconfig: {
        // allow js in typescript
        allowJs: true,
      },
    },
  },
};
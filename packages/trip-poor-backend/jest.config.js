module.exports = {
  displayName: 'trip-poor-backend',

  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'node',
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverage: true,

  coverageDirectory: "../coverage",
  testEnvironment: "node"
};
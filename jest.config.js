module.exports = {
  verbose: true,
  preset: 'jest-preset-angular',
  roots: ['src'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    '@env': '<rootDir>/src/environments/environment',
    '@src/(.*)': '<rootDir>/src/src/$1',
    '@state/(.*)': '<rootDir>/src/app/state/$1',
    'autoSpy':'<rootDir>/src/app/auto-spy.ts'
  },
  transformIgnorePatterns: ['node_modules/(?!(jest-testPromise))'],
maxWorkers: 4,
reporters: [
"default",
["jest-html-reporters", {
"publicPath": "./html-report",
"filename": "report.html",
"expand": true
}]
]
};

module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    moduleNameMapper: {
        "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js"
    }
};

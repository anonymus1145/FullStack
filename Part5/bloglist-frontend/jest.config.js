// jest.config.js

export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.jsx?$": "babel-jest" 
    // process `*.tsx` files with `ts-jest`
    },
}

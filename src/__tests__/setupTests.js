// Jest setup file for global test configuration
import '@testing-library/jest-dom';

// Polyfill for fetch (required by Firebase in Node.js test environment)
if (typeof global.fetch === 'undefined') {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({}),
        })
    );
}

// Mock window.alert
global.alert = jest.fn();


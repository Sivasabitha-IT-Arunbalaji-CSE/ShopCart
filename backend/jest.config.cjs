module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',  // Use babel-jest to handle .js and .jsx files
    },
    moduleFileExtensions: ['js', 'json', 'jsx'],  // Ensure that jest recognizes these file types
    testEnvironment: 'node',  // Use node environment for server-side tests
  };
  
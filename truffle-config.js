module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545, // Default Ganache port
      network_id: "5777" // Match any network
    },
  },
  compilers: {
    solc: {
      version: "^0.5.1"
    }
  }
};

var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = process.env.MNEMONIC;
var accessToken = process.env.INFURA_ACCESS_TOKEN;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
  		development: {
  			host: "localhost",
  			port: 8545,
  			network_id: "10",
        gas: 4712388, //fixed num
        gasPrice: 22000000000 // Specified in Wei
        // Error: Exceeds block gas limit -> check gas or gasPrice
  		},

      testrpc: {
  			host: "testrpc",
  			port: 8545,
  			network_id: "*", //fixed num
        gasPrice: 22000000000 // Specified in Wei
  		},

      ropsten: {
        provider: function() {
          return new HDWalletProvider(
            mnemonic,
            "https://ropsten.infura.io/" + accessToken
          );
        },
        network_id: 3,
        gas: 4700000,
        gasPrice: 22000000000 // Specified in Wei
      },


  	},
  	solc: {
  		optimizer: {
  			enabled: true,
  			runs: 200
  		}
  	},
};

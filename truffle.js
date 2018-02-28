module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
  		development: {
  			host: "localhost",
  			port: 8545,
  			network_id: "*",
        gas: 4712388 //fixed num
  		},

      testrpc: {
  			host: "testrpc",
  			port: 8545,
  			network_id: "*",
        gas: 4712388 //fixed num
  		},

  	},
  	solc: {
  		optimizer: {
  			enabled: true,
  			runs: 200
  		}
  	},
};

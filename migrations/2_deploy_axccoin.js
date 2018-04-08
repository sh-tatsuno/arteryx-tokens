var AXCToken = artifacts.require('./AXCToken.sol')
var AXCCrowdsale = artifacts.require('./AXCCrowdsale.sol')

module.exports = function(deployer, network, accounts) {
  const openingTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 1; // one second in the future
  const closingTime = openingTime + 5; // 5 seconds
  const rate = new web3.BigNumber(1000); // trade rate from ETH
  const goal = web3.toWei(10000, 'ether');
  const cap = web3.toWei(1000000 , 'ether');
  const wallet = accounts[0];

  return deployer
        .then(() => {
            return deployer.deploy(AXCToken);
        })
        .then(() => {
            return deployer.deploy(
                AXCCrowdsale,
                openingTime,
                closingTime,
                rate,
                goal,
                wallet,
                cap,
                AXCToken.address
            );
        });

};

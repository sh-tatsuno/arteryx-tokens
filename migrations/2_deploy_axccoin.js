var AXCToken = artifacts.require('./AXCToken.sol')

module.exports = (deployer) => {
  var initialSupply = 1000000000
  deployer.deploy(AXCToken, initialSupply)
}

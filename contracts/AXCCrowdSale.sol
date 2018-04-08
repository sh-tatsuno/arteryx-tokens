pragma solidity ^0.4.18;

import "./AXCToken.sol";
import "zeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";


contract AXCCrowdsale is CappedCrowdsale, MintedCrowdsale, TimedCrowdsale, RefundableCrowdsale {

  function AXCCrowdsale(
    uint256 _openingTime,
    uint256 _closingTime,
    uint256 _rate,
    uint256 _goal,
    address _wallet,
    uint256 _cap,
    MintableToken _token
  )
  public
  Crowdsale(_rate, _wallet, _token)
  CappedCrowdsale(_cap)
  RefundableCrowdsale(_goal)
  TimedCrowdsale(_openingTime, _closingTime)
  {
    require(_goal <= _cap);
  }
}

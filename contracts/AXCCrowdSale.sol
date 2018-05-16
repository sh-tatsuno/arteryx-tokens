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
  //override Crowdsale.sol in zeppelin-solidity.
  function _getTokenAmount(uint256 _weiAmount) internal view returns (uint256) {
    uint256 periodOfPreSale = openingTime.add(5 minutes);
    uint256 periodOfWeek1 = openingTime.add(10 minutes);
    uint256 periodOfWeek2 = openingTime.add(15 minutes);
    uint256 periodOfWeek3 = openingTime.add(20 minutes);
    if(now < periodOfPreSale){
        rate = 12000;
    }else if (now > periodOfPreSale && now < periodOfWeek1){
        rate = 11500;
    }else if (now > periodOfWeek1 && now < periodOfWeek2){
        rate = 11000;
    }else if (now > periodOfWeek2 && now < periodOfWeek3){
        rate = 10500;
    }else if (now > periodOfWeek3 && now < closingTime){
        rate = 10000;
    }
    return _weiAmount.mul(rate);
  }
}

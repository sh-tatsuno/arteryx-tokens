pragma solidity ^0.4.18;
import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract AXCToken is StandardToken {
  string public name = "ArteryexCoin";
  string public symbol = "AXC";
  uint public decimals = 18;

  function AXCToken(uint initialSupply) public {
    totalSupply_ = initialSupply;
    balances[msg.sender] = initialSupply;
  }
}

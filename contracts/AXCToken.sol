pragma solidity ^0.4.18;
import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/PausableToken.sol";

contract AXCToken is MintableToken, BurnableToken, PausableToken {
  string public constant name = "ArteryexCoin";
  string public constant symbol = "AXC";
  uint8 public constant decimals = 18;
}

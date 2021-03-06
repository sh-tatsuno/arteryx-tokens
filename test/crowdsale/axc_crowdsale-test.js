import ether from 'zeppelin-solidity/test/helpers/ether';
import { advanceBlock } from 'zeppelin-solidity/test/helpers/advanceToBlock';
import { increaseTimeTo, duration } from 'zeppelin-solidity/test/helpers/increaseTime';
import latestTime from 'zeppelin-solidity/test/helpers/latestTime';
import EVMRevert from 'zeppelin-solidity/test/helpers/EVMRevert';


const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const AXCCrowdsale = artifacts.require('./AXCCrowdsale.sol');
const AXCToken = artifacts.require('./AXCToken.sol');
const RefundVault = artifacts.require('zeppelin-solidity/contracts/crowdsale/distribution/utils/RefundVault.sol');

contract('AXCCrowdsale', function ([_, investor, wallet, purchaser]) {
  const rate = new BigNumber(10000);
  const value = ether(1);
  const tokenSupply = new BigNumber('1e22');
  const goal = web3.toWei(10000, 'ether');
  const cap = web3.toWei(1000000 , 'ether');
  const tokencap = web3.toWei(10000000 , 'ether');
  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by ganache
    await advanceBlock();
  });

  beforeEach(async function () {
    this.openingTime = latestTime() + duration.weeks(1);
    this.closingTime = this.openingTime + duration.weeks(6);
    this.afterClosingTime = this.closingTime + duration.seconds(1);
    this.token = await AXCToken.new(tokencap);
    this.preSalePeriod = this.openingTime + duration.weeks(1);
    this.week1Period = this.openingTime + duration.weeks(2);
    this.week2Period = this.openingTime + duration.weeks(3);
    this.week3Period = this.openingTime + duration.weeks(4);
    this.crowdsale = await AXCCrowdsale.new(
      this.openingTime,
      this.closingTime,
      rate,
      goal,
      wallet,
      cap,
      this.token.address);
    await this.token.transferOwnership(this.crowdsale.address);
  });

  it('should be ended only after end', async function () {
    let ended = await this.crowdsale.hasClosed();
    ended.should.equal(false);
    await increaseTimeTo(this.afterClosingTime);
    ended = await this.crowdsale.hasClosed();
    ended.should.equal(true);
  });

  describe('accepting payments', function () {
     it('should reject payments before start', async function () {
       await this.crowdsale.send(value).should.be.rejectedWith(EVMRevert);
       await this.crowdsale.buyTokens(investor, { from: purchaser, value: value }).should.be.rejectedWith(EVMRevert);
     });

     it('should be token owner', async function () {
        await increaseTimeTo(this.openingTime);
        const owner = await this.token.owner();
        owner.should.equal(this.crowdsale.address);
     });

     it('should accept payments', async function () {
        await increaseTimeTo(this.openingTime);
        const owner = await this.token.owner();
        owner.should.equal(this.crowdsale.address);
        await this.crowdsale.send(value).should.be.fulfilled;
        await this.crowdsale.buyTokens(investor, { value: value, from: purchaser }).should.be.fulfilled;
     });

     it('should change PurchaseRate at PreSale', async function(){
        await increaseTimeTo(this.preSalePeriod - 10);
        await this.crowdsale.buyTokens(investor, { from: purchaser, value: value });
        let balance = await this.token.balanceOf(investor);
        balance.should.be.bignumber.equal(value.mul(12000));
     });
     it('should change PurchaseRate at Week1', async function(){
        await increaseTimeTo(this.week1Period - 10);
        await this.crowdsale.buyTokens(investor, { from: purchaser, value: value });
        let balance = await this.token.balanceOf(investor);
        balance.should.be.bignumber.equal(value.mul(11500));
     });
     it('should change PurchaseRate at Week2', async function(){
        await increaseTimeTo(this.week2Period - 10);
        await this.crowdsale.buyTokens(investor, { from: purchaser, value: value });
        let balance = await this.token.balanceOf(investor);
        balance.should.be.bignumber.equal(value.mul(11000));
     });
     it('should change PurchaseRate at Week3', async function(){
        await increaseTimeTo(this.week3Period - 10);
        await this.crowdsale.buyTokens(investor, { from: purchaser, value: value });
        let balance = await this.token.balanceOf(investor);
        balance.should.be.bignumber.equal(value.mul(10500));
     });
     it('should change PurchaseRate at Week4(LastWeek)', async function(){
        await increaseTimeTo(this.closingTime - 10);
        await this.crowdsale.buyTokens(investor, { from: purchaser, value: value });
        let balance = await this.token.balanceOf(investor);
        balance.should.be.bignumber.equal(value.mul(10000));
     });
   });

   it('should reject payments after end', async function () {
     await increaseTimeTo(this.afterClosingTime);
     await this.crowdsale.send(value).should.be.rejectedWith(EVMRevert);
     await this.crowdsale.buyTokens(investor, { value: value, from: purchaser }).should.be.rejectedWith(EVMRevert);
   });
 });

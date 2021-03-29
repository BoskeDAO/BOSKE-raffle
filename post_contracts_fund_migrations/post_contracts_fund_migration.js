const randomness = artifacts.require("RandomNumberConsumer");
const lottery = artifacts.require("Lottery");
const governance = artifacts.require("Governance");

module.exports = async function(deployer, network, accounts) {
  var governanceContract = await governance.deployed();
  var lotteryContract = await lottery.deployed();
  var randomnessContract = await randomness.deployed();

  console.log("deployados governance, lottery y randomness")
  await lotteryContract.start_new_lottery(90);
  
};

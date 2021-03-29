const lottery = artifacts.require("Lottery");

//const web3 = window.web3

//const accounts = await web3.eth.getAccounts()
//this.setState({ account: accounts[0] })

module.exports = async (callback) => {
  const mc = await Lottery.deployed();
  const accouts = await web3.eth.getAccounts();
  console.log("Entering lottery", accounts[0]);
  const tx = await lottery.enter({ from: accounts[0] });
  console.log("Total pot:" + lottery.get_pot().call());
  console.log("Players: " + lottery.get_players().call());
  callback(tx.tx);
};

const BoskeNFT = artifacts.require('BoskeNFT')

module.exports = async callback => {
  const bnft = await BoskeNFT.deployed()
  console.log('Creating requests on contract:', bnft.address)
  const tx = await bnft.requestNewRandomCharacter(77, "The Boske Knight")
  const tx2 = await bnft.requestNewRandomCharacter(7777777, "The Boske Elf")
  const tx3 = await bnft.requestNewRandomCharacter(7, "The Boske Wizard")
  const tx4 = await bnft.requestNewRandomCharacter(777, "The Boske Orc")
  callback(tx.tx)
}

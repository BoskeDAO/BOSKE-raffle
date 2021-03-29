const BoskeNFT = artifacts.require('BoskeNFT')

module.exports = async callback => {
    const bnft = await BoskeNFT.deployed()
    console.log('Let\'s get the overview of your character')
    const overview = await bnft.characters(0)
    console.log(overview)
    callback(overview.tx)
}

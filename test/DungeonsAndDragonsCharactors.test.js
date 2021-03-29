
const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers')

const RANDOM_SEED = 100
const CHARACTER_NAME = "Shrek"

contract('BoskeNFT', accounts => {
    const { LinkToken } = require('@chainlink/contracts/truffle/v0.4/LinkToken')
    const BoskeNFT = artifacts.require('DungeonsAndDragonsCharacter.sol')
    const defaultAccount = accounts[0]

    let link, bnft

    beforeEach(async () => {
        link = await LinkToken.new({ from: defaultAccount })
        bnft = await BoskeNFT.new({ from: defaultAccount })
    })

    describe('#requestNewRandomCharacter', () => {
        context('without LINK', () => {
            it('reverts', async () => {
                const newCharacter = await expectRevert.unspecified(bnft.requestNewRandomCharacter(RANDOM_SEED, CHARACTER_NAME))
            })
        })
    })
})  
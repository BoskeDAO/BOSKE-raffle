pragma solidity 0.6.6;

import "./vrf/VRFConsumerBase.sol";
import {lottery_interface} from "./interfaces/lottery_interface.sol";
import {governance_interface} from "./interfaces/governance_interface.sol";

contract RandomNumberConsumer is VRFConsumerBase {
    
    bytes32 internal keyHash;
    uint256 internal fee;
    mapping (uint => uint) public randomNumber;
    mapping (bytes32 => uint) public requestIds;
    governance_interface public governance;
    uint256 public most_recent_random;
    
    /**
     * Constructor inherits VRFConsumerBase
     * 
     * Network: Ropsten
     * Chainlink VRF Coordinator address: 0xf720CF1B963e0e7bE9F58fd471EFa67e7bF00cfb
     * LINK token address:                0x20fE562d797A42Dcb3399062AE9546cd06f63280
     * Key Hash: 0xced103054e349b8dfb51352f0f8fa9b5d20dde3d06f9f43cb2b85bc64b238205
     
     Rinkeby
Item	Value
LINK	0x01be23585060835e02b77ef475b0cc51aa1e0709
VRF Coordinator	0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B
Key Hash	0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311
Fee	0.1 LINK
     */
    constructor(address _governance) 
        VRFConsumerBase(
            0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B, // VRF Coordinator
            0x01BE23585060835E02B77ef475b0Cc51aA1e0709  // LINK Token
        ) public
    {
        keyHash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311;
        fee = 0.1 * 10 ** 18; // 0.1 LINK
        governance = governance_interface(_governance);
    }

    /** 
     * Requests randomness from a user-provided seed
     */
     
    function getRandom(uint256 userProvidedSeed, uint256 lotteryId) public {
        require(LINK.balanceOf(address(this)) > fee, "Not enough LINK - fill contract with faucet");
        bytes32 _requestId = requestRandomness(keyHash, fee, userProvidedSeed);
        requestIds[_requestId] = lotteryId;
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) external override {
        require(msg.sender == vrfCoordinator, "Fulillment only permitted by Coordinator");
        most_recent_random = randomness;
        uint lotteryId = requestIds[requestId];
        randomNumber[lotteryId] = randomness;
        lottery_interface(governance.lottery()).fulfill_random(randomness);
    }
}



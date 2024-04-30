// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {AavePoolMock} from "../test/mocks/AavePoolMock.sol";

contract HelperConfig is Script {
    NetworkConfig private s_activeNetworkConfig;

    struct NetworkConfig {
        address aavePoolAddress;
        address usdcAddress;
        address wethAddress;
    }

    constructor() {
        if (block.chainid == 11155111) {
            s_activeNetworkConfig = getSepoliaScriptConfig();
        } else if (block.chainid == 245022926) {
            s_activeNetworkConfig = getNeonDevnetScriptConfig();
        } else {
            s_activeNetworkConfig = getOrCreateAnvilConfig();
        }
    }

    function getNetworkConfig() public view returns (NetworkConfig memory) {
        return s_activeNetworkConfig;
    }

    function getSepoliaScriptConfig() private pure returns (NetworkConfig memory) {
        return NetworkConfig({
            aavePoolAddress: 0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951,
            usdcAddress: 0xf08A50178dfcDe18524640EA6618a1f965821715,
            wethAddress: 0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9
        });
    }

    function getNeonDevnetScriptConfig() private pure returns (NetworkConfig memory) {
        return NetworkConfig({
            aavePoolAddress: 0x64916311cf63F208069E5Ef6CA4b2a4Dc1987e8a,
            usdcAddress: 0x26833EeC144EF2d7b2394CAFbd5CD5ceB1d3B3Af,
            wethAddress: 0x9720f3c6186111C0dc9f47c79B8C19fc8bAC5cfB
        });
    }

    function getOrCreateAnvilConfig() private returns (NetworkConfig memory) {
        vm.startBroadcast();
        AavePoolMock aavePoolMock = new AavePoolMock();
        vm.stopBroadcast();

        return NetworkConfig({
            aavePoolAddress: address(aavePoolMock),
            usdcAddress: 0xf08A50178dfcDe18524640EA6618a1f965821715,
            wethAddress: 0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9
        });
    }
}

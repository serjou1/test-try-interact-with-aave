// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {Liquidator} from "../src/Liquidator.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployLiquidator is Script {
    function run() external returns (Liquidator) {
        HelperConfig helperConfig = new HelperConfig();
        address aavePoolAddress = helperConfig.getNetworkConfig().aavePoolAddress;
        address usdcAddress = helperConfig.getNetworkConfig().usdcAddress;
        address wethAddress = helperConfig.getNetworkConfig().wethAddress;
        
        vm.startBroadcast();
        Liquidator liquidator = new Liquidator(aavePoolAddress, usdcAddress, wethAddress);
        vm.stopBroadcast();

        return liquidator;
    } 
}
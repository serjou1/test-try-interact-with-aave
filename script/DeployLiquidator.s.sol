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
        
        // console.log(msg.sender);

        vm.startBroadcast();
        Liquidator liquidator = new Liquidator(aavePoolAddress);
        vm.stopBroadcast();

        return liquidator;
    } 
}
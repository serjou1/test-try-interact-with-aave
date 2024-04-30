// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {ERC20} from "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {Liquidator} from "../src/Liquidator.sol";
import {DeployLiquidator} from "../script/DeployLiquidator.s.sol";

contract TestLiquidator is Test {
    Liquidator private s_liquidator;

    function setUp() public {
        DeployLiquidator deployer = new DeployLiquidator();
        s_liquidator = deployer.run();
    }

    function testUserHasHealthFactorMoreThanZero() public view {
        address testUser = 0x5D8fdccF4Bd9B1331e66Ff2606457fbc876F28de;
        (,,,,, uint256 healthFactor) = s_liquidator.getUserAccountData(testUser);

        assertGt(healthFactor, 0);
    }
    
    function testUserLiquidation() public {
        // address weth = 0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9;
        // // address usdc = 0xf08A50178dfcDe18524640EA6618a1f965821715;

        // address testUser = 0x1F79dc8F63E970af19AaB680bA85ce8f16564587;

        // ERC20 wethToken = ERC20(weth);
        // // ERC20 usdcToken = ERC20(usdc);

        // uint256 initialWethBalance = wethToken.balanceOf(testUser);
        
        // uint256 amountToTransfer = 1e18;

        // vm.prank(0x546e37DAA15cdb82fd1a717E5dEEa4AF08D4349A);
        // wethToken.transfer(testUser, amountToTransfer);

        // uint256 endingBalance = wethToken.balanceOf(testUser);

        // assertEq(initialWethBalance, 0);
        // assertEq(endingBalance, amountToTransfer);


        //////////

        address userToLiquidate = 0x21E53AF80B2b06F672BE5A4AC99900dCA079C80e;

        (,,,,, uint256 healthFactor) = s_liquidator.getUserAccountData(userToLiquidate);

    }

    function testNeonDevnetContract() public {
        address userToLiquidate = 0x21E53AF80B2b06F672BE5A4AC99900dCA079C80e;
        Liquidator existing = Liquidator(0x95Aab61Bc923E2E8E38FFB80E6c4D775515242ba);
        (,,,,, uint256 healthFactor) = existing.getUserAccountData(userToLiquidate);
        console.logUint(healthFactor);
    }
}
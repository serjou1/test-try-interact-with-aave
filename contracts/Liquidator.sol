// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IPool} from "../lib/aave-v3-core/contracts/interfaces/IPool.sol";

contract Liquidator {
    IPool private aavePool;
    address private immutable i_usdcAddress;
    address private immutable i_wethAddress;

    constructor(
        address poolAddress,
        address usdcAddress,
        address wethAddress
        ) {
        aavePool = IPool(poolAddress);
        i_usdcAddress = usdcAddress;
        i_wethAddress = wethAddress;
    }

    function liquidateUser(address userAddress, uint256 debtToCover) external {
        address collateralAsset = i_usdcAddress;
        address debtAsset = i_wethAddress;
        address user = userAddress;
        bool receiveAToken = true;
        aavePool.liquidationCall(
            collateralAsset,
            debtAsset,
            user,
            debtToCover,
            receiveAToken
        );
    }

    function getUserAccountData(address user) external view returns (
        uint256 totalCollateralBase,
        uint256 totalDebtBase,
        uint256 availableBorrowsBase,
        uint256 currentLiquidationThreshold,
        uint256 ltv,
        uint256 healthFactor
    ) {
        return aavePool.getUserAccountData(user);
    }
}

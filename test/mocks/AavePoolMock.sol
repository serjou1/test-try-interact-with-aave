// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract AavePoolMock {
    function getUserAccountData(address user) public pure returns (
        uint256 totalCollateralBase,
        uint256 totalDebtBase,
        uint256 availableBorrowsBase,
        uint256 currentLiquidationThreshold,
        uint256 ltv,
        uint256 healthFactor) {
            healthFactor = 2e18;
            currentLiquidationThreshold = uint256(uint160(user));

            return (
                totalCollateralBase,
                totalDebtBase,
                availableBorrowsBase,
                currentLiquidationThreshold,
                ltv,
                healthFactor
            );
        }
}
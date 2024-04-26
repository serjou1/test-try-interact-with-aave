-include .env

test-sepolia-liquidation:; forge test --mt testUserLiquidation --rpc-url $(SEPOLIA_RPC) -vvv

deploy-sepolia:; forge script script/DeployLiquidator.s.sol --fork-url $(NEON_DEVNET_RPC_2) --broadcast --private-key $(PRIVATE_KEY)  --legacy -vvvvv
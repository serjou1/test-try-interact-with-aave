-include .env

test-sepolia-liquidation:; forge test --mt testUserLiquidation --rpc-url $(SEPOLIA_RPC) -vvv

deploy-neon-devnet:; forge script script/DeployLiquidator.s.sol --fork-url $(NEON_DEVNET_RPC_2) --broadcast --private-key $(PRIVATE_KEY)  --legacy  --verify --etherscan-api-key $(BLOCKSCCOUT_API_KEY) --verifier blockscout -vvvvv

deploy-sepolia:; forge script script/DeployLiquidator.s.sol --fork-url $(SEPOLIA_RPC) --broadcast --private-key $(PRIVATE_KEY)  --verify --etherscan-api-key $(ETHERSCAN_API_KEY)  -vvvvv

deploy-sepolia-hardhat:; npx hardhat run scripts/deploy.js --network sepolia --deployment-id sepolia-deployment

deploy-neondevnet-hardhat:; npx hardhat run scripts/deploy.js --network devnetneon
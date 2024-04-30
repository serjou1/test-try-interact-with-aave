require("@nomiclabs/hardhat-waffle");

const sepoliaUrl = "https://ethereum-sepolia-rpc.publicnode.com";
const devnetNeon = "https://245022926.rpc.thirdweb.com"

const privateKey = "e4ff124a067ef44b2c39972d351021d9db77a4eb34f345c568afbdd13a86006c";

module.exports = {
  solidity: "0.8.25",
  networks: {
    sepolia: {
      url: sepoliaUrl,
      accounts: [privateKey],
    },
    devnetneon: {
      url: devnetNeon,
      accounts: [privateKey],
    }
  },
  etherscan: {
    apiKey: {
      sepolia: 'R7CEJMANQ3CC7SSQ3RGT1AD9BAPJCYMISK',
    },
  },
};
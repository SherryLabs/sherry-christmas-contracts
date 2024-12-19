import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import * as dotenv from "dotenv";
dotenv.config();

const deployer = process.env.DEPLOYER_PRIVATE_KEY;

if (!deployer) {
  throw new Error("Please set DEPLOYER_PRIVATE_KEY in .env file");
}

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    avalanche: {
      url: ` https://api.avax.network/ext/bc/C/rpc`,
      accounts: [deployer]
    },
    avalancheFuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [deployer],
    },
  },
  etherscan: {
    apiKey: {
      avalancheFuji: process.env.AVALANCHE_FUJI_ETHERSCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "avalancheFuji",
        chainId: 43113,
        urls: {
          apiURL: "https://api.avascan.info/v2/network/testnet/evm/43113/etherscan",
          browserURL: "https://cchain.explorer.avax-test.network"
        }
      }
    ]
  }
};

export default config;

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
  }
};

export default config;

require("@nomicfoundation/hardhat-toolbox");

const { vars } = require("hardhat/config");

const SEED_PHRASE = vars.get("SEED_PHRASE");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      accounts: {
        count: 3,
        mnemonic: SEED_PHRASE,
      },
      chainId: 1337,
    },
  },
};

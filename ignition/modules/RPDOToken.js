const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TokenModule = buildModule("TokenModule", (m) => {
  const token = m.contract("RPDOToken", [100]);
  return { token };
});

module.exports = TokenModule;

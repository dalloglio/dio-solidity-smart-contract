const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

const initialSupply = 100;

const fixture = async () => {
  const [owner, addr1, addr2] = await ethers.getSigners();
  const Token = await ethers.getContractFactory("RPDOToken");
  const token = await Token.deploy(initialSupply);
  await token.waitForDeployment();
  return { token, owner, addr1, addr2 };
};

describe("RPDOToken Contract", function () {
  beforeEach(async function () {
    Object.assign(this, await loadFixture(fixture));
  });

  it("Should assign the total supply of tokens to the owner", async function () {
    const balance = await this.token.balanceOf(this.owner.address);
    expect(await this.token.totalSupply()).to.equal(balance);
  });

  it("Should transfer tokens between accounts", async function () {
    await this.token.transfer(this.addr1.address, 50);
    expect(await this.token.balanceOf(this.addr1.address)).to.equal(50);

    await this.token.connect(this.addr1).transfer(this.addr2.address, 50);
    expect(await this.token.balanceOf(this.addr2.address)).to.equal(50);
  });

  it("Should fail if sender doesn't have enough tokens", async function () {
    const initialOwnerBalance = await this.token.balanceOf(this.owner.address);

    await expect(this.token.connect(this.addr1).transfer(this.owner.address, 1))
      .to.be.revertedWithCustomError(this.token, "ERC20InsufficientBalance")
      .withArgs(this.addr1, 0, 1);

    expect(await this.token.balanceOf(this.owner.address)).to.equal(
      initialOwnerBalance
    );
  });

  it("Should update balances after transfers", async function () {
    await this.token.transfer(this.addr1.address, 50);
    await this.token.transfer(this.addr2.address, 25);

    expect(await this.token.balanceOf(this.owner.address)).to.equal(25);
    expect(await this.token.balanceOf(this.addr1.address)).to.equal(50);
    expect(await this.token.balanceOf(this.addr2.address)).to.equal(25);
  });

  it("Should approve tokens for delegated transfer", async function () {
    await this.token.approve(this.addr1.address, 100);
    expect(
      await this.token.allowance(this.owner.address, this.addr1.address)
    ).to.equal(100);
  });

  it("Should transfer tokens via delegate", async function () {
    await this.token.approve(this.addr1.address, 100);
    await this.token
      .connect(this.addr1)
      .transferFrom(this.owner.address, this.addr2.address, 50);

    expect(await this.token.balanceOf(this.addr2.address)).to.equal(50);
    expect(await this.token.balanceOf(this.owner.address)).to.equal(50);
  });

  it("Should fail if trying to transfer more than allowance", async function () {
    await this.token.approve(this.addr1.address, 100);
    await expect(
      this.token
        .connect(this.addr1)
        .transferFrom(this.owner.address, this.addr2.address, 150)
    )
      .to.be.revertedWithCustomError(this.token, "ERC20InsufficientAllowance")
      .withArgs(this.addr1, 100, 150);
  });
});

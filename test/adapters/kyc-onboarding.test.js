// Whole-script strict mode syntax
"use strict";

/**
MIT License

Copyright (c) 2021 Openlaw

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
const {
  toBN,
  unitPrice,
  UNITS,
  GUILD,
  ETH_TOKEN,
  remaining,
  numberOfUnits,
  sha3,
} = require("../../utils/ContractUtil.js");

const {
  deployDefaultDao,
  takeChainSnapshot,
  revertChainSnapshot,
  proposalIdGenerator,
  accounts,
  expectRevert,
  expect,
  web3,
} = require("../../utils/OZTestUtil.js");

const { checkBalance, isMember } = require("../../utils/TestUtils.js");

const daoOwner = accounts[0];
const delegatedKey = accounts[9];

const proposalCounter = proposalIdGenerator().generator;

const {
  SigUtilSigner,
  getMessageERC712Hash,
} = require("../../utils/offchain_voting.js");

const signer = {
  address: "0x7D8cad0bbD68deb352C33e80fccd4D8e88b4aBb8",
  privKey: "c150429d49e8799f119434acd3f816f299a5c7e3891455ee12269cb47a5f987c",
};

describe("Adapter - KYC Onboarding", () => {
  before("deploy dao", async () => {
    const { dao, adapters, extensions } = await deployDefaultDao({
      owner: daoOwner,
      creator: delegatedKey,
    });
    this.dao = dao;
    this.adapters = adapters;
    this.extensions = extensions;
    this.snapshotId = await takeChainSnapshot();
  });

  beforeEach(async () => {
    await revertChainSnapshot(this.snapshotId);
    this.snapshotId = await takeChainSnapshot();
  });

  it("should not be possible onboard when the token amount exceeds the external token limits", async () => {
    const applicant = accounts[2];

    // Issue OpenLaw ERC20 Basic Token for tests
    // Token supply higher than the limit for external tokens

    const nbOfERC20Units = 100000000;
    const erc20UnitPrice = toBN("10");

    const { dao, adapters } = await deployDefaultDao({
      owner: daoOwner,
      unitPrice: erc20UnitPrice,
      nbUnits: nbOfERC20Units,
      tokenAddr: ETH_TOKEN,
    });

    const onboarding = adapters.kycOnboarding;

    const initialTokenBalance = await web3.eth.getBalance(applicant);

    await expectRevert(
      onboarding.onboard(dao.address, applicant, [], {
        from: applicant,
        gasPrice: toBN("0"),
      }),
      "Returned error: VM Exception while processing transaction: revert"
    );

    // In case of failures the funds must be in the applicant account
    const applicantTokenBalance = await web3.eth.getBalance(applicant);
    // "applicant account should contain 2**161 OLT Tokens when the onboard fails"
    expect(initialTokenBalance.toString()).equal(
      applicantTokenBalance.toString()
    );
  });

  it("should be possible to join a DAO with ETH contribution", async () => {
    const applicant = accounts[2];
    const nonMemberAccount = accounts[3];

    const dao = this.dao;
    const bank = this.extensions.bank;
    const onboarding = this.adapters.kycOnboarding;

    const myAccountInitialBalance = await web3.eth.getBalance(applicant);
    // remaining amount to test sending back to proposer
    const ethAmount = unitPrice.mul(toBN(3)).add(remaining);

    const signerUtil = SigUtilSigner(signer.privKey);

    let signerAddr = await dao.getAddressConfiguration(
      sha3("kyc-onboarding.signerAddress")
    );
    expect(signerAddr).equal(signer.address);

    const couponData = {
      type: "coupon-kyc",
      kycedMember: applicant,
    };

    let jsHash = getMessageERC712Hash(
      couponData,
      dao.address,
      onboarding.address,
      1
    );
    let solHash = await onboarding.hashCouponMessage(dao.address, couponData);
    expect(jsHash).equal(solHash);

    var signature = signerUtil(couponData, dao.address, onboarding.address, 1);

    await onboarding.onboard(dao.address, applicant, signature, {
      from: applicant,
      value: ethAmount,
      gasPrice: toBN("0"),
    });

    // test return of remaining amount in excess of multiple of unitsPerChunk
    const myAccountBalance = await web3.eth.getBalance(applicant);
    // daoOwner did not receive remaining amount in excess of multiple of unitsPerChunk
    expect(
      toBN(myAccountInitialBalance).sub(ethAmount).add(remaining).toString()
    ).equal(myAccountBalance.toString());

    const myAccountUnits = await bank.balanceOf(daoOwner, UNITS);
    const applicantUnits = await bank.balanceOf(applicant, UNITS);
    const nonMemberAccountUnits = await bank.balanceOf(nonMemberAccount, UNITS);
    expect(myAccountUnits.toString()).equal("1");
    expect(applicantUnits.toString()).equal(
      numberOfUnits.mul(toBN("3")).toString()
    );
    expect(nonMemberAccountUnits.toString()).equal("0");
    await checkBalance(bank, GUILD, ETH_TOKEN, unitPrice.mul(toBN("3")));

    // test active member status
    const applicantIsActiveMember = await isMember(bank, applicant);
    expect(applicantIsActiveMember).equal(true);
    const nonMemberAccountIsActiveMember = await isMember(
      bank,
      nonMemberAccount
    );
    expect(nonMemberAccountIsActiveMember).equal(false);
  });

  it("should not be possible to have more than the maximum number of units", async () => {
    const applicant = accounts[2];
    const dao = this.dao;
    const onboarding = this.adapters.onboarding;

    await expectRevert(
      onboarding.submitProposal(
        dao.address,
        "0x1",
        applicant,
        UNITS,
        unitPrice.mul(toBN(11)).add(remaining),
        [],
        {
          from: daoOwner,
          gasPrice: toBN("0"),
        }
      ),
      "total units for this member must be lower than the maximum"
    );
  });
});
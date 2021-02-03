## Adapter description and scope

Financing is the process in which an applicant, member or a non-member of the DAO, submits a proposal asking for funds. If the proposal pass, the funds are released to the applicant.

The main goal is to allow individuals and/or organizations to request funds to finance their projects, and the members of the DAO have the power to vote and decide which projects should be funded.

## Adapter workflow

In order to request funds to the DAO members, the applicant must submit a proposal in which one must specify the desired amount, the token address to receive the funds.

The applicant address can not be a reserved address, which means the address is already reserved for the DAO internal usage. Also, the token address must be allowed/supported by the DAO Bank. If these two conditions are not met, the funding proposal is not created.

## Adapter configuration

Tokens that are provided by the member have to be allowed/supported by the DAO.

The member needs to have enough shares and/or loot in order to convert it to funds.

## Adapter state

- `proposals`: all financing proposals handled by each dao.
- `ProposalDetails`:
  - `applicant`: the proposal applicant address, can not be a reserver address.
  - `amount`: the amount requested for funding.
  - `token`: the token address in which the funding must be sent to, needs to be allowed/supported by the DAO Bank.
  - `details`: additional details about the financing proposal.

## Dependencies and interactions (internal / external)

- BankExtension

  - checks if the provided token is allowed/supported by the Bank.
  - subtracts from Guild balance the requested amount based on the provided token.
  - adds to the applicant account the subtracted amount based on the provided token.

- DaoRegistry

  - checks if member address is not reserved.
  - creates/sponsors/process the financing proposal.

## Functions description and assumptions / checks

### function createFinancingRequest

```solidity
    /**
     * @notice Creates a financing proposal.
     * @dev Applicant address must not be reserved.
     * @dev Token address must be allowed/supported by the DAO Bank.
     * @dev Requested amount must be greater than zero.
     * @param dao The DAO Address.
     * @param proposalId The proposal id.
     * @param applicant The applicant address.
     * @param token The token to receive the funds.
     * @param amount The desired amount.
     * @param details Additional detais about the financing proposal.
     */
    function createFinancingRequest(
        DaoRegistry dao,
        bytes32 proposalId,
        address applicant,
        address token,
        uint256 amount,
        bytes32 details
    ) external override
```

### function sponsorProposal

```solidity
    /**
     * @notice Sponsor a financing proposal to start the voting process.
     * @dev Only members of the DAO can sponsor a financing proposal.
     * @param dao The DAO Address.
     * @param proposalId The proposal id.
     * @param data Additional detais about the sponsorship process.
     */
    function sponsorProposal(
        DaoRegistry dao,
        bytes32 proposalId,
        bytes calldata data
    ) external override onlyMember(dao)
```

### function processProposal

```solidity
    /**
     * @notice Processing a financing proposal to grant the requested funds.
     * @dev Only members of the DAO can process a financing proposal.
     * @dev Only proposals that were not processed are accepted.
     * @dev Only proposals that were sponsored are accepted.
     * @dev Only proposals that passed can get processed and have the funds released.
     * @param dao The DAO Address.
     * @param proposalId The proposal id.
     */
    function processProposal(DaoRegistry dao, bytes32 proposalId)
        external
        override
        onlyMember(dao)
```

## Events

No event are emitted from this adapter.
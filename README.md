# Relief Finance

**Relief Finance** is a decentralized crowdfunding platform that facilitates cryptocurrency donations for humanitarian campaigns, ensuring transparency, security, and efficiency through blockchain technology.

![ReliefFiance Banner](https://raw.githubusercontent.com/Geepytechnologies/ReliefFinance/main/public/background.png)

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Smart Contract Details](#smart-contract-details)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Contribution Guidelines](#contribution-guidelines)
8. [License](#license)

---

## Introduction

Relief Finance is a decentralized platform built to support humanitarian efforts through crypto donations. It allows users to create, approve, and contribute to campaigns using Web3 wallets such as MetaMask. The platform ensures transparent fundraising by utilizing blockchain-based smart contracts.

## Features

- **Decentralized Campaign Funding**: Users can fund and track humanitarian campaigns in real-time.
- **Multi-Wallet Support**: Integrates popular wallets like MetaMask, TrustWallet, WalletConnect, etc.
- **Transparent Contributions**: All transactions and campaign details are recorded on the blockchain.
- **Campaign Approval Mechanism**: Campaigns can be reviewed and approved for legitimacy.
- **Cross-Chain Support**: Works across Ethereum, Polygon, AssetChain, and more.

## Tech Stack

- **Frontend**: React, Next.js
- **Blockchain**: Ethereum, Polygon, AssetChain
- **Wallet Integration**: MetaMask, WalletConnect, Rainbowkit
- **State Management**: React Context, Wagmi
- **UI Framework**: Tailwind CSS
- **Smart Contract**: Solidity-based contracts

## Smart Contract Details

The smart contract defines several functions that allow for campaign creation, contribution, and management.

### Read Functions

1. **allCampaigns**: Fetches all created campaigns.
2. **approvedCampaigns**: Lists all approved campaigns.
3. **campaignContributors**: Retrieves contributors of a specific campaign.
4. **campaignCount**: Total number of campaigns.
5. **campaigns**: Fetches details of a specific campaign.
6. **contributions**: Retrieves contribution details for a specific campaign.
7. **getAllCampaigns**: Fetches all campaigns with more detailed data.
8. **getAllCampaignsWithContributorCount**: Fetches campaigns with contributor count.
9. **getCampaign**: Fetches a specific campaign by ID.
10. **getCampaignWithContributors**: Retrieves campaign details with contributor data.
11. **getCampaignsByCreator**: Lists campaigns created by a specific user.
12. **getCampaignsByCreatorWithApprovalStatus**: Fetches campaigns by creator and their approval status.
13. **getContributors**: Retrieves contributor details of a campaign.
14. **getLatestCampaigns**: Fetches the latest campaigns.
15. **getPaginatedCampaigns**: Fetches campaigns in paginated format.
16. **isApproved**: Checks if a campaign is approved.
17. **owner**: Retrieves the contract owner.

### Write Functions

1. **approveCampaign**: Approves a campaign for public listing.
2. **completeCampaign**: Marks a campaign as completed once the goal is reached.
3. **contribute**: Allows users to contribute to a specific campaign.
4. **createCampaign**: Enables users to create a new campaign.
5. **getRefund**: Allows contributors to claim refunds for failed campaigns.

## Installation

To run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/relief-finance.git
   cd relief-finance

   ```

2. Install dependencies:

   ```npm install

   ```

3. Create an .env file and add the following environment variables:

   ````NEXT_PUBLIC_RPC_URL=your_rpc_url_here
   ```NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address_here
   ```NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

   ````

4. Run the development server:

   ```npm run dev

   ```

### Usage

1. Connect Wallet: Connect a Web3 wallet (MetaMask, TrustWallet, etc.).

2. View Campaigns: Browse through active campaigns and see the funding progress.

3. Contribute: Choose a campaign to donate cryptocurrency using your connected wallet.

4. Create Campaign: Create a new campaign by providing necessary details (title, description, funding goal).

5. Approve Campaign: Campaigns go through an approval process for added security.

6. Track Progress: Monitor live updates on fundraising goals and contributions.

### License

This project is licensed under the MIT License.

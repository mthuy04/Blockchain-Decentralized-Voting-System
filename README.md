# 🗳️ VoteChain - Decentralized Voting Application

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-React-61DAFB.svg)
![Solidity](https://img.shields.io/badge/blockchain-Solidity-363636.svg)
![Ethereum](https://img.shields.io/badge/network-Ethereum-3C3C3D.svg)

**VoteChain** is a secure, decentralized electronic voting system built on the Ethereum Blockchain. It ensures transparency, immutability, and integrity of the election process, solving common issues in traditional voting such as data manipulation and lack of transparency.

This project demonstrates a full-stack Web3 application (DApp) integrating a **React.js** frontend with **Solidity** smart contracts.

---

## 🌟 Key Features

### 🛡️ For Administrators
- **Election Control:** Deploy smart contracts, initialize election details (Title, Organization).
- **Phase Management:** strict control over election states (Initialization -> Registration -> Voting -> Ended).
- **Voter Verification:** KYC-style approval system. Only verified accounts can vote.
- **Candidate Management:** Add candidates with manifestos/slogans.
- **Real-time Monitoring:** Dashboard to monitor network status and voter participation.

### 👤 For Voters
- **Secure Registration:** Register with name and phone number (linked to Wallet Address).
- **One-Person-One-Vote:** Smart contract enforces a single vote per wallet.
- **Privacy & Transparency:** Votes are anonymous, but the total count is verifiable on the blockchain.
- **Live Results:** View real-time election standings (sealed until the election ends).

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Blockchain** | Solidity | Smart Contract development (v0.5.x) |
| **Framework** | Truffle Suite | Development environment, testing, and deployment pipeline |
| **Local Chain** | Ganache | Personal blockchain for local development |
| **Frontend** | React.js | UI Library (Class Components & Hooks) |
| **Styling** | Tailwind CSS | Utility-first CSS framework for modern UI |
| **3D Elements** | Three.js | Interactive 3D background elements |
| **Web3** | Web3.js | Library to interact with Ethereum nodes |
| **Wallet** | MetaMask | Browser extension for transaction signing |

---

## 📸 Screenshots

| Admin Dashboard | Voting Area |
| :---: | :---: |
| ![Admin Dashboard]<img width="1440" height="900" alt="Ảnh màn hình 2026-01-04 lúc 15 28 51" src="https://github.com/user-attachments/assets/eebf60e6-213f-4dd1-bd6b-7878290d3349" />
) | ![Voting Area]<img width="1440" height="900" alt="Ảnh màn hình 2026-01-04 lúc 15 34 58" src="https://github.com/user-attachments/assets/12d9a023-dbe0-4d32-89ba-f149920f481b" />
) |

| Voter Registration | Election Results |
| :---: | :---: |
| ![Registration]<img width="1440" height="900" alt="Ảnh màn hình 2026-01-04 lúc 15 30 41" src="https://github.com/user-attachments/assets/3ed4f450-e1c4-41fa-aa81-90cff8b1e0b3" />
) | ![Results]<img width="1440" height="900" alt="Ảnh màn hình 2026-01-04 lúc 15 37 28" src="https://github.com/user-attachments/assets/05f3041a-fe94-4037-8b10-32e6c462c1bf" />
) |

---

## 🚀 Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v14 or later recommended)
- Truffle (`npm install -g truffle`)
- Ganache (GUI or CLI)
- MetaMask Browser Extension

### 1. Clone the Repository
```bash
git clone [(https://github.com/mthuy04/Blockchain-Decentralized-Voting-System)](https://github.com/mthuy04/Blockchain-Decentralized-Voting-System)
cd Blockchain-Decentralized-Voting-System

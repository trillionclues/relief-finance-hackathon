"use client";
import React, { useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const FundCampaign = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  // Create a new Web3Modal instance
  const web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions: {},
  });

  const connectWallet = async () => {
    try {
      const instance = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(instance);
      const signer = await provider.getSigner();

      setProvider(provider);
      setSigner(signer);

      const address = await signer.getAddress();
      setAddress(address);

      const balance = ethers.formatEther(await provider.getBalance(address));
      setBalance(balance);
      toast.success("Connected to wallet");
      // console.log("Connected Account:", address);
      // console.log("Balance:", balance);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnectWallet = async () => {
    try {
      web3Modal.clearCachedProvider();
      setProvider(null);
      setSigner(null);
      setAddress(null);
      setBalance(null);
      toast.success("Wallet disconnected!");
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  const handleDonate = async () => {
    if (!signer || !amount || !recipientAddress) return;

    try {
      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: ethers.parseEther(amount),
      });

      console.log("Transaction sent:", tx);
    } catch (error) {
      console.error("Failed to send transaction:", error);
    }
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">💪 Fund this campaign</h2>
      {!address ? (
        <button
          className="w-full bg-teal-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-teal-600"
          onClick={connectWallet}
        >
          💎 Connect Wallet
        </button>
      ) : (
        <div>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 truncate">
              Wallet address: {address}
            </p>
            <p className="text-sm font-medium text-gray-700 truncate">
              Balance: {balance} ETH
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="recipient"
              className="block text-sm font-medium text-gray-700"
            >
              Recipient Address
            </label>
            <input
              type="text"
              id="recipient"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="0x1234...abcd"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="funding"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Amount (ETH)
            </label>
            <input
              type="text"
              id="funding"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="0.5"
            />
          </div>
          <button
            className="w-full bg-teal-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-teal-600 mb-2 text-sm"
            onClick={handleDonate}
          >
            💎 Donate now
          </button>
          <button
            className="w-full bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 text-sm"
            onClick={disconnectWallet}
          >
            ❌ Disconnect Wallet
          </button>
        </div>
      )}
      <p className="text-xs text-gray-500 mt-4">
        Not only numbers make the difference in our lives :)
      </p>
    </div>
  );
};

export default FundCampaign;

"use client";
import { useState } from "react";
import { parseGwei } from "viem";
import { ConnectWalletClient } from "./client";

export default function TransactionComponent() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter: (val: string) => void) => (evt: React.ChangeEvent<HTMLInputElement>) => 
    setter(evt.target.value);

  async function handleClick() {
    try {
      const walletClient = ConnectWalletClient();
      const [address] = await walletClient.getAddresses();

      const hash = await walletClient.sendTransaction({
        account: address,
        to: recipient as `0x${string}`, 
        value: parseGwei(amount), 
      });
      alert(`Transaction successful. Transaction Hash: ${hash}`);
    } catch (error) {
      alert(`Transaction failed: ${error}`);
    }
  }

  return (
    <div className="card">
      <label>
        Amount (Gwei):
        <input
          placeholder="GWei"
          value={amount}
          onChange={setValue(setAmount)}
        />
      </label>
      <br />
      <label>
        Recipient:
        <input
          placeholder="Address"
          value={recipient}
          onChange={setValue(setRecipient)}
        />
      </label>
      <br />
      <button
        className="px-8 py-2 rounded-md flex flex-row items-center justify-center bg-blue-600 text-white mt-4"
        onClick={handleClick}
      >
        Send Transaction
      </button>
    </div>
  );
}
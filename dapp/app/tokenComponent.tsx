"use client";
import { useState } from "react";
import { getContract, Address } from "viem";
import { contractAbi } from "./abi";
import { ConnectPublicClient } from "./client";

export default function TokenComponent() {
  const [contractAddress, setContractAddress] = useState("");
  
  const publicClient = ConnectPublicClient();

  async function buttonClick() {
    try {
      if (!contractAddress) {
        alert("Введите адрес контракта");
        return;
      }
      
      const contract = getContract({
        address: contractAddress as Address,
        abi: contractAbi,
        client: publicClient,
      });

      const name = await contract.read.name();
      alert(`Token Name: ${name}`);
      
    } catch (error) {
      console.error(error);
      alert(`Ошибка: ${error}`);
    }
  }

  return (
    <div className="card">
      <label>
        Contract Address:
        <input
          placeholder="Вставь адрес: 0x7798..."
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
      </label>
      <br />
      <button
        className="px-8 py-2 rounded-md bg-blue-500 text-white mt-4"
        onClick={buttonClick}
      >
        Get Token Name
      </button>
    </div>
  );
}
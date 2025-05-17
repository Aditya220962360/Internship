import React, { useState } from 'react';
import axios from 'axios';

export default function WalletApp() {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const API_BASE = 'http://localhost:5000';

  const register = async () => {
    const res = await axios.post(${API_BASE}/register);
    setUserId(res.data.user_id);
    alert('User registered: ' + res.data.user_id);
  };

  const deposit = async () => {
    await axios.post(${API_BASE}/deposit, { user_id: userId, amount });
    fetchBalance();
  };

  const withdraw = async () => {
    await axios.post(${API_BASE}/withdraw, { user_id: userId, amount });
    fetchBalance();
  };

  const transfer = async () => {
    await axios.post(${API_BASE}/transfer, {
      sender_id: userId,
      recipient_id: recipientId,
      amount
    });
    fetchBalance();
  };

  const fetchBalance = async () => {
    const res = await axios.get(${API_BASE}/balance/${userId});
    setBalance(res.data.balance);
  };

  const fetchTransactions = async () => {
    const res = await axios.get(${API_BASE}/transactions/${userId});
    setTransactions(res.data.transactions);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Digital Wallet</h1>

      <div className="mb-4">
        <button onClick={register} className="bg-blue-500 text-white px-4 py-2 rounded">
          Register
        </button>
        <div className="mt-2">User ID: <code>{userId}</code></div>
      </div>

      <div className="mb-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={deposit} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
          Deposit
        </button>
        <button onClick={withdraw} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Withdraw
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Recipient ID"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={transfer} className="bg-purple-500 text-white px-4 py-2 rounded">
          Transfer
        </button>
      </div>

      <div className="mb-4">
        <button onClick={fetchBalance} className="bg-gray-800 text-white px-4 py-2 rounded mr-2">
          Get Balance
        </button>
        {balance !== null && <div>Balance: ${balance.toFixed(2)}</div>}
      </div>

      <div className="mb-4">
        <button onClick={fetchTransactions} className="bg-indigo-500 text-white px-4 py-2 rounded">
          View Transactions
        </button>
        <ul className="mt-2">
          {transactions.map((tx, index) => (
            <li key={index} className="border p-2 mb-1">
              <strong>{tx.action}</strong> ${tx.amount} {tx.target && to/from: ${tx.target}}<br />
              <small>{new Date(tx.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
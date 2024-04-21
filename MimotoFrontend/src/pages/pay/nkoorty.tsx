import React, { useState } from 'react';
import { isConnected, getPublicKey } from "@stellar/freighter-api";
import 'material-icons/iconfont/material-icons.css';

type TokenInfo = {
    name: string;
    image: string;
  };
type Key = string;

const PayPage = () => {
  const [publicKey, setPublicKey] = useState('');
  const [connected, setConnected] = useState(false);
  const [isWalletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(null);
  const [newToken, setNewToken] = useState('');
  const [isTokenDropdownOpen, setTokenDropdownOpen] = useState(false);
  const [tokenAmount, setTokenAmount] = useState('');
  const [fiatEquivalent, setFiatEquivalent] = useState('');

  const exchangeRate = 0.11;

  const handleTokenAmountChange = (amount: string) => {
    setTokenAmount(amount);
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount)) {
      setFiatEquivalent(`≈ ${(numericAmount * exchangeRate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`);
    } else {
      setFiatEquivalent('');
    }
  };

  const formatPublicKey = (key: Key) => {
    return `${key.substring(0, 13)}...${key.slice(-13)}`;
  };

  const [tokens, setTokens] = useState<TokenInfo[]>([
    { name: 'XLM', image: '/stellar.png' },
    { name: 'MIM', image: '/usdc.png' },
    { name: 'JRT', image: '/usdc.png' },
  ]);

  const handleSelectToken = (token: TokenInfo) => {
    setSelectedToken(token);
    setTokenDropdownOpen(false);
  };
  
  const handleAddToken = () => {
    const tokenToAdd: TokenInfo = {
      name: newToken.trim().toUpperCase(),
      image: '/default_token_image.png', // Replace with your default token image path
    };
  
    if (tokenToAdd.name && !tokens.some((t) => t.name === tokenToAdd.name)) {
      setTokens([...tokens, tokenToAdd]);
      setSelectedToken(tokenToAdd);
      setNewToken('');
    }
    setTokenDropdownOpen(false);
  };

  const connectWallet = async () => {
    try {
      const key = await getPublicKey();
      setPublicKey(key);
      setConnected(true);
    } catch (error) {
      console.error('Error connecting to Freighter:', error);
      alert('Error connecting to Freighter. Please ensure the Freighter extension is installed.');
    }
  };

  const disconnectWallet = () => {
    setPublicKey(''); 
    setConnected(false);
    setWalletDropdownOpen(false);
  };

  const buttonHeight = 'h-12'; 

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-10 pb-10 pl-36 pr-36">
      <div className="z-10 flex w-full max-w-7xl items-center">
      <div className="z-10 flex w-full max-w-7xl items-center">
        <img
          src="/Mimoto_bg_white.png"
          alt="Mimoto logo"
          className="dark:invert"
          height={40}
          width={40}
        />
        <p className="pl-4 text-2xl font-bold text-white">
          Mimoto
        </p>
        <p className="pl-3 text-xl mt-1 text-white" style={{ transform: 'translateY(1%)' }}>
          Payments
        </p>
      </div>
      </div>

      {/* Payment form section */}
      <div className="flex w-full max-w-4xl flex-col items-center mt-14 px-10">
        <img src="/nkoorty.jpeg" alt="nkoorty" className="h-20 w-20 rounded-full" />
        <h1 className="text-2xl font-semibold my-5 text-white">
          Pay <span className="font-bold text-blue-600">@nkoorty</span> using Mimoto
        </h1>
        <div className="bg-black rounded-2xl p-6 w-96">
            <p className="text-md font-semibold pb-2 text-white">Wallet</p>
            {!connected ? (
              <button
                onClick={connectWallet}
                className={`rounded-lg border border-gray-300 hover:bg-gray-200 ${buttonHeight} flex items-center justify-center px-3 transition duration-150 ease-in-out`}
              >
                <span className="text-md font-semibold text-white">Connect Wallet</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setWalletDropdownOpen(!isWalletDropdownOpen)}
                  className={`flex items-center justify-center ${buttonHeight} px-3 border border-gray-300 hover:bg-gray-900 rounded-lg transition duration-250 ease-in-out`}
                >
                  <img src="/freighter.jpg" alt="Freighter Logo" className="h-5 mr-2 rounded-md" />
                  <span className="text-md font-semibold text-white">{formatPublicKey(publicKey)}</span>
                </button>
                {isWalletDropdownOpen && (
                  <div className="absolute left-0 mt-2 py-1 w-48 bg-black rounded-lg shadow-xl z-10 border border-gray-100">
                    <button onClick={disconnectWallet} className="block w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 text-left">Disconnect</button>
                  </div>
                )}
              </div>
            )}
            <p className="text-md font-semibold pb-2 pt-6 text-white">Select Token</p>
            <div className="relative ">
                <button onClick={() => setTokenDropdownOpen(!isTokenDropdownOpen)} className="w-full rounded-lg border border-gray-300 bg-black px-4 py-2 mb-2 text-left flex items-center justify-between">
                    <div className="flex items-center text-white">
                    {selectedToken ? (
                        <>
                        <img src={selectedToken.image} alt={selectedToken.name} className="h-5 mr-2" />
                        <span>{selectedToken.name}</span>
                        </>
                    ) : (
                        <span>Select a token</span>
                    )}
                    </div>
                    <span className="material-icons text-white">expand_more</span>
                </button>
                {isTokenDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-full bg-black rounded-lg shadow-xl z-10 border border-gray-100">
                    <ul className="py-1">
                        {tokens.map((token, index) => (
                        <li key={index} className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer text-white" onClick={() => setSelectedToken(token)}>
                            <img src={token.image} alt={token.name} className="h-5 mr-2" />
                            <span>{token.name}</span>
                        </li>
                        ))}
                        <li className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                        <input
                            type="text"
                            value={newToken}
                            onChange={(e) => setNewToken(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-100 bg-black rounded-lg mb-2"
                            placeholder="Token contract address"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            onClick={handleAddToken}
                            className="w-full px-4 py-2 text-sm text-blue-500 hover:text-blue-600"
                        >
                            Add Token
                        </button>
                        </li>
                    </ul>
                    </div>
                )}
            </div>
            <p className="text-md font-semibold pb-2 pt-5 text-white">Enter amount</p>
            <div className="flexflex-col mb-4">
                <div className="relative flex items-center rounded-lg border border-gray-300">
                    <div className="absolute  inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <span className="material-icons text-blue-500">attach_money</span>
                    </div>
                    <input
                    id="tokenAmount"
                    type="number"
                    value={tokenAmount}
                    onChange={(e) => handleTokenAmountChange(e.target.value)}
                    className="block bg-black text-white w-full pl-10 pr-4 py-2 rounded-lg border-0"
                    placeholder="0"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    {fiatEquivalent}
                    </div>
                </div>
                <p className="pt-1 text-red-500 text-sm">{tokenAmount && parseFloat(tokenAmount) <= 0 ? 'Insufficient balance' : ''}</p>
            </div>
            <button
                className={`w-full rounded-lg border border-gray-300 bg-blue-500 hover:bg-blue-600 text-white py-2 transition duration-150 ease-in-out ${buttonHeight}`}
            >
                Send
            </button>
        </div>
      </div>

      {/* Footer logos */}
      <div className="z-10 flex w-full max-w-7xl items-center mt-6 ">
        <p className="pr-2 text-1xl font-semithin text-white">
          Built with
        </p>
        <img src="/Soroban_white.png" alt="Soroban logo" className="light:invert" height={100} width={100} />
        <img src="/Stellar_white.png" alt="Stellar logo" className="dark:invert" height={100} width={100} />
      </div>
    </main>
  );
}
  
export default PayPage;
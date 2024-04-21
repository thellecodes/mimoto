import React, { useState, useEffect } from 'react';
import { isConnected, getPublicKey } from "@stellar/freighter-api";

type DashboardProps = {
  title: string;
};

const Dashboard: React.FC<DashboardProps> = ({ title }) => {
  const [isWalletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [publicKey, setPublicKey] = useState('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      const connectedStatus = await isConnected();
      setConnected(connectedStatus);
      if (connectedStatus) {
        const key = await getPublicKey();
        setPublicKey(key);
      }
    };
    checkConnection();
  }, []);

  const formatPublicKey = (key: string | undefined) => {
    return key ? `${key.substring(0, 4)}...${key.slice(-4)}` : 'No Key';
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
  const buttonWidth = 'w-12';

  return (
    <div className="flex height-100vh">
      {/* Main content area */}
      <main className="flex-1">
        {/* Header */}
        <div className="flex justify-between items-center p-2">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex items-center space-x-4">
            {/* Connect Wallet Button or Address Display */}
            {!connected ? (
              <button
                onClick={connectWallet}
                className={`rounded-lg hover:bg-gray-200 ${buttonHeight} flex items-center justify-center px-3 transition duration-150 ease-in-out`}
              >
                <span className="text-md font-semibold">Connect Wallet</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setWalletDropdownOpen(!isWalletDropdownOpen)}
                  className={`flex items-center justify-center ${buttonHeight} px-3 hover:bg-gray-200 rounded-lg transition duration-150 ease-in-out`}
                >
                  <img src="/freighter.jpg" alt="Freighter Logo" className="h-5 mr-2 rounded-md" />
                  <span className="text-md font-semibold">{formatPublicKey(publicKey)}</span>
                </button>
                {isWalletDropdownOpen && (
                  <div className="absolute right-0 mt-2 py-1 w-48 bg-white rounded-lg shadow-xl z-10">
                    <button onClick={disconnectWallet} className="block w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 text-left">Disconnect</button>
                  </div>
                )}
              </div>
            )}
            {/* Profile Dropdown */}
            <div className="relative">
              <button onClick={() => setDropdownOpen(!isDropdownOpen)}
                      className={`relative rounded-lg hover:bg-gray-200 ${buttonHeight} ${buttonWidth} flex items-center justify-center p-1 transition duration-150 ease-in-out`}
              >
                <img src="/nkoorty.jpeg" alt="Profile" className="h-8 w-8 rounded-full" />
              </button>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 py-1 w-48 bg-white rounded-lg shadow-xl z-10">
                  <a href="/pay/nkoorty" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Payment Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100">Log out</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

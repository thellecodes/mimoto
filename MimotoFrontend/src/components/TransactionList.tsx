import React from 'react';

type TransactionData = {
  date: string;
  from: string;
  amount: string;
  platform: 'Discord' | 'X' | 'Mimoto';
  transactionLink: string;
};

const transactions: TransactionData[] = [
  {
    date: 'December 31, 2023',
    from: 'GCKDDBYUZNM5C2RTWJVII2AG2FHS47W62GT3NZIKYSNKFH73YKV3QV5U',
    amount: '55 XLM',
    platform: 'X',
    transactionLink: 'https://etherscan.io/tx/0x...',
  },
  {
    date: 'December 24, 2023',
    from: 'GC3OTNZSVVPOWZ5BU7S64XKNI5VPTRSBEXXLS67V4K6LEUETWBMTE7H',
    amount: '4200 XLM',
    platform: 'Mimoto',
    transactionLink: 'https://etherscan.io/tx/0x...',
  },
  {
    date: 'December 12, 2023',
    from: 'GBGOPXX633Q6PARI2AUGEAK5VTLLCEFOSHVRMXY2T55NJ25MBIYKA5ZA',
    amount: '4 XLM',
    platform: 'Discord',
    transactionLink: 'https://etherscan.io/tx/0x...',
  },
  {
    date: 'December 10, 2023',
    from: 'GB4XOHEBQIQNEJIHYKRYCJ7VBMPMV6ZD2SNFUPDGZW6AOMAWUZ5VQYI7',
    amount: '80 XLM',
    platform: 'Mimoto',
    transactionLink: 'https://etherscan.io/tx/0x...',
  },
];

const platformImages = {
  'Discord': './discord.png',
  'X': './x.png',
  'Mimoto': './Mimoto.png', 
};

const formatPublicKey = (key: string): string => {
  return `${key.substring(0, 4)}...${key.slice(-4)}`;
};

const TransactionList: React.FC = () => {
    return (
        <div>
        {transactions.map((tx, index) => (
            <div key={index} className="flex justify-between items-center my-3 p-3 bg-white rounded-lg">
            <div className="flex items-center" style={{width: '30%'}}>
                {/* Use the platform name to get the corresponding image */}
                <img src={platformImages[tx.platform]} alt={tx.platform} className="h-10 w-10 rounded-full mr-3" />
                <div>
                <div className="text-md">{tx.platform}</div>
                <div className="text-sm text-gray-500">{tx.date}</div>
                </div>
            </div>
            <div className="text-sm px-3 py-2 bg-gray-200 rounded-full flex items-center" style={{width: '15%'}}>
                <img src="/icon3.png" alt="Transaction" className="h-6 w-6 mr-2 rounded-full" />
                {formatPublicKey(tx.from)}
            </div>
            <div className="flex items-center" style={{width: '30%'}}>
                <img src="/stellar.png" alt="Arrow Right" className="h-6 w-6 mr-2 rounded-full" />
                <div className="mr-6">{tx.amount}</div>
                <div className="flex items-start">
                    <span className="material-icons mr-6">arrow_forward</span>
                    <div className="text-2sm">You</div>
                </div>
            </div>
            <div className="flex items-center space-x-2" style={{width: '10%'}}>
                <span className="material-icons p-2 rounded-lg transition hover:bg-gray-200">launch</span>
            </div>
            </div>
        ))}
        </div>
    );
};

export default TransactionList;

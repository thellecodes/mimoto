import React, { useState } from 'react';
import 'material-icons/iconfont/material-icons.css';

type DropdownItem = {
  name: string;
  icon?: string;
  imgSrc?: string;
};

type DropdownContent = {
  [key: string]: DropdownItem[];
};

const dropdownContent: DropdownContent = {
  Tokens: [
    { name: 'XLM', imgSrc: '/stellar.png' },
    { name: 'MIM Token', imgSrc: '/usdc.png' },
  ],
  More: [
    { name: 'Import Tokens', icon: 'arrow_downward' },
    { name: 'Download Balances', icon: 'file_download' },
  ],
};

type TokenDropdownProps = {
  text: keyof DropdownContent;
};

const TokenDropdown: React.FC<TokenDropdownProps> = ({ text }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dropdownItems = dropdownContent[text] || [];

  return (
    <div className="relative">
      <button onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="relative rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-200 flex items-center justify-center pl-3 pr-2 py-2 transition duration-150 ease-in-out"
      >
        { text }
        <span className="material-icons">arrow_drop_down</span>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute left-0 mt-2 py-1 w-48 bg-white rounded-lg shadow-xl z-10">
          {dropdownItems.map((item, index) => (
            <a key={index} href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              {item.imgSrc && <img src={item.imgSrc} alt={item.name} className="h-6 w-6 mr-2 rounded-full" />}
              {item.icon && <span className="material-icons mr-2">{item.icon}</span>}
              <span className="flex-grow">{item.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default TokenDropdown;

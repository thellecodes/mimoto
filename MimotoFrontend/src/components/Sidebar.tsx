import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import '../app/globals.css';

const Sidebar = () => {
  const router = useRouter();

  const isActive = (pathname) => router.pathname === pathname; 

  return (
    <aside className="sidebar">
      <div className="logo mt-4 justify-center mr-8">
        {/* Replace the src with your logo image path */}
        <Image src="/Mimoto_bg.png" alt="Logo" width={38} height={38} />
        <span className="logo-text ms-2">Mimoto</span>
      </div>
      <nav className="nav flex-column mt-8">
        <Link href="/" legacyBehavior>
        <a className={`nav-item ${isActive('/') ? 'active' : ''}`}>Dashboard</a>
        </Link>
        <Link href="/payments" legacyBehavior>
        <a className={`nav-item ${isActive('/payments') ? 'active' : ''}`}>Payments</a>
        </Link>
        <Link href="/social" legacyBehavior>
        <a className={`nav-item ${isActive('/social') ? 'active' : ''}`}>Social Connections</a>
        </Link>
        <Link href="/support" legacyBehavior>
        <a className={`nav-item ${isActive('/support') ? 'active' : ''}`}>Support</a>
        </Link>
        {/* ... other links */}
      </nav>
      <div className="terms mt-auto pt-3 border-top">
        <Link href="/terms" legacyBehavior>
          <a className="nav-item">Terms of service</a>
        </Link>
      </div>

      <style jsx>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: fixed;
          top: 0;
          left: 0;
          width: 210px;
          height: 100vh;
          background-color: #f8f9fa;
          padding: 1rem;
          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .logo-text {
          font-size: 1.3rem;
        }

        .nav-item {
          padding: 0.5rem 1rem;
          color: #4a4a4a;
          text-decoration: none;
          display: block;
          transition: background-color 0.2s, color 0.2s;
          border-radius: 0.5rem;
          margin-right: -0.25rem; /* Adjusted for hover effect */
          margin-left: -0.25rem; /* Adjusted for hover effect */
          margin-bottom: 0.5rem; /* Increased space between items */
        }

        .nav-item:last-child {
          margin-bottom: 0; /* Removes extra margin from the last item */
        }

        .nav-item.active {
          color: #2531b3;
          background-color: #e7e7e7;
          border-radius: 0.5rem;
          margin-right: -0.25rem;
          margin-left: -0.25rem;
          font-weight: 700;
        }

        .nav-item:hover {
          background-color: #f0f0f0;
          border-radius: 0.5rem;
          margin-right: -0.25rem;
          margin-left: -0.25rem;
        }

        .terms {
          padding-top: 1rem;
          border-top: 1px solid #e1e1e1;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;

'use client';

import { Bell, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import {usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';
import { useEffect, useState } from 'react';
import Notifications from './Notifications';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const pathname = usePathname(); 

  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const navLinks = [
    {
       href:"/",
       label:"Home"
    },
    {
      href:"/tasks",
      label:"Tasks"
    },
    {
      href:"/notes",
      label:"Notes"
    },
    {
      href:"/calendar",
      label:"Calendar"
    },
    {
      href:"/subscription",
      label:"Subscription"
    }
  ]
return (  
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {
          showNotifications && <Notifications  />
        }
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 mr-3">
              <Link href="/" className="hover:opacity-80 transition-opacity cursor-pointer"> 
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                  fill="currentColor"
                />
              </svg>
              </Link>
            </div>
            <h1 className="text-[#121810] text-lg font-bold leading-tight tracking-[-0.015em]">
              <Link href="/" className="hover:opacity-80 transition-opacity">
                Tasks Master
              </Link>
            </h1>
          </div>
          
          {
            isAuthenticated ? (
              <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={`${pathname === link.href ? 'text-green-600' : ''} hover:text-green-600 transition-colors`}>
                  <span>
                  {link.label}
                  </span>
                </Link>
              ))}
            </nav>
            
            <button 
              type="button" 
              
              className={`group p-2 text-green-400 rounded-full transition-colors cursor-pointer  group-hover:text-green-600 ${showNotifications ? 'bg-green-100' : ''}`}
              aria-label="Notifications"
              title="View notifications"
              onClick={() => {    setShowNotifications((prev) => !prev)}}
            >
              <Bell size={20} className="text-gray-700 group-hover:text-green-600" aria-hidden="true" />
            </button>
            
            <Link href="/profile" className="hover:opacity-80 transition-opacity cursor-pointer   "> 
        
              <div 
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full p-3 w-11 h-11 bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary)] flex items-center justify-center text-white text-2xl font-bold"
                  >
                    {user?.username[0]}
                  </div>
            </Link>
          </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                <span>Register</span>
              </Link>
            </div>
          )

          }
        </div>
      </div>
    </header>
  );
}


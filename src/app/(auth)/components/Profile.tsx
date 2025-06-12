import React from 'react';
import { ArrowRight } from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[var(--color-bg-light)] group/design-root overflow-x-hidden font-['Manrope','Noto_Sans',sans-serif]">
      <div className="layout-container flex h-full grow flex-col">
        {/* Main Content */}
        <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 w-full">
            {/* Profile Section */}
            <div className="flex p-4">
              <div className="flex w-full flex-col gap-4 items-center">
                <div className="flex gap-4 flex-col items-center">
                  <div 
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary)] flex items-center justify-center text-white text-4xl font-bold"
                  >
                    SB
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-[var(--color-text)] text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">Sophia Bennett</p>
                    <p className="text-[var(--color-primary-dark)] text-base font-normal leading-normal text-center">sophia.bennett@email.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Section */}
            <h2 className="text-[var(--color-text)] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Account</h2>
            <div className="flex items-center gap-4 bg-[var(--color-bg-light)] hover:bg-[var(--color-bg-dark)] px-4 min-h-14 justify-between cursor-pointer transition-colors">
              <p className="text-[var(--color-text)] text-base font-normal leading-normal flex-1 truncate">Change Password</p>
              <div className="shrink-0">
                <ArrowRight size={24} className="text-[var(--color-text-light)]" />
              </div>
            </div>
            <div className="flex items-center gap-4 bg-[var(--color-bg-light)] hover:bg-[var(--color-bg-dark)] px-4 min-h-14 justify-between cursor-pointer transition-colors">
              <p className="text-[var(--color-text)] text-base font-normal leading-normal flex-1 truncate">Update Personal Information</p>
              <div className="shrink-0">
                <ArrowRight size={24} className="text-[var(--color-text-light)]" />
              </div>
            </div>

            {/* Preferences Section */}
            <h2 className="text-[var(--color-text)] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Preferences</h2>
            <div className="flex items-center gap-4 bg-[var(--color-bg-light)] hover:bg-[var(--color-bg-dark)] px-4 min-h-14 justify-between cursor-pointer transition-colors">
              <p className="text-[var(--color-text)] text-base font-normal leading-normal flex-1 truncate">Theme Settings</p>
              <div className="shrink-0">
                <ArrowRight size={24} className="text-[var(--color-text-light)]" />
              </div>
            </div>
            <div className="flex items-center gap-4 bg-[var(--color-bg-light)] hover:bg-[var(--color-bg-dark)] px-4 min-h-14 justify-between cursor-pointer transition-colors">
              <p className="text-[var(--color-text)] text-base font-normal leading-normal flex-1 truncate">Notification Controls</p>
              <div className="shrink-0">
                <ArrowRight size={24} className="text-[var(--color-text-light)]" />
              </div>
            </div>

            {/* Activity Summary */}
            <h2 className="text-[var(--color-text)] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Activity Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              <div className="flex flex-col gap-2 rounded-xl p-6 border border-[var(--color-border)] bg-[var(--color-bg-light)]">
                <p className="text-[var(--color-text-light)] text-base font-medium leading-normal">Tasks Completed</p>
                <p className="text-[var(--color-text)] tracking-light text-2xl font-bold leading-tight">125</p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-6 border border-[var(--color-border)] bg-[var(--color-bg-light)]">
                <p className="text-[var(--color-text-light)] text-base font-medium leading-normal">Notes Created</p>
                <p className="text-[var(--color-text)] tracking-light text-2xl font-bold leading-tight">350</p>
              </div>
            </div>

            {/* Log Out Button */}
            <div className="flex px-4 py-6 justify-center sm:justify-end">
              <button className="btn-secondary flex min-w-[120px] max-w-[480px] items-center justify-center h-10 px-6 text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
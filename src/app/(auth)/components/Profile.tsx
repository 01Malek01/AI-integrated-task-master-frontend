import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { useCompletedTasksCount } from '@/app/hooks/api/task/useCompletedTasksCount';
import { useNotesCount } from '@/app/hooks/api/note/useNotesCount';
import Link from 'next/link';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
 const { data: completedTasksCount } = useCompletedTasksCount(); 
 const { data: notesCount } = useNotesCount();
 useEffect(() => {
   console.log( completedTasksCount, notesCount)
 }, [completedTasksCount, notesCount]);
    const handleLogout = async () => {
        try {
            await logout();
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
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
                    {user?.username[0]}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-[var(--color-text)] text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">{user?.username}</p>
                    <p className="text-[var(--color-primary-dark)] text-base font-normal leading-normal text-center">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Section */}
            <h2 className="text-[var(--color-text)] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Account</h2>
            <Link href="/reset-password" className="group flex items-center gap-4 bg-[var(--color-bg-light)] hover:bg-[var(--color-bg-dark)] px-4 min-h-14 justify-between cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:-translate-y-0.5 rounded-lg active:translate-y-0">
              <span className="text-[var(--color-text)] text-base font-normal leading-normal flex-1 truncate group-hover:text-[var(--color-primary)] transition-colors">
                Change Password
              </span>
              <div className="shrink-0 transform group-hover:translate-x-1 transition-transform">
                <ArrowRight size={20} className="text-[var(--color-text-light)] group-hover:text-[var(--color-primary)] transition-colors" />
              </div>
            </Link>
            <div className="group flex items-center gap-4 bg-[var(--color-bg-light)] hover:bg-[var(--color-bg-dark)] px-4 min-h-14 justify-between cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:-translate-y-0.5 rounded-lg active:translate-y-0">
              <p className="text-[var(--color-text)] text-base font-normal leading-normal flex-1 truncate group-hover:text-[var(--color-primary)] transition-colors">
                Update Personal Information
              </p>
              <div className="shrink-0 transform group-hover:translate-x-1 transition-transform">
                <ArrowRight size={20} className="text-[var(--color-text-light)] group-hover:text-[var(--color-primary)] transition-colors" />
              </div>
            </div>

            {/* Preferences Section */}
            <h2 className="text-[var(--color-text)] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Preferences</h2>
            <div className="group flex items-center gap-4 bg-[var(--color-bg-light)] hover:bg-[var(--color-bg-dark)] px-4 min-h-14 justify-between cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:-translate-y-0.5 rounded-lg active:translate-y-0">
              <p className="text-[var(--color-text)] text-base font-normal leading-normal flex-1 truncate group-hover:text-[var(--color-primary)] transition-colors">
                Theme Settings
              </p>
              <div className="shrink-0 transform group-hover:translate-x-1 transition-transform">
                <ArrowRight size={20} className="text-[var(--color-text-light)] group-hover:text-[var(--color-primary)] transition-colors" />
              </div>
            </div>
            <div className="group flex items-center gap-4 bg-[var(--color-bg-light)] hover:bg-[var(--color-bg-dark)] px-4 min-h-14 justify-between cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:-translate-y-0.5 rounded-lg active:translate-y-0">
              <p className="text-[var(--color-text)] text-base font-normal leading-normal flex-1 truncate group-hover:text-[var(--color-primary)] transition-colors">
                Notification Controls
              </p>
              <div className="shrink-0 transform group-hover:translate-x-1 transition-transform">
                <ArrowRight size={20} className="text-[var(--color-text-light)] group-hover:text-[var(--color-primary)] transition-colors" />
              </div>
            </div>

            {/* Activity Summary */}
            <h2 className="text-[var(--color-text)] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Activity Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              <div className="group flex flex-col gap-2 rounded-xl p-6 border border-[var(--color-border)] bg-[var(--color-bg-light)] hover:bg-[var(--color-bg-dark)] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-[var(--color-primary-light)]">
                <p className="text-[var(--color-text-light)] text-base font-medium leading-normal group-hover:text-[var(--color-primary)] transition-colors">Tasks Completed</p>
                <p className="text-[var(--color-text)] tracking-light text-2xl font-bold leading-tight group-hover:text-[var(--color-primary-dark)] transition-colors">{ 0}</p>
              </div>
              <div className="group flex flex-col gap-2 rounded-xl p-6 border border-[var(--color-border)] bg-[var(--color-bg-light)] hover:bg-[var(--color-bg-dark)] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-[var(--color-primary-light)]">
                <p className="text-[var(--color-text-light)] text-base font-medium leading-normal group-hover:text-[var(--color-primary)] transition-colors">Notes Created</p>
                <p className="text-[var(--color-text)] tracking-light text-2xl font-bold leading-tight group-hover:text-[var(--color-primary-dark)] transition-colors">{notesCount?.count || 0}</p>
              </div>
            </div>

            {/* Log Out Button */}
            <div className="flex px-4 py-6 justify-center sm:justify-end">
              <button 
                onClick={handleLogout} 
                className="group relative overflow-hidden flex min-w-[120px] max-w-[480px] items-center justify-center h-10 px-6 text-sm font-bold leading-normal tracking-[0.015em] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-error)] bg-transparent hover:bg-[var(--color-error-light)] transition-all duration-200"
              >
                <span className="cursor-pointer   relative z-10 truncate text-[var(--color-text)] group-hover:text-[var(--color-error)] transition-colors">
                  Log Out
                </span>
                <span className="absolute inset-0 bg-[var(--color-error)] opacity-0 group-hover:opacity-10 transition-opacity"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
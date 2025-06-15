import React from 'react';

const Landing: React.FC = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f9fbf9] group/design-root overflow-x-hidden" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuB-fCtrfRBh60ZnYTUpAxWwP_aEjhZ0AN7TIGoFMhi-zR0yEndTG1LuzkoJ0WJJLp0Yl3dOPFsiT_nOae8GCFkcxYFg5eWjakCVkTTQIAv3Lo8BzmtcskFVODPNS8p6c3mta77HPZdq8s6Y1HNT74qZfjqTTww-QdvVxVP49tO5MCGkOuGZYSIU3NLvNQT54ZChjgF6kHlFJFmglhYZCOsbH5W27QnM5Ex64UtmV9lx9lnG3OULZmtOM0dZ6d_Uc7bRaC6VMXtFsVc")'
                  }}
                >
                  <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                      Organize Your Life with TaskMaster
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      TaskMaster is your all-in-one solution for managing notes and tasks efficiently. Boost your productivity with our AI-powered features.
                    </h2>
                  </div>
                  <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#8cd279] text-[#121810] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                  >
                    <span className="truncate">Get Started</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 px-4 py-10 @container">
              <div className="flex flex-col gap-4">
                <h1 className="text-[#121810] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                  Key Features
                </h1>
                <p className="text-[#121810] text-base font-normal leading-normal max-w-[720px]">
                  TaskMaster offers a range of features designed to enhance your productivity and organization.
                </p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#d7e2d4] bg-[#f9fbf9] p-4 flex-col">
                  <div className="text-[#121810]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm8,40h64a8,8,0,0,0,0,16H96a8,8,0,0,0,0,16Zm32,16H96a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#121810] text-base font-bold leading-tight">Smart Task Prioritization</h2>
                    <p className="text-[#668a5c] text-sm font-normal leading-normal">
                      Our AI algorithms prioritize your tasks based on urgency and importance, ensuring you focus on what matters most.
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#d7e2d4] bg-[#f9fbf9] p-4 flex-col">
                  <div className="text-[#121810]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M88,96a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,96Zm8,40h64a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16Zm32,16H96a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM224,48V156.69A15.86,15.86,0,0,1,219.31,168L168,219.31A15.86,15.86,0,0,1,156.69,224H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM48,208H152V160a8,8,0,0,1,8-8h48V48H48Zm120-40v28.7L196.69,168Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#121810] text-base font-bold leading-tight">Intelligent Note Organization</h2>
                    <p className="text-[#668a5c] text-sm font-normal leading-normal">
                        TaskMaster intelligently categorizes and organizes your notes, making it easy to find what you need, when you need it.
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#d7e2d4] bg-[#f9fbf9] p-4 flex-col">
                  <div className="text-[#121810]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#121810] text-base font-bold leading-tight">Seamless Collaboration</h2>
                    <p className="text-[#668a5c] text-sm font-normal leading-normal">Collaborate with team members or friends in real-time, sharing notes and tasks effortlessly.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 px-4 py-10 @container">
              <div className="flex flex-col gap-4">
                <h1 className="text-[#121810] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                  AI-Powered Productivity
                </h1>
                <p className="text-[#121810] text-base font-normal leading-normal max-w-[720px]">Leverage the power of AI to take your productivity to the next level.</p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBiA3ue2IhGohoMidW67-oYn6BBr8wrIDNkopermdi-YHWFm6KkxMehgUQG22r2x_-lpeNVjQxgJWQmye_1c4FZnO5Ow0Ot5GBWk8OrgZ_oE5W-dMiNGt9VlnLolnxqVSeug3hDYBLY9Br7EI0g3bR6n3Gv4NbACabtXMLZ8PbvMVrkGk787MgTScCSLfazs6mAO8cVKzHOrqflwzkYl1NS3VusWqRRe-XKNAjdQCi1Mt8yOwTVbEv44cQZpIAI_Xd9b__M1b2JVFY")' }}
                  ></div>
                  <div>
                    <p className="text-[#121810] text-base font-medium leading-normal">AI Task Suggestions</p>
                    <p className="text-[#668a5c] text-sm font-normal leading-normal">Get AI-powered suggestions for new tasks based on your notes and schedule.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAR7_az4aanMUdW9dvebFrlIo5MyvODGzAH8IYz4EW5kFxVtKVx1Bv4p9RtfcumvfIyPhVLHLV6axZYnu6sZKD2R2m6lFrqUhE7HFIDvB-ysDNySBF54iR5h4qPD0Jl7UpQYJOBDi0noB1RpXfrDW4Tr1GwwFvy0Ud8fkiOSINcYT9BrzGPf1nl9pTQNi7OoS57J0X6HP8lyAgembiYAqOJGzrmjuKt70P6QkTsZSoH0usJv7OaNjKPCdPt3OclYAOeRcQlGPX5Ifk")' }}
                  ></div>
                  <div>
                    <p className="text-[#121810] text-base font-medium leading-normal">Smart Scheduling</p>
                    <p className="text-[#668a5c] text-sm font-normal leading-normal">Our AI helps you schedule tasks efficiently, optimizing your time and resources.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBaztn6dsyj2Bc5Y7k9qwZrTDzKYa5ycseMwaOdYJ8iKdHRq0MCm75dQQmnUbbeIYr06BelBE7BwaRoAckgAZsqM0c4cwLNKldbNmYGuBFvjCzkRjAUBpCtDMVAY8Pv6q4uLeotcQDHrPRBZ-eDTAgbztvWVsx_q8UPR2IbesG1OL-waDMmV_eY67ok9dY91i-lyDPKUVAEOeZ022dHltPDQ-52lfhZ-s3lJzhfWF849TeLEOXflknZehCtqWewEOvkFQtcCVGiNZE")' }}
                  ></div>
                  <div>
                    <p className="text-[#121810] text-base font-medium leading-normal">Intelligent Note Summaries</p>
                    <p className="text-[#668a5c] text-sm font-normal leading-normal">Automatically summarize long notes and articles, saving you time and effort.</p>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-[#121810] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">User Testimonials</h2>
            <div className="flex flex-col gap-8 overflow-x-hidden bg-[#f9fbf9] p-4">
              <div className="flex flex-col gap-3 bg-[#f9fbf9]">
                <div className="flex items-center gap-3">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBNPaxZiDfJ8KwXhUfvxD80UMI01hzsE-JMR7Bzmeevbs2s36yWbYifFBDvuPwJE13Dh7t8oJ2uVqLTR8lSTYyLfkTAB41YxD1m4Sd-SPC3UDIdiShN1S03-zUZR9uWn1nY1SVHWEcgEcGTVt2nzvEmuFMLhkNpxGhPpe7FT0Vwql7a_JEJ_tYqGUJ7v6cEFXVgn-0qXec8v48SS78Jwgk7rpSzsaUG-nSxd_WElDXdahCLvveZ8atI_eIvlPLB2DgH5AwM2N6qJL4")' }}
                  ></div>
                  <div className="flex-1">
                    <p className="text-[#121810] text-base font-medium leading-normal">Sophia Carter</p>
                    <p className="text-[#668a5c] text-sm font-normal leading-normal">2023-09-15</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#8cd279" viewBox="0 0 256 256">
                      <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-[#121810] text-base font-normal leading-normal">
                  NoteWise has completely transformed the way I manage my projects. The AI-powered task prioritization is a game-changer!
                </p>
                <div className="flex gap-9 text-[#668a5c]">
                  <button className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path>
                    </svg>
                    <p>12</p>
                  </button>
                  <button className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z"></path>
                    </svg>
                    <p>2</p>
                  </button>
                </div>
              </div>
              {/* Additional testimonials would go here */}
            </div>
            <h2 className="text-[#121810] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Pricing Plans</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(228px,1fr))] gap-2.5 px-4 py-3 @3xl:grid-cols-4">
              <div className="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-[#d7e2d4] bg-[#f9fbf9] p-6">
                <div className="flex flex-col gap-1">
                  <h1 className="text-[#121810] text-base font-bold leading-tight">Basic</h1>
                  <p className="flex items-baseline gap-1 text-[#121810]">
                    <span className="text-[#121810] text-4xl font-black leading-tight tracking-[-0.033em]">Free</span>
                    <span className="text-[#121810] text-base font-bold leading-tight">/month</span>
                  </p>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#ebf1ea] text-[#121810] text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Get Started</span>
                </button>
                <div className="flex flex-col gap-2">
                  {['Basic task management', 'Note-taking', 'Limited collaboration'].map((feature, i) => (
                    <div key={i} className="text-[13px] font-normal leading-normal flex gap-3 text-[#121810]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-[#d7e2d4] bg-[#f9fbf9] p-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h1 className="text-[#121810] text-base font-bold leading-tight">Pro</h1>
                    <p className="text-[#121810] text-xs font-medium leading-normal tracking-[0.015em] rounded-full bg-[#8cd279] px-3 py-[3px] text-center">Recommended</p>
                  </div>
                  <p className="flex items-baseline gap-1 text-[#121810]">
                    <span className="text-[#121810] text-4xl font-black leading-tight tracking-[-0.033em]">$9.99</span>
                    <span className="text-[#121810] text-base font-bold leading-tight">/month</span>
                  </p>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#ebf1ea] text-[#121810] text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Upgrade</span>
                </button>
                <div className="flex flex-col gap-2">
                  {['Advanced task prioritization', 'Intelligent note organization', 'Unlimited collaboration', 'AI-powered suggestions'].map((feature, i) => (
                    <div key={i} className="text-[13px] font-normal leading-normal flex gap-3 text-[#121810]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-[#d7e2d4] bg-[#f9fbf9] p-6">
                <div className="flex flex-col gap-1">
                  <h1 className="text-[#121810] text-base font-bold leading-tight">Team</h1>
                  <p className="flex items-baseline gap-1 text-[#121810]">
                    <span className="text-[#121810] text-4xl font-black leading-tight tracking-[-0.033em]">$19.99</span>
                    <span className="text-[#121810] text-base font-bold leading-tight">/month</span>
                  </p>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#ebf1ea] text-[#121810] text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Contact Us</span>
                </button>
                <div className="flex flex-col gap-2">
                  {['All Pro features', 'Team management tools', 'Dedicated support'].map((feature, i) => (
                    <div key={i} className="text-[13px] font-normal leading-normal flex gap-3 text-[#121810]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
     
      </div>
    </div>
  );
};

export default Landing
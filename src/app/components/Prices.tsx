'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import useGetPlans from '../hooks/api/payment/useGetPlans';
import { Plan } from '../../../types';
import useCreateCheckoutSession from '../hooks/api/payment/useCreateCheckoutSession';
import { useAuth } from '@/providers/auth-provider';

export default function Prices( {className}: {className?: string}) {
  const { data, isLoading, error, refetch } = useGetPlans();
  const { user } =useAuth();
  const [ plans, setPlans ] = React.useState<Plan[]>([]);
  const { createCheckoutSession } = useCreateCheckoutSession();

   useEffect(() => {
    if (data) {
      setPlans(data);
    }
  }, [data]);
 
  const handleUpgrade = async (plan: Plan) => {
    try {
      const sessionUrl = await createCheckoutSession(plan._id);
      console.log('sessionUrl',sessionUrl)
      if( sessionUrl ) {
        window.location.href = sessionUrl;
      }
    } catch (err) {
       console.error(err);
    }
  }
  return (
    <div className={`grid grid-cols-[repeat(auto-fit,minmax(228px,1fr))] gap-2.5 px-4 py-3 @3xl:grid-cols-4 ${className}`}>
      {plans.map((plan) => (
        <div key={plan._id} className="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-[var(--color-border)] bg-[var(--color-bg-light)] p-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-[var(--color-text)] text-base font-bold leading-tight">{plan.plan}</h1>
            <p className="flex items-baseline gap-1 text-[var(--color-text)]">
              <span className="text-[var(--color-text)] text-4xl font-black leading-tight tracking-[-0.033em]">
                {plan.price === 0 ? 'Free' : `$${plan.price}`}
              </span>
              <span className="text-[var(--color-text)] text-base font-bold leading-tight">/{plan.duration}</span>
            </p>
          </div>
          <button 
            disabled={user?.isSubscribed && user.subscriptionType === plan.plan} 
            onClick={() => handleUpgrade(plan)} 
            className={`${
              user?.isSubscribed && user.subscriptionType === plan.plan 
                ? 'bg-[var(--color-primary-light)] cursor-not-allowed' 
                : 'hover:bg-[var(--color-primary-light)] cursor-pointer'
            } flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[var(--color-bg-lighter)] text-[var(--color-text)] text-sm font-bold leading-normal tracking-[0.015em]`}
          >
            {user?.isSubscribed && user.subscriptionType === plan.plan ? 'Subscribed' : plan.price === 0 ? 'Get Started' : 'Upgrade'}
          </button>
          <div className="flex flex-col gap-2">
            {plan.description.split(',').map((feature, i) => (
              <div key={i} className="text-[13px] font-normal leading-normal flex gap-3 text-[var(--color-text)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                </svg>
                {feature.trim()}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

'use client';

import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700 mb-6">
          You don't have permission to access this page.
        </p>
          <Link href="/">
        <button  type="button"  className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
            Return to Home
        </button>
          </Link>
      </div>
    </div>
  );
}

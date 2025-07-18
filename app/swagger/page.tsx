'use client';

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import Link from 'next/link';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function SwaggerPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-5xl mb-4">
        <Link href="/" className="text-blue-700 hover:underline text-sm">&larr; Home</Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-blue-800">API Documentation</h1>
      <div className="w-full max-w-5xl bg-white rounded shadow p-4">
        <SwaggerUI url="/api/swagger" />
      </div>
    </div>
  );
}

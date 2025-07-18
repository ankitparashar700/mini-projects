'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-calendar/dist/Calendar.css';
import type { CalendarProps } from 'react-calendar';
import Link from 'next/link';

const Calendar = dynamic<CalendarProps>(() => import('react-calendar'), { ssr: false });

export default function CalendarPreviewer() {
  const [date, setDate] = useState<Date | [Date, Date] | null>(new Date());

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-2">
      <div className="w-full max-w-md mb-4">
        <Link href="/" className="text-blue-700 hover:underline text-sm">&larr; Home</Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Calendar Previewer</h1>
      <div className="bg-white rounded shadow p-6 flex flex-col items-center">
        <Calendar onChange={(value) => setDate(value as Date | [Date, Date] | null)} value={date} />
        <div className="mt-4 text-gray-700">
          <span className="font-semibold">Selected date:</span>{' '}
          {Array.isArray(date) && date.length === 2
            ? `${date[0]?.toLocaleDateString()} - ${date[1]?.toLocaleDateString()}`
            : date
              ? (date as Date).toLocaleDateString()
              : 'No date selected'}
        </div>
      </div>
    </div>
  );
} 

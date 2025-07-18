import { NextResponse } from 'next/server';

const events = [
  { id: 1, name: 'Webinar', date: '2024-07-01', location: 'Online' },
  { id: 2, name: 'Conference', date: '2024-08-15', location: 'New York' },
  { id: 3, name: 'Meetup', date: '2024-09-10', location: 'San Francisco' },
];

export async function GET() {
  return NextResponse.json(events);
} 
import { NextResponse } from 'next/server';

const messages = [
  { id: 1, user: 'Alice', message: 'Hello!' },
  { id: 2, user: 'Bob', message: 'Hi Alice!' },
  { id: 3, user: 'Alice', message: 'How are you?' },
  { id: 4, user: 'Bob', message: 'I am good, thanks!' },
];

export async function GET() {
  return NextResponse.json(messages);
} 
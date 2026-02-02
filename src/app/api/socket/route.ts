import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // Simple response for now - WebSocket implementation will come later
  return NextResponse.json({ 
    message: "WebSocket endpoint - implementation pending",
    status: "placeholder" 
  });
}

export async function POST() {
  return NextResponse.json({ 
    message: "WebSocket endpoint - implementation pending",
    status: "placeholder" 
  });
}

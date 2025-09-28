import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const ids = searchParams.get('ids') || 'bitcoin,ethereum'

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
  const response = await fetch(url)

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch prices' },
      { status: response.status, headers: corsHeaders }
    )
  }

  const data = await response.json()

  return NextResponse.json(data, { headers: corsHeaders })
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

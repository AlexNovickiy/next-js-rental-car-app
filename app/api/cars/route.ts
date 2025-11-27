import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const params = new URLSearchParams();
  searchParams.forEach((value, key) => {
    params.append(key, value);
  });

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/cars?${params.toString()}`
    );

    if (response.status !== 200) {
      return NextResponse.json(
        { error: 'Failed to fetch cars' },
        { status: response.status }
      );
    }

    const data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

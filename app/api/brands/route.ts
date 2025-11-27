import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/brands`
    );

    if (response.status !== 200) {
      return NextResponse.json(
        { error: 'Failed to fetch brands' },
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

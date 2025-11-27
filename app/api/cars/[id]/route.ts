import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

type CarInfoParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: CarInfoParams) {
  const { id } = await params;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`
    );
    if (!response.status || response.status !== 200) {
      return NextResponse.json(
        { error: 'Failed to fetch car data' },
        { status: response.status }
      );
    }
    const car = response.data;
    return NextResponse.json(car, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while fetching car data' },
      { status: 500 }
    );
  }
}

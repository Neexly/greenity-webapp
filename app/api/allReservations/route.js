import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const allReservations = await prisma.reservation.findMany();

  if (!allReservations) {
    return new NextResponse(null, { status: 204 });
  }

  return NextResponse.json(allReservations);
}

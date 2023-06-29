import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";
import { DateTime } from "luxon";

export async function GET() {
  const now = DateTime.local();

  const currentReservation = await prisma.reservation.findFirst({
    where: {
      startDate: { lte: now.toISO() },
      endDate: { gte: now.toISO() },
    },
  });

  if (!currentReservation) {
    return NextResponse.json({
      imageUrl:
        "https://res.cloudinary.com/ddbzkz1of/image/upload/v1687923888/Greenity_ggoiqh.png",
    });
  }

  return NextResponse.json(currentReservation);
}

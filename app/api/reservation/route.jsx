import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

import getCurrentUser from "../../actions/getCurrentUser";

export async function POST(request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();

  const { panelName, startDate, endDate, imageUrl } = body;

  if (!panelName || !startDate || !endDate || !imageUrl) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const userAndReservation = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      reservations: {
        create: {
          panelName,
          startDate,
          endDate,
          imageUrl,
        },
      },
    },
  });

  return NextResponse.json(userAndReservation);
}

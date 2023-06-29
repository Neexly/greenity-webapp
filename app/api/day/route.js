import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";
import { DateTime } from "luxon";

export async function GET(req, res) {
  // const { selectedDate } = req.body;

  console.log("==============");
  // console.log(selectedDate);
  console.log("==============");
  try {
    // Définir la date du 30 juin 2023
    const selectedDate = DateTime.fromISO("2023-06-30");

    // Définir la plage horaire pour la journée sélectionnée
    const startOfDay = selectedDate.startOf("day").toISO();
    const endOfDay = selectedDate.endOf("day").toISO();

    const reservations = await prisma.reservation.findMany({
      where: {
        startDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    const responseData = JSON.stringify(reservations);

    return new NextResponse(responseData, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("ERREUR PRISMA", error);
    return new NextResponse(
      JSON.stringify({
        error: "Erreur lors de la récupération des réservations",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

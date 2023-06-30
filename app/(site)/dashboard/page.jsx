"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

import NavDashboard from "../../components/nav/navDashboard";
import Restricted from "../../components/restricted";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [nextUserReservations, setNextUserReservations] = useState([]);

  useEffect(() => {
    if (session && session.user) {
      let userId = session.user.id;
      axios.get("/api/allReservations").then((response) => {
        const reservations = response.data;
        const filteredReservations = reservations.filter((reservation) => {
          if (
            reservation.hasOwnProperty("userId") &&
            String(userId) === String(reservation.userId) &&
            new Date(reservation.endDate) > new Date()
          ) {
            return true;
          }
          return false;
        });
        setNextUserReservations(filteredReservations);
      });
    }
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <>
        <div className="min-h-full">
          <NavDashboard />
          <Restricted />
        </div>
      </>
    );
  } else {
    function renderNoReservations() {
      return (
        <>
          <div className="min-h-full">
            <NavDashboard />
            <main>
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Happy to see you!
                  </h2>
                  <p className="mt-4 text-gray-500">
                    You have no upcoming reservations. You can make a maximum of
                    two reservations.
                  </p>
                  <button
                    onClick={() => router.push("/panels")}
                    type="submit"
                    className="mt-10 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Find a panel
                  </button>
                </div>
              </div>
            </main>
          </div>
        </>
      );
    }

    function renderSingleReservation() {
      return (
        <>
          <div className="min-h-full">
            <NavDashboard />
            <main>
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Happy to see you!
                  </h2>
                  <p className="mt-4 text-gray-500">
                    You have one upcoming reservation. You can make a maximum of
                    two reservations.
                  </p>
                  <ul role="list" className="mt-4 divide-y divide-gray-100">
                    {nextUserReservations.map((reservation) => (
                      <li
                        key={reservation.id}
                        className="flex justify-between gap-x-6 py-5"
                      >
                        <div className="flex gap-x-4">
                          <a target="_blank" href={reservation.imageUrl}>
                            <img
                              className="max-h-12 flex-none rounded-2 bg-gray-50"
                              src={reservation.imageUrl}
                              alt=""
                            />
                          </a>
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {reservation.panelName}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {reservation.startDate}
                            </p>
                          </div>
                        </div>
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            Advertising on display soon
                          </p>
                          <p className="mt-1 text-xs leading-5 text-gray-500">
                            Created at:{" "}
                            <time dateTime={reservation.createdAt}>
                              {reservation.createdAt}
                            </time>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => router.push("/panels")}
                    type="submit"
                    className="mt-10 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Find a panel
                  </button>
                </div>
              </div>
            </main>
          </div>
        </>
      );
    }

    function renderMultipleReservations() {
      return (
        <>
          <div className="min-h-full">
            <NavDashboard />
            <main>
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Happy to see you!
                  </h2>
                  <p className="mt-4 text-gray-500">
                    You have 2 upcoming reservations. You have reached the
                    maximum number of reservations per user.
                  </p>
                  <ul role="list" className="mt-4 divide-y divide-gray-100">
                    {nextUserReservations.map((reservation) => (
                      <li
                        key={reservation.id}
                        className="flex justify-between gap-x-6 py-5"
                      >
                        <div className="flex gap-x-4">
                          <a target="_blank" href={reservation.imageUrl}>
                            <img
                              className="max-h-12 flex-none rounded-2 bg-gray-50"
                              src={reservation.imageUrl}
                              alt=""
                            />
                          </a>
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {reservation.panelName}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {reservation.startDate}
                            </p>
                          </div>
                        </div>
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            Advertising on display soon
                          </p>
                          <p className="mt-1 text-xs leading-5 text-gray-500">
                            Created at:{" "}
                            <time dateTime={reservation.createdAt}>
                              {reservation.createdAt}
                            </time>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </main>
          </div>
        </>
      );
    }

    console.log(nextUserReservations);

    if (nextUserReservations.length === 0) {
      return renderNoReservations();
    } else if (nextUserReservations.length === 1) {
      return renderSingleReservation();
    } else {
      return renderMultipleReservations();
    }
  }
}

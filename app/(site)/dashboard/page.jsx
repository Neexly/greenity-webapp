"use client";

import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NavDashboard from "../../components/nav/navDashboard";
import Restricted from "../../components/restricted";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

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
  }

  return (
    <>
      <div className="min-h-full">
        <NavDashboard />

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Happy to see you !
              </h2>

              <p>You have no advertisements currently displayed.</p>

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

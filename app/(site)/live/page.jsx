"use client";

import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NavLive from "../../components/nav/navLive";
import Restricted from "../../components/restricted";

export default function Panels() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <>
        <div className="min-h-full">
          <NavLive />
          <Restricted />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-full">
        <NavLive />

        <header className="bg-white shadow"></header>
        <main>
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              <div className="group relative">
                <div className="min-h-80 aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 lg:h-80">
                  <img
                    src="https://res.cloudinary.com/ddbzkz1of/image/upload/v1687928803/cczvyi0bmne1npadot1h.jpg"
                    alt="Campus de l'Arche"
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="flex justify-between">
                  <div>
                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
                      Campus de l'Arche
                    </h2>
                    <a
                      href="/live/campus-de-larche"
                      target="_blank"
                      className="flex mt-4 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Watch live
                    </a>
                  </div>
                </div>
              </div>

              {/* <!-- More products... --> */}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

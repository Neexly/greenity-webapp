"use client";

import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NavPanels from "../../components/nav/navPanels";
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
          <NavPanels />
          <Restricted />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-full">
        <NavPanels />

        <header className="bg-white shadow">
          {/* <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              All our panels
            </h1>
          </div> */}
        </header>
        <main>
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Here are the panels available on our network
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {/* {panels?.map((panel) => (
                <PanelCard key={panel.id} data={panel} />
              ))} */}

              <div
                className="group relative"
                onClick={() => router.push("/panels/campus-de-larche")}
              >
                <div className="min-h-80 aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                  <img
                    src="https://res.cloudinary.com/ddbzkz1of/image/upload/v1687928803/cczvyi0bmne1npadot1h.jpg"
                    alt="Campus de l'Arche"
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0"
                        ></span>
                        Campus de l'Arche
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Average price per minute
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">0,00€</p>
                </div>
              </div>

              <div
                className="group relative"
                onClick={() => router.push("/panels/campus-de-larche")}
              >
                <div className="min-h-80 aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                  <img
                    src="https://res.cloudinary.com/ddbzkz1of/image/upload/v1686284967/borne-greenity-6_jcqxwe.jpg"
                    alt="Fictitious panel one"
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0"
                        ></span>
                        Fictitious panel one
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Average price per minute
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">0,00€</p>
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

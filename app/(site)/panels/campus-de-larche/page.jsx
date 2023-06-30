"use client";

import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NavPanels from "../../../components/nav/navPanels";
import Restricted from "../../../components/restricted";

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

        <div className="bg-white">
          <div className="pt-6">
            {/* <!-- Image gallery --> */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src="https://res.cloudinary.com/ddbzkz1of/image/upload/v1687928803/cczvyi0bmne1npadot1h.jpg"
                  alt="Two each of gray, white, and black shirts laying flat."
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                {/* <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src="https://res.cloudinary.com/ddbzkz1of/image/upload/v1688094083/logo_iim_fd_couleur_ovc35v.jpg"
                    alt="Model wearing plain black basic tee."
                    className="h-full w-full object-cover object-center"
                  />
                </div> */}
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src="https://res.cloudinary.com/ddbzkz1of/image/upload/v1688094089/logo_pulv_cirnbi.png"
                    alt="Model wearing plain gray basic tee."
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  src="https://res.cloudinary.com/ddbzkz1of/image/upload/v1687929497/campus-de-larche-2_f9mjn2.jpg"
                  alt="Model wearing plain white basic tee."
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* <!-- Product info --> */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Campus de l'Arche
                </h1>
              </div>

              {/* <!-- Options --> */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  0,00€ / minute
                </p>

                <button
                  type="submit"
                  onClick={() =>
                    router.push("/panels/campus-de-larche/reservation")
                  }
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-700 px-8 py-3 text-base font-medium text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Choose this panel
                </button>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* <!-- Description and details --> */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      This magnificent billboard right in the middle of
                      Nanterre's town square is an ideal marketing tool. It's
                      close to the "Les 4 Temps" shopping center, making it one
                      of our most popular billboards throughout France. Whether
                      you're a freelancer, a small business, or an official at
                      the town hall, don't hesitate to book this billboard! We
                      offer attractive opening rates.
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    Highlights
                  </h3>

                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      <li className="text-gray-400">
                        <span className="text-gray-600">A lot of traffic</span>
                      </li>
                      <li className="text-gray-400">
                        <span className="text-gray-600">
                          Close to shopping centers
                        </span>
                      </li>
                      <li className="text-gray-400">
                        <span className="text-gray-600">
                          Seen by people who are comfortable
                        </span>
                      </li>
                      <li className="text-gray-400">
                        <span className="text-gray-600">Large panel</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">
                      This magnificent billboard right in the middle of
                      Nanterre's town square is an ideal marketing tool. It's
                      close to the "Les 4 Temps" shopping center, making it one
                      of our most popular billboards throughout France. Whether
                      you're a freelancer, a small business, or an official at
                      the town hall, don't hesitate to book this billboard! We
                      offer attractive opening rates. This magnificent billboard
                      right in the middle of Nanterre's town square is an ideal
                      marketing tool. It's close to the "Les 4 Temps" shopping
                      center, making it one of our most popular billboards
                      throughout France. Whether you're a freelancer, a small
                      business, or an official at the town hall, don't hesitate
                      to book this billboard! We offer attractive opening rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

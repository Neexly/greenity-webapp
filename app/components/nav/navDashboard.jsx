"use client";

import { useRouter } from "next/navigation";

const NavDashboard = () => {
  const router = useRouter();
  return (
    <>
      <nav className="bg-emerald-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://res.cloudinary.com/ddbzkz1of/image/upload/v1688097022/logo-blanc-greenity_gt2zsi.png"
                  alt="Logo Greenity"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    onClick={() => router.push("/dashboard")}
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white cursor-pointer"
                    aria-current="page"
                  >
                    Dashboard
                  </a>
                  <a
                    onClick={() => router.push("/panels")}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                  >
                    All our panels
                  </a>
                  <a
                    onClick={() => router.push("/live")}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                  >
                    Watch live
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <a
              onClick={() => router.push("/dashboard")}
              className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white cursor-pointer"
              aria-current="page"
            >
              Dashboard
            </a>
            <a
              onClick={() => router.push("/panels")}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
            >
              All our panels
            </a>
            <a
              onClick={() => router.push("/live")}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
            >
              Watch live
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavDashboard;

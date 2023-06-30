"use client";

// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/route";
// import User from "./components/user";

import { useRouter } from "next/navigation";

import NavNeutre from "../app/components/nav/navNeutre";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="min-h-full">
        <NavNeutre />
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">WELCOME</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Greenity
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Start publishing your ads now.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/login"
                className="rounded-md bg-emerald-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </a>
              <a
                href="/register"
                className="text-sm font-semibold text-gray-900"
              >
                Create an account <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// export default async function Home() {
//   const session = await getServerSession(authOptions);

//   return (
//     <section>
//       <h1>Home</h1>
//       <br />
//       <h3>Server Side Rendered</h3>
//       <p>{JSON.stringify(session)}</p>
//       <br />
//       <h3>Client Side Rendered</h3>
//       <User />
//     </section>
//   );
// }

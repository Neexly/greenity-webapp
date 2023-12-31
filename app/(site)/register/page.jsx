"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const registerUser = async (e) => {
    e.preventDefault();
    axios
      .post("/api/register", data)
      .then(() => toast.success("User has been registered !"))
      .catch(() => toast.error("An error occured !"));
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://res.cloudinary.com/ddbzkz1of/image/upload/v1688097022/logo-couleur-greenity_w3w8tg.png"
            alt="Logo Greenity"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register for an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={registerUser}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-emerald-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>

            <div>
              <button
                onClick={() => signIn("github")}
                className="flex w-full justify-center items-center rounded-md bg-slate-100 px-3 py-1.5 text-sm leading-6 text-black shadow-sm hover:bg-slate-300"
              >
                <img
                  src="https://res.cloudinary.com/ddbzkz1of/image/upload/v1688094102/gituhub-logo_qicbjs.png"
                  alt="Logo GitHub"
                  className="w-5 h-5 mr-2"
                ></img>
                Register with GitHub
              </button>
            </div>

            <div>
              <button
                onClick={() => signIn("google")}
                className="flex w-full justify-center items-center rounded-md bg-slate-100 px-3 py-1.5 text-sm leading-6 text-black shadow-sm hover:bg-slate-300"
              >
                <img
                  src="https://res.cloudinary.com/ddbzkz1of/image/upload/v1688094102/google-logo_ll2mwi.png"
                  alt="Logo Google"
                  className="w-5 h-5 mr-2"
                ></img>
                Register with Google
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member ?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-emerald-700 hover:text-emerald-600"
            >
              Login to my account
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

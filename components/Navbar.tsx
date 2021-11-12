import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

interface Props {
  user: string;
}

const Navbar: React.FC<Props> = (props: Props) => {
  const { user } = useUser();

  return (
    <>
      <nav className="flex justify-between p-5 bg-blue-400 text-white">
        <Link href="/homepage">
          <a className="flex flex-row hover:text-black duration-300 font-mono">
            Home{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </a>
        </Link>
        <div className="hover:text-black duration-300 font-mono">
          {!user && (
            <Link href="/api/auth/login">
              <a className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Login
              </a>
            </Link>
          )}
          {user && (
            <>
              {/* <Image src={user.picture} alt={user.name} /> */}
              <Link href="api/auth/logout">
                <a className="flex flex-row">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </a>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

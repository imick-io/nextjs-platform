"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const Header = () => {
  const searchParams = useSearchParams();
  console.log(searchParams.getAll("host"));

  return (
    <header>
      <nav>
        <ul className="flex space-x-2">
          <li>
            <Link href="/" className="btn btn-primary">
              Marketing Website
            </Link>
          </li>
          <li>
            <Link href="/" className="btn btn-accent">
              Application website
            </Link>
          </li>
          <li>
            <Link href="http://" className="btn btn-error">
              Demo Tenant website
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

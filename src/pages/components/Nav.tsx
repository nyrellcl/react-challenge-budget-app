import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Nav(): JSX.Element {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <>
      <header className="header-bar">
        <nav className="nav-bar">
          <Link href="/">
          <svg
            width="50"
            height="50"
            viewBox="0 0 72 48"
            xmlns="http://www.w3.org/2000/svg"
            className="logo"
          >
            <g fill="none" fillRule="evenodd">
              <circle fill="#382314" cx="48" cy="24" r="24" />
              <circle stroke="#FFF" strokeWidth="2" cx="24" cy="24" r="23" />
            </g>
          </svg>
          </Link>
          

          <div
            className="nav-bar__icon"
            onClick={() => setIsClicked(!isClicked)}
          >
            {!isClicked ? (
              <FaBars className="nav-bar__icon" />
            ) : (
              <FaTimes className="nav-bar__icon" />
            )}
          </div>
          <ul className={!isClicked ? "nav-bar__list" : "nav-bar__list active"}>
            <li>
              <Link href="/Investing">Investing</Link>
            </li>
            <li>
              <Link href="/PersonalFinance">Personal Finance</Link>
            </li>
            <li>
              <Link href="/Budgeting">Budgeting</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}


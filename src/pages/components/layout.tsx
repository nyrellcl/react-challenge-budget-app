import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Nav() {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <>
      <header className="header-bar">
        <nav className="nav-bar">
            <svg
              width="50"
              height="50"
              viewBox="0 0 72 48"
              xmlns="http://www.w3.org/2000/svg"
              className="nav-bar__logo"
            >
              <g fill="none" fill-rule="evenodd">
                <circle fill="#382314" cx="48" cy="24" r="24" />
                <circle stroke="#FFF" stroke-width="2" cx="24" cy="24" r="23" />
              </g>
            </svg>

          <div
            className="nav-bar__icon"
            onClick={() => setIsClicked(!isClicked)}
          >
            {!isClicked ? <FaBars  className="nav-bar__icon" /> : <FaTimes className="nav-bar__icon" />}
          </div>
          <ul className={!isClicked ? "nav-bar__list" : "nav-bar__list active"}>
            <li>
              <Link href="/investing">Investing</Link>
            </li>
            <li>
              <Link href="/personal-finance">Personal Finance</Link>
            </li>
            <li>
              <Link href="/budgeting">Budgeting</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

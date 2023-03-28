import React from 'react'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="footer-section">
      <svg
        width="50"
        height="50"
        viewBox="0 0 72 48"
        xmlns="http://www.w3.org/2000/svg"
        className="logo"
      >
        <g fill="none" fillRule="evenodd">
          <circle fill="#EC755D" cx="48" cy="24" r="24" />
          <circle stroke="#FFF" strokeWidth="2" cx="24" cy="24" r="23" />
        </g>
      </svg>
      <nav>
        <ul className="footer-list">
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
    </footer>
  )
}

export default Footer
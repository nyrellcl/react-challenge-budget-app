import Link from "next/link"
import { useState } from "react"
import{ FaBars, FaTimes} from 'react-icons/fa'

export default function Nav (){
    const [isClicked, setIsClicked] = useState<boolean>(false)

    return(
        <>
        <header className="header-bar">
            <nav className="nav-bar">
                <div className="nav-bar__icon" onClick={() => setIsClicked(!isClicked)}>{!isClicked ? <FaBars/> : <FaTimes/>}</div>
                <ul className={!isClicked? "nav-bar__list" : "nav-bar__list active"}>
                   <li><Link href="/investing">Investing</Link></li> 
                   <li><Link href="/personal-finance">Personal Finance</Link></li>
                   <li><Link href="/budgeting">Budgeting</Link></li>
                </ul>
            </nav>
        </header>
        </>
    )
}
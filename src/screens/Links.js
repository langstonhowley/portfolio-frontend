import { Link, Outlet } from "react-router-dom";
import './Links.css'

export default function Links() {
  return (
    <>
      <nav className="links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/resume">Online Resume</Link>
          </li>
          <li>
            <Link to="https://linktr.ee/abg.net.music">Music</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

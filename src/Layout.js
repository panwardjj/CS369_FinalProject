import { Outlet, Link } from "react-router-dom";
import './App.css'

export const Layout = () => {
    return <>
    <nav>
      <ul>
        <li>
          <Link to="/">Product List</Link>
        </li>
        <li>
          <Link to="/page2">Page2</Link>
        </li>
        <li>
          <Link to="/page3">Page3</Link>
        </li>
      </ul>
    </nav>

    <Outlet />
  </>
}
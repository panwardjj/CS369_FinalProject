import { Outlet, Link, NavLink } from "react-router-dom";
import './App.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { ModalLogin } from "./pages/ModalLogin"


export const Layout = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false)
  console.log("🚀 ~ Layout ~ isLogin:", isLogin)
  const [modalLoginOpen, setModalLoginOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('user')
    navigate('/')
    window.location.reload();
  }

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
        setIsLogin(true)
    }
  },[])
  
    return <>
    <nav>
      <Link to="/" className="title">
        GADGET STORE
      </Link>
      <ul>
        <li>
          <NavLink to="/catalogue">Home</NavLink>
        </li>
        <li>
          {isLogin &&
            <button className="btn-logout" onClick={logout}>Log out</button>
          } 
          {!isLogin &&
            <button className="btn-login" onClick={() => setModalLoginOpen(true)}>Log in</button>
          }
           {modalLoginOpen && 
            <ModalLogin 
                closeModal={() => {
                    setModalLoginOpen(false);
                }}
                onSuccess={() => {
                    window.location.reload();
                }}
            />
            }
               
        </li>
      </ul>
    </nav>

  

    <Outlet />
  </>
}
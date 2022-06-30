import React,  { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/utfpr-logo.png";
import AuthService from "../services/auth.service";

const NavBar = (props) => {

  const [apiError, setApiError] = useState();
  const userId = JSON.parse(localStorage.getItem("user"));


  
useEffect(() => {
 
    AuthService.getCurrentUser().then((response)=>{
      if(response.data){
        
        
      }
  })

}, []);

  const onClickLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  

  return (
    <div className="bg-white shadow-sm mb-2">
      <div className="container">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li className="nav-item">{userId.nome}</li>
        <li className="nav-item">{userId.username}</li>
        </ul>
        <nav className="navbar navbar-light navbar-expand">
          <Link to="/" className="navbar-brand">
            <img src={logo} width="60" alt="UTFPR" />
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink to="/" className={(navData) =>
                  navData.isActive ? "nav-link active" : "nav-link"
                }>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contas" className={(navData) =>
                  navData.isActive ? "nav-link active" : "nav-link"
                }>
                Contas <h1>{}</h1>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className={(navData) =>
                  navData.isActive ? "nav-link active" : "nav-link"
                }>
                Produtos
              </NavLink>
              
            </li>
            <li className="nav-item">
              <button className="btn btn-light" onClick={onClickLogout}>
                &times; Sair
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default NavBar;

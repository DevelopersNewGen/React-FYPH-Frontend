import React, {useState} from "react"
import {ResponsiveAppBar} from '../../components/Navbar.jsx';
import "./authPage.css"

import { Login } from "../../components/auth/Login"
import {Register} from "../../components/auth/Register.jsx"

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthPageToggle = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <>
      <ResponsiveAppBar />
      <div className="auth-background">
        <div className="auth-container">
          {isLogin ? (
            <Login switchAuthHandler={handleAuthPageToggle} />
          ) : (
            <Register switchAuthHandler={handleAuthPageToggle} />
          )}
        </div>
      </div>
    </>
  );
};

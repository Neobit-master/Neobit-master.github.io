import React, { useRef } from "react";
import useAuth from "@Hooks/useAuth";

const Login = () => {
  const formRef = useRef(null);
  const auth = useAuth();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    auth.loginUser(formData.get("email"), formData.get("password"));
  };
  return (
    <div className="login">
      <form ref={formRef} className="login-container" onSubmit={handleSubmit}>
        <h2>Inicio de sesión</h2>
        <div className="input">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" placeholder="Email" />
        </div>
        <div className="input">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
          />
        </div>
        <button className="button">Registrarse</button>
      </form>
    </div>
  );
};

export default Login;

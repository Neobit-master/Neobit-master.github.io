import React from 'react';

const Login = () => {
  return (
    <div className="login">
      <div className="login-container">
        <h2>Inicio de sesión</h2>
        <form>
          <div className="input">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder="Email"/>
          </div>
          <div className="input">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" name="password" id="password" placeholder="Contraseña"/>
          </div>
          <button className="button">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
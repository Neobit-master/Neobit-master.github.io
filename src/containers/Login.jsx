import React, { useContext, useRef } from 'react';
import UserContext from '../context/UserContext';
import Cookies from "js-cookie";

const Login = () => {
  const formRef = useRef(null);
  const { setUser } = useContext(UserContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    loginUser(formData.get('email'), formData.get('password'));
  };
  const loginUser = (username, password) => {
    fetch('http://ec2-54-234-62-6.compute-1.amazonaws.com:8080/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation {
          login(username: "${username}", password: "${password}")
        }`
      })
    })
      .then(response => response.json())
      .then(body => {
        Cookies.set('token', body.data.login)
        var base64Url = Cookies.get('token').split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const { _id, name } = JSON.parse(jsonPayload);
        setUser({
          id: _id,
          name
        });
      });
  };
  return (
    <div className="login">
      <form ref={formRef} className="login-container" onSubmit={handleSubmit}>
        <h2>Inicio de sesión</h2>
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
  );
};

export default Login;
import React, { useRef } from 'react';

const Login = () => {
  const formRef = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    console.log(formData.get('email'), formData.get('password'))
    fetch('http://ec2-54-234-62-6.compute-1.amazonaws.com:8080/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation {
          login(username: "${formData.get('email')}", password: "${formData.get('password')}")
        }`
      })
    })
      .then(response => response.json())
      .then(body => console.log(body));
  }
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
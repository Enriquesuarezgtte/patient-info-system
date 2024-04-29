import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Implement validation
    if (username === '' || password === '') {
      setLoginError('Please enter username and password');
      return;
    }

    // Simulated login (replace with backend integration)
    try {
      // Simulate successful login (assuming valid credentials)
      if (username === 'medic' && password === 'secret') {
        // Redirect to "home" page (replace with actual component or URL)
        window.location.href = '/home'; 
      } else {
        setLoginError('Invalid credentials');
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="username">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
        {loginError && <span className="error-message">{loginError}</span>}
      </form>
    </div>
  );
};

export default Login;

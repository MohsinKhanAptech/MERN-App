import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { ToastContext } from './utils/contexts';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const addToast = useContext(ToastContext);

  const SERVER_URL = 'http://localhost:4000';

  useEffect(() => {}, []);

  async function clearInput() {
    setEmail('');
    setPassword('');
  }

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const formData = { email, password };

      await axios.post(`${SERVER_URL}/login`, formData);

      addToast(`Login Successful`, `User ${email} logged in`);

      clearInput();
    } catch (error) {
      console.log(error);
      addToast(`Login Failed`, `${error}`);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center m-4">
        <h1 className="text-3xl font-bold my-12">Login</h1>
        <form
          className="flex flex-col gap-4 w-64"
          onSubmit={(e) => onSubmit(e)}
        >
          <input
            type="text"
            name="email"
            placeholder="email"
            value={email}
            className="p-2 border-2 border-neutral-400 rounded"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            value={password}
            className="p-2 border-2 border-neutral-400 rounded"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="primary-btn">
            Submit
          </button>
          <button type="reset" className="secondary-btn" onClick={clearInput}>
            Clear
          </button>
          <Link to={'/'} className="light-btn">
            Back
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;

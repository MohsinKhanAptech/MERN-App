import React, { useContext } from 'react';
import { Link } from 'react-router';
import { ToastContext } from './utils/contexts';

function App() {
  const addToast = useContext(ToastContext);

  return (
    <div className="w-dvw h-dvh flex flex-col justify-center items-center">
      <h1 className="text-6xl font-medium mb-8">MERN APP</h1>
      <div className="flex flex-col gap-2">
        <Link to={'/user'} className="primary-btn">
          User
        </Link>
        <Link to={'/role'} className="primary-btn">
          Role
        </Link>
        <button
          className="primary-btn"
          onClick={() => addToast(`hi`, `hello 👋👋`)}
        >
          Push Toast
        </button>
      </div>
    </div>
  );
}

export default App;

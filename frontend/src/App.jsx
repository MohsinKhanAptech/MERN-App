import React, { useContext } from 'react';
import { Link } from 'react-router';
import { ToastContext } from './utils/contexts';

function App() {
  const addToast = useContext(ToastContext);

  return (
    <div className="w-dvw h-dvh flex flex-col justify-center items-center">
      <h1 className="text-6xl font-medium mb-8">MERN APP</h1>
      <Link to={'/user'} className="primary-btn">
        User
      </Link>
      <button
        className="primary-btn"
        onClick={() => addToast(`hi`, `hello 👋👋`)}
      >
        Push Toast
      </button>
    </div>
  );
}

export default App;

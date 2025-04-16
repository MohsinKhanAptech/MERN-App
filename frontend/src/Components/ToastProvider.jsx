import React, { useState } from 'react';
import Toast from './Toast';
import { ToastContext } from '../utils/contexts';

function ToastProvider({ ...props }) {
  const [toasts, setToasts] = useState([]);
  const [focusedToastIndex, setFocusedToastIndex] = React.useState(null);
  const [toastLifetime, setToastLifetime] = useState(5000);

  function addToast(title, message, timeout = 5000) {
    setToastLifetime(timeout);
    setToasts([...toasts, { title, message }]);
    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => {
          return toast.title !== title && toast.message !== message;
        })
      );
    }, timeout);
  }

  function setFocus(index) {
    setFocusedToastIndex((prevIndex) => (prevIndex === index ? null : index));
  }

  function removeToast(index) {
    setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
  }

  return (
    <>
      <ToastContext.Provider value={addToast}>
        {props.children}
      </ToastContext.Provider>
      <div className="fixed bottom-0 right-0 xl:max-w-1/4 lg:max-w-1/3 md:max-w-1/2 w-dvw flex flex-col gap-2 p-4">
        {toasts.map((toast, index) => (
          <Toast
            key={index}
            title={toast.title}
            message={toast.message}
            lifetime={toastLifetime}
            isFocused={focusedToastIndex === index}
            onFocus={() => setFocus(index)}
            onClose={() => removeToast(index)}
          />
        ))}
      </div>
    </>
  );
}

export default ToastProvider;

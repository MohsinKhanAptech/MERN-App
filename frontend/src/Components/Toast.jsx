import React from 'react';

function Toast({ title, message, isFocused, onFocus, onClose }) {
  function handleClose(e) {
    e.stopPropagation();
    onClose();
  }

  function handleClick() {
    onFocus();
  }

  return (
    <div
      className="rounded p-4 bg-neutral-800 text-neutral-50"
      onClick={handleClick}
    >
      <div className="flex flex-row justify-between items-center gap-2 mb-2">
        <span className={isFocused ? 'font-bold' : 'font-bold truncate'}>
          {title}
        </span>
        <span
          className="cursor-pointer text-neutral-400 hover:text-neutral-200 select-none"
          onClick={(e) => handleClose(e)}
        >
          &#x2715;
        </span>
      </div>
      <div className={isFocused ? '' : 'line-clamp-2'}>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;

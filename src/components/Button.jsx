import React from 'react';

const Button = ({ text, onClick, type = 'primary', disabled}) => {
  const buttonStyles = type === 'primary' 
    ? 'bg-purple-600 text-white border border-purple-600 hover:bg-transparent hover:text-purple-600' 
    : 'bg-transparent text-purple-600 border border-purple-600 hover:bg-purple-600 hover:text-white';

  return (
    <button 
      className={`px-6 py-2 cursor-pointer rounded-full font-semibold text-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${buttonStyles}`} 
      onClick={onClick}
      disabled={disabled}
      >
      {text}
      
    </button>
  );
};

export default Button;

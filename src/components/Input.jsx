import React from 'react';

const Input = ({ type, onChange, placeholder, value, name, id, moreStyles }) => {
  return (
    <div className="w-full">
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        name={name}
        id={id}
        className={`w-full px-4 py-2 border border-gray-400 rounded-md text-stone-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${moreStyles}`}
        required
      />
    </div>
  );
};

export default Input;

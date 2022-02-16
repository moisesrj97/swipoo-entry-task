/* eslint-disable react/jsx-boolean-value */
import React, { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import Form from './components/Form/Form';

function App(): JSX.Element {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = (): void => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = 'white';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#121212';
      setDarkMode(true);
    }
  };
  return (
    <div className="w-screen flex flex-col my-10 items-center">
      <div className="w-11/12 md:w-8/12 xl:w-6/12 2xl:w-4/12 h-max py-4 px-6 md:px-6 xl:px-8 flex flex-col items-center rounded-md shadow shadow-gray-700 dark:bg-[#242424]">
        <DarkModeSwitch
          onChange={toggleDarkMode}
          checked={darkMode}
          className="self-end"
        />
        <h2 className="text-1xl text-left w-full text-gray-500 dark:text-gray-200">
          Hi, welcome to my
        </h2>
        <h1 className="uppercase text-2xl w-full mb-2 font-bold text-left underline underline-offset-0 decoration-4 decoration-blue-400 dark:text-white">
          Swipoo entry task
        </h1>
        <Form />
      </div>
      <p className="pt-2 text-xs dark:text-white">
        Made with 💙 by Moisés Rodríguez
      </p>
    </div>
  );
}

export default App;

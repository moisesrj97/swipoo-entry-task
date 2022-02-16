import React from 'react';
import Form from './components/Form/Form';

function App(): JSX.Element {
  return (
    <div className="w-screen h-screen flex flex-col my-10 items-center">
      <div className="w-11/12 h-max py-4 px-6 flex flex-col items-center rounded-md shadow shadow-gray-400">
        <h2 className="text-1xl text-left w-full text-gray-500">
          Hi, welcome to my
        </h2>
        <h1 className="uppercase text-2xl w-full mb-2 font-bold text-left underline underline-offset-2 decoration-blue-500">
          Swipoo entry task
        </h1>
        <Form />
      </div>
    </div>
  );
}

export default App;

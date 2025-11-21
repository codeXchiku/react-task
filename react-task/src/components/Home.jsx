import React from "react";
import welcome from "../assets/welcome.svg"; 

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 w-[90%] max-w-md text-center transition-all duration-200">
        
        <img
          src={welcome}
          alt="Welcome Illustration"
          className="w-48 mx-auto mb-6"
        />

        
        <h1 className="text-2xl font-bold mb-3 text-gray-800 tracking-wide">
          Welcome to the Dashboard 👋
        </h1>

        <p className="text-gray-600 text-sm leading-relaxed">
          <span className="block mt-3 italic text-gray-500">
            (Sorry for taking the help of AI in creating this)
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";

import icon from "./assets/icon-dice.svg";
import desktop from "./assets/pattern-divider-desktop.svg";
import mobile from "./assets/pattern-divider-mobile.svg";

function App() {
  const [advice, setAdvice] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdviceHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.adviceslip.com/advice", {
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      setAdvice(data.slip);
      
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAdviceHandler();
  }, []);

  let content = (
    <p className="text-lg text-yellow-600 font-manrope text-center">
      Found no advice.
    </p>
  );

  if (!isLoading) {
    content = (
      <p className="text-xl sm:text-2xl my-8 text-center text-lightCyan font-manrope">
        "{advice.advice}"
      </p>
    );
  }

  if (error) {
    content = (
      <p className="text-lg text-red-600 font-manrope text-center">{error}</p>
    );
  }

  if (isLoading) {
    content = (
      <p className="text-lg text-blue-600 font-manrope text-center">
        Loading...
      </p>
    );
  }

  return (
    <div className="w-full min-h-[100vh] h-full grid place-items-center  bg-darkBlue">
      <div className="max-w-[450px] w-[90%] min-h-[280px] flex items-center justify-center flex-col p-6 bg-darkGrayishBlue rounded-xl relative shadow-custom">
        <div>
          <h1 className="text-center text-neonGreen uppercase tracking-widest font-bold">
            Advice <span>#{advice.id}</span>
          </h1>
          {content}
        </div>
        <div>
          <img src={mobile} alt="second" className="sm:hidden mb-4" />
          <img src={desktop} alt="third" className="hidden sm:block mb-4" />
        </div>
        <button
          onClick={fetchAdviceHandler}
          className="absolute bottom-[-30px] flex justify-center"
        >
          <img
            className="block rounded-full bg-neonGreen hover:button-shadow p-4"
            src={icon}
            alt="first"
          />
        </button>
      </div>
    </div>
  );
}

export default App;

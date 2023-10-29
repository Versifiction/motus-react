import { useEffect, useState } from "react";
import classNames from "classnames";

import "./App.css";

const WORD_TO_FIND = "POESIE";
const LETTERS_AMOUNT = 6;

type Letter = {
  [key: number]: string;
};

function App() {
  const [triedWords, setTriedWords] = useState(["", "", "", "", "", ""]);
  const [letters, setLetters] = useState<Letter>({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (e: any, index: number) => {
    setLetters({ ...letters, [index]: e.target.value });

    if (e.target.nextSibling) e.target.nextSibling.focus();
  };

  const sendWord = () => {
    if (
      (letters[0].toUpperCase() === "" || letters[1].toUpperCase()) === "" ||
      letters[2].toUpperCase() === "" ||
      letters[3].toUpperCase() === "" ||
      letters[4].toUpperCase() === "" ||
      letters[5].toUpperCase() === ""
    ) {
      return;
    }

    const temp = triedWords.map((word, index) => {
      if (currentIndex !== index) {
        return word;
      } else {
        return `${
          letters[0].toUpperCase() +
          letters[1].toUpperCase() +
          letters[2].toUpperCase() +
          letters[3].toUpperCase() +
          letters[4].toUpperCase() +
          letters[5].toUpperCase()
        }`;
      }
    });

    setTriedWords(temp);

    setLetters({
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
    });

    setCurrentIndex((c) => c + 1);
  };

  useEffect(() => {
    if (triedWords.some((tried) => tried === WORD_TO_FIND)) {
      alert("Victoire");
    }
  }, [triedWords]);

  return (
    <div className="bg-[#EA5415] h-full py-16">
      <h1 className="text-3xl font-bold text-center pb-16 uppercase">Motus</h1>
      {triedWords.map((word: string) => (
        <div className="flex justify-center">
          {[...Array(LETTERS_AMOUNT)].map((letter, index) => (
            <div
              className={classNames({
                "w-12 h-12 p-12 flex justify-center items-center uppercase border-solid border-white border-2 text-[#fff] font-bold text-3xl":
                  true,
                "bg-[#FFFF00]":
                  WORD_TO_FIND.includes(word[index]) &&
                  WORD_TO_FIND[index] !== word[index],
                "bg-[#FF0000]": WORD_TO_FIND[index] === word[index],
                "bg-[#2399FD]": !WORD_TO_FIND.includes(word[index]),
              })}
              key={index}
            >
              {word[index]}
            </div>
          ))}
        </div>
      ))}
      <div className="flex justify-center mt-2">
        {[...Array(LETTERS_AMOUNT)].map((letter, index) => (
          <input
            className="w-12 h-12 bg-[#2399FD] text-center uppercase border-solid border-white border-2 outline-none"
            type="text"
            maxLength={1}
            value={letters[index]}
            onChange={(e) => handleChange(e, index)}
            key={index}
          ></input>
        ))}
        <div className="flex justify-center items-center ml-4 cursor-pointer">
          <svg
            viewBox="0 0 1024 1024"
            fill="#FFF"
            height="2rem"
            width="2rem"
            onClick={sendWord}
          >
            <defs>
              <style />
            </defs>
            <path d="M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2-8.5 2.1-13.8 10.7-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-.9 3.7-.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 .7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-.8 4.2-2.6 5-5 1.4-4.2-.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;

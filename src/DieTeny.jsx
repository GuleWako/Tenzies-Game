import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti"
const DieTeny = () => {

  const allNewDie = () => {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      }));
  };

  const [dice, setDice] = useState(allNewDie);
  let finished = false
if(dice.every(die=>die.isHeld)&& dice.every(die=>die.value===dice[0].value)){
    finished=true
}

  const handleRolling = () => {
    setDice((preValue) => {
      return preValue.map((value) => {
        return value.isHeld
          ? { ...value }
          : {
              value: Math.ceil(Math.random() * 6),
              isHeld: false,
              id: nanoid(),
            };
      });
    });
  };
  const handlePlay = (event) => {
    const currentValue = event.currentTarget.name;
    setDice(
      [...dice],
      (dice[currentValue].isHeld = !dice[currentValue].isHeld)
    );
  };
  const handleReplay = () => {
    setDice(allNewDie);
  };
  const changeMousePointer = useRef(null)
  useEffect(()=>{
     if(finished){
      changeMousePointer.current.focus()
     }
  },[finished])
  return (
    
    <div className="flex flex-col gap-6 items-center justify-center">
         { finished && <Confetti/>}   
      <div className=" flex flex-col items-center justify-center">
        <h1 className="font-bold text-lg">Tenzies</h1>
        <p className="p-2 text-sm text-wrap text-center">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="grid grid-cols-5 gap-6 font-bold">
        {dice.map((num, index) => (
          <button
            name={index}
            key={num.id}
            style={{ backgroundColor: num.isHeld ? "#59E391" : "white" }}
            onClick={handlePlay}
            className="w-10 h-10 shadow-lg flex items-center justify-center bg-white rounded-sm"
          >
            {num.value}
          </button>
        ))}
      </div>
      <div>
        {!finished ? (
          <button
            onClick={handleRolling}
            className="p-2 bg-blue-800 w-28 text-white text-lg rounded-md"
          >
            Roll
          </button>
        ) : (
          <button
          ref={changeMousePointer}
            onClick={handleReplay}
            className="p-2 bg-blue-800 w-28 text-white text-lg rounded-md"
          >
            New Game
          </button>
        )}
      </div>
    </div>
  );
};

export default DieTeny;

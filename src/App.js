import React, { useState, useEffect } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

const App = () => {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
  }, [dice])

  function generateNewDie() {
    return { 
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++){
      newDice.push(generateNewDie())
    }
    return newDice 
  }

 const diceElements = dice.map(die => 
   <Die 
      value={die.value} 
      isHeld={die.isHeld} 
      key={die.id}
      holdDice={() => holdDice(die.id)}
      />
 )

 function rollDice() {
  if(tenzies) {
    setTenzies(false)
    setDice(allNewDice())
  } else {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? 
        die :
        generateNewDie()
      
    }))
  }
  
 } 
  
 function holdDice(id) {
  setDice(oldDice => oldDice.map(die => {
    return id === die.id ? {...die, isHeld: !die.isHeld} : die
  }))
}


  
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      {/* {tenzies && <button className="roll-dice">New Game</button>} */}
      
    </main>
  )
}

export default App
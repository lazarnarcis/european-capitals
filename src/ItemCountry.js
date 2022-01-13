import React, { useRef } from "react"
import "./ItemCountry.scss"

export default function ItemCountry({ item, score, setScore, mistake, setMistake, setErr }) {
    const inputRef = useRef()
    const checkCapital = () => {
        if (item.capital.toLowerCase() === inputRef.current.value) {
            setErr("Capitala este corecta!")
            setScore(Number(score) + Number(1))
        } else {
            setErr(`Capitala nu este corecta, capitala ${item.country} este ${item.capital}!`)
            setMistake(Number(mistake) + Number(1))
        }
        inputRef.current.value = ""
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            checkCapital()
        }
    }
    return (
        <>
            <h4>Introdu capitala {item.country} mai jos:</h4>
            <div className="inputs">
                <input type="text" ref={inputRef} onKeyDown={handleKeyDown} placeholder="Introdu capitala aici" />
                <button onClick={checkCapital}>Verifica</button>
            </div>
        </>
    )
}
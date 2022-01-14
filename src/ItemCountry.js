import React, { useRef } from "react"
import "./ItemCountry.scss"

export default function ItemCountry({ item, score, setScore, mistake, setMistake, setErr, setErrColor }) {
    const inputRef = useRef()
    const checkCapital = () => {
        if (item.capital.toLowerCase() === inputRef.current.value.toLowerCase()) {
            setErr(`Corect! Capitala ${item.country} este ${item.capital} (+1 pct)`)
            setErrColor(1)
            setScore(Number(score) + Number(1))
        } else {
            setErr(`Capitala nu este corecta, capitala ${item.country} este ${item.capital}!`)
            setMistake(Number(mistake) + Number(1))
            setErrColor(2)
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
            <h4>Introdu capitala <i>{item.country}</i> mai jos:</h4>
            <div className="inputs">
                <input type="text" ref={inputRef} onKeyDown={handleKeyDown} placeholder="Introdu capitala aici" />
                <button onClick={checkCapital}>Verifica</button>
            </div>
        </>
    )
}
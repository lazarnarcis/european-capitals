import React, { useState, useEffect } from "react"
import countries from "./Countries.json"
import ItemCountry from "./ItemCountry"
import "./App.scss"

export default function App() {
    const generateRandomCountry = (arrayLength) => {
        return Math.floor(Math.random() * arrayLength);
    }
    const [errs, setErr] = useState("")
    const [score, setScore] = useState(localStorage.getItem('score') || '0')
    const [mistake, setMistake] = useState(localStorage.getItem('mistake') || '0')
    const [errColor, setErrColor] = useState()

    useEffect(() => {
        localStorage.setItem('score', score)
        if (score < 0) {
            setErr("Scorul nu poate fi sub 0! Ti-au fost resetate toate punctele!")
            setErrColor(2)
            setScore(0)
            setMistake(0)
        } else if (score >= 50) {
            setScore(0)
            setErr("Felicitari! Ai completat corect cu cele 50 de capitale! Scorul ti-a fost resetat.")
            setErrColor(1)
        }
    }, [score])

    useEffect(() => {
        localStorage.setItem('mistake', mistake)
        if (mistake === 3) {
            setErr("Ti-au fost scazute 2 puncte pentru ca ai acumulat 3 greseli!")
            setErrColor(2)
            setScore(score => Number(score) - Number(2))
            setMistake(0)
        }
    }, [mistake])

    return (
        <div className="App">
            <h1>Capitale din Europa</h1>
            <ItemCountry item={countries[generateRandomCountry(countries.length)]} score={score} 
            setScore={setScore} mistake={mistake} setMistake={setMistake} setErr={setErr}
            errColor={errColor} setErrColor={setErrColor} />
            <p style={{backgroundColor: `${errs ? `${errColor === 1 ? "green" : "red"}` : null}`, color: "white"}} className={`${errs ? "err" : ""}`}>{errs}</p>
            <p>Scor: {score} {score === 1 ? "punct" : "puncte" }</p>
            <p>Pana acum ai {mistake} {mistake === 1 ? "greseala" : "greseli"}!</p>
        </div>
    )
}
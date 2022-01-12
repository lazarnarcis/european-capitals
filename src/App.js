import React, { useState, useEffect } from "react"
import countries from "./Countries.json"
import ItemCountry from "./ItemCountry"

export default function App() {
    const getRandomElFromArray = (arrayLength) => {
        return Math.floor(Math.random() * arrayLength);
    }
    const [errs, setErr] = useState("")
    const [score, setScore] = useState(localStorage.getItem('score') || '0')
    const [mistake, setMistake] = useState(localStorage.getItem('mistake') || '0')

    useEffect(() => {
        localStorage.setItem('score', score)
        if (score < 0) {
            setErr("Scorul nu poate fi sub 0! Ti-au fost resetate toate punctele!")
            setScore(0)
            setMistake(0)
        } else if (score >= 50) {
            setScore(0)
            setErr("Felicitari! Ai completat corect cu cele 50 de capitale! Scorul ti-a fost resetat.")
        }
    }, [score])

    useEffect(() => {
        localStorage.setItem('mistake', mistake)
        if (mistake === 3) {
            setErr("Ti-au fost scazute 2 puncte pentru ca ai acumulat 3 greseli!")
            setScore(score => Number(score) - Number(2))
            setMistake(0)
        }
    }, [mistake])

    return (
        <>
            <h1>Tari si capitale din Europa</h1>
            <ItemCountry item={countries[getRandomElFromArray(countries.length)]} score={score} 
            setScore={setScore} mistake={mistake} setMistake={setMistake} setErr={setErr} />
            <p style={{backgroundColor: `${errs ? "black" : null}`, color: "white"}}>{errs}</p>
            <p>Scorul tau este: {score}</p>
            <p>Pana acum ai {mistake} greseli!</p>
        </>
    )
}
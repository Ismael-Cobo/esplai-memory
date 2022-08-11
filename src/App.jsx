import { useEffect } from "react"
import { useState } from "react"
import { Item } from "./Item"

const memory = [
  { id: 1, value: 'A', turned: false },
  { id: 2, value: 'B', turned: false },
  { id: 3, value: 'C', turned: false },
  { id: 4, value: 'D', turned: false },
  { id: 5, value: 'E', turned: false },
  { id: 6, value: 'F', turned: false },
  { id: 7, value: 'G', turned: false },
  { id: 8, value: 'H', turned: false },
  { id: 9, value: 'A', turned: false },
  { id: 10, value: 'B', turned: false },
  { id: 11, value: 'C', turned: false },
  { id: 12, value: 'D', turned: false },
  { id: 13, value: 'E', turned: false },
  { id: 14, value: 'F', turned: false },
  { id: 15, value: 'G', turned: false },
  { id: 16, value: 'H', turned: false },
].sort(() => Math.random() - 0.5)

function App() {

  const [objetos, setObjetos] = useState(memory)
  const [selected, setSelected] = useState([])
  const [count, setCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [isRestart, setIsRestart] = useState(false)
  const [hideChuletilla, setHideChuletilla] = useState(false)

  const handleClick = (id, value) => {
    setCount(count + 1)
    setSelected([...selected, value])
    setObjetos(prev => prev.map(objeto => objeto.id === id ? { ...objeto, turned: !objeto.turned } : objeto))

  }


  useEffect(() => {
    if (count >= 2) {
      if (!isEqual()) {
        unTurn()
      }
      setCount(0)
      setSelected([])
    }
  }, [count])


  const unTurn = () => {
    setObjetos(
      prev =>
        prev.map(objeto => objeto.value === selected[0] || objeto.value === selected[1]
          ? { ...objeto, turned: false }
          : objeto)

    )
  }

  const isEqual = () => {
    return selected[0] === selected[1]
  }

  const isFullTurned = () => {

    let isFullOk = true

    objetos.forEach(objeto => {
      if (!objeto.turned) {
        isFullOk = false
        return
      }
    })

    return isFullOk

  }

  const handleRestart = () => {
    setIsRestart(false)
    setIsFinished(false)
    setObjetos(memory.sort(() => Math.random() - 0.5))
    setCount(0)
    setSelected([])
  }

  useEffect(() => {
    if (isFullTurned()) {
      setIsFinished(isFullTurned())
      setIsRestart(true)
    }
  }, [objetos])




  return (
    <div style={{ width: '90%', margin: '1rem auto', maxWidth: '1200px', display: 'flex', justifyContent: 'center' }}>
      <button style={{ height: 'fit-content' }} onClick={() => setHideChuletilla(!hideChuletilla)}>{hideChuletilla ? 'Ocultar' : 'Mostrar'} chuleta</button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', justifyItems: 'center', gap: '1rem' }}>
        {
          objetos.map(({ id, value, turned }) => {
            return <Item fn={() => handleClick(id, value)} key={id} text={turned ? value : ''} a={hideChuletilla ? value : ''} />
          }
          )
        }
      </div>

      {
        isFinished && <p>Has acabado</p>
      }

      {
        isRestart && <button onClick={handleRestart}>Reiniciar</button>
      }
    </div>
  )
}

export default App

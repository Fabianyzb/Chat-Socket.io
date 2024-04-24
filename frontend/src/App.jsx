import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import { symbolName } from 'typescript'

const socket = io("/")

function App() {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault(); //evita que el form refresque la pagina
    socket.emit("message", message)
  }

  useEffect(() => {
    socket.on('message', message => {
      console.log(message)
    })

    return () => {

    }
  }, [

  ])


  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Write your message...'
          onChange={(e) => setMessage(e.target.value)} /* <- actualiza valor del input cuando se cambia el mensaje */
        />
        <button>Send</button>
      </form>
    </>
  )
}

export default App
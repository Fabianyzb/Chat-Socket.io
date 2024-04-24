import io from 'socket.io-client'
import { useState } from 'react'
import { symbolName } from 'typescript'

const socket = io("/")

function App() {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault(); //evita que el form refresque la pagina
    console.log(message);
  }

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
import { Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <main id="home">
      <h1>RPG MAPS</h1>
      <div id="menu">
        <button>Iniciar</button>
        <Link to="/configuracoes">
          <button>Configurações</button>
        </Link>
      </div>
    </main>
  )
}

export default App

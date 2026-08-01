import { Link } from 'react-router-dom'
import './Settings.css'

function Settings() {
  return (
    <main id="settings">
      <h1>Configurações</h1>

      <ul id="settings-list">
        <li><button>MAPAS</button></li>
        <li><button>PONTOS DE INTERESSE</button></li>
        <li><button>MAPAS INTERNOS</button></li>
        <li><button>TOKEN PLAYERS</button></li>
      </ul>

      <Link to="/">
        <button>Voltar</button>
      </Link>
    </main>
  )
}

export default Settings


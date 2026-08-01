import { Link } from 'react-router-dom'
import './Settings.css'

function Settings() {
  return (
    <main id="settings">
      <h1>Configurações</h1>

      <ul id="settings-list">
        <li><Link to="/configuracoes/mapas"><button>MAPAS</button></Link></li>
        <li><Link to="/configuracoes/pontos_interesse"><button>PONTOS DE INTERESSE</button></Link></li>
        <li><Link to="/configuracoes/mapas_internos"><button>MAPAS INTERNOS</button></Link></li>
        <li><Link to="/configuracoes/token_players"><button>TOKEN PLAYERS</button></Link></li>
      </ul>

      <Link to="/">
        <button>Voltar</button>
      </Link>
    </main>
  )
}

export default Settings


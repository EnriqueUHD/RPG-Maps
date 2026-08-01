import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { addImage, deleteImage, getImages } from './db.js'
import './Category.css'

function Category() {
  const { categoria } = useParams()
  const [images, setImages] = useState([])
  const [objectUrls, setObjectUrls] = useState({})

  const title = {
    mapas: 'MAPAS',
    pontos_interesse: 'PONTOS DE INTERESSE',
    mapas_internos: 'MAPAS INTERNOS',
    token_players: 'TOKEN PLAYERS',
  }[categoria]

  useEffect(() => {
    getImages(categoria).then((items) => {
      setImages(items)
      const urls = {}
      items.forEach((item) => {
        urls[item.id] = URL.createObjectURL(item.blob)
      })
      setObjectUrls(urls)
    })
  }, [categoria])

  const handleAdd = (event) => {
    const file = event.target.files[0]
    if (!file) return

    addImage(categoria, file).then(() => {
      getImages(categoria).then((items) => {
        setImages(items)
        const urls = {}
        items.forEach((item) => {
          urls[item.id] = URL.createObjectURL(item.blob)
        })
        setObjectUrls(urls)
      })
    })
  }

  const handleDelete = (id) => {
    deleteImage(categoria, id).then(() => {
      setImages((prev) => prev.filter((item) => item.id !== id))
      URL.revokeObjectURL(objectUrls[id])
      setObjectUrls((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
    })
  }

  return (
    <main id="category">
      <h1>{title}</h1>

      <label id="add-image" className="file-input">
        Adicionar imagem
        <input type="file" accept="image/*" onChange={handleAdd} />
      </label>

      <div id="image-grid">
        {images.map((item) => (
          <div className="image-card" key={item.id}>
            <img src={objectUrls[item.id]} alt={item.name} />
            <button onClick={() => handleDelete(item.id)}>Excluir</button>
          </div>
        ))}
      </div>

      <Link to="/configuracoes">
        <button>Voltar</button>
      </Link>
    </main>
  )
}

export default Category

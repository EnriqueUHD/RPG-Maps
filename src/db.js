const DB_NAME = 'rpg-maps-db'
const DB_VERSION = 1

export const CATEGORIES = {
  mapas: 'mapas',
  pontos_interesse: 'pontos_interesse',
  mapas_internos: 'mapas_internos',
  token_players: 'token_players',
}

let dbPromise = null

function openDB() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onupgradeneeded = (event) => {
        const db = event.target.result
        for (const name of Object.values(CATEGORIES)) {
          if (!db.objectStoreNames.contains(name)) {
            db.createObjectStore(name, { keyPath: 'id', autoIncrement: true })
          }
        }
      }

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
  return dbPromise
}

function runTransaction(storeName, mode, operation) {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, mode)
        const store = transaction.objectStore(storeName)
        const request = operation(store)

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      }),
  )
}

export function addImage(category, file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      runTransaction(category, 'readwrite', (store) =>
        store.add({ blob: new Blob([reader.result], { type: file.type }), name: file.name, createdAt: Date.now() }),
      )
        .then(resolve)
        .catch(reject)
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsArrayBuffer(file)
  })
}

export function getImages(category) {
  return runTransaction(category, 'readonly', (store) => store.getAll())
}

export function deleteImage(category, id) {
  return runTransaction(category, 'readwrite', (store) => store.delete(id))
}

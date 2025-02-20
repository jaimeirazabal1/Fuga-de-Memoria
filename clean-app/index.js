// clean-app/index.js
const express = require("express");
const app = express();
const port = 3001;
const { LRUCache } = require("lru-cache");

// Configuración de cache profesional (lru-cache)
const cache = new LRUCache({
  max: 100, // Máximo 100 usuarios en cache
  maxSize: 1024 * 1024 * 100, // 100MB máximo en cache
  sizeCalculation: (value) => value.data.length,
  ttl: 30 * 1000, // 30 segundos de vida
});

const database = {
  query: (userId) => {
    return {
      user: userId,
      data: Buffer.alloc(1024 * 1024 * 5), // 5MB
      meta: {
        timestamp: Date.now(),
        log: (id) => console.log(`Acceso a usuario ${id}`),
      },
    };
  },
};

app.get("/user/:id", (req, res) => {
  const userId = req.params.id;

  let userData = cache.get(userId);
  if (!userData) {
    userData = database.query(userId);
    cache.set(userId, userData);
  }

  // Usamos la función sin retener referencia al closure
  userData.meta.log(userId);

  res.json({ user: userId });
});

app.listen(port, () => {
  console.log(`App SIN fugas escuchando en puerto ${port}`);
});

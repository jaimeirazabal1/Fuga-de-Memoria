// leaky-app/index.js
const express = require("express");
const app = express();
const port = 3000;

const database = {
  query: (userId) => {
    return {
      user: userId,
      data: Buffer.alloc(1024 * 1024 * 5), // 5MB por usuario
      meta: {
        timestamp: Date.now(),
        log: () => console.log(`Acceso a usuario ${userId}`),
      },
    };
  },
};

// Cache global (problema: nunca se limpia)
const cache = new Map();

app.get("/user/:id", (req, res) => {
  const userId = req.params.id;

  if (!cache.has(userId)) {
    // Almacenamos toda la estructura compleja
    cache.set(userId, database.query(userId));
  }

  res.json({ user: userId });
});

app.listen(port, () => {
  console.log(`App CON fuga real escuchando en puerto ${port}`);
});

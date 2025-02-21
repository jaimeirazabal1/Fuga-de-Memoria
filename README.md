
# 🚨 Demostración de Fuga de Memoria en Node.js

¡Aprende a identificar y solucionar fugas de memoria en Node.js con Docker y Artillery! Este proyecto compara dos aplicaciones: una con fuga de memoria y otra optimizada.

## 📦 Prerrequisitos

- Node.js (v18+)
- Docker
- Artillery (para pruebas de carga)
  
```bash
npm install -g artillery
```

## 🚀 Cómo Ejecutar

1. Clona el repositorio:
```bash
git clone https://github.com/jaimeirazabal1/Fuga-de-Memoria.git
cd Fuga-de-Memoria
```

2. Construye y ejecuta los contenedores:
```bash
docker-compose up --build
```

3. **Aplicaciones disponibles:**
   - App CON fuga: `http://localhost:3001`
   - App SIN fuga: `http://localhost:3002`

## 📊 Ejecutar Pruebas de Carga

1. Prueba la app **CON fuga**:
```bash
artillery run --target http://localhost:3001 artillery-test.yml
```

2. Prueba la app **SIN fuga**:
```bash
artillery run --target http://localhost:3002 artillery-test.yml
```

## 📉 Monitorear Memoria

Abre una nueva terminal y ejecuta:
```bash
docker stats
```
Verás cómo el contenedor `memoria-leak` consume memoria hasta colapsar, mientras `memoria-clean` se mantiene estable.

## 🛠️ Configuración de Artillery

Archivo `artillery-test.yml`:
```yaml
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - flow:
      - get:
          url: "/user/1"
```

## 📝 ¿Qué Aprenderás?
- Cómo una caché mal implementada causa fugas de memoria.
- Uso de `lru-cache` para optimizar memoria.
- Pruebas de estrés con Artillery.
- Monitoreo de recursos con Docker.

## 🤝 Contribuir
¡Se aceptan issues y pull requests! ¿Tienes una mejor solución? ¡Compártela!

## 📄 Licencia
MIT © [Jaime Irazábal](https://github.com/jaimeirazabal1)

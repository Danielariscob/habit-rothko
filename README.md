# Bandas — Hábitos

App de hábitos inspirada en el cuadro de Rothko de la portada. Vista diaria, vista
semanal, gestión de hábitos (con días de la semana) y % de avance diario/semanal.
Todo se guarda en el navegador (localStorage), no necesita backend.

## 1. Abrir en VS Code y correr en local

```bash
npm install
npm run dev
```

Abre la URL que te muestre la terminal (normalmente `http://localhost:5173`).

## 2. Subirlo a GitHub

```bash
git init
git add .
git commit -m "Primera versión"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

## 3. Publicarlo con GitHub Pages (para tenerlo en tu iPhone)

Ya incluí el workflow `.github/workflows/deploy.yml`, que compila y publica
automáticamente en cada push a `main`. Solo tienes que activarlo una vez:

1. En GitHub, entra a tu repo → **Settings → Pages**.
2. En "Build and deployment", elige **Source: GitHub Actions**.
3. Haz un push (o vuelve a correr el workflow desde la pestaña **Actions**).
4. En unos minutos tu app quedará en:
   `https://TU-USUARIO.github.io/TU-REPO/`

## 4. Agregarla a la pantalla de inicio del iPhone

1. Abre esa URL en **Safari** (tiene que ser Safari, no Chrome).
2. Toca el ícono de compartir (el cuadrado con la flecha hacia arriba).
3. Elige **"Agregar a inicio"**.
4. Listo — queda como una app normal, con el cuadro de Rothko como ícono,
   pantalla completa y sin la barra de Safari.

## Estructura

- `src/components/DailyView.jsx` — vista del día, con anillo de progreso.
- `src/components/WeeklyView.jsx` — grilla semanal por hábito y día.
- `src/components/HabitsView.jsx` — crear/editar/borrar hábitos (nombre, ícono,
  color, días de la semana).
- `src/data/useHabits.js` — toda la lógica de datos + persistencia en localStorage.
- `src/data/palette.js` — paleta de colores extraída del cuadro.
- `public/icons/` — ícono de la app y portada, generados a partir de tu imagen.

## Notas

- Los datos viven en el localStorage del navegador/dispositivo — si la abres
  en otro teléfono, empieza de cero ahí (no hay sincronización en la nube).
- Puedes editar la paleta en `src/data/palette.js` y `tailwind.config.js`
  (colores `rothko.*`) si luego quieres ajustar tonos.

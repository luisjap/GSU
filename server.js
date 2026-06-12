const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/** Proyectos: viven en data/projects.json — editar ahí, sin tocar código */
app.get('/api/projects', (_req, res) => {
  try {
    const raw = fs.readFileSync(path.join(__dirname, 'data', 'projects.json'), 'utf8');
    res.json(JSON.parse(raw));
  } catch (e) {
    console.error('No se pudo leer projects.json:', e.message);
    res.status(500).json({ error: 'No se pudieron cargar los proyectos' });
  }
});

/** Contacto: por ahora solo loguea; listo para enchufar Resend/SendGrid */
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body ?? {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan campos: nombre, email y mensaje son obligatorios' });
  }
  console.log(`[contacto] ${new Date().toISOString()} — ${name} <${email}>: ${message}`);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Lu.dev corriendo en http://localhost:${PORT}`));

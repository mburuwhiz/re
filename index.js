const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();

// Use the port Render provides, or default to 3000 locally
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let db;

async function initDb() {
  db = await open({
    filename: path.join(__dirname, 'database.sqlite'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT UNIQUE,
      visits INTEGER DEFAULT 0
    )
  `);

  // Sync pdf files in root directory
  const files = fs.readdirSync(__dirname);
  const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));

  for (const pdf of pdfFiles) {
    await db.run('INSERT OR IGNORE INTO files (filename) VALUES (?)', [pdf]);
  }
}

initDb().then(() => {
  console.log('Database initialized and files synced');
}).catch(err => {
  console.error('Failed to initialize database', err);
});

app.get('/', async (req, res) => {
  try {
    const files = await db.all('SELECT * FROM files ORDER BY visits DESC');
    res.render('index', { files });
  } catch (err) {
    res.status(500).send('Error loading landing page');
  }
});

app.get('/:filename', async (req, res, next) => {
  const filename = req.params.filename;

  if (!filename.toLowerCase().endsWith('.pdf')) {
    return next();
  }

  try {
    const file = await db.get('SELECT * FROM files WHERE filename = ?', [filename]);

    if (!file) {
      return next(); // File not in DB, let express.static handle or 404
    }

    if (req.query.download === 'true') {
      // Increment visit count
      await db.run('UPDATE files SET visits = visits + 1 WHERE id = ?', [file.id]);

      // Serve the actual file using Express res.sendFile
      const filePath = path.join(__dirname, filename);
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      } else {
        return res.status(404).send('File not found on disk');
      }
    } else {
      // Serve the 10-second interstitial page
      const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      res.render('interstitial', { filename, fullUrl });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// This serves all files in the root directory as static assets
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const port = 46875;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set the static file directory (dist)
app.use(express.static(join(__dirname, 'dist')));

// Route handler for serving index.html
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

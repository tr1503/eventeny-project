const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'frontend', 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'public', 'index.html'));
});

app.get('/applicant', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'public', 'applicant.html'));
});

app.get('/organizer', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'public', 'organizer.html'));
});

// handle 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'frontend', 'public', 'error.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

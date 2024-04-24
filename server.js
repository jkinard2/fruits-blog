const express = require('express');
const app = express(); // our app
const PORT = process.env.PORT || 3000;

// ------------ DATA -----------------
const fruits = ['Apples', 'Kiwi', 'Blueberries', 'Mangos', 'Strawberries'];

// ------------ ROUTES ---------------
app.get('/fruits', (req, res) => {
    // send array as a response
    res.send(fruits);
});

// ----------- LISTEN FOR SERVER ----------
app.listen(PORT, () => {
    console.log('🎧 Server is running on PORT 🎧', PORT);
});
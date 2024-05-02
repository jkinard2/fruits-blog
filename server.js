const express = require('express');
const app = express(); // our app
const PORT = process.env.PORT || 3000;

// ------------ DATA -----------------
// inside of fruits.js
const { fruits } = require('./models/fruits');

// ------------ MIDDLEWARE ------------
app.use(methodOverride('_method'));
app.set('view engine', 'ejs'); // come back to this
app.use('/', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ------------ ROUTES ---------------
// ******* INDEX ROUTE **********
app.get('/fruits', (req, res) => {
    // send index.ejs with array of fruits
    res.render('index', { allFruits: fruits });
});
app.get('/meats', (req, res) => {
    res.render('index', { allMeats: meats });
});
app.get('/veggies', (req, res) => {
    res.render('index', { allVeggies: veggies });
});
app.get('/home', (req, res) => {
    res.render('index',{ Home: home });
});
app.get('/about', (req, res) => {
     res.render('index', { About: about });
});
app.get('/recipes', (req, res) => {
    res.render('index', { Recipes: recipes });
});

//**** new route ******
app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs', {});
});
// ******* SHOW ROUTE **********
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    let idx = parseInt(req.params.indexOfFruitsArray);
    if (idx >= fruits.length) {
        // res.send('There is no fruit at that index.'); // one solution
        // res.send(fruits);
        res.render('404', {});
    } else {
        // res.send(fruits[idx]);
        res.render('fruits/show', { fruit: fruits[idx] });
    }
});

// *********** GET - EDIT PAGE **********
app.get('/fruits/:id/edit', (req, res) => {
    const fruit = fruits[req.params.id];
    let id = parseInt(req.params.id);
    res.render('fruits/edit', { fruit, id });
});

// ********* GET - DELETE PAGE ************
app.get('/fruits/:id/delete', (req, res) => {
    const fruit = fruits[req.params.id];
    let id = parseInt(req.params.id);
    res.render('fruits/delete', { fruit, id });
});

// ************** PUT - UPDATE FRUIT *************
app.put('/fruits/:id', (req, res) => {
    console.log('------- UPDATE FRUIT -------\n', req.body);
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    fruits[parseInt(req.params.id)] = req.body; //
    res.redirect('/fruits'); // redirect to /fruits route to get to index page
});

// ************* DELETE - DELETE FRUIT ***********
app.delete('/fruits/:id', (req, res) => {
    // remove the fruit item from the fruits array
    fruits.splice(parseInt(req.params.id), 1);
    console.log(fruits);
    res.redirect('/fruits'); // redirect back to index page (/fruits)
});

// ********** POST NEW FRUIT ************
app.post('/fruits', (req, res) => {
    console.log('---------- FORM BODY ---------\n', req.body);
    // add more code here
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else { // req.body.readyToEat will be undefined (unchecked)
        req.body.readyToEat = false;
    }
    fruits.push(req.body);
    res.redirect('/fruits');
});

// ----------- LISTEN FOR SERVER ----------
app.listen(PORT, () => {
    console.log('🎧 Server is running on PORT 🎧', PORT);
});


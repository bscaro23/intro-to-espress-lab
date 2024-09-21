// Import Express
const express = require('express')

// Create an Express app
const app = express()

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
// Define routes here:


// 1.
app.get('/greetings/:username', (req, res) => {
    res.send(`Hello ${req.params.username}!`);
  });
  
// 2.
  app.get('/roll/:dice', (req, res) =>{
    const dice = req.params.dice;

    if (!isNaN(dice)){
        res.send(`You rolled a ${getRandomInt(dice)}`);
    } else{
        res.send('You must specify a number.');
    }
  });


  // 3.

  const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  app.get('/collectibles/:cIndex', (req, res) =>{
    const idx = req.params.cIndex;
    if (collectibles.length > idx && idx >= 0){
        res.send(`So, you want the ${collectibles[idx].name}? For ${collectibles[idx].price}, it can be yours!`);
    } else {
        res.send('This item is not yet in stock. Check back soon!');
    }
  })

  // 4.

  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) =>{
    const minPrice = req.query['min-price'], maxPrice = req.query['max-price'], shoeType = req.query.type;
    const arrOfShoes = [];
    for (let x = 0; x < shoes.length; x++){
        if (minPrice && minPrice > shoes[x].price){
            continue;
        }
        if (maxPrice && maxPrice < shoes[x].price){
            continue;
        }
        if (shoeType && shoeType !== shoes[x].type){
            continue;
        }
        arrOfShoes.push(shoes[x]);
    }
    
    res.json(arrOfShoes);
});


// Listen for requests on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000')
  });
  
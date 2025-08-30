import express from 'express';
const app = express();
const PORT = 3000;


//req = request res = response
//create an endpoint to handle get request / 
/*
app.get('/info',(req,res) => {

res.send('name: jhed');
});

app.get('/:id', (req, res) => {

const id = req.params.id;
console.log(`Received request for ID: ${id}`);

});
*/
//get an endpoint to handle get request /hello/:name showing message 
// result hello john doe!
/*
app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  console.log("hello:", name);
  res.send(`Hello: ${name}!`);
});     
*/
app.get('/foo', (req, res) => {
  console.log(req.query);
});

app.get('/IT', (req, res) => {

const body = req.body;
console.log(req.body);

});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


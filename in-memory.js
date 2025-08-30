import express from 'express';

const app = express();
const PORT = 3000;
app.use(express.json());

let products =[
    {"id": 1, "name": "Laptop", "price": 1000},
    {"id": 2, "name": "Smartphone", "price": 500},
    {"id": 3, "name": "Tablet", "price": 300}
];
//endpoint to get all products
app.get('/products', (req, res) => {
    res.json(products)
    
    });

//endpoint to get a product by id
app.get('/products/:id', (req, res) => {
    const id = parseInt (req.params.id);
    const product = products.find(p => p.id === id);
    
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }else{
    res.status(200).json(product)
    console.log(product.name)
}
});

// Endpoint to create a new product
app.post('/products', (req, res) => {
    console.log(req.body);
    // Find the highest existing ID to generate a new one
    const newId = Math.max(...products.map(p => p.id)) + 1;

    const newProduct = {
        id: newId,
        name: req.body.name,
        price: req.body.price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Endpoint to update a product by ID
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    products[productIndex].name = req.body.name;
    products[productIndex].price = req.body.price;

    res.status(200).json(products[productIndex]);
});

// Endpoint to delete a product by ID
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    products.splice(productIndex, 1);
    res.status(204).send();
});

app.listen(PORT,() => console.log(`Server is running on http://localhost:${PORT}`));   
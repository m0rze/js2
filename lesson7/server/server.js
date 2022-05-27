const express = require("express");
const fileSystem = require("fs");
const path = require("path");

const productsDbPath = path.join(__dirname, './db/products.json');
const cartDBPath = path.join(__dirname, './db/userCart.json');

const api = express();
const cors = require("cors");
api.use(cors());
api.use('/', express.static('./'));
api.use(express.json());

api.get('/api/products', (
    req,
    res
) => {
    fileSystem.readFile(productsDbPath, 'utf-8', (error, data) => {
        if (error) res.send(error);
        else res.send(data);
    });
});

api.get('/api/basket', (
    req,
    res
) => {
    fileSystem.readFile(cartDBPath, 'utf-8', (error, data) => {
        if (error) res.send(error);
        else res.send(data);
    });
});

api.post('/api/basket', (
    req,
    res) => {
    fileSystem.readFile(cartDBPath, 'utf-8',
        (error, data) => {
            if (error) res.send(error);
            else {
                const currentCart = JSON.parse(data);
                req.body.quantity = 1;
                currentCart.contents.push(req.body);
                currentCart.amount += req.body.quantity * req.body.price;
                currentCart.countGoods++;
                fileSystem.writeFile(cartDBPath,
                    JSON.stringify(currentCart),
                    'utf-8',
                    (error) => {
                        if (error) res.send(error);
                        else res.send(JSON.stringify({ result: 1 }));
                    });
            }

        });
});

api.put('/api/basket/:id', (
    req,
    res) => {
    fileSystem.readFile(cartDBPath, 'utf-8',
        (error, data) => {
            if (error) res.send(error);
            else {
                const currentCart = JSON.parse(data);
                const findProduct = currentCart.contents.find((product) => {
                    return product.id_product === +req.params.id;
                });
                currentCart.amount += req.body.quantity * findProduct.price;
                findProduct.quantity += req.body.quantity;
                fileSystem.writeFile(cartDBPath,
                    JSON.stringify(currentCart),
                    'utf-8',
                    (error) => {
                        if (error) res.send(error);
                        else res.send(JSON.stringify({ result: 1 }));
                    });
            }

        });
});

api.delete('/api/basket/:id', (
    req,
    res) => {
    fileSystem.readFile(cartDBPath, 'utf-8',
        (error, data) => {
            if (error) res.send(error);
            else {
                const currentCart = JSON.parse(data);
                let i = 0;
                currentCart.contents.forEach((product) => {
                    if (product.id_product === +req.params.id) {
                        currentCart.contents.splice(i, 1);
                        return;
                    }
                    i++;
                });

                fileSystem.writeFile(cartDBPath,
                    JSON.stringify(currentCart),
                    'utf-8',
                    (error) => {
                        if (error) res.send(error);
                        else res.send(JSON.stringify({ result: 1 }));
                    });
            }

        });
});

api.listen(5555, () => {
    console.log("Server started");
});
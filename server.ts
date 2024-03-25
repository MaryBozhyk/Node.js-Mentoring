import express, { Express } from "express";
import { cartRouter } from './controllers/cart.controller';
import { productRouter } from './controllers/product.controller';


const app: Express = express();

app.listen(8000, () => {
    console.log('Server is started');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/profile/cart', cartRouter);
import express from 'express'
import cors from 'cors';
import { lowDbAdapter } from './services/lowdblib.js'
import { personRoutes } from './routes/person.routes.js'
import { personController } from './controllers/person.controller.js'

const app = express()
const port = process.env.PORT || 3000;
const allowedOrigins = ['http://localhost:4200', 'http://localhost:' + port];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};
lowDbAdapter.useDb('db1').then(db => {
    //middlewares
    app.use(cors(options));
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    personController.db = lowDbAdapter;

    //routes
    app.use('/api/v1/persons', personRoutes)

})

console.log('==========================================================')

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
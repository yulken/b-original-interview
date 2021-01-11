import express from 'express';
import routes from './routes';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const app = express();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Banco Original's Interview Task",
            version: "1.0.0",
            description:
                "An interview task from Banco Original",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Caio Torres",
                url: "https://github.com/yulken",
                email: "caiocftorres@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3333",
            },
        ],
    },
    apis: ["./models/Client.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

app.use(express.json());
app.use(routes)

app.listen(3333, () => {
    console.log("Server Running!")
});
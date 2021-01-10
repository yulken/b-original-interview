import Router from 'express';
import Client from '../models/Client'
const routes = Router();

routes.get('/clients', async (request, response) => {
    const clients = await Client.findAll({});
    return response.json({ clients })
})

routes.get('/clients/:email', async (request, response) => {
    const { email } = request.params
    const clients = await Client.findAll({ where: { email: `${email}` } });
    return response.json({ clients })
})

routes.post('/clients', async (request, response) => {
    const { name, cpf, email } = request.body;
    const client = await Client.create({ name, email, cpf })
    return response.json({ client })
});

export default routes;
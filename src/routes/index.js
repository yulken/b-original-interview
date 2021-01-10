import Router from 'express';
import ClientService from '../services/ClientService';
const routes = Router();

const clientService = new ClientService();

routes.get('/clients', async (request, response) => {
    const clients = await clientService.findAll();
    return response.json(clients)
})

routes.get('/clients/:email', async (request, response) => {
    const { email } = request.params
    const client = await clientService.findByEmail(email);
    return response.json(client)
})

routes.post('/clients', async (request, response) => {
    const { name, cpf, email, cep } = request.body;
    try {
        const client = await clientService.create(name, cpf, email, cep)
        return response.json(client)
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});


export default routes;
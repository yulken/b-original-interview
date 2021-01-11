import Client from '../models/Client';
import api from '../services/apiClient';

export default class ClientService {
    async findAll() {
        const clients = await Client.findAll({});
        if (clients.length == 0) {
            throw new Error("Client Not Found")
        }
        return clients;

    }
    async findByEmail(email) {
        const clients = await Client.findAll({ where: { email: `${email}` } });
        if (clients.length == 0) {
            throw new Error("Client Not Found")
        }
        return clients;
    }
    async create(name, cpf, email, cep) {
        const hasCpf = await Client.findAll({ where: { cpf: `${cpf}` } });
        if (hasCpf.length > 0) {
            throw new Error('Client already registered. Duplicated CPF.');
        }
        const hasEmail = await Client.findAll({ where: { email: `${email}` } });
        if (hasEmail.length > 0) {
            throw new Error('Client already registered. Duplicated Email.');
        }
        try {
            const address = await api.get(`ws/${cep.replace(/\D+/g, '')}/json/`)
            if (address.data.erro == true) {
                throw new Error('Invalid CEP');
            }
            const client = await Client.create({
                name,
                email,
                cpf,
                logradouro: address.data.logradouro,
                bairro: address.data.bairro,
                localidade: address.data.localidade,
                uf: address.data.uf
            })
            return client;
        }
        catch (err) {
            throw new Error('Invalid CEP');
        }
    }

}
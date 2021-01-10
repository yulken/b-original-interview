import Client from '../models/Client';
import api from '../services/apiClient';

export default class ClientService {
    async findAll() {
        try {
            const clients = await Client.findAll({});
            return clients;
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async findByEmail(email) {
        try {
            const clients = await Client.findAll({ where: { email: `${email}` } });
            return clients;
        }
        catch (err) {
            throw new Error(err);
        }
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
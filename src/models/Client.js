import { Sequelize, DataTypes } from 'sequelize';
import database from '../database'

const Client = database.define('clients', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

export default Client;
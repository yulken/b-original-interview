import Sequelize from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'interview.db'
});

export default sequelize;
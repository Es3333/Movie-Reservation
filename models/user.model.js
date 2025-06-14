const {DataTypes}= require('sequelize')
const sequelize = require('./db')

const UserModel = sequelize.define('newUsers', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'regular_user'
        }
    },
    {
        timestamps: true,
    }
);


module.exports = UserModel;
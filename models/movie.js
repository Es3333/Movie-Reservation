const {DataTypes} = require('sequelize')
const sequlize = require('./db')


const Movie = sequlize.define ('Movie', {

    name :{
        type :DataTypes.STRING ,
        allowNull : false
    },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        posterImage: {
            type: DataTypes.STRING,

        },
    },
    { timestamps: true });


module.exports =Movie
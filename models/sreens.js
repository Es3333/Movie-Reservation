const {DataTypes} = require('sequelize')
const sequelize= require('./db')
const movies =require('./movie')
const screens = sequelize.define ('screens' , {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },


    movieId :{
type : DataTypes.INTEGER ,
 allowNull : false ,
 references :{
    model : movies ,
     key : 'id'

 }
    }





} , { timestamps: true })
movies.hasMany(screens ,{ foreignKey: 'movieId' ,onDelete: 'CASCADE' } ,   )
screens.belongsTo(movies, { foreignKey: 'movieId' })

module.exports = screens
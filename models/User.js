const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

//User Model
class User extends Model {
    //bcrypt 
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
};

//Initialize User
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        },
        
        //Password Hashing
        hooks: {
            async beforeCreate(newUser){
                userData.password = await bcrypt.hash(userData.password, 10);
                return userData;
            },

            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },

        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

//Exporting Model
module.exports = User;
const { where } = require("sequelize");
const db = require("../config/db");

//Table
exports.createNewTable = async (tableName, fields ) => {

    try{
        const Users = await db.define(tableName,        
            fields, 
            {
                freezeTableName: true,
            },
        );

        Users.sync({alter: true});
    }catch(err){
        console.log(err);
    }

}


//Users
exports.createUser = async (userData) => {
    const Users = await db.models.users;

    if(!Users){
        throw new Error("Tabela users não existe.");
    }

    try{
        const newUser = await Users.create(userData);

        return newUser;
    }catch(err){
        console.log(err);
    }
}

exports.updateUser = async (userData, userId) => {
    const Users = await db.models.users;

    if(!Users){
        throw new Error("Tabela users não existe.");
    }

    try{
        const updatedUser = await Users.update(userData, {
            where: { id: userId },
            returning: true
        });

        return updatedUser;
    }catch(err){
        console.log(err);
    }
}

exports.deleteUser = async (userId) => {
    const Users = await db.models.users;

    if(!Users){
        throw new Error("Tabela users não existe.");
    }

    try{
        const result = await Users.destroy({
            where: {
                id: userId
            }
        });

        return result;
    }catch(err){
        console.log(err);
    }
}

exports.getUser = async (userId) => {
    const Users = await db.models.users;

    if(!Users){
        throw new Error("Tabela users não existe.");
    }

    try{
        const user = await Users.findByPk(userId);

        return user;
    }catch(err){
        console(err);
    }
}

exports.getUsers = async () => {
    const Users = await db.models.users;
    
    if(!Users){
        throw new Error("Tabela users não existe.");
    }

    try{
        const users = await Users.findAll();

        return users;
    }catch(err){
        console(err);
    }
}



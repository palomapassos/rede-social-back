const {  DataTypes } = require("sequelize");
const db = require("../config/db");



//Posts Table
const createPostsTable = async (Users) => {

    try{
        const Posts = await db.define("posts",        
            {
                id: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  primaryKey: true
                },
                title: {
                  type: DataTypes.STRING
                },
                text: {
                  type: DataTypes.STRING
                },
              }, 
            {
                freezeTableName: true,
            },
        );

        Posts.belongsTo(Users, {
            foreignKey: {
                name: "userId",
                allowNull: false
            },
            onDelete: "CASCADE",
        });

        Users.hasMany(Posts, {
            foreignKey: "userId"
        });

        // Users.sync({alter: true});
        db.sync({alter: true});
    }catch(err){
        console.log(err);
    }

}

//Users Table
exports.createUsersTable = async () => {

    try{
        const Users = await db.define("users",        
            {
                id: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  primaryKey: true
                },
                name: {
                  type: DataTypes.STRING
                },
                email: {
                  type: DataTypes.STRING
                },
                password: {
                  type: DataTypes.STRING
                }
              }, 
            {
                freezeTableName: true
            },
        );

        Users.sync({alter: true});

        await createPostsTable(Users);
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

// Posts
exports.createPost = async (postData) => {
    const Posts = await db.models.posts;

    if(!Posts){
        throw new Error("Tabela posts não existe.");
    }

    try{
        const newPost = await Posts.create(postData);

        return newPost;
    }catch(err){
        console.log(err);
    }
}

exports.deletePost = async (postId) => {
    const Posts = await db.models.posts;

    if(!Posts){
        throw new Error("Tabela posts não existe.");
    }

    try{
        const result = await Posts.destroy({
            where: {
                id: postId
            }
        });

        return result;
    }catch(err){
        console.log(err);
    }
}

exports.getPosts = async () => {
    const Posts = await db.models.posts;
    
    if(!Posts){
        throw new Error("Tabela posts não existe.");
    }

    try{
        const posts = await Posts.findAll();

        return posts;
    }catch(err){
        console(err);
    }
}

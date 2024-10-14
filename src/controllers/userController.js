const userModel = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const { createUsersTable, createUser, updateUser, deleteUser, getUser, getUsers, createPost, deletePost, getPosts } = userModel;


// Create Users Table e Posts Table
exports.createTables = async (req, res) => {
    try{
        const result = await createUsersTable();
        console.log("Tabela de usuários e tabela de posts criadas com sucesso.");
        return res.status(200).send(result);

    }catch(err){
        console.log(err);
        return res.status(500).send("Erro ao criar tabela de usuários."); 
    }
};

//Users
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).send("Nome, Email e Senha são obrigatórios.")
    }

    try{
        const users = await getUsers();

        if(users.find(u => u.email === email)){
            res.status(400).send("Usuário já está cadastrado.")
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = { name, email, password: hashPassword };

        const result = await createUser(user);

        console.log("Usuário criado com sucesso.");
        return res.status(201).send(result);

    }catch(err){
        console.log(err);
        return res.status(500).send("Erro ao criar usuário.");
    }
}

exports.updateUser = async (req, res) => {
    const { name, email, password, id } = req.body;

    if(!name || !email || !password || !id){
        return res.status(400).send("Nome, Id, Email e Senha são obrigatórios.")
    }

    try{
        const users = await getUsers();

        if(!users.find(u => u.id === id)){
            return res.status(400).send("Usuário não encontrado.")
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = { name, email, password: hashPassword };

        const result = await updateUser(user, id);

        console.log("Usuário atualizado com sucesso.");
        return res.status(200).send(result);
    }catch(err){
        console.log(err);
        return res.status(500).send("Erro ao atualizar usuário.");
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    if(!id){
        return res.status(400).send("Id do usuário é obrigatório.");
    }

    try{
        const users = await getUsers();

        if(!users.find(u => u.id == id)){
            return res.status(400).send("Usuário não encontrado.");
        }

        await deleteUser(id);

        console.log("Usuário deletado com sucesso.");
        return res.status(200).send("Usuário deletado");

    }catch(err){
        console.log(err);
        return res.status(500).send("Erro ao deletar usuário.");
    }
}

exports.getUser = async (req, res) => {
    const { id } = req.params;

    if(!id){
        return res.status(400).send("Id é obrigatório.")
    }

    try{
        const result = await getUser(id);

        return res.status(200).send(result);
    
    }catch(err){
        console.log(err);
        return res.status(500).send("Erro ao buscar usuário.");
    }
}

exports.getUsers = async (req, res) => {
    try{
        const result = await getUsers();

        return res.status(200).send(result);
    
    }catch(err){
        console.log(err);
        return res.status(500).send("Erro ao buscar usuários.");
    }
}

// Posts
exports.createPost = async (req, res) => {
    const { title, text, image, userId } = req.body;

    if(!title || !text || !userId){
        return res.status(400).send("Título, texto e id de usuário são obrigatórios.");
    }

    const auth = req.headers.authorization;
    const token = auth ? auth.split(" ")[1] : "";
    const decodedToken = token ? jwt.decode(token) : "";
 
    if(!decodedToken || decodedToken.id != userId){
        return res.status(403).send("Você não tem autorização para realizar essa ação.")
    }

    try{
        const post = { title, text, image, userId };

        const result = await createPost(post);

        console.log("Post criado com sucesso.");
        return res.status(201).send(result);

    }catch(err){
        console.log(err);
        return res.status(500).send("Erro ao criar post.");
    }
}

exports.deletePost = async (req, res) => {
    const { id } = req.params;

    if(!id){
        return res.status(400).send("Id do post é obrigatório.");
    }

    try{
        const posts = await getPosts();
        const currentPost = posts.find(u => u.id == id);

        if(!currentPost){
            return res.status(400).send("Post não encontrado.");
        }

        const auth = req.headers.authorization;
        const token = auth ? auth.split(" ")[1] : "";
        const decodedToken = token ? jwt.decode(token) : "";
     
        if(!decodedToken || decodedToken.id != currentPost.userId){
            return res.status(403).send("Você não tem autorização para realizar essa ação.")
        }

        await deletePost(id);

        console.log("Post deletado com sucesso.");
        return res.status(200).send("Post deletado");

    }catch(err){
        console.log(err);
        return res.status(500).send("Erro ao deletar post.");
    }
}

exports.getPosts = async (req, res) => {
    try{
        const result = await getPosts();

        return res.status(200).send(result);
    
    }catch(err){
        console.log(err);
        return res.status(500).send("Erro ao buscar posts.");
    }
}

//Login

exports.auth = async (req, res) => {
    const { email, password } = req.body;

    try{
        const users = await getUsers();
        const user = users.find(u => u.email === email);

        if(!user){
            return res.status(400).send("Não existe usuário cadastrado com esse email.")
        }

        const isSamePassword = await bcrypt.compare(password, user.password);

      

        if(!isSamePassword){
            return res.status(400).send("Sua senha está incorreta.")
        }

        const token = generateToken({ id: user.id }, { expiresIn: 120 });

        return res.status(200).send({ a_token: token });

    }catch(err){
        console.log(err);
        return res.status(500).send("Erro ao tentar logar.");
    }
}

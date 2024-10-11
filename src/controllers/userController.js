const userModel = require("../models/userModel");

const { createNewTable, createUser, updateUser, deleteUser, getUser, getUsers } = userModel;

//Table
exports.createNewTable = async (req, res) => {
    const {tableName, fields} = req.body;

    if(!tableName || !fields){
        return res.status(400).send("Nome da tabela e campos são obrigatórios");
    }

    try{
        const result = createNewTable(tableName, fields);
        res.status(200).send(result);
        console.log("Tabela criada com sucesso.");

    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao criar tabela."); 
    }
};

//Users
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).send("Nome, Email e Senha são obrigatórios.")
    }

    const user = { name, email, password };

    try{
        const result = await createUser(user);

        res.status(201).send(result);
        console.log("Usuário criado com sucesso.");
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao criar usuário.");
    }
}

exports.updateUser = async (req, res) => {
    const { name, email, password, id } = req.body;

    if(!name || !email || !password || !id){
        return res.status(400).send("Nome, Id, Email e Senha são obrigatórios.")
    }

    const user = { name, email, password };

    try{
        const result = await updateUser(user, id);

        res.status(200).send(result);
        console.log("Usuário atualizado com sucesso.");
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao atualizar usuário.");
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    if(!id){
        res.status(400).send("Id do usuário é obrigatório.")
    }

    try{
        await deleteUser(id);

        res.status(200).send("Usuário deletado");
        console.log("Usuário deletado com sucesso.")

    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao deletar usuário.");
    }
}

exports.getUser = async (req, res) => {
    const { id } = req.params;

    if(!id){
        return res.status(400).send("Id é obrigatório.")
    }

  
    try{
        const result = await getUser(id);

        res.status(200).send(result);
    
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao buscar usuário.");
    }
}

exports.getUsers = async (req, res) => {
    try{
        const result = await getUsers();

        res.status(200).send(result);
    
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao buscar usuários.");
    }
}

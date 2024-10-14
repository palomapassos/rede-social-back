const express = require('express');
const { onlyAuthRoutes, generalRoutes } = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(generalRoutes);
app.use(onlyAuthRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
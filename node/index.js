const express = require('express');
const mysql = require("mysql");
const app = express();
const port = 3000;

const config = {
    host: "mysql",
    user: "root",
    password: "root",
    database: "nodedb"
};
const connection = mysql.createConnection(config);

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão ao banco de dados estabelecida com sucesso');
});
 
// Rota para exibir a lista de nomes
app.get('/', (req, res) =>  {
    const sql = `INSERT INTO people (name) values ("EMILY")`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao inserir nome:', err);
            res.send('Erro ao inserir nome');
        } else {
            connection.query('SELECT * FROM people', (err, results) => {
                if (err) {
                    console.error('Erro ao buscar os nomes:', err);
                    res.send('Erro ao buscar os nomes');
                } else {
                    const names = results;
                    res.send(`
                        <h1>Full Cycle Rocks!</h1>
                        <ul>
                            ${names.map(name => `<li>${name.name}</li>`).join('')}
                        </ul>
                    `);
                }
            });
        }
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
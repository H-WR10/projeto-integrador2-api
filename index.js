import express from "express";

const app = express()
app.use(express.json())

let usuarios = [{
    id:234234,
    nome:"maria",
    idade: 33,
    email: "maria@mail.com"

},{ 
  id: 789101,
  nome: "Roberto",
  idade: 28,
  email: "roberto@mail.com"
}];
//Retorna os usuarios
app.get('/usuarios', (request, response) => {
  
  response.json(usuarios)

})
// criar usuarios
app.post('/usuarios', (request, response) => {

  console.log(request)

  usuarios.push(request.body)

  response.json(request.body)
   
})

app.get('/usuarios/:id', (request, response) => {
    const id = request.params.id; 
    const usuario = usuarios.find(u => u.id == id); 
    
    response.json(usuario); 
});
app.put('/usuarios/:id', (request, response) => {
    const id = request.params.id;
    const novosDados = request.body;

    // Encontra o índice do usuário no array
    const index = usuarios.findIndex(u => u.id == id);

    if (index === -1) {
        return response.status(404).json({ erro: "Usuário não encontrado." });
    }

    usuarios[index] = { id: Number(id), ...novosDados };

    return response.json(usuarios[index]);
});

app.delete('/usuarios/:id', (request, response) => {
    const id = request.params.id;
    const index = usuarios.findIndex(u => u.id == id);

    if (index === -1) {
        return response.status(404).json({ erro: "Usuário não encontrado." });
    }
    // Remove o usuário do array
    usuarios.splice(index, 1);

    return response.json({ mensagem: "Usuário deletado com sucesso!" });
});

app.listen(3333,() =>{
    console.log("servidor Rodando na porta 3333")
})
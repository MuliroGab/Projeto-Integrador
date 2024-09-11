const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
  titulo: String,
  pdf: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuarios', // 'Usuario' deve ser o nome do modelo de usuários
    required: true
  }
});

const livro = mongoose.model('livros1', livroSchema);

module.exports = livro;
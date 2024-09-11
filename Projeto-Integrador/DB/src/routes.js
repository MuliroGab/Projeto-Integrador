const express = require('express')
const mongoose = require('mongoose');
const usuario = require('../models/usuarios');
const db = require('./db');
const config = require('./config');
const Log = require('../models/logs')

const routes = express.Router();

routes.get('/login', async (req, res) => {
    try {
      const userse = await usuario.find()
      res.status(200).json(userse)
    }
    catch (error) {
      res.status(500).json({ error: error })
    }
  });

routes.post('/login' , async (req,res) => {
    console.log('Dados recebidos no servidor:', req.body);
    const { nome, senha } = req.body;
  
    try {
      const user = await usuario.findOne({ nome });

      if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado' });
      }
  
      if (user.senha !== senha) {
        return res.status(400).json({ message: 'Senha incorreta' });
      }
  
      res.status(200).json({ message: 'Login bem-sucedido' });
  } catch (error) {
      res.status(500).json({ error: error });
  }
});


routes.post('/add-log', async (req, res) => {
  const { action, user, door } = req.body;

  try {
    const newLog = new Log({ action, user, door });
    await newLog.save();
    res.status(200).json({ message: 'Log adicionado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar log' });
  }
});

// Rota para buscar todos os logs
routes.get('/logs', async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 });  // Retorna os logs mais recentes primeiro
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar logs' });
  }
});



module.exports = routes;
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Função para registrar um usuário
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao registrar o usuário" });
  }
};

// Função para fazer login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    // Criar um token JWT
    const token = jwt.sign({ id: user._id }, "seu_segredo", {
      expiresIn: "1d",
    }); // Substitua 'seu_segredo'

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao fazer login" });
  }
};

// Função para recuperar a senha (exemplo simplificado)
exports.forgotPassword = async (req, res) => {
  // Implemente a lógica para enviar um e-mail com um link de redefinição de senha
  res.json({ message: "Implementação pendente" });
};

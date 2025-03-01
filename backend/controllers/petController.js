const Pet = require("../models/Pet");
const multer = require("multer");
const path = require("path");

// Configuração do Multer para o upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Pasta onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`); // Nome do arquivo
  },
});

const upload = multer({ storage: storage });

exports.createPet = async (req, res) => {
  try {
    const { userId, name, breed, ageMonths, vaccinated } = req.body;
    const picture = req.file ? req.file.filename : null; // Pega o nome do arquivo se existir

    const pet = new Pet({
      userId,
      name,
      breed,
      ageMonths,
      picture,
      vaccinated,
    });

    await pet.save();
    res.status(201).json({ message: "Pet criado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar o pet" });
  }
};

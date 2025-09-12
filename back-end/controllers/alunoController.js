const createAlunoUC = require('../use-cases/aluno/createAluno');
const getAllAlunosUC = require('../use-cases/aluno/getAllAlunos');
const getAlunoByIdUC = require('../use-cases/aluno/getAlunoById');
const updateAlunoUC = require('../use-cases/aluno/updateAluno');
const deleteAlunoUC = require('../use-cases/aluno/deleteAluno');

// Criar novo Aluno
const createAluno = async (req, res) => {
  try {
    const result = await createAlunoUC(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor' });
  }
};

// Buscar todos os alunos
const getAllAlunos = async (req, res) => {
  try {
    const alunos = await getAllAlunosUC();
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Erro ao buscar alunos' });
  }
};

// Buscar aluno por ID
const getAlunoById = async (req, res) => {
  try {
    const aluno = await getAlunoByIdUC(req.params.id);
    res.status(200).json(aluno);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// Atualizar aluno
const updateAluno = async (req, res) => {
  try {
    const result = await updateAlunoUC(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// Deletar aluno
const deleteAluno = async (req, res) => {
  try {
    const result = await deleteAlunoUC(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  createAluno,
  getAllAlunos,
  getAlunoById,
  updateAluno,
  deleteAluno
};

import { insertPolicial, listPoliciais } from '../models/policiais.model.js';
import { encrypt } from '../utils/crypto.js';
// REMOVA a importação do validador de CPF
// import { cpf } from 'cpf-cnpj-validator';

export async function cadastrarPolicial(req, res) {
  try {
    const { rg_civil, rg_militar, cpf: cpfValue, data_nascimento, matricula, nome_de_escala } = req.body;

    // Validar campos obrigatórios
    if (!rg_civil || !rg_militar || !cpfValue || !data_nascimento || !matricula || !nome_de_escala) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    // ✅ REMOVA a validação de CPF - agora aceita qualquer número
    // if (!cpf.isValid(cpfValue)) {
    //   return res.status(400).json({ error: "CPF inválido" });
    // }

    // Criptografar matrícula
    const matriculaCripto = encrypt(matricula);
    
    // Inserir no banco
    const id = await insertPolicial({ 
      rg_civil, 
      rg_militar, 
      cpf: cpfValue, 
      data_nascimento, 
      matricula: matriculaCripto,
      nome_de_escala
    });

    res.status(201).json({ message: "Policial cadastrado com sucesso", id });
  } catch (err) {
    console.error('Erro no cadastro:', err);
    
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: "Já existe um policial com este RG civil, RG militar ou CPF" });
    }
    
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function listarPoliciais(req, res) {
  try {
    const { filtro } = req.query;
    const policiais = await listPoliciais(filtro || null);
    res.json(policiais);
  } catch (err) {
    console.error('Erro na listagem:', err);
    res.status(500).json({ error: "Erro ao buscar policiais" });
  }
}

import { db } from '../config/db.js';
import { decrypt } from '../utils/crypto.js';

export async function insertPolicial({ rg_civil, rg_militar, cpf, data_nascimento, matricula, nome_de_escala }) {
  const [result] = await db.query(
    "INSERT INTO policiais (rg_civil, rg_militar, cpf, data_nascimento, matricula, nome_de_escala) VALUES (?, ?, ?, ?, ?, ?)",
    [rg_civil, rg_militar, cpf, data_nascimento, matricula, nome_de_escala]
  );
  return result.insertId;
}

export async function listPoliciais(filtro = null) {
  let query = "SELECT id, rg_civil, rg_militar, cpf, data_nascimento, matricula, nome_de_escala FROM policiais";
  let params = [];
  
  if (filtro) {
    query += " WHERE cpf LIKE ? OR rg_civil LIKE ? OR rg_militar LIKE ? OR nome_de_escala LIKE ?";
    params = [`%${filtro}%`, `%${filtro}%`, `%${filtro}%`, `%${filtro}%`];
  }
  
  const [rows] = await db.query(query, params);
  
  // Descriptografar a matrícula de cada policial
  const policiaisComMatriculaDescriptografada = await Promise.all(
    rows.map(async (policial) => {
      try {
        return {
          ...policial,
          matricula: await decrypt(policial.matricula)
        };
      } catch (error) {
        console.error('Erro ao descriptografar matrícula:', error);
        return {
          ...policial,
          matricula: 'Erro na descriptografia'
        };
      }
    })
  );
  
  return policiaisComMatriculaDescriptografada;
}


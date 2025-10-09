import db from "../db.js";
import bcrypt from "bcrypt";
import { createToken, denyToken } from "../services/tokenService.js";

const sanitizeUser = (u) => ({
  id: u.id,
  name: u.name,
  email: u.email, //remove dados sensíveis como senha
});
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Envie email e password" });
  }
  try {
    const [rows] = await db.query("SELECT * from users WHERE email =?", [
      email,
    ]);
    if (!rows.lenght)
      return res.status(401).json({ error: "Credenciais inválidas" });
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Credenciais inválidas" });
    const token = createToken({ id: user.id });
    return res.json({ token, user: sanitizeUser(user) });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao registar usuário" });
  }
};
export const logout = async (req, res) => {
  try {
    const { jti } = req.user;
    denyToken(jti); //adiciona a lista de bloqueios
    return res.json({ message: "Logout realizado com sucesso" });
  } catch (err) {
    console.error("logout error:", err);
    return res.status(500).json({ error: "Erro no logout" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword)
    return res.status(400).json({ error: "Envie email e newPassword" });
  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE users SET password = ? WHERE email = ?", [
      hashed,
      email,
    ]);
    // Mensagem genérica: não revela se e-mail existe
    return res.json({
      message: "Se o e-mail existir, a senha foi redefinida.",
    });
  } catch (err) {
    console.error("forgotPassword error:", err);
    return res.status(500).json({ error: "Erro ao redefinir senha" });
  }
};
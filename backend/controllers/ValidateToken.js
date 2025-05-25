const validateToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: true, message: "Token no proporcionado" });
  }

  if (token.startsWith("fake-jwt-token-")) {
    return res.json({ error: false, message: "Token válido" });
  }

  return res.status(401).json({ error: true, message: "Token inválido" });
};

module.exports = validateToken;
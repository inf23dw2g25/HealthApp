const express = require("express");
const passport = require("passport");
const router = express.Router();

// Exemplo de rota para autenticação com o Google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Rota de retorno do Google após a autenticação
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Após a autenticação bem-sucedida, você pode acessar o código de autorização no req.query.code
    const code = req.query.code;
    // Exemplo de armazenamento do código em uma variável de sessão (requer que você use uma biblioteca de sessão)
    req.session.authorizationCode = code;
    // Redirecionar para a página inicial ou para qualquer outra página que desejar
    res.redirect("/");
  }
);

module.exports = router;

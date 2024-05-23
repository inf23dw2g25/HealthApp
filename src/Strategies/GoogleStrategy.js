const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "860907029773-f1k556igmjvjdm8lpg0cja24olm2mhnf.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Aqui você pode salvar o accessToken no localStorage
      localStorage.setItem("accessToken", accessToken);
      // Chame done() com o usuário ou null se ocorrer um erro
      return done(null, profile);
    }
  )
);

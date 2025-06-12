import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Usuario from '../models/Usuario.js';
import dotenv from 'dotenv';

dotenv.config(); // Cargamos las variables de entorno desde el .env (clientID, secret, callback)

// Activamos la estrategia de Google para que Passport pueda iniciar sesión con OAuth2
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,          // ID de cliente de Google Cloud
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // Clave secreta de cliente
      callbackURL: process.env.GOOGLE_CALLBACK_URL     // URL a la que Google redirige tras iniciar sesión
    },
    // Esta función se ejecuta cuando Google responde con los datos del usuario
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extraigo email y nombre del perfil recibido
        const email = profile.emails?.[0]?.value || '';
        const nombre = profile.displayName || '';

        // Busco si el usuario ya existe en mi base de datos por su Google ID
        let usuario = await Usuario.findOne({ googleId: profile.id });

        // Si no existe, lo creo con los datos básicos que nos da Google
        if (!usuario) {
          usuario = await Usuario.create({
            googleId: profile.id,
            nombre,
            email
          });
        }

        // Finalizamos la autenticación pasando el usuario a Passport
        return done(null, usuario);
      } catch (error) {
        // Si hay un error, lo pasamos a Passport para que lo maneje
        return done(error, null);
      }
    }
  )
);

// Esta función indica qué información del usuario guardar en la cookie de sesión
passport.serializeUser((usuario, done) => {
  done(null, usuario._id); // Solo guardamos el ID del usuario
});

// Esta función se usa para obtener el usuario completo a partir del ID guardado en sesión
passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await Usuario.findById(id); // Recuperamos el usuario desde la base de datos
    done(null, usuario);
  } catch (error) {
    done(error, null);
  }
});



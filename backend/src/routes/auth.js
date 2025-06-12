// src/routes/auth.js
import express from 'express';
import passport from 'passport';

const router = express.Router();

// Ruta para iniciar el proceso de autenticación con Google
// Al acceder aquí, Passport redirige al usuario a la pantalla de Google
// Se solicitan los permisos de perfil y email
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Ruta a la que Google redirige tras iniciar sesión correctamente
// Si hay éxito, el usuario se guarda en la sesión y redirigimos al frontend
// En caso de fallo, redirige al inicio
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/', // Se puede cambiar a una página de error si se quiere
}), (req, res) => {
  // Redirige al perfil del frontend tras autenticación exitosa
  res.redirect('http://localhost:5173/perfil');
});

// Ruta para cerrar sesión
// routes/auth.js
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.clearCookie('connect.sid');
    res.status(200).json({ mensaje: 'Sesión cerrada correctamente' });
  });
});


export default router;


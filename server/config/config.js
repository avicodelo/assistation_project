/* Transformar el documento en .env (ver vídeo) */

process.env.PORT = process.env.PORT || 3002;
process.env.URL_DB = process.env.URL_DB ||  "mongodb://localhost:27017/assistationDB"
process.env.URL_SETPASS = process.env.URL_SETPASS || "http://localhost:3000/login/passwordForgotten/setpass"
process.env.SEED = process.env.SEED || "SUPER SECRET SEED"; 
process.env.MAIL = process.env.MAIL || "aitorvico.95@gmail.com";
process.env.MAILPASS = process.env.MAILPASS || "ebptbencivhbzzxn"

/* DATOS CORREO FAKE
nombre: Granville Farrell
email: granville.farrell@ethereal.email
pass: tkbXPTPhSHwRTzCKJf */
/* Transformar el documento en .env (ver vídeo) */

process.env.PORT = process.env.PORT || 3002;
process.env.URL_DB = process.env.URL_DB ||  "mongodb://localhost:27017/assistationDB"
process.env.SEED = process.env.SEED || "SUPER SECRET SEED"; 
process.env.MAIL = process.env.MAIL || "granville.farrell@ethereal.email";
process.env.MAILPASS = process.env.MAILPASS || "tkbXPTPhSHwRTzCKJf"

/* DATOS CORREO FAKE
nombre: Granville Farrell
email: granville.farrell@ethereal.email
pass: tkbXPTPhSHwRTzCKJf */
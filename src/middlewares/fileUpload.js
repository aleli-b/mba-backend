const multer = require('multer');
const path = require('path')

// Configurar multer para guardar los archivos con extensión .xlsx
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    // Cambiar la extensión del archivo a .xlsx
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage });

module.exports = upload;
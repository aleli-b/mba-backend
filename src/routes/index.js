const { Router } = require('express');
const { Streamer } = require('../db')
const dailyReportController = require('../controllers/daily.report.controller')
const upload = require('../middlewares/fileUpload')
const router = Router();
// Endpoint para subir el archivo
router.post('/upload', upload.single('file'), dailyReportController.readExcel)

module.exports = router;
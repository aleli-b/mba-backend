const { Router } = require('express');
const dailyReportController = require('../controllers/daily.report.controller')
const userController = require('../controllers/user.controller')
const upload = require('../middlewares/fileUpload')
const router = Router();
// Endpoint para subir el archivo
router.post('/upload', upload.single('file'), dailyReportController.readExcel)

router.post('/login', userController.login)

router.get('/users', dailyReportController.getDailyReports)

module.exports = router;
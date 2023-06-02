const { spawn } = require('child_process');
const path = require('path');
const { DailyReport } = require('../db')

async function readExcel(req, res) {
  // Obtener la ruta del archivo
  const filePath = path.join(__dirname, '..', '..', 'uploads', req.file.filename);
  const scriptPath = 'C:\\Users\\USUARIO\\Desktop\\SQL\\src\\routes\\script.py';

  // Llamar al script de Python como un proceso secundario
  const pythonProcess = spawn('python', [scriptPath, filePath]);

  // Manejar la salida del script de Python
  let output = ''

  pythonProcess.stdout.on('data', (data) => {
    output += data.toString()
    // return res.send('Archivo subido y procesado correctamente.');
  });
  pythonProcess.stdout.on('end', async () => {
    const outputer = JSON.parse(output)
    console.log('estoy entrando')

    for (const obj of outputer) {
      const dateValue = {};
      const fieldsToUpdate = {};

      Object.entries(obj).forEach(([key, value]) => {
        if (key.startsWith('total coins-')) {
          const date = key.substring('total coins-'.length);
          dateValue[date] = value;
        } else {
          fieldsToUpdate[key] = value;
        }
      });

      const existingDailyReport = await DailyReport.findOne({ where: { id: obj.id } });

      if (existingDailyReport) {
        // Update the existing record
        await existingDailyReport.update(fieldsToUpdate);

        if (dateValue) {
          existingDailyReport.date_value = { ...existingDailyReport.date_value, ...dateValue };
          await existingDailyReport.save();
        }
      } else {
        // Create a new record
        const recordData = { ...fieldsToUpdate, date_value: dateValue };
        await DailyReport.create(recordData);
      }
    }

    res.status(200).json({ message: 'Data processed successfully.' });
  });

  // Manejar los errores del script de Python
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error del script de Python: ${data}`);
  });

  // Manejar la finalización del script de Python
  pythonProcess.on('close', (code) => {
    console.log(`El script de Python finalizó con código ${code}`);
    // Enviar una respuesta al cliente
    // return res.send('Archivo subido y procesado correctamente.');
  });
};

async function getDailyReports(req, res) {
  try {
    const page = req.query.page;
    const limit = 50;
    const offset = page * limit
    const userDB = await DailyReport.findAll({ limit: limit, offset: offset })
    const totalUsers = await DailyReport.count();
    console.log('Total de usuarios:', totalUsers)
    console.log(userDB);
    res.send({
      users: userDB,
      total: totalUsers
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: 'ha habido un error' })
  }
}

module.exports = {
  readExcel,
  getDailyReports
}
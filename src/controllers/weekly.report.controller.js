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
  pythonProcess.stdout.on('end', () => {
    const outputer = JSON.parse(output)
    console.log('estoy entrando')
    for (const obj of outputer) {
      DailyReport.findOrCreate({
        where: {
          id: obj['id'],
          group_name: obj['group_name'],
          user_name: obj['user_name'],
          is_have_story: obj['is_have_story'],
          "gift coins": obj['gift coins'],
          host_wall_coins: obj['host_wall_coins'],
          friend_video_coins: obj['friend_video_coins'],
          'task coins': obj['task coins'],
          box_coins: obj['box_coins'],
          'total coins-Apr 11th': obj['total coins-Apr 11th'],
          group_time: obj['group_time'],
          match_count: obj['match_count'],
          match_times_duration: obj['match_times_duration'],
          kyc_pass: obj['kyc_pass'],
          video_status: obj['video_status'],
          category: obj['category'],
          'avg_friend_call_video_time-30days': obj['avg_friend_call_video_time-30days'],
          bank_country_ab: obj['bank_country_ab'],
          long_call_ratio: obj['long_call_ratio'],
          'total coins-Apr 10th-Apr 11th': obj['total coins-Apr 10th-Apr 11th']
        }
      })
    }
    console.log('estoy saliendo')
    res.send('Epic win!')
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

async function getWeeklyReports(req,res){
  try{
    const page = req.query.page;
    const limit = 50;
    const offset = page * limit
    const userDB = await DailyReport.findAll({ limit: limit, offset: offset})
    const totalUsers = await DailyReport.count();
    console.log('Total de usuarios:', totalUsers)
    console.log(userDB);
    res.send({users: userDB,
    total: totalUsers})
  } catch (error) {
    console.log(error)
    res.status(400).send({message: 'ha habido un error'})
  }
}

module.exports = {
  readExcel,
  getWeeklyReports
}
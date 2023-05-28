require ('dotenv').config({path:'./.env'});
const { Streamer } = require('../db')
const { User } = require('../db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;
const saltRounds = 5

async function login(req,res){
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findOne({ where: { username: username}});
        const result = await bcrypt.compare(password, user.password);
        if (!user) return res.status(404).send({
            msg: "Usuario no encontrado",
            ok: false
        })
        if(!result) {
            return res.status(404).send({
                msg: 'Login incorrecto', 
                ok: false
            })
        }
        
        const token = jwt.sign(user.toJSON(), secret, { expiresIn: '2h' });
        if(user) return res.status(200).send({
            msg: 'Login exitoso',
            ok: true,
            token,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            msg: "Error al loguearse",
            ok: false
        })
    }
}

async function addUsers(req,res){
    let password = req.body.password;
    try{
        const userToSave = new User({
            id: 1,
            username: req.body.username,            
            password: req.body.password,        
        })
        userToSave.username = userToSave.username?.toLowerCase();
        console.log(userToSave)
        const checkUser = await User.findOne({ where: { username: userToSave.username }});
        if(checkUser) return res.status(400).send("User en uso");
        const hash = await bcrypt.hash(password, saltRounds);
        userToSave.password = hash;
        const userSaved = await userToSave.save(); 
        userSaved.password = undefined;
        return res.send({            
            msg: 'Creacion exitosa',
            ok: true,
            user: userSaved
        });
    } catch(error) {
        console.log(error)
        res.send({ 
            msg: 'No se pudo guardar el usuario',
            ok: false
    });
    }
}

module.exports = {
    login,
    addUsers
 } 
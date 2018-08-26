const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nconf = require('../config/nconf');

module.exports.login = async function (req, res) {

   const candidate = await User.findOne({email: req.body.email});

   if (!candidate) {
       res.status(404).json({message: `${req.body.name} doesn\`t registered`});
   } else {
      const comparedPassword = bcrypt.compareSync(req.body.password, candidate.password);
      if (!comparedPassword) {
        res.status(401).json({message: `entered password or email is wrong, try again`});
      } else {
        const token = jwt.sign({
            name: candidate.name,
            email: candidate.email,
            userId: candidate._id
        }, nconf.get('jwt'), {expiresIn: 3600});
        res.status(200).json({token: `Bearer ${token}`});
      }
   }

    
}

module.exports.register = async function (req, res) {
    
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        res.status(409).json({message: "User with this email is already subscribed"});
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User ({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        try{
            res.status(201).json({message: `${req.body.name} have been successfully registered`});
            await user.save();
        } catch (e) {
            console.log(e);
        }
        
    }
}
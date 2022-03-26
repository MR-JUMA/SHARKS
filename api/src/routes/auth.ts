const express = require('express');
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs/dist/bcrypt')
const jwt = require('jsonwebtoken')
import { getRepository  } from 'typeorm';
import { ViewUser } from '../entities/ViewUser';
import { Users } from '../entities/Users';

// const entityManager = getManager();


// @route GET  api/auth
// @desc Get logged user
// @access Private

router.get('/', auth, async (req: any, res: any) => {
  
  try {

    let user = await getRepository(Users) 
    .createQueryBuilder("user")
    .select(["user.id", "user.user_name", "user.first_name", "user.last_name", "user.phone_number", "user.email", "user.city", "user.is_active", "user.is_owner"])
    .addSelect("CONCAT(user.first_name, ' ', user.last_name)", "full_name")
    .where('user.id = :id', { id: parseInt( req.user.id) })
    .getRawOne();

    if(!user) {
      return res.status(400).json({msg: "9000-User Does Not Exist"})
    }

    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(400).send( {msg: '9000-Server Error'} )
  }
})

// @route POST  api/auth
// @desc  Auth user and get token
// @access Public

router.post('/', async (req: any, res: any) => {

  //TODO: WE NEED TO CHECK IF ACTIVE THEN ALLOW ACCESS ELSE DISALLOW
  //*SOMETHING
  //!SOMETHING
  //?SOMETHING

  const { email, password } = req.body

  try {

    let user = await getRepository(Users)
    .createQueryBuilder("user")
    .where("user.email = :email OR user.user_name = :name", { email: email, name: email })
    .getOne();

    if (!user) {
      return res.status(400).json({ msg: '9000-Invalid Credentials'})
    }

    const isMatch = bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ msg: '9000-Invalid Credentials'})
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, process.env.jwtSecret, {
      expiresIn: 7200 //60*60*2
    }, (err: any, token: any) => {
      if (err) {
        throw err
      }
      res.json({ token })
    })
  
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error')
  }


})

module.exports = router
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs/dist/bcrypt')
const jwt = require('jsonwebtoken')

const auth = require('../middleware/auth')

import { getConnection, getRepository  } from 'typeorm';
import { Users } from '../entities/Users';

// @route GET  api/owners
// @desc Get all owners
// @access Private

router.get('/', auth, async (req: any, res: any) => {
  try {

    const ownerRepository = getRepository(Users); // you can also get it via getConnection().getRepository() or getManager().getRepository()
    const owner = await ownerRepository.find({ select: ["id","first_name", "last_name", "email", "phone_number", "user_name", "is_active"] });

    let users = await getRepository(Users) 
    .createQueryBuilder("user")
    .select("user.id")
    .addSelect("user.owner_id")
    .addSelect("user.first_name")
    .addSelect("user.last_name")
    .addSelect("user.user_name")
    .addSelect("user.phone_number")
    .addSelect("user.email")
    .addSelect("user.is_active")
    .leftJoinAndSelect("user.tigo_transactions", "tigo")
    .leftJoinAndSelect("user.vodacom_transactions", "vodacom")
    .leftJoinAndSelect("user.airtel_transactions", "airtel")
    .leftJoinAndSelect("user.halotel_transactions", "halotel")
    .where('user.is_owner = true')
    .getMany();

    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).send('9000-Server Error')
  }
})


// @route POST  api/owners/create
// @desc Add new owner for said user
// @access Public

router.post('/create', async (req: any, res: any) => {

  const {
		username,
		firstName,
		lastName,
		email,
		password,
		phonenumber,
	} = req.body;

  try {

    const salt = await bcrypt.genSalt(10)
    
    let newPassword = await bcrypt.hash(password, salt)

    const owner = Users.create({
      user_name: username,
      first_name: firstName,
      last_name: lastName,
      email,
      password: newPassword,
      is_active: false,
      is_owner: true,
      is_employee: false,
      phone_number : phonenumber, 
      owner_id : 0
    });

    
    await owner.save();

    res.status(200).send('Owner Saved Successfully')
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error')
  }
})

// @route PUT  api/owners/:id
// @desc Update owner
// @access Private

router.put('/:id', auth, async (req: any, res: any) => {
  const {
		username,
		firstName,
		lastName,
		email,
		password,
		phonenumber,
		is_active,
	} = req.body;


  try {
    const ownerRepo = getRepository(Users); 
    let user = await getRepository(Users) 
    .createQueryBuilder("user")
    .select("user.id")
    .addSelect("user.owner_id")
    .addSelect("user.first_name")
    .addSelect("user.last_name")
    .addSelect("user.user_name")
    .addSelect("user.phone_number")
    .addSelect("user.email")
    .addSelect("user.is_active")
    .where('user.id = :id', { id: parseInt( req.params.id) })
    .getOne();

    if(!user) return res.status(404).send({ msg: '9000-User Not Found'})

    //Make sure user owns record 
    if (user.owner_id !== parseInt(req.user.id)) {
      return res.status(401).send({ msg: '9000-Action not authorized'})
    } 

    const salt = await bcrypt.genSalt(10)
    let newPassword = ""

    if (password === "") {
      newPassword = await bcrypt.hash(password, salt)
    } else {
      newPassword = user.password
    }

    await getConnection()
    .createQueryBuilder()
    .update(Users)
    .set({ user_name: username, first_name: firstName, last_name: lastName, email: email, password: newPassword, phone_number: phonenumber, is_active: Boolean(is_active) })
    .where("id = :id", { id: parseInt(req.user.id) })
    .execute();

    res.status(200).send('0000-Owner Updated Successfully')
  } catch (err) {
    console.error(err)
    res.status(500).send('9000-Server Error')
  }
})

// @route DELETE  api/owner/del/:id
// @desc Delete owner
// @access Private

router.delete('/:id', auth, async(req: any, res: any) => {

  try {
    let user = await getRepository(Users)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: parseInt(req.params.id) })
    .getOne();

    if(!user) return res.status(404).send({ msg: 'Contact Not Found'})

    await getConnection()
    .createQueryBuilder()
    .update(Users)
    .set({ is_active: false })
    .where("user.id = :id", { id: parseInt(req.user.id) })
    .andWhere("user.is_owner = true")
    .execute();

    res.status(200).send('0000-Owner Deactivated Successfully')
  } catch (err) {
    console.error(err)
    res.status(500).send('9000-Server Error')
  }
})

module.exports = router
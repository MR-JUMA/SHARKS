import express from 'express';
const bcrypt = require('bcryptjs/dist/bcrypt')
import { Users } from '../entities/Users';
import { getConnection, getRepository  } from 'typeorm';
const auth = require('../middleware/auth')

const router = express.Router();


// @route DELETE  api/user/:id
// @desc Update user
// @access Private
router.delete('/:id', auth, async(req: any, res: any) => {

  try {
    let user = await getRepository(Users)
    .createQueryBuilder("user")
    .select("user.id")
    .addSelect("user.owner_id")
    .where("user.id = :id", { id: parseInt(req.params.id) })
    .getOne();

    if(!user) return res.status(404).send({ msg: 'Contact Not Found'})

    //Make sure user owns contact 
    if (user.owner_id !== parseInt(req.user.id)) {
      return res.status(401).send({ msg: 'Action not authorized'})
    } 

    await getConnection()
    .createQueryBuilder()
    .update(Users)
    .set({ is_active: false })
    .where("id = :id", { id: parseInt(req.params.id) })
    .execute();

    res.status(500).send('0000-User Deactivated Successfully')
  } catch (err) {
    console.error(err)
    res.status(500).send('9000-Server Error')
  }
})

// @route PUT  api/user/:id
// @desc Update user
// @access Private

router.put('/:id', auth, async (req: any, res: any) => {
  const {
    id,
		username,
		firstName,
		lastName,
		email,
		password,
		phonenumber,
		is_active,
	} = req.body;


  try {

    let userDetails = await getRepository(Users) 
    .createQueryBuilder("user")
    .select("user.id")
    .addSelect("user.owner_id")
    .where('user.id = :id', { id: parseInt( req.params.id) })
    .getOne();

    if(!userDetails) return res.status(404).send({ msg: '9000-User Not Found'})

    //Make sure user owns record 
    if (userDetails.owner_id !== parseInt(req.user.id)) {
      return res.status(401).send({ msg: '9000-Action not authorized'})
    } 

    const salt = await bcrypt.genSalt(10)
    
    let newPassword = await bcrypt.hash(password, salt)

    await getConnection()
    .createQueryBuilder()
    .update(Users)
    .set({ user_name: username, first_name: firstName, last_name: lastName, email: email, password: newPassword, phone_number: phonenumber, is_active: Boolean(is_active) })
    .where("id = :id", { id: parseInt(id) })
    .execute();

    res.status(500).send('0000-User Updated Successfully')
  } catch (err) {
    console.error(err)
    res.status(500).send('9000-Server Error')
  }
})


// @route GET  /api/user/:id
// @desc Get all user details
// @access Private
router.get('/:id', auth, async (req: any, res: any) => {
  const { id } = req.params;
  try {

    let userDetails = await getRepository(Users) 
    .createQueryBuilder("user")
    .select("user.id")
    .addSelect("user.owner_id")
    .addSelect("user.first_name")
    .addSelect("user.last_name")
    .addSelect("user.user_name")
    .addSelect("user.phone_number")
    .addSelect("user.email")
    .addSelect("user.is_active")
    .where('user.id = :id', { id: id })
    .andWhere('user.owner_id = :id', { id: req.user.id })
    .getOne();

    res.json(userDetails)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})



module.exports = router

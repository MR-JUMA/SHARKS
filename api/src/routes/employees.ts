const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs/dist/bcrypt')

import { getConnection, getRepository  } from 'typeorm';
import { Users } from '../entities/Users';

// @route GET  api/employees
// @desc Get all employees
// @access Private

router.get('/', auth, async (req: any, res: any) => {
  try {

    let user = await Users.findOne(parseInt(req.user.id));

    let users = null

    if (user?.is_employee) {
      users = await getRepository(Users) 
      .createQueryBuilder("user")
      // .select(["user.first_name", "user.last_name", "user.phone_number", "user.email", "user.city", "user.is_active"])
      .select("user.id", "id")
      .addSelect("user.user_name", "username")
      .addSelect("user.first_name", "firstname")
      .addSelect("user.last_name", "lastname")
      .addSelect("user.phone_number", "phonenumber")
      .addSelect("user.email", "email")
      .addSelect("user.city", "city")
      .addSelect("user.is_active", "isActive")
      .addSelect(`CASE
                      WHEN "user"."is_active" = true THEN 'active'
                      ELSE 'inactive'
                  END`, "user_status")
      .addSelect("CONCAT(user.first_name, ' ', user.last_name)", "full_name")
      .where('user.id = :id', { id: parseInt( req.user.id) })
      .getRawMany();
    } else if (user?.is_owner) {
      users = await getRepository(Users) 
      .createQueryBuilder("user")
      .select("user.id", "id")
      .addSelect("user.user_name", "username")
      .addSelect("user.first_name", "firstname")
      .addSelect("user.last_name", "lastname")
      .addSelect("user.phone_number", "phonenumber")
      .addSelect("user.email", "email")
      .addSelect("user.city", "city")
      .addSelect("user.is_active", "isActive")
      .addSelect(`CASE
                      WHEN "user"."is_active" = true THEN 'active'
                      ELSE 'inactive'
                  END`, "user_status")
      .addSelect("CONCAT(user.first_name, ' ', user.last_name)", "full_name")
      .where('user.owner_id = :id', { id: parseInt( req.user.id) })
      .getRawMany();
    } else {
      users = await getRepository(Users) 
      .createQueryBuilder("user")
      .select("user.id", "id")
      .addSelect("user.user_name", "username")
      .addSelect("user.first_name", "firstname")
      .addSelect("user.last_name", "lastname")
      .addSelect("user.phone_number", "phonenumber")
      .addSelect("user.email", "email")
      .addSelect("user.city", "city")
      .addSelect("user.is_active", "isActive")
      .addSelect(`CASE
                      WHEN "user"."is_active" = true THEN 'active'
                      ELSE 'inactive'
                  END`, "user_status")
      .addSelect("CONCAT(user.first_name, ' ', user.last_name)", "full_name")
      .getRawMany();
    }

    

    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).send('9000-Server Error')
  }
})

// @route GET  api/employees/id
// @desc Get all owners employees
// @access Private

router.get('/:id', auth, async (req: any, res: any) => {
  try {

    let users = await getRepository(Users) 
    .createQueryBuilder("user")
    .select("user.id")
    .addSelect("user.owner_id")
    .addSelect("user.first_name")
    .addSelect("user.last_name")
    .addSelect("user.user_name")
    .addSelect("user.phone_number")
    .addSelect("user.email")
    .addSelect("user.city")
    .addSelect("user.is_active")
    .where('user.id = :id', { id: parseInt( req.params.id) })
    .andWhere('user.owner_id = :id', { id: req.user.id })
    .getRawOne();

    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error')
  }
})


// @route POST  api/employee/create
// @desc Add new employee for said owner
// @access Private

router.post('/', auth, async (req: any, res: any) => {

  const {
		username,
		firstname,
		lastname,
		email,
		password,
		phonenumber,
		city,
		isActive
	} = req.body;

  try {

    const employee = await Users.create({
			user_name: username,
      first_name: firstname,
      last_name: lastname,
      email,
      city,
      password: password,
      is_active: Boolean(isActive),
      is_owner: false,
      is_employee: true,
      phone_number : phonenumber,
      owner_id : parseInt(req.user.id)
		});

    const salt = await bcrypt.genSalt(10)
    
    employee.password = await bcrypt.hash(password, salt)

    await employee.save();

    let users = await getRepository(Users) 
    .createQueryBuilder("user")
    .select("user.id", "id")
    .addSelect("user.user_name", "username")
    .addSelect("user.first_name", "firstname")
    .addSelect("user.last_name", "lastname")
    .addSelect("user.phone_number", "phonenumber")
    .addSelect("user.email", "email")
    .addSelect("user.city", "city")
    .addSelect("user.is_active", "isActive")
    .addSelect(`CASE
                    WHEN "user"."is_active" = true THEN 'active'
                    ELSE 'inactive'
                END`, "user_status")
    .addSelect("CONCAT(user.first_name, ' ', user.last_name)", "full_name")
    .where('user.owner_id = :id', { id: parseInt( req.user.id) })
    .getRawMany();

    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).send('9000-Server Error')
  }
})

// @route PUT  api/employee/:id
// @desc Update employee
// @access Private

router.put('/:id', auth, async (req: any, res: any) => {
  const {
    username,
		firstname,
		lastname,
		email,
		password,
		phonenumber,
		city,
		isActive
	} = req.body;


  try {

    let employee = await Users.findOne(parseInt(req.params.id));

    if(!employee) return res.status(404).send({ msg: 'User Not Found'})

    //Make sure user owns contact 
    if (employee.owner_id !== parseInt(req.user.id)) {
      return res.status(401).send({ msg: 'Action not authorized'})
    } 

    const salt = await bcrypt.genSalt(10)
    let newPassword = ""

    if (password !== "") {
      newPassword = await bcrypt.hash(password, salt)
    } else {
      newPassword = employee.password
    }

    await getConnection()
    .createQueryBuilder()
    .update(Users)
    .set({ user_name: username, first_name: firstname, last_name: lastname, email: email, city: city, password: newPassword, phone_number: phonenumber, is_active: Boolean(isActive) })
    .where("id = :id", { id: parseInt(req.params.id) })
    .execute();

    let user = await getRepository(Users) 
    .createQueryBuilder("user")
    .select("user.id", "id")
    .addSelect("user.user_name", "username")
    .addSelect("user.first_name", "firstname")
    .addSelect("user.last_name", "lastname")
    .addSelect("user.phone_number", "phonenumber")
    .addSelect("user.email", "email")
    .addSelect("user.city", "city")
    .addSelect("user.is_active", "isActive")
    .addSelect(`CASE
                    WHEN "user"."is_active" = true THEN 'active'
                    ELSE 'inactive'
                END`, "user_status")
    .addSelect("CONCAT(user.first_name, ' ', user.last_name)", "full_name")
    .where('user.id = :id', { id: parseInt(req.params.id) })
    .getRawOne();

    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).send('9000-Server Error')
  }
})

// @route DELETE  api/employee/del/:id
// @desc Delete employee for user owner
// @access Private

router.delete('/:id', auth, async(req: any, res: any) => {

  try {
    let employee = await Users.findOne(parseInt(req.params.id));

    if(!employee) return res.status(404).send({ msg: 'Employee Not Found'})

    //Make sure user owns contact 
    if (employee.owner_id !== parseInt(req.user.id)) {
      return res.status(401).send({ msg: 'Action not authorized'})
    } 

    await getConnection()
    .createQueryBuilder()
    .update(Users)
    .set({ is_active: false })
    .where("id = :id", { id: parseInt(req.params.id) })
    .execute();

    let user = await getRepository(Users) 
    .createQueryBuilder("user")
    .select("user.id", "id")
    .addSelect("user.user_name", "username")
    .addSelect("user.first_name", "firstname")
    .addSelect("user.last_name", "lastname")
    .addSelect("user.phone_number", "phonenumber")
    .addSelect("user.email", "email")
    .addSelect("user.city", "city")
    .addSelect("user.is_active", "isActive")
    .addSelect(`CASE
                    WHEN "user"."is_active" = true THEN 'active'
                    ELSE 'inactive'
                END`, "user_status")
    .addSelect("CONCAT(user.first_name, ' ', user.last_name)", "full_name")
    .where('user.id = :id', { id: parseInt(req.params.id) })
    .getRawOne();

    res.json(user)

  } catch (err) {
    console.error(err)
    res.status(500).send('9000-Server Error')
  }
})

module.exports = router
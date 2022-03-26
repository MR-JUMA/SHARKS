import express from 'express';
import { Users } from '../entities/Users';
import { Tigo, Vodacom, Airtel, Halotel } from '../entities/CompanyEntity';
import { Transaction, TransactionStatus, TransactionType } from '../entities/utils/Transaction';
import { getConnection, getRepository, getManager, createQueryBuilder, EntityManager  } from 'typeorm';


const auth = require('../middleware/auth')

const router = express.Router();

// @route GET  api/transactions/delete
// @desc Delete transaction
// @access Private
router.delete('/api/transaction/delete/id/:id/comp_type/:comp_type', auth, async (req: any, res: any) => {
  try {

    const { id, comp_type } = req.params

    // const userRepo = getRepository(User); 
    // const user = await userRepo.findOne({ id: parseInt( req.user.id ) });

    if (comp_type === 'TIGO') {
      
      await getConnection()
      .createQueryBuilder()
      .update(Tigo)
      .set({ status: TransactionStatus.DELETED })
      .where("id = :id", { id: id })
      .andWhere('userId = :userId', { userId: parseInt(req.user.id) })
      .execute()

    } else if(comp_type === 'VODACOM') {

      await getConnection()
      .createQueryBuilder()
      .update(Vodacom)
      .set({ status: TransactionStatus.DELETED })
      .where("id = :id", { id: id })
      .andWhere('userId = :userId', { userId: parseInt(req.user.id) })
      .execute()

    } else if(comp_type === 'AIRTEL') {

      await getConnection()
      .createQueryBuilder()
      .update(Airtel)
      .set({ status: TransactionStatus.DELETED })
      .where("id = :id", { id: id })
      .andWhere('userId = :userId', { userId: parseInt(req.user.id) })
      .execute()

    } else if(comp_type === 'HALOTEL') {

      await getConnection()
      .createQueryBuilder()
      .update(Halotel)
      .set({ status: TransactionStatus.DELETED })
      .where("id = :id", { id: id })
      .andWhere('userId = :userId', { userId: parseInt(req.user.id) })
      .execute()
    }

    let userId = parseInt(req.user.id)

    let userTransactions = null

    if (comp_type === 'TIGO') {
      userTransactions = await getRepository(Tigo) 
      .createQueryBuilder("tigo")
      .select("tigo.id", "transactionID")
      .addSelect("tigo.transaction_type", "transactionType")
      .addSelect("tigo.phone_number", "phonenumber")
      .addSelect("tigo.amount", "amount")
      .addSelect("tigo.status", "status")
      .addSelect("tigo.company_type", "companyType")
      .addSelect("tigo.userId", "userID")
      .where('tigo.id = :id', { id: id })
      .andWhere('tigo.userId = :userId', { userId })
      .getRawOne();
    } else if(comp_type === 'VODACOM') {
      userTransactions = await getRepository(Vodacom) 
      .createQueryBuilder("vodacom")
      .select("vodacom.id", "transactionID")
      .addSelect("vodacom.transaction_type", "transactionType")
      .addSelect("vodacom.phone_number", "phonenumber")
      .addSelect("vodacom.amount", "amount")
      .addSelect("vodacom.status", "status")
      .addSelect("vodacom.company_type", "companyType")
      .addSelect("vodacom.userId", "userID")
      .where('vodacom.id = :id', { id: id })
      .andWhere('vodacom.userId = :userId', { userId })
      .getRawOne();
    } else if(comp_type === 'HALOTEL') {
      userTransactions = await getRepository(Halotel) 
      .createQueryBuilder("halotel")
      .select("halotel.id", "transactionID")
      .addSelect("halotel.transaction_type", "transactionType")
      .addSelect("halotel.phone_number", "phonenumber")
      .addSelect("halotel.amount", "amount")
      .addSelect("halotel.status", "status")
      .addSelect("halotel.company_type", "companyType")
      .addSelect("halotel.userId", "userID")
      .where('halotel.id = :id', { id: id })
      .andWhere('halotel.userId = :userId', { userId: userId })
      .getRawOne();
    } else if(comp_type === 'AIRTEL') {
      userTransactions = await getRepository(Airtel) 
      .createQueryBuilder("airtel")
      .select("airtel.id", "transactionID")
      .addSelect("airtel.transaction_type", "transactionType")
      .addSelect("airtel.phone_number", "phonenumber")
      .addSelect("airtel.amount", "amount")
      .addSelect("airtel.status", "status")
      .addSelect("airtel.company_type", "companyType")
      .addSelect("airtel.userId", "userID")
      .where('airtel.id = :id', { id: id })
      .andWhere('airtel.userId = :userId', { userId: userId })
      .getRawOne();
    }

		return res.json(userTransactions)
  } catch (err) {
    console.error(err)
    res.status(500).send('9000-Server Error')
  }
})

// @route PUT  api/transaction/:id
// @desc Update transaction
// @access Private
router.put('/api/transaction/update/:id', auth, async (req: any, res: any) => {
  try {

    const { id } = req.user;

		const { transactionID , transactionType, amount, companyType, phonenumber } = req.body;

    const tigoRepo = getRepository(Tigo); 

    if (companyType === 'TIGO') {
      
      await getConnection()
      .createQueryBuilder()
      .update(Tigo)
      .set({ 
        amount: amount, 
        phone_number: phonenumber, 
        transaction_type: transactionType === "DEPOSIT" ? TransactionType.DEPOSIT : TransactionType.WITHDRAW, 
        status: TransactionStatus.APPROVED })
      .where("id = :id", { id: transactionID })
      .andWhere('userId = :userId', { userId: parseInt(req.user.id) })
      .execute()

    } else if(companyType === 'VODACOM') {

      await getConnection()
      .createQueryBuilder()
      .update(Vodacom)
      .set({ 
        amount: amount, 
        phone_number: phonenumber, 
        transaction_type: transactionType === "DEPOSIT" ? TransactionType.DEPOSIT : TransactionType.WITHDRAW, 
        status: TransactionStatus.APPROVED
      })
      .where("id = :id", { id: transactionID })
      .andWhere('userId = :userId', { userId: parseInt(req.user.id) })
      .execute()

    } else if(companyType === 'AIRTEL') {

      await getConnection()
      .createQueryBuilder()
      .update(Airtel)
      .set({ amount: amount, 
        phone_number: phonenumber, 
        transaction_type: transactionType === "DEPOSIT" ? TransactionType.DEPOSIT : TransactionType.WITHDRAW, 
        status: TransactionStatus.APPROVED })
      .where("id = :id", { id: transactionID })
      .andWhere('userId = :userId', { userId: parseInt(req.user.id) })
      .execute()

    } else if(companyType === 'HALOTEL') {

      await getConnection()
      .createQueryBuilder()
      .update(Halotel)
      .set({ amount: amount, 
        phone_number: phonenumber, 
        transaction_type: transactionType === "DEPOSIT" ? TransactionType.DEPOSIT : TransactionType.WITHDRAW, 
        status: TransactionStatus.APPROVED })
      .where("id = :id", { id: transactionID })
      .andWhere('userId = :userId', { userId: parseInt(req.user.id) })
      .execute()

    }

		let userTransactions = null

    if (companyType === 'TIGO') {
      userTransactions = await getRepository(Tigo) 
      .createQueryBuilder("tigo")
      .select("tigo.id", "transactionID")
      .addSelect("tigo.transaction_type", "transactionType")
      .addSelect("tigo.phone_number", "phonenumber")
      .addSelect("tigo.amount", "amount")
      .addSelect("tigo.status", "status")
      .addSelect("tigo.company_type", "companyType")
      .addSelect("tigo.userId", "userID")
      .where('tigo.id = :id', { id: req.params.id })
      .andWhere('tigo.userId = :userId', { userId: id })
      .getRawOne();
    } else if(companyType === 'VODACOM') {
      userTransactions = await getRepository(Vodacom) 
      .createQueryBuilder("vodacom")
      .select("vodacom.id", "transactionID")
      .addSelect("vodacom.transaction_type", "transactionType")
      .addSelect("vodacom.phone_number", "phonenumber")
      .addSelect("vodacom.amount", "amount")
      .addSelect("vodacom.status", "status")
      .addSelect("vodacom.company_type", "companyType")
      .addSelect("vodacom.userId", "userID")
      .where('vodacom.id = :id', { id: req.params.id })
      .andWhere('vodacom.userId = :userId', { userId: id })
      .getRawOne();
    } else if(companyType === 'HALOTEL') {
      userTransactions = await getRepository(Halotel) 
      .createQueryBuilder("halotel")
      .select("halotel.id", "transactionID")
      .addSelect("halotel.transaction_type", "transactionType")
      .addSelect("halotel.phone_number", "phonenumber")
      .addSelect("halotel.amount", "amount")
      .addSelect("halotel.status", "status")
      .addSelect("halotel.company_type", "companyType")
      .addSelect("halotel.userId", "userID")
      .where('halotel.id = :id', { id: req.params.id })
      .andWhere('halotel.userId = :userId', { userId: id })
      .getRawOne();
    } else if(companyType === 'AIRTEL') {
      userTransactions = await getRepository(Airtel) 
      .createQueryBuilder("airtel")
      .select("airtel.id", "transactionID")
      .addSelect("airtel.transaction_type", "transactionType")
      .addSelect("airtel.phone_number", "phonenumber")
      .addSelect("airtel.amount", "amount")
      .addSelect("airtel.status", "status")
      .addSelect("airtel.company_type", "companyType")
      .addSelect("airtel.userId", "userID")
      .where('airtel.id = :id', { id: req.params.id })
      .andWhere('airtel.userId = :userId', { userId: id })
      .getRawOne();
    }


    // let result = await tigoRepo.manager.query(`SELECT id as transactionID, transaction_type as transactionType, phone_number as phonenumber, amount as amount, status as status, userId as userID FROM tigo WHERE userId = ${id} ORDER BY id DESC LIMIT 1`);

		res.json(userTransactions)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})


// @route GET  api/transactions/create
// @desc Create Transactions
// @access Private
router.post('/api/transaction/create', auth, async (req: any, res: any) => {
  try {
    const { id } = req.user;

		const { transactionType, amount, companyType, phonenumber } = req.body;

    const userRepo = getRepository(Users); 
    const user = await userRepo.findOne({ id: parseInt( id )});

    let object = null

    if (companyType === 'TIGO') {
      object = await Tigo.create({ 
        amount : amount,
        phone_number : phonenumber,
        transaction_type : transactionType === "DEPOSIT" ? TransactionType.DEPOSIT : TransactionType.WITHDRAW,
        status : TransactionStatus.APPROVED,
        userId : user?.id,
        user: user
      }).save()
      
      
    } else if(companyType === 'VODACOM') {

      await Vodacom.create({ 
        amount : amount,
        phone_number : phonenumber,
        transaction_type : transactionType === "DEPOSIT" ? TransactionType.DEPOSIT : TransactionType.WITHDRAW,
        status : TransactionStatus.APPROVED,
        userId : user?.id,
        user: user
      }).save()

    } else if(companyType === 'AIRTEL') {

      await Airtel.create({ 
        amount : amount,
        phone_number : phonenumber,
        transaction_type : transactionType === "DEPOSIT" ? TransactionType.DEPOSIT : TransactionType.WITHDRAW,
        status : TransactionStatus.APPROVED,
        userId : user?.id,
        user: user
      }).save()

    } else if(companyType === 'HALOTEL') {

      await Halotel.create({ 
        amount : amount,
        phone_number : phonenumber,
        transaction_type : transactionType === "DEPOSIT" ? TransactionType.DEPOSIT : TransactionType.WITHDRAW,
        status : TransactionStatus.APPROVED,
        userId : user?.id,
        user: user
      }).save()
    }

    let userTransactions = null

    if (companyType === 'TIGO') {
      userTransactions = await getRepository(Tigo) 
      .createQueryBuilder("tigo")
      .select("tigo.id", "transactionID")
      .addSelect("tigo.transaction_type", "transactionType")
      .addSelect("tigo.phone_number", "phonenumber")
      .addSelect("tigo.amount", "amount")
      .addSelect("tigo.status", "status")
      .addSelect("tigo.company_type", "companyType")
      .addSelect("tigo.userId", "userID")
      .where('tigo.userId = :id', { id: id })
      .orderBy("tigo.id", "DESC")
      .getRawOne();
    } else if(companyType === 'VODACOM') {
      userTransactions = await getRepository(Vodacom) 
      .createQueryBuilder("vodacom")
      .select("vodacom.id", "transactionID")
      .addSelect("vodacom.transaction_type", "transactionType")
      .addSelect("vodacom.phone_number", "phonenumber")
      .addSelect("vodacom.amount", "amount")
      .addSelect("vodacom.status", "status")
      .addSelect("vodacom.company_type", "companyType")
      .addSelect("vodacom.userId", "userID")
      .where('vodacom.userId = :id', { id: id })
      .orderBy("vodacom.id", "DESC")
      .getRawOne();
    } else if(companyType === 'HALOTEL') {
      userTransactions = await getRepository(Halotel) 
      .createQueryBuilder("halotel")
      .select("halotel.id", "transactionID")
      .addSelect("halotel.transaction_type", "transactionType")
      .addSelect("halotel.phone_number", "phonenumber")
      .addSelect("halotel.amount", "amount")
      .addSelect("halotel.status", "status")
      .addSelect("halotel.company_type", "companyType")
      .addSelect("halotel.userId", "userID")
      .where('halotel.userId = :id', { id: id })
      .orderBy("halotel.id", "DESC")
      .getRawOne();
    } else if(companyType === 'AIRTEL') {
      userTransactions = await getRepository(Airtel) 
      .createQueryBuilder("airtel")
      .select("airtel.id", "transactionID")
      .addSelect("airtel.transaction_type", "transactionType")
      .addSelect("airtel.phone_number", "phonenumber")
      .addSelect("airtel.amount", "amount")
      .addSelect("airtel.status", "status")
      .addSelect("airtel.company_type", "companyType")
      .addSelect("airtel.userId", "userID")
      .where('airtel.userId = :id', { id: id })
      .orderBy("airtel.id", "DESC")
      .getRawOne();
    }

		res.json(userTransactions)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})

// @route GET  api/transactions/user
// @desc Get all trasactions for all user
// @access Private
router.get('/api/transactions/user/dev', auth, async (req: any, res: any) => {
  try {

    let userTransactions = await getRepository(Users) 
    .createQueryBuilder("user")
    .select("user.id")
    .addSelect("user.owner_id")
    .addSelect("user.first_name")
    .addSelect("user.user_name")
    .leftJoinAndSelect("user.tigo_transactions", "tigo")
    .leftJoinAndSelect("user.vodacom_transactions", "vodacom")
    .leftJoinAndSelect("user.airtel_transactions", "airtel")
    .leftJoinAndSelect("user.halotel_transactions", "halotel")
    .getMany();

    res.json(userTransactions)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})

// @route GET  api/transactions/user/
// @desc Get all trasactions for one owner 
// @access Private
router.get('/api/transactions/user', auth, async (req: any, res: any) => {
  const { id } = req.user;
  let ownerID = id
  try {

    let user = await Users.findOne(parseInt(req.user.id));

    let userTransactions = null

    if (user?.is_employee) {
      userTransactions = await getRepository(Users) 
      .createQueryBuilder("user")
      .select("user.id", "userID")
      .addSelect("user.owner_id", "ownerID")
      .addSelect("user.user_name", "username")
      .addSelect("user.phone_number", "phonenumber")
      .addSelect("user.amount", "amount")
      .addSelect("CONCAT(user.first_name, ' ', user.last_name)", "fullname")
      .leftJoinAndSelect("user.tigo_transactions", "tigo")
      .leftJoinAndSelect("user.vodacom_transactions", "vodacom")
      .leftJoinAndSelect("user.airtel_transactions", "airtel")
      .leftJoinAndSelect("user.halotel_transactions", "halotel")
      .where('user.id = :id', { id: id })
      .getRawOne();
    } else if(user?.is_owner) {
      userTransactions = await getRepository(Users) 
      .createQueryBuilder("user")
      .select("user.id", "userID")
      .addSelect("user.owner_id", "ownerID")
      .addSelect("user.user_name", "username")
      .addSelect("user.phone_number", "phonenumber")
      .addSelect("CONCAT(user.first_name, ' ', user.last_name)", "fullname")
      .leftJoinAndSelect("user.tigo_transactions", "tigo")
      .leftJoinAndSelect("user.vodacom_transactions", "vodacom")
      .leftJoinAndSelect("user.airtel_transactions", "airtel")
      .leftJoinAndSelect("user.halotel_transactions", "halotel")
      .where("user.owner_id = :ownerID OR user.id = :id", { ownerID: ownerID , id: id })
      .getRawMany();
    } else if(user?.is_dev) {
      userTransactions = await getRepository(Users) 
      .createQueryBuilder("user")
      .select("user.id", "userID")
      .addSelect("user.owner_id", "ownerID")
      .addSelect("user.user_name", "username")
      .addSelect("user.phone_number", "phonenumber")
      .addSelect("user.amount", "amount")
      .addSelect("CONCAT(user.first_name, ' ', user.last_name)", "fullname")
      .leftJoinAndSelect("user.tigo_transactions", "tigo")
      .leftJoinAndSelect("user.vodacom_transactions", "vodacom")
      .leftJoinAndSelect("user.airtel_transactions", "airtel")
      .leftJoinAndSelect("user.halotel_transactions", "halotel")
      .getRawMany();
    }

    res.json(userTransactions)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})



// @route GET  api/transactions/tigo/
// @desc Get all trasactions for one user 
// @access Private
router.get('/api/transactions/:comp', auth, async (req: any, res: any) => {
  const { comp } = req.params;
  const { id } = req.user;
  try {

    let user = await Users.findOne(parseInt(req.user.id));

    let userTransactions = null

    if (comp === 'TIGO') {
      userTransactions = await getRepository(Tigo) 
      .createQueryBuilder("tigo")
      .select("tigo.id", "transactionID")
      .addSelect("tigo.transaction_type", "transactionType")
      .addSelect("tigo.phone_number", "phonenumber")
      .addSelect("tigo.amount", "amount")
      .addSelect("tigo.status", "status")
      .addSelect("tigo.company_type", "companyType")
      .addSelect("tigo.userId", "userID")
      .where('tigo.userId = :id', { id: id })
      .orderBy("tigo.id", "DESC")
      .getRawMany();
    } else if(comp === 'VODACOM') {
      userTransactions = await getRepository(Vodacom) 
      .createQueryBuilder("vodacom")
      .select("vodacom.id", "transactionID")
      .addSelect("vodacom.transaction_type", "transactionType")
      .addSelect("vodacom.phone_number", "phonenumber")
      .addSelect("vodacom.amount", "amount")
      .addSelect("vodacom.status", "status")
      .addSelect("vodacom.company_type", "companyType")
      .addSelect("vodacom.userId", "userID")
      .where('vodacom.userId = :id', { id: id })
      .orderBy("vodacom.id", "DESC")
      .getRawMany();
    } else if(comp === 'HALOTEL') {
      userTransactions = await getRepository(Halotel) 
      .createQueryBuilder("halotel")
      .select("halotel.id", "transactionID")
      .addSelect("halotel.transaction_type", "transactionType")
      .addSelect("halotel.phone_number", "phonenumber")
      .addSelect("halotel.amount", "amount")
      .addSelect("halotel.status", "status")
      .addSelect("halotel.company_type", "companyType")
      .addSelect("halotel.userId", "userID")
      .where('halotel.userId = :id', { id: id })
      .orderBy("halotel.id", "DESC")
      .getRawMany();
    } else if(comp === 'AIRTEL') {
      userTransactions = await getRepository(Airtel) 
      .createQueryBuilder("airtel")
      .select("airtel.id", "transactionID")
      .addSelect("airtel.transaction_type", "transactionType")
      .addSelect("airtel.phone_number", "phonenumber")
      .addSelect("airtel.amount", "amount")
      .addSelect("airtel.status", "status")
      .addSelect("airtel.company_type", "companyType")
      .addSelect("airtel.userId", "userID")
      .where('airtel.userId = :id', { id: id })
      .orderBy("airtel.id", "DESC")
      .getRawMany();
    }

    res.json(userTransactions)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})


// @route GET  api/transactions/tigo/
// @desc Get all trasactions for one user 
// @access Private
router.get('/api/transactions/data/:comp', auth, async (req: any, res: any) => {
  const { comp } = req.params;
  const { id } = req.user;
  try {

    let userTransactions = null

    if (comp === 'TIGO') {
      userTransactions = await getRepository(Tigo) 
      .createQueryBuilder("tigo")
      .select("tigo.id", "id")
      .addSelect("tigo.transaction_type", "transactionType")
      .addSelect("tigo.phone_number", "phonenumber")
      .addSelect("tigo.amount", "amount")
      .addSelect("tigo.status", "status")
      .addSelect("tigo.company_type", "companyType")
      .addSelect("tigo.userId", "userID")
      .addSelect("tigo.created_at", "dateTime")
      .where('tigo.userId = :id', { id: id })
      .orderBy("tigo.id", "DESC")
      .getRawMany();
    } else if(comp === 'VODACOM') {
      userTransactions = await getRepository(Vodacom) 
      .createQueryBuilder("vodacom")
      .select("vodacom.id", "id")
      .addSelect("vodacom.transaction_type", "transactionType")
      .addSelect("vodacom.phone_number", "phonenumber")
      .addSelect("vodacom.amount", "amount")
      .addSelect("vodacom.status", "status")
      .addSelect("vodacom.company_type", "companyType")
      .addSelect("vodacom.userId", "userID")
      .addSelect("vodacom.created_at", "dateTime")
      .where('vodacom.userId = :id', { id: id })
      .orderBy("vodacom.id", "DESC")
      .getRawMany();
    } else if(comp === 'HALOTEL') {
      userTransactions = await getRepository(Halotel) 
      .createQueryBuilder("halotel")
      .select("halotel.id", "id")
      .addSelect("halotel.transaction_type", "transactionType")
      .addSelect("halotel.phone_number", "phonenumber")
      .addSelect("halotel.amount", "amount")
      .addSelect("halotel.status", "status")
      .addSelect("halotel.company_type", "companyType")
      .addSelect("halotel.userId", "userID")
      .addSelect("halotel.created_at", "dateTime")
      .where('halotel.userId = :id', { id: id })
      .orderBy("halotel.id", "DESC")
      .getRawMany();
    } else if(comp === 'AIRTEL') {
      userTransactions = await getRepository(Airtel) 
      .createQueryBuilder("airtel")
      .select("airtel.id", "id")
      .addSelect("airtel.transaction_type", "transactionType")
      .addSelect("airtel.phone_number", "phonenumber")
      .addSelect("airtel.amount", "amount")
      .addSelect("airtel.status", "status")
      .addSelect("airtel.company_type", "companyType")
      .addSelect("airtel.userId", "userID")
      .addSelect("airtel.created_at", "dateTime")
      .where('airtel.userId = :id', { id: id })
      .orderBy("airtel.id", "DESC")
      .getRawMany();
    }

    res.json(userTransactions)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})

// @route GET  api/transactions/tigo/
// @desc Get all trasactions for dashboard data for widgets
// @access Private
router.get('/api/transaction/dash/widgets', auth, async (req: any, res: any) => {
  const { id } = req.user;
  try {

    const tigoRepo = getRepository(Tigo);
    let result = await tigoRepo.manager.query(
    ` 
WITH prev AS (
	SELECT  tigo.tigo_yesterday , voda.voda_yesterday , halo.halo_yesterday , air.air_yesterday 
	  FROM users
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(tigo.amount), 0) AS tigo_yesterday
		  FROM users INNER JOIN tigo ON users.id= "tigo"."userId" AND tigo.status = 'Approved' AND tigo.created_at::DATE = NOW()::DATE - '1 DAY'::INTERVAL
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS tigo ON users.id = tigo.usersId
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(vodacom.amount), 0) AS voda_yesterday
		  FROM users INNER JOIN vodacom ON users.id= "vodacom"."userId" AND vodacom.status = 'Approved' AND vodacom.created_at::DATE = NOW()::DATE - '1 DAY'::INTERVAL
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS voda ON users.id = voda.usersId
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(halotel.amount), 0) AS halo_yesterday
		  FROM users INNER JOIN halotel ON users.id= "halotel"."userId" AND halotel.status = 'Approved' AND halotel.created_at::DATE = NOW()::DATE - '1 DAY'::INTERVAL
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS halo ON users.id = halo.usersId
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(airtel.amount), 0) AS air_yesterday
		  FROM users INNER JOIN airtel ON users.id= "airtel"."userId" AND airtel.status = 'Approved' AND airtel.created_at::DATE = NOW()::DATE - '1 DAY'::INTERVAL
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS air ON users.id = air.usersId
	  WHERE users.id = ${id}
	  GROUP BY tigo.tigo_yesterday,voda.voda_yesterday,halo.halo_yesterday, air.air_yesterday
	
    ), today AS (
      SELECT  tigo.tigo_today , voda.voda_today , halo.halo_today , air.air_today
	  FROM users
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(tigo.amount), 0) AS tigo_today
		  FROM users INNER JOIN tigo ON users.id= "tigo"."userId" AND tigo.status = 'Approved' AND tigo.created_at::DATE = NOW()::DATE 
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS tigo ON users.id = tigo.usersId
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(vodacom.amount), 0) AS voda_today
		  FROM users INNER JOIN vodacom ON users.id= "vodacom"."userId" AND vodacom.status = 'Approved' AND vodacom.created_at::DATE = NOW()::DATE 
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS voda ON users.id = voda.usersId
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(halotel.amount), 0) AS halo_today
		  FROM users INNER JOIN halotel ON users.id= "halotel"."userId" AND halotel.status = 'Approved' AND halotel.created_at::DATE = NOW()::DATE 
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS halo ON users.id = halo.usersId
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(airtel.amount), 0) AS air_today
		  FROM users INNER JOIN airtel ON users.id= "airtel"."userId" AND airtel.status = 'Approved' AND airtel.created_at::DATE = NOW()::DATE 
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS air ON users.id = air.usersId
	  WHERE users.id = ${id}
	  GROUP BY tigo.tigo_today,voda.voda_today,halo.halo_today, air.air_today
    )
    SELECT 
      100 - ROUND((today.tigo_today / prev.tigo_yesterday * 100), 2) AS tigo_percent,
      100 - ROUND((today.voda_today / prev.voda_yesterday * 100), 2) AS voda_percent,
      100 - ROUND((today.halo_today / prev.halo_yesterday * 100), 2) AS halo_percent,
      100 - ROUND((today.air_today / prev.air_yesterday * 100), 2)  AS air_percent,
      today.tigo_today, today.voda_today, today.halo_today, today.air_today
    FROM today, prev;
     `);

    console.log(result)

    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})

// @route GET  api/transactions/tigo/
// @desc Get all trasactions for dashboard data for widgets
// @access Private
router.get('/api/transaction/dash/targets', auth, async (req: any, res: any) => {
  const { id } = req.user;
  try {

    const tigoRepo = getRepository(Tigo);
    let result = await tigoRepo.manager.query(
    ` 
    WITH lastMonth AS (
	  SELECT (tigo.tigo_avg_month + voda.voda_avg_month + halo.halo_avg_month + air.air_avg_month ) AS comps_avg_month
	  FROM users
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(tigo.amount) / 30, 0) AS tigo_avg_month
		  FROM users INNER JOIN tigo ON users.id= "tigo"."userId" AND tigo.status = 'Approved' AND tigo.created_at::DATE >= DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '1' MONTH) AND tigo.created_at::DATE < DATE_TRUNC('MONTH', CURRENT_DATE)
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS tigo ON users.id = tigo.usersId
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(vodacom.amount) / 30, 0) AS voda_avg_month
		  FROM users INNER JOIN vodacom ON users.id= "vodacom"."userId" AND vodacom.status = 'Approved' AND vodacom.created_at::DATE >= DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '1' MONTH) AND vodacom.created_at::DATE < DATE_TRUNC('MONTH', CURRENT_DATE)
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS voda ON users.id = voda.usersId
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(halotel.amount) / 30, 0) AS halo_avg_month
		  FROM users INNER JOIN halotel ON users.id= "halotel"."userId" AND halotel.status = 'Approved' AND halotel.created_at::DATE >= DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '1' MONTH) AND halotel.created_at::DATE < DATE_TRUNC('MONTH', CURRENT_DATE)
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS halo ON users.id = halo.usersId
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(airtel.amount) / 30, 0) AS air_avg_month
		  FROM users INNER JOIN airtel ON users.id= "airtel"."userId" AND airtel.status = 'Approved' AND airtel.created_at::DATE >= DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '1' MONTH) AND airtel.created_at::DATE < DATE_TRUNC('MONTH', CURRENT_DATE)
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS air ON users.id = air.usersId
	  WHERE users.id = ${id}
	  GROUP BY tigo.tigo_avg_month,voda.voda_avg_month,halo.halo_avg_month, air.air_avg_month
    ), lastWeek AS (
	  SELECT (tigo_avg_week + voda_avg_week + halo_avg_week + air_avg_week) AS comps_avg_week
	  FROM users
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(tigo.amount) / 7, 0) AS tigo_avg_week
		  FROM users INNER JOIN tigo ON users.id= "tigo"."userId" AND tigo.status = 'Approved' AND tigo.created_at::DATE >= NOW()::DATE - EXTRACT(DOW FROM NOW())::INTEGER - 7 AND tigo.created_at::DATE < NOW()::DATE - EXTRACT(DOW from NOW())::INTEGER
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS tigo ON users.id = tigo.usersId
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(vodacom.amount) / 7, 0) AS voda_avg_week
		  FROM users INNER JOIN vodacom ON users.id= "vodacom"."userId" AND vodacom.status = 'Approved' AND vodacom.created_at::DATE >= NOW()::DATE - EXTRACT(DOW FROM NOW())::INTEGER - 7 AND vodacom.created_at::DATE < NOW()::DATE - EXTRACT(DOW from NOW())::INTEGER
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS voda ON users.id = voda.usersId
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(halotel.amount) / 7, 0) AS halo_avg_week
		  FROM users INNER JOIN halotel ON users.id= "halotel"."userId" AND halotel.status = 'Approved' AND halotel.created_at::DATE >= DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '1' MONTH) AND halotel.created_at::DATE < DATE_TRUNC('MONTH', CURRENT_DATE)
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS halo ON users.id = halo.usersId
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(airtel.amount) / 7, 0) AS air_avg_week
		  FROM users INNER JOIN airtel ON users.id= "airtel"."userId" AND airtel.status = 'Approved' AND airtel.created_at::DATE >= NOW()::DATE - EXTRACT(DOW FROM NOW())::INTEGER - 7 AND airtel.created_at::DATE < NOW()::DATE - EXTRACT(DOW from NOW())::INTEGER
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS air ON users.id = air.usersId
	  WHERE users.id = ${id}
	  GROUP BY tigo.tigo_avg_week,voda.voda_avg_week,halo.halo_avg_week, air.air_avg_week
    ), today AS (
	  SELECT  (tigo.tigo_today + voda.voda_today + halo.halo_today + air.air_today ) AS comps_today
	  FROM users
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(tigo.amount), 0) AS tigo_today
		  FROM users INNER JOIN tigo ON users.id= "tigo"."userId" AND tigo.status = 'Approved' AND tigo.created_at::DATE = NOW()::DATE 
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS tigo ON users.id = tigo.usersId
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(vodacom.amount), 0) AS voda_today
		  FROM users INNER JOIN vodacom ON users.id= "vodacom"."userId" AND vodacom.status = 'Approved' AND vodacom.created_at::DATE = NOW()::DATE 
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS voda ON users.id = voda.usersId
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(halotel.amount), 0) AS halo_today
		  FROM users INNER JOIN halotel ON users.id= "halotel"."userId" AND halotel.status = 'Approved' AND halotel.created_at::DATE = NOW()::DATE 
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS halo ON users.id = halo.usersId
	  LEFT JOIN ( 
		  SELECT users.id AS usersId, COALESCE(SUM(airtel.amount), 0) AS air_today
		  FROM users INNER JOIN airtel ON users.id= "airtel"."userId" AND airtel.status = 'Approved' AND airtel.created_at::DATE = NOW()::DATE 
		  WHERE users.id = ${id}
		  GROUP BY users.id
	  ) AS air ON users.id = air.usersId
	  WHERE users.id = ${id}
	  GROUP BY tigo.tigo_today,voda.voda_today,halo.halo_today, air.air_today
    )
      SELECT 
      lastMonth.comps_avg_month, lastWeek.comps_avg_week,  today.comps_today,
      ROUND((lastMonth.comps_avg_month + lastWeek.comps_avg_week) / 2, 2) AS comps_target,
      (NULLIF(today.comps_today, 0) / (NULLIF(lastMonth.comps_avg_month + lastWeek.comps_avg_week, 0) / 2)) * 100 AS comp_percentage
      FROM lastMonth, lastWeek, today
     `);

    console.log(result)

    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})


// @route GET  api/transactions/dash/chart
// @desc Get all trasactions for the dashboard chart for the last six months
// @access Private
router.get('/api/transaction/dash/chart', auth, async (req: any, res: any) => {
  const { id } = req.user;
  try {


    const tigoRepo = getRepository(Tigo);
    let result = await tigoRepo.manager.query(
    ` WITH tigo_summary AS (
      SELECT  
      TO_CHAR(tigo.created_at, 'MM/YYYY') AS month_year, 
      TO_CHAR(tigo.created_at, 'Month') AS comps_month,
      COALESCE(SUM(tigo.amount), 0) AS tigo_sum
      FROM users
      INNER JOIN tigo ON users.id= "tigo"."userId" AND tigo.status = 'Approved' AND TO_CHAR(tigo.created_at, 'MM/YYYY') IN (SELECT TO_CHAR(MONTHS, 'MM/YYYY') FROM GENERATE_SERIES( DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '6 MONTHS'), DATE_TRUNC('MONTH', CURRENT_DATE), '1 MONTH':: INTERVAL) AS MONTHS )
      WHERE users.id =${id}
      GROUP BY TO_CHAR(tigo.created_at, 'MM/YYYY'), TO_CHAR(tigo.created_at, 'Month')
    ), voda_summary AS (
      SELECT  COALESCE(SUM(vodacom.amount), 0) AS voda_sum
      FROM users
      INNER JOIN vodacom ON users.id= "vodacom"."userId" AND vodacom.status = 'Approved' AND TO_CHAR(vodacom.created_at, 'MM/YYYY') IN (SELECT TO_CHAR(MONTHS, 'MM/YYYY') FROM GENERATE_SERIES( DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '6 MONTHS'), DATE_TRUNC('MONTH', CURRENT_DATE), '1 MONTH':: INTERVAL) AS MONTHS )
      WHERE users.id =${id}
    ) , halo_summary AS (
      SELECT  COALESCE(SUM(halotel.amount), 0) AS halo_sum
      FROM users
      INNER JOIN halotel ON users.id= "halotel"."userId" AND halotel.status = 'Approved' AND TO_CHAR(halotel.created_at, 'MM/YYYY') IN (SELECT TO_CHAR(MONTHS, 'MM/YYYY') FROM GENERATE_SERIES( DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '6 MONTHS'), DATE_TRUNC('MONTH', CURRENT_DATE), '1 MONTH':: INTERVAL) AS MONTHS )
      WHERE users.id =${id}
    ) , air_summary AS (
      SELECT  COALESCE(SUM(airtel.amount), 0) AS air_sum
      FROM users
      INNER JOIN airtel ON users.id= "airtel"."userId" AND airtel.status = 'Approved' AND TO_CHAR(airtel.created_at, 'MM/YYYY') IN (SELECT TO_CHAR(MONTHS, 'MM/YYYY') FROM GENERATE_SERIES( DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '6 MONTHS'), DATE_TRUNC('MONTH', CURRENT_DATE), '1 MONTH':: INTERVAL) AS MONTHS )
      WHERE users.id =${id}
    )
    SELECT tigo_summary.comps_month, voda_sum, tigo_sum, halo_sum, air_sum FROM tigo_summary, voda_summary, halo_summary, air_summary
     `);

    console.log(result)

    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})

// @route GET  api/transactions/dash/table
// @desc Get all trasactions for dashboard datatable
// @access Private
router.get('/api/transaction/dash/datatable', auth, async (req: any, res: any) => {
  const { id } = req.user;
  try {


    const tigoRepo = getRepository(Tigo);
    let result = await tigoRepo.manager.query(
    ` 
    SELECT id AS id, transaction_type::VARCHAR AS transactionType, phone_number AS phonenumber, amount AS amount, company_type AS companyType, "userId" AS userID, TO_CHAR(created_at :: DATE, 'Mon dd, yyyy') AS dateTime
    FROM tigo 
    WHERE tigo."userId" = ${id} AND tigo.status = 'Approved'
    UNION
    SELECT id AS id, transaction_type::VARCHAR AS transactionType, phone_number AS phonenumber, amount AS amount, company_type AS companyType, "userId" AS userID, TO_CHAR(created_at :: DATE, 'Mon dd, yyyy') AS dateTime
    FROM vodacom 
    WHERE vodacom."userId" = ${id} AND vodacom.status = 'Approved'
    UNION
    SELECT id AS id, transaction_type::VARCHAR AS transactionType, phone_number AS phonenumber, amount AS amount, company_type AS companyType, "userId" AS userID, TO_CHAR(created_at :: DATE, 'Mon dd, yyyy') AS dateTime
    FROM halotel 
    WHERE halotel."userId" = ${id} AND halotel.status = 'Approved'
    UNION
    SELECT id AS id, transaction_type::VARCHAR AS transactionType, phone_number AS phonenumber, amount AS amount, company_type AS companyType, "userId" AS userID, TO_CHAR(created_at :: DATE, 'Mon dd, yyyy') AS dateTime
    FROM airtel 
    WHERE airtel."userId" = ${id} AND airtel.status = 'Approved'
    ORDER BY companyType DESC
    `);

    console.log(result)

    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})


export { router as trasactions };

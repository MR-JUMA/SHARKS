import { createConnection } from 'typeorm';
import express from 'express';
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");

import { Tigo, Vodacom, Airtel, Halotel } from './entities/CompanyEntity';
import { Config } from './entities/Config';
import { Users } from './entities/Users';
import { ViewUser } from './entities/ViewUser';
import { trasactions } from './routes/transactions';

dotenv.config();

const app = express();

const main = async () => {
	try {
		await createConnection({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: process.env.USER_NAME,
			password: process.env.PASSWORD,
			database: process.env.DATABASE,
			entities: [Tigo, Vodacom, Airtel, Halotel, Config, Users, ViewUser],
			logging: false,
			synchronize: true,
		});
		// const connection = await createConnection();
		console.log('Connected to Postgres');

		app.use(express.json());
		app.use(helmet());
		app.use(morgan("common"));

		app.use('/api/auth', require('./routes/auth'))
		app.use('/api/owners', require('./routes/owners'))
		app.use('/api/employees', require('./routes/employees'))
		app.use('/api/user', require('./routes/user'))
		app.use(trasactions);

		app.get('/', (req, res) => res.json({ msg: "Welcome to the PESA-APP"}))

		const PORT = process.env.PORT || 5000

		app.listen(PORT, () => {
			console.log('Now running on port 5000');
		});
	} catch (error) {
		console.error(error);
		throw new Error('Unable to connect to db');
	}
};

main();

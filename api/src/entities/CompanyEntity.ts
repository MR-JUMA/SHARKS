import {
	Entity,
	Column,
	ManyToOne,
} from 'typeorm';
import { Transaction } from './utils/Transaction';
import { Users } from './Users';

@Entity()
export class Tigo extends Transaction {

	@Column({ default: "TIGO"})
	company_type: string;

	@Column()
  userId: number;
	@ManyToOne(() => Users,(user) => user.tigo_transactions, { onDelete: 'CASCADE', cascade : true, eager: true })
	user: Users;

}

@Entity()
export class Vodacom extends Transaction {

	@Column({ default: "VODACOM"})
	company_type: string;

	@Column()
  userId: number;
	@ManyToOne(() => Users,(user) => user.vodacom_transactions, { onDelete: 'CASCADE', cascade : true, eager: true })
	user: Users;

}

@Entity()
export class Airtel extends Transaction {

	@Column({ default: "AIRTEL"})
	company_type: string;

	@Column()
  userId: number;
	@ManyToOne(() => Users,(user) => user.airtel_transactions, { onDelete: 'CASCADE', cascade : true, eager: true })
	user: Users;

}

@Entity()
export class Halotel extends Transaction {

	@Column({ default: "HALOTEL"})
	company_type: string;

	@Column()
  userId: number;
	@ManyToOne(() => Users,(user) => user.halotel_transactions,{ onDelete: 'CASCADE', cascade : true, eager: true })
	user: Users;

}








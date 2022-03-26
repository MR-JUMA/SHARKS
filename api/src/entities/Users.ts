import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	BaseEntity,
} from 'typeorm';

import { Tigo, Vodacom, Airtel, Halotel } from './CompanyEntity';

@Entity()
export class Users extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	owner_id: number;

	@Column()
	first_name: string;

	@Column()
	last_name: string;

	@Column()
	user_name: string;

	@Column({
		unique: true
	})
	email: string;

	@Column({nullable: true})
	phone_number: string;

	@Column({nullable: true})
	city: string;

	@Column()
	password: string;

	@Column({
	default: false,
	})
	is_active: boolean;

	@Column({})
	is_employee: boolean;

	@Column({ nullable: true })
	is_owner: boolean;

	@Column({
		name: 'dev',
		default: false,
	})
	is_dev: boolean;

	@OneToMany(() => Tigo,(tigo) => tigo.user)
	tigo_transactions: Tigo[];

	@OneToMany(() => Vodacom,(vodacom) => vodacom.user)
	vodacom_transactions: Vodacom[];

	@OneToMany(() => Airtel,(airtel) => airtel.user)
	airtel_transactions: Airtel[];

	@OneToMany(() => Halotel,(halotel) => halotel.user)
	halotel_transactions: Halotel[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

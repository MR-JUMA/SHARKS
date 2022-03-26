import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
} from 'typeorm';


export enum TransactionType {
	DEPOSIT = 'DEPOSIT',
	WITHDRAW = 'WITHDRAW',
}

export enum TransactionStatus {
	CREATED = 'Created',
	MODIFIED = 'Modified',
	DELETED = 'Deleted',
	APPROVED = 'Approved',
}

@Entity()
export class Transaction extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'enum',
		enum: TransactionType,
	})
	transaction_type: string;

	@Column({})
	phone_number: string;

	@Column({
		type: 'numeric',
	})
	amount: number;

	@Column({ 
		type: 'enum',
		enum: TransactionStatus,
	})
	status: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

}








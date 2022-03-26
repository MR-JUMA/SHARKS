import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
} from 'typeorm';

@Entity()
export class Config extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	config: string;

	@Column()
	config_desc: string;

  @Column()
	config_value_one: string;

  @Column()
	config_value_two: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

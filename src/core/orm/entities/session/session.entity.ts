import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
export class SessionEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	token: string;

	@CreateDateColumn()
	created: Date;

	@Column()
	ended: Date;

	@Column({ default: false })
	rejected: boolean;

	@ManyToOne(() => UserEntity, (user) => user.sessions)
	user: UserEntity;
}

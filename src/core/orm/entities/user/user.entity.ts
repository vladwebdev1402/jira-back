import { UserRole } from 'common/enums/user-role';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SessionEntity } from '../session/session.entity';

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: '' })
	name: string;

	@Column({ default: '' })
	displayName: string;

	@Column({ default: '' })
	avatar: string;

	@Column({ default: '' })
	email: string;

	@Column({ default: '' })
	post: string;

	@Column({ default: '' })
	company: string;

	@Column({ default: '' })
	department: string;

	@Column({
		enum: UserRole,
		default: UserRole.User,
	})
	role: UserRole;

	@OneToMany(() => SessionEntity, (session) => session.user)
	sessions: SessionEntity[];
}

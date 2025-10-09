import { UserRole } from 'common/enums/user-role';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SessionEntity } from '../session/session.entity';
import { UserJobSpaceEntity } from '../user-job-space/user-job-space.entity';
import { JobSpaceLinkFetchEntity } from '../job-space-link-fetch/job-space-link-fetch.entity';

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: '' })
	name: string;

	@Column({ default: '' })
	displayName: string;

	@Column({ default: '' })
	avatarUrl: string;

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

	@OneToMany(() => UserJobSpaceEntity, (jobSpace) => jobSpace.user)
	jobSpaces: UserJobSpaceEntity[];

	@OneToMany(() => JobSpaceLinkFetchEntity, (jobSpaceLink) => jobSpaceLink.creatorUser)
	createdJobSpaceLinkFetches: JobSpaceLinkFetchEntity[];
}

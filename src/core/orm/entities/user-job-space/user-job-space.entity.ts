import {
	USER_JOB_SPACE_PERMISSIONS_BY_ROLE,
	UserJobSpacePermission,
} from 'common/enums/user-job-space-permission';
import { UserJobSpaceRole } from 'common/enums/user-job-space-role';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { JobSpaceEntity } from '../job-space/job-space.entity';

@Entity()
export class UserJobSpaceEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: false })
	isUnlinked: boolean;

	@Column({ default: false })
	isCreator: boolean;

	@Column({
		type: 'enum',
		enum: UserJobSpacePermission,
		array: true,
		default: USER_JOB_SPACE_PERMISSIONS_BY_ROLE.developer,
	})
	permissions: UserJobSpacePermission[];

	@Column({
		type: 'enum',
		enum: UserJobSpaceRole,
		default: UserJobSpaceRole.developer,
	})
	role: UserJobSpaceRole;

	@ManyToOne(() => UserEntity, (user) => user.jobSpaces)
	user: UserEntity;

	@ManyToOne(() => JobSpaceEntity, (jobSpace) => jobSpace.users, {
		onDelete: 'CASCADE',
	})
	jobSpace: JobSpaceEntity;
}

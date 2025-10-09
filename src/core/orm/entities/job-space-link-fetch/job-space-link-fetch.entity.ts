import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserJobSpaceRole } from 'common/enums/user-job-space-role';
import { UserEntity } from '../user/user.entity';
import { JobSpaceEntity } from '../job-space/job-space.entity';

@Entity()
export class JobSpaceLinkFetchEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'enum', enum: UserJobSpaceRole })
	role: UserJobSpaceRole;

	@Column()
	email: string;

	@ManyToOne(() => UserEntity, (user) => user.createdJobSpaceLinkFetches)
	creatorUser: UserEntity;

	@ManyToOne(() => JobSpaceEntity, (jobSpace) => jobSpace.linkFetches)
	jobSpace: JobSpaceEntity;
}

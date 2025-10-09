import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserJobSpaceEntity } from '../user-job-space/user-job-space.entity';
import { JobSpaceLinkFetchEntity } from '../job-space-link-fetch/job-space-link-fetch.entity';

@Entity()
export class JobSpaceEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ default: '' })
	coverUrl: string;

	@Column({ default: '' })
	faviconUrl: string;

	@OneToMany(() => UserJobSpaceEntity, (userJobSpace) => userJobSpace.jobSpace)
	users: UserJobSpaceEntity[];

	@OneToMany(() => JobSpaceLinkFetchEntity, (jobSpaceLink) => jobSpaceLink.jobSpace)
	linkFetches: JobSpaceLinkFetchEntity[];
}

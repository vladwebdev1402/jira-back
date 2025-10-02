import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserJobSpaceEntity } from '../user-job-space/user-job-space.entity';

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
}

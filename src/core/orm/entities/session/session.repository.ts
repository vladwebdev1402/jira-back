import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionEntity } from './session.entity';

@Injectable()
export class SessionRepository {
	constructor(@InjectRepository(SessionEntity) private repository: Repository<SessionEntity>) {}

	async create(session: Partial<SessionEntity>) {
		return this.repository.save(session);
	}

	async remove(sessions: SessionEntity[]) {
		return this.repository.remove(sessions);
	}

	async findByUserId(id: number) {
		return this.repository.find({
			where: {
				user: {
					id,
				},
			},
		});
	}
}

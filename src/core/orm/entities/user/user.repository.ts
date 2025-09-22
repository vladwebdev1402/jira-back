import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
	constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}

	async getById(id: number) {
		return this.repository.findOne({
			where: { id },
		});
	}

	async getByEmail(email: string) {
		return this.repository.findOne({
			where: { email },
		});
	}

	async create(user: Partial<UserEntity>) {
		return this.repository.save(user);
	}

	async edit(id: number, user: Partial<UserEntity>) {
		return this.repository.update(id, user);
	}
}

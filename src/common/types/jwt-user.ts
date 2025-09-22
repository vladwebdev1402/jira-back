import { UserRole } from 'common/enums/user-role';

export type JwtUser = {
	id: number;
	role: UserRole;
};

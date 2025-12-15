import { UserJobSpacePermission } from 'common/enums/user-job-space-permission';
import { UserJobSpaceRole } from 'common/enums/user-job-space-role';

export const getRequiredLinkPermissionsForRole = (
	role: UserJobSpaceRole,
): UserJobSpacePermission[] => {
	const requiredPermissions: UserJobSpacePermission[] = [];

	switch (role) {
		case UserJobSpaceRole.developer:
			requiredPermissions.push(UserJobSpacePermission.linkDeveloper);
			break;
		case UserJobSpaceRole.manager:
			requiredPermissions.push(UserJobSpacePermission.linkManager);
			break;
		case UserJobSpaceRole.admin:
			requiredPermissions.push(UserJobSpacePermission.linkAdmin);
			break;
		default:
			break;
	}

	return requiredPermissions;
};

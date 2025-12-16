import { UserJobSpaceRole } from './user-job-space-role';

export enum UserJobSpacePermission {
	editJobSpace = 'EDIT_JOB_SPACE',
	deleteJobSpace = 'DELETE_JOB_SPACE',
	createProject = 'CREATE_PROJECT',
	deleteProject = 'DELETE_PROJECT',
	recoveryProject = 'RECOVERY_PROJECT',
	linkDeveloper = 'LINK_DEVELOPER',
	linkManager = 'LINK_MANAGER',
	linkAdmin = 'LINK_ADMIN',
}

export const USER_JOB_SPACE_PERMISSIONS_BY_ROLE = {
	[UserJobSpaceRole.admin]: [
		UserJobSpacePermission.editJobSpace,
		UserJobSpacePermission.deleteJobSpace,
		UserJobSpacePermission.createProject,
		UserJobSpacePermission.deleteProject,
		UserJobSpacePermission.recoveryProject,
		UserJobSpacePermission.linkAdmin,
		UserJobSpacePermission.linkManager,
		UserJobSpacePermission.linkDeveloper,
	],
	[UserJobSpaceRole.manager]: [
		UserJobSpacePermission.linkDeveloper,
		UserJobSpacePermission.createProject,
	],
	[UserJobSpaceRole.developer]: [],
};

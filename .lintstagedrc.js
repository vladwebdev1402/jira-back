/** @type { import('lint-staged').Config } */
module.exports = {
	'*': ['prettier --write', 'yarn cspell'],
	'*.{ts}': 'yarn eslint:fix',
};

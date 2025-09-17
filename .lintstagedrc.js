/** @type { import('lint-staged').Config } */
module.exports = {
	'*': ['yarn prettier:fix', 'yarn cspell'],
	'*.{ts}': 'yarn eslint:fix',
};

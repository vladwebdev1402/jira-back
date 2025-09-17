/** @type {import('eslint').Linter.Config} */
module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
	},
	extends: [
		'airbnb-base',
		'airbnb-typescript/base',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	rules: {
		'class-methods-use-this': 0,
		'no-param-reassign': 0,
		'no-void': [2, { allowAsStatement: true }],
		'@typescript-eslint/no-unused-expressions': [
			2,
			{
				allowShortCircuit: true,
				allowTernary: true,
			},
		],
		'@typescript-eslint/lines-between-class-members': 0,
		'@typescript-eslint/no-extraneous-class': [2, { allowWithDecorator: true }],
		'@typescript-eslint/require-await': 0,
		'import/prefer-default-export': 0,
		'import/no-cycle': 0,
	},
	overrides: [
		{
			extends: ['plugin:@typescript-eslint/disable-type-checked'],
			files: ['*.js', '*.cjs', '*.mjs'],
		},
	],
	ignorePatterns: ['dist'],
};

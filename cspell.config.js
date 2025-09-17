module.exports = {
	import: [
		'@cspell/dict-node/cspell-ext.json',
		'@cspell/dict-typescript/cspell-ext.json',
		'@cspell/dict-markdown/cspell-ext.json',
		'@cspell/dict-npm/cspell-ext.json',
		'@cspell/dict-git/cspell-ext.json',
		'@cspell/dict-docker/cspell-ext.json',
	],
	dictionaries: ['words'],
	dictionaryDefinitions: [
		{
			name: 'words',
			path: '.cspell/words.txt',
		},
	],
	language: 'en',
	useGitignore: true,
};

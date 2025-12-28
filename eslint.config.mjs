import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	prettier,
	{
		rules: {
			'@typescript-eslint/no-empty-object-type': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn',
			'no-undef': 'off',
			'no-unused-vars': 'warn',
			'no-useless-escape': 'off',
			'react-hooks/exhaustive-deps': 'warn',
			'react-hooks/rules-of-hooks': 'error',
			'react/jsx-sort-props': [
				'warn',
				{
					callbacksLast: true,
					noSortAlphabetically: false,
					reservedFirst: true,
					shorthandFirst: false,
					shorthandLast: true,
				},
			],
		},
	},
	globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;

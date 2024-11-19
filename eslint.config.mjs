// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginQuery from '@tanstack/eslint-plugin-query'

export default tseslint.config(
  ...pluginQuery.configs['flat/recommended'],
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
)

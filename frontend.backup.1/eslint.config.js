// 📄 eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier' // prettier 설정 import
import eslintPluginPrettier from 'eslint-plugin-prettier'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      prettier: eslintPluginPrettier, // prettier 플러그인 등록
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettier, // prettier 설정 적용
    ],
    rules: {
      'prettier/prettier': 'error',       // prettier 위반 시 오류
      semi: ['error', 'always'],          // 세미콜론 항상 붙이기
      indent: ['error', 2],               // 들여쓰기 2칸
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])

module.exports = {
  env: {
    // linter가 파일을 분석할 때, 미리 정의된 전역변수에 무엇이 있는지 명시하는 속성
    es2022: true,
    node: true
  },
  //  "overrides": [ // 파일 그룹에 대한 구성 파일 내부의 규칙을 비활성화
  //    {
  //      "files": ["*.ts"],
  //      "rules": {
  //        "strict": ["off"]
  //      }
  //    }
  //  ],
  ignorePatterns: ['./dist/*', './node_modules'], // ESLint가 무시할 디렉토리, 파일을 설정
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'node', 'promise'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 7, // 자바스크립트 버전, 7은 ECMA2016
    sourceType: 'module', // 모듈 export를 위해 import, export를 사용 가능여부를 설정, script는 사용불가
    requireConfigFile: false
  },
  rules: {
    'arrow-parens': ['warn', 'as-needed'],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never'
      }
    ],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    curly: ['error', 'all'],
    eqeqeq: ['error', 'always'],
    'no-eq-null': 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
        ignoreUrls: true
      }
    ],
    'no-console': 'off',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'no-trailing-spaces': 'error',
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'all'
      }
    ],
    'node/exports-style': ['error', 'module.exports'],
    'node/no-deprecated-api': 'error',
    'node/prefer-global/console': ['error', 'always'],
    'node/prefer-global/process': ['error', 'always'],
    'object-curly-newline': [
      'error',
      {
        consistent: true
      }
    ],
    'object-curly-spacing': ['error', 'always'],
    'padded-blocks': ['error', 'never'],
    'promise/prefer-await-to-then': 'warn',
    'promise/prefer-await-to-callbacks': 'warn',
    quotes: ['error', 'single'],
    'space-before-function-paren': 'warn',
    semi: ['error', 'always'],
    strict: ['error', 'global']
  }
}

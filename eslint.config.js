import globals from 'globals';

export default [
  {
    // 일반 파일에 대한 기본 규칙
    rules: {
      // 가능한 const로 선언을 권장 (Airbnb 스타일)
      'prefer-const': 'error',
      // const 변수 재할당 금지
      'no-const-assign': 'error',
      // var 사용 금지, let 또는 const 사용 강제
      'no-var': 'error',
      // 객체 생성 시 Object 생성자 사용 금지, 객체 리터럴 사용 권장
      'no-new-object': 'error',
      // 객체 속성에 축약형 사용을 권장
      'object-shorthand': ['error', 'always'],
      // 필요한 경우에만 객체 속성에 따옴표 사용
      'quote-props': ['error', 'as-needed'],
      // Object.prototype 메서드를 직접 호출하지 않도록 강제
      'no-prototype-builtins': 'error',
      // Object.assign 대신 스프레드 연산자 사용을 권장
      'prefer-object-spread': 'error',
      // 배열 생성 시 Array 생성자 사용 금지, 배열 리터럴 사용 권장
      'no-array-constructor': 'error',
      // 배열의 콜백 함수에서 return을 누락하지 않도록 강제
      'array-callback-return': ['error', { allowImplicit: true }],
      // 배열 및 객체에 구조 분해 할당 사용 권장
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: { array: true, object: true },
          AssignmentExpression: { array: false, object: false },
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      // 문자열에 작은따옴표 사용 권장 (Airbnb 스타일)
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      // 템플릿 리터럴 내 중괄호 공백 일관성 유지
      'template-curly-spacing': ['error', 'never'],
      // 문자열 연결 시 템플릿 리터럴 사용 권장
      'prefer-template': 'error',
      // 보안상의 이유로 eval 사용 금지
      'no-eval': 'error',
      // 불필요한 이스케이프 문자 금지
      'no-useless-escape': 'error',
      // 함수 선언 방식 통일: 선언식 또는 표현식 중 선택
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      // 함수에 이름을 지정하도록 강제
      'func-names': ['error', 'as-needed'],
      // 즉시 실행 함수 표현(IIFE)을 괄호로 감싸도록 강제
      'wrap-iife': ['error', 'inside'],
      // 루프 내에서 함수 정의 금지
      'no-loop-func': 'error',
      // 나머지 매개변수 사용을 권장
      'prefer-rest-params': 'error',
      // 기본 매개변수를 마지막에 위치시키도록 강제
      'default-param-last': 'error',
      // Function 생성자 사용 금지
      'no-new-func': 'error',
      // 함수 괄호 앞의 공백 스타일 통일
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      // 코드 블록 앞의 공백 스타일 통일
      'space-before-blocks': 'error',
      // 함수 매개변수 재할당 금지
      'no-param-reassign': ['error', { props: true }],
      // 스프레드 연산자 사용 권장
      'prefer-spread': 'error',
      // 함수 매개변수 괄호 및 줄바꿈 스타일 통일
      'function-paren-newline': ['error', 'consistent'],
      // 화살표 함수의 화살표 주변 공백 일관성 유지
      'arrow-spacing': ['error', { before: true, after: true }],
      // 화살표 함수 콜백 사용을 권장
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
      // 화살표 함수의 괄호 스타일 통일
      'arrow-parens': ['error', 'always'],
      // 화살표 함수의 본문 스타일 통일
      'arrow-body-style': ['error', 'as-needed'],
      // 혼동을 피하기 위해 불명확한 화살표 함수 금지
      'no-confusing-arrow': ['error', { allowParens: true }],
      // 암묵적 화살표 함수 줄바꿈 스타일 통일
      'implicit-arrow-linebreak': ['error', 'beside'],
      // 불필요한 생성자 금지
      'no-useless-constructor': 'error',
      // 클래스 멤버 중복 정의 금지
      'no-dupe-class-members': 'error',
      // 클래스 메서드 내에서 this 사용 권장
      'class-methods-use-this': ['error', { exceptMethods: [] }],
      // 중복 import 금지
      'no-duplicate-imports': ['error', { includeExports: true }],
      // 객체 중괄호 줄바꿈 스타일 통일
      'object-curly-newline': ['error', { consistent: true }],
      // 제한된 구문 사용 금지
      'no-restricted-syntax': ['error', 'WithStatement'],
      // iterator 사용 금지
      'no-iterator': 'error',
      // 제너레이터 별표 스타일 통일
      'generator-star-spacing': ['error', { before: true, after: false }],
      // 점 표기법 사용 권장
      'dot-notation': ['error', { allowKeywords: true }],
      // 지수 연산자 사용 권장
      'prefer-exponentiation-operator': 'error',
      // 정의되지 않은 변수 사용 금지
      'no-undef': 'error',
      // 여러 변수 선언 통일
      'one-var': ['error', 'never'],
      // 다중 할당 금지
      'no-multi-assign': 'error',
      // 증감 연산자 사용 금지
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      // 코드 길이 제한 설정 (Airbnb 권장: 100자)
      'max-len': ['error', { code: 150, ignoreComments: true, ignoreUrls: true }],
      // 연산자 줄바꿈 통일
      'operator-linebreak': ['error', 'before'],
      // 사용하지 않는 변수 금지
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
      // 정의 전에 사용 금지
      'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
      // 일치 연산자 사용 강제
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      // case 블록 내 변수 선언 금지
      'no-case-declarations': 'error',
      // 중첩 삼항 연산자 금지
      'no-nested-ternary': 'error',
      // 불필요한 삼항 연산자 금지
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      // 혼합 연산자 금지
      'no-mixed-operators': ['error', { groups: [['+', '-', '*', '/', '%', '**']] }],
      // 비블록 문장 본문 위치 통일
      'nonblock-statement-body-position': ['error', 'beside'],
      // 코드 블록 스타일 통일
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      // else 반환을 제거하여 코드 간결화
      'no-else-return': ['error', { allowElseIf: false }],
      // 주석 스타일 통일
      'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }],
      // 들여쓰기 통일 (2칸, Switch문은 1칸)
      indent: ['error', 2, { SwitchCase: 1 }],
      // 코드 블록 앞의 공백 통일
      'space-before-blocks': 'error',
      // 키워드 간격 통일
      'keyword-spacing': ['error', { before: true, after: true }],
      // 연산자 간 공백 통일
      'space-infix-ops': 'error',
      // 파일의 마지막 줄에 개행 강제
      'eol-last': 'error',
      // 체인 호출 시 줄바꿈 통일
      'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
      // 속성 앞의 공백 금지
      'no-whitespace-before-property': 'error',
      // 블록 패딩 통일
      'padded-blocks': ['error', 'never'],
      // 여러 개의 빈 줄 금지
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      // 괄호 내부 공백 통일
      'space-in-parens': ['error', 'never'],
      // 배열 대괄호 공백 통일
      'array-bracket-spacing': ['error', 'never'],
      // 객체 중괄호 공백 통일
      'object-curly-spacing': ['error', 'always'],
      // 블록 내부 공백 통일
      'block-spacing': 'error',
      // 쉼표 뒤의 간격 통일
      'comma-spacing': ['error', { before: false, after: true }],
      // 계산된 속성 공백 통일
      'computed-property-spacing': ['error', 'never'],
      // 함수 호출 간격 통일
      'func-call-spacing': ['error', 'never'],
      // 키-값 간격 통일
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      // 트레일링 공백 금지
      'no-trailing-spaces': 'error',
      // 쉼표 스타일 통일
      'comma-style': ['error', 'last'],
      // 끝에 쉼표 설정 통일
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never', // 함수 인자에서는 trailing comma를 허용하지 않음
        },
      ],
      // 세미콜론 사용 통일
      semi: ['error', 'always'],
      // 새로운 기본형 생성 금지
      'no-new-wrappers': 'error',
      // parseInt에 대한 radix 인수 사용 강제
      radix: 'error',
      // 식별자 길이 제한
      'id-length': ['error', { min: 2, max: 50 }],
      // camelCase 사용 강제
      camelcase: ['error', { properties: 'always' }],
      // 대문자로 시작하는 생성자 사용 강제
      'new-cap': ['error', { newIsCap: true, capIsNew: false }],
      // 언더스코어 밑줄 사용 금지
      'no-underscore-dangle': ['error', { allowAfterThis: false }],
      // 제한된 전역 변수 사용 금지
      'no-restricted-globals': ['error', 'event', 'fdescribe'],
      // 들여쓰기 2로 제한
      'max-depth': ['error', 2],
      'max-lines-per-function': [
        'error',
        {
          max: 10, // 함수 또는 메서드가 최대 10라인을 넘지 않도록 설정합니다.
          skipComments: true, // true로 설정 시, 주석 라인은 길이 제한에 포함되지 않습니다.
          skipBlankLines: true, // true로 설정 시, 빈 줄은 길이 제한에 포함되지 않습니다.
        },
      ],
    },
  },
  {
    // __tests__ 디렉토리에 위치한 파일에 대한 규칙
    files: ['__tests__/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'max-lines-per-function': 'off', // 테스트 파일에서 규칙 비활성화
    },
  },
];

/** @type {import("prettier").Config} */
export default {
  semi: true,             // 끝에 항상 세미콜론 붙이기
  tabWidth: 2,            // 들여쓰기 2칸
  singleQuote: false,     // 작은따옴표 대신 큰따옴표 사용
  trailingComma: 'es5',   // 객체/배열 마지막 쉼표 허용 (ES5 기준)
  bracketSpacing: true,   // { foo: bar } 괄호 사이 공백 허용
  arrowParens: 'avoid',   // 화살표 함수 매개변수 하나면 괄호 생략
  endOfLine: 'crlf',
}

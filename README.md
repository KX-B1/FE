# KX-B1 FE Convention

---

## Commit Convention

```
type: commit message
ex) feat: add login page
```

| Tag | Description |
|-----|-------------|
| `feat` | 새로운 기능 구현 |
| `fix` | 버그/파일 수정 |
| `style` | CSS 등 사용자 UI 디자인 변경 |
| `refactor` | 코드 리팩토링 |
| `docs` | 문서 수정 |
| `test` | 테스트 추가, 테스트 리팩토링 |
| `chore` | 빌드 테스트 업데이트, 패키지 매니저 설정 |
| `setting` | 구조 설계 및 변경 |
| `build` | 빌드 관련 파일 수정 |

---

## Code Convention

| Item | Rule |
|------|------|
| 변수명 | camelCase |
| 컴포넌트명 | PascalCase |
| 브랜치명 | kebab-case |
| 함수 | 화살표 함수 `() => {}` |
| 문자열 | 작은따옴표 `' '` |

### Prettier Config

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "useTabs": false
}
```

---

## Branch Convention

```
main         → 배포 브랜치 (push 금지)
dev          → 개발 통합 브랜치
feat/...     → 기능/스타일 개발
fix/...      → 버그 수정
refactor/... → 코드 리팩토링
```

> 커밋 태그와 동일한 prefix 사용  
> ex) `feat/login-page`, `fix/button-error`


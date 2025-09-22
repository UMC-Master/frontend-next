# 🏠 HomeMaster Style Guide

## 1. Commit & Branch 규칙

### ✴️ Commit Convention
```
타입: 부연 설명 및 이유 #이슈번호
```

**예시**
```
✨ feat: Login 화면 UI 구현 #1
```

| Emoji | Type       | Description                                    |
|-------|------------|-----------------------------------------------|
| ✨     | feat       | 새로운 기능 추가                              |
| 🔨     | fix        | 기능 수정 (사용자 동작이 달라짐)               |
| ♻️     | refactor   | 리팩토링 (기능 변경 없음, 코드 개선/버전업)    |
| 🐛     | bug        | 버그 수정                                    |
| 🚑️    | hotfix     | 긴급 핫픽스                                   |
| 💄     | UI         | CSS / UI 수정                                |
| 🎨     | style      | 코드 포맷팅, 세미콜론 추가 등 비기능적 변경    |
| 🔧     | config     | 설정, 환경변수 변경                           |
| ✏️     | typo       | 오타/워딩 수정                               |
| 📝     | docs       | 문서 수정                                    |
| 💬     | comment    | 주석 추가/삭제                               |
| 📦     | package    | 새로운 라이브러리 추가                        |
| 🔥     | remove     | 코드/파일 삭제                               |

### 🌿 Branch Naming
```
(feat|fix|refactor|chore)/#이슈번호-(UI|API)-기능설명
```

**예시**
- `feat/#2-UI-home`
- `feat/#16-API-create-post`

### 🔀 PR 규칙
- 리뷰 권장, 충돌만 없으면 self-merge 가능  
- PR 제목 = 커밋 컨벤션과 동일한 포맷  
- 주요 변경 사항을 체크리스트로 요약  

---

## 2. 기술 스택

- **Next.js (App Router)** – React 기반 풀스택 프레임워크  
- **React** – UI 라이브러리  
- **TypeScript** – 정적 타입 검사  
- **Tailwind CSS** – 유틸리티 우선 CSS 프레임워크  
- **Framer Motion** – 애니메이션 라이브러리  

### State Management
- **Zustand**

### Development Tools
- **ESLint** – 코드 품질 관리  
- **Prettier** – 코드 포맷팅  
- **next-pwa** – PWA 지원  

### Package Manager
- pnpm

### CI/CD
- GitHub Actions  
- Vercel (HomeMaster 전용 계정)  

### UI/UX
- 이미지는 **webp** 변환 후 사용 (png/jpg ❌)  
- svg(icon)은 **직접 import** 혹은 **next/image** 활용  

### Etc.
- **Storybook**: 도입 확정  
- **Left hook**: commit/PR 컨벤션 강제  
- **Gitmoji**: 그대로 사용  
- `NextButton.client.tsx` / `NextButton.server.tsx` 네이밍 방식 사용  

---

## 3. 폴더 구조

```bash
src/
  app/             # App Router
  features/        # 도메인별 기능 단위
    components/    # 컴포넌트 정의 (PascalCaseFileName.tsx)
    hooks/         # React Hook (use*.ts, use*.types.ts)
    apis/          # API 호출 (폴더는 method별, 파일명은 kebab-case)
  common/          # 공용 코드
    components/    # 전역 공용 컴포넌트
    assets/        # 전역 공용 데이터/이미지
```

---

## 4. 네이밍 규칙

### 폴더명
- **app router**: Next.js 규칙 준수  
- **components**: 해당 컴포넌트명과 동일한 폴더명  
- **storybook**: `*.stories.tsx`  
- **type**: `*.types.ts`  
- **hooks**: `/hooks/useXxx.ts`  
- **utils**: `*.utils.ts`  
- **constants**: `*.constants.ts`  
- **apis**: `kebab-case.ts`  

### 파일명
- **컴포넌트**: `PascalCaseFileName.tsx`  
- **Hook**: `camelCase` (예: `useSampleHook.ts`)  
- **기타 유틸**: kebab-case  

### 변수명
- **type/interface/enum**: PascalCase  
- **enum 내부 값**: CAPITAL_SNAKE_CASE  
- **상수**: CAPITAL_SNAKE_CASE  
- **지역 변수/함수/파라미터**: camelCase  

---

## 5. 환경변수 규칙

- **CAPITAL_SNAKE_CASE**  
- 목적/서비스명을 접두어로 붙여 충돌 방지  
- 민감한 값(`key`, `token`, `password`)은 `*_SECRET`  
- 클라이언트 노출 필요 시: `NEXT_PUBLIC_` prefix  

---

## 6. Import Convention

- 상위 → 하위 레이어 import는 최대 **2 depth**  
- 같은 slice 내부는 상대 경로로만 import (`../model`, `../ui`)  
- 공용은 `@shared/...` alias 활용  

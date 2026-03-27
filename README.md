<div align="center">

# HomeMaster Frontend

HomeMaster는 자취 생활에 도움이 되는 "꿀팁" 콘텐츠를 탐색하고, 검색하고, 저장하고, 마이페이지에서 개인 정보를 관리할 수 있도록 설계한 모바일 우선 서비스이며, 이 저장소는 해당 서비스의 Next.js App Router 기반 프론트엔드 프로젝트입니다.

**UMC 7th Demoday 우수상 수상작, HomeMaster**

Storybook, Chromatic, GitHub Actions가 연결되어 있어서 컴포넌트 중심 개발과 PR 단위 검증 흐름까지 함께 갖춘 상태입니다.

<br/>

<img src="https://img.shields.io/badge/Next.js_15.5.9-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
<img src="https://img.shields.io/badge/React_19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<br/>
<img src="https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Storybook_9.1.7-FF4785?style=for-the-badge&logo=storybook&logoColor=white" />
<br/>
<img src="https://img.shields.io/badge/React_Hook_Form_7.63.0-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" />
<img src="https://img.shields.io/badge/Zod_4.1.11-3068B7?style=for-the-badge&logo=zod&logoColor=white" />
<br/>
<img src="https://img.shields.io/badge/Vitest_3.2.4-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" />
<img src="https://img.shields.io/badge/Zustand_5.0.8-7D4CDB?style=for-the-badge&logo=react&logoColor=white" />

</div>

## Tech Stack

- Next.js 15.5.9
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4
- Zustand 5 + Immer
- React Hook Form + Zod
- Storybook 9
- Vitest + Playwright
- ESLint 9 + Prettier 3
- pnpm 10

## Project Architecture

이 프로젝트는 App Router를 사용하는 Next.js 애플리케이션이며, 레이아웃과 페이지는 `src/app`, 화면별 비즈니스 로직은 `src/features`, 재사용 컴포넌트는 `src/common` 및 `src/components`에 배치되어 있습니다.

- `src/app`
  페이지, 레이아웃, 전역 스타일을 담당합니다.
- `src/features`
  회원가입, 메인, 검색, 마이페이지 같은 기능 단위 UI와 데이터를 관리합니다.
- `src/common`
  카드, 네비게이션, 모달, 필터바처럼 여러 화면에서 쓰는 공통 컴포넌트를 둡니다.
- `src/components`
  버튼, 진행 바 등 비교적 독립적인 UI 컴포넌트를 둡니다.
- `.storybook`
  Storybook 및 Vitest 연동 설정을 관리합니다.
- `.github/workflows`
  CI, Vercel Preview, Chromatic 배포 워크플로우를 관리합니다.

## Key Features

- HomeMaster 서비스 소개
- UMC 7th Demoday 우수상 수상 프로젝트
- 메인 화면에서 카드 스택과 가로 카드 리스트로 오늘의 꿀팁과 월간 추천 콘텐츠 탐색
- 검색어 기반 꿀팁 검색 및 인기/추천 관심사 태그 탐색
- 좋아요, 저장, 공유 수 기준 정렬 필터
- 다단계 회원가입 플로우
  약관 동의, 이메일, 비밀번호, 프로필, 관심사 단계로 구성
- 마이페이지
  프로필, 등급, 작성 글, 팀 소개, 로그아웃/탈퇴 액션 UI 포함
- 알림, 저장한 꿀팁, 프로필 수정, 비밀번호 변경, 만든 사람들 화면 구현
- Storybook 스토리 기반 컴포넌트 문서화 및 Chromatic 배포

## Current Routes

주요 구현 경로는 아래와 같습니다.

- `/main`
- `/today-tips`
- `/monthly-tips`
- `/trending-tips`
- `/search`
- `/saved-tips`
- `/notifications`
- `/mypage`
- `/mypage/edit-profile`
- `/mypage/change-password`
- `/mypage/rank`
- `/mypage/posts`
- `/mypage/mychallenges`
- `/mypage/about`
- `/mypage/about/[id]`
- `/auth/sign-up`
- `/auth/sign-up/term`
- `/auth/sign-up/privacy-policy`
- `/auth/sign-up/privacy`
- `/auth/sign-up/marketing`

## Getting Started

### Prerequisites

- Node.js 18 이상
- pnpm 10 권장

### Install

```bash
pnpm install
```

### Run Development Server

```bash
pnpm dev
```

브라우저에서 `http://localhost:3000` 을 열고 확인할 수 있습니다. 실제 사용자 흐름 확인은 `/main` 경로부터 시작하는 편이 좋습니다.

### Production Build

```bash
pnpm build
pnpm start
```

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm type-check
pnpm storybook
pnpm build-storybook
pnpm chromatic
```

## Project Structure

```text
.
|-- .github/
|   |-- ISSUE_TEMPLATE/
|   `-- workflows/
|-- .storybook/
|-- public/
|-- src/
|   |-- app/
|   |-- assets/
|   |-- common/
|   |-- components/
|   |-- features/
|   |-- lib/
|   `-- types/
|-- package.json
|-- pnpm-lock.yaml
|-- tsconfig.json
`-- vitest.config.ts
```

## Development Workflow

- `main`, `develop` 브랜치를 대상으로 GitHub Actions CI가 동작합니다.
- CI에서는 의존성 설치 후 `lint`, `type-check`, `build` 를 수행합니다.
- 사내 시크릿이 사용 가능한 PR에서는 Vercel Preview를 생성하고 PR에 URL을 남깁니다.
- `*.stories.tsx` 변경이 있으면 Storybook 워크플로우가 실행되고 Chromatic 링크를 PR에 코멘트합니다.
- Storybook은 컴포넌트 단위 검토와 시각적 회귀 확인의 중심 역할을 합니다.

## Coding Standards

코드베이스에서 확인되는 기본 규칙은 다음과 같습니다.

- TypeScript 기반으로 작성
- 경로 별칭 `@/` 사용
- 기능 중심 폴더 구조 유지
- 공통 컴포넌트와 기능 컴포넌트 분리
- ESLint + Prettier 사용
- Storybook 스토리를 함께 두어 UI 상태를 문서화
- 전역 상태는 Zustand, 폼 검증은 React Hook Form + Zod 조합 사용

## Testing

- Vitest 설정 존재
- Storybook의 스토리를 테스트 대상으로 연결
- Playwright Chromium 브라우저 환경에서 Story 렌더링 검증
- `@storybook/addon-a11y` 를 통한 접근성 점검 보조

## Contributing

1. 브랜치를 생성합니다.
2. 변경 후 `pnpm lint`, `pnpm type-check`, `pnpm build` 를 우선 확인합니다.
3. UI 컴포넌트를 수정했다면 Storybook 스토리도 함께 점검합니다.
4. PR에는 변경 목적, 확인 방법, 필요한 경우 화면 캡처를 포함합니다.

컴포넌트 예시는 `*.stories.tsx` 파일들을 참고하면 빠르게 맥락을 파악할 수 있습니다.

## Contributors

<table>
  <tr>
    <td align="center" width="150">
      <a href="https://github.com/minzee09"><img src="https://github.com/minzee09.png" width="100" alt="김민지"/></a><br/>
      <b>김민지</b><br/>
      <a href="https://github.com/minzee09"><img src="https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub"/></a>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/Head-ddy"><img src="https://github.com/Head-ddy.png" width="100" alt="라희수"/></a><br/>
      <b>라희수</b><br/>
      <a href="https://github.com/Head-ddy"><img src="https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub"/></a>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/S-Gihun"><img src="https://github.com/S-Gihun.png" width="100" alt="손기훈"/></a><br/>
      <b>손기훈</b><br/>
      <a href="https://github.com/S-Gihun"><img src="https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub"/></a>
    </td>
  </tr>
</table>

<p align="center">
  <sub>UMC 7th · HomeMaster Frontend Team</sub>
</p>

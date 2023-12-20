<p align="center">
  <img src="https://i.ibb.co/Np7j62b/sh-logo.png" />
</p>

---

<p align="center">
  와카이브 웹 사이트 개발 레파지토리입니다. 와카이브 웹 사이트는 <a herf="https://pages.github.com/">Github Pages</a> 로 배포됩니다. 프로젝트에 궁금한 점이 있으시다면 <a href="https://womynarchive.notion.site/Warchive-2c6f3d986de74c25b96fab944def12a2?pvs=74">와카이브 팀 홈페이지</a>를 방문해주세요.
</p>

<p align="center"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/yarn berry-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white">  <img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white">  <img src="https://img.shields.io/badge/scss-CC6699?style=for-the-badge&logo=yarn&logoColor=white"> <img src="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white"></p>

## 🚀 Getting Started

### 1.사전 준비

VSCode 의 extensions 중 Prettier, ESlint, ZipFS, Liveshare extensions 를 다운로드 받는다.

> ZipFS가 없으면 yarn berry 가 생성한 의존성 압축 파일들을 제대로 읽지 못해 하단의 typescript 사용 설정을 해줘도 코드에디터 상에서 빨간 줄이 생긴다.

### 2. 프로젝트 클론

레파지토리를 클론하고 VSCode 로 실행한다.

```bash
git clone https://github.com/warchivee/warchive-web.git
```

### 3. typescript 설정

VSCode 우측 하단에 '<u>This workspace contains a TypeScript version. Would you like to use the workspace TypeScript version for TypeScript and JavaScript language features?</u>' 라는 팝업이 뜨면 `Allow` 한다.

> 만약 뜨지 않았다면 `view > command palette` 를 열고 <u>Typescript: Select TypeScript Version</u> 설정을 `Use Workspace Version` 으로 설정한다. VS Code's Version 과 같더라도 Workspace Version 으로 선택해야 한다.

### 4. 프로젝트 실행

프로젝트가 잘 작동하는지 실행해본다.

```bash
yarn dev
```

만약 실행했을 때 unplugged 패키지 관련 에러 메시지가 뜬다면 unplugged 패키지를 설치해준다. (이슈 확인 중.)

```bash
yarn install --immutable --immutable-cache
```

## 📚 Commands

```bash
# 프로젝트 실행
yarn dev

# 스토리북 실행
yarn storybook

# eslint로 문법 검사
yarn lint

# 빌드
yarn build
yarn build-storybook
```

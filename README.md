<p align="center">
  <h3 align="center">📌✨solved.ac-box</h3>
  <p align="center">브론즈부터 마스터까지 👑, 당신의 solved.ac 티어를 한눈에</p>
</p>

<p align="center">
   <img src="https://img.shields.io/badge/language-typescript-blue?style"/>
   <img src="https://img.shields.io/github/license/mingyeongho/solved.ac-box"/>
   <img src="https://img.shields.io/badge/node-%3E%3D20-brightgreen"/>
</p>

---

## 🎯 소개

[solved.ac](https://solved.ac) 통계를 자동으로 GitHub Gist에 표시합니다!

이 프로젝트는 solved.ac에서 알고리즘 문제 풀이 통계를 가져와 GitHub Gist에 다음 정보를 업데이트합니다:

- 🏷️ 소개(bio)
- 📈 현재 레이팅
- ✅ 해결한 문제 수

## 🚀 설정 방법

### 1. GitHub Gist 만들기

https://gist.github.com 에서 새로운 public gist를 생성합니다.

### 2. GitHub 토큰 생성

https://github.com/settings/tokens/new 에서 `gist` 권한을 가진 새 토큰을 생성합니다.

### 3. 이 저장소 Fork하기

### 4. GitHub Secrets 설정

Fork한 저장소의 Settings에서 다음 secrets를 추가합니다:

- `GH_TOKEN`: 2단계에서 생성한 GitHub 토큰
- `GIST_ID`: 1단계에서 생성한 Gist의 ID (Gist URL의 영숫자 부분)
- `USERNAME`: 본인의 solved.ac 사용자명

## 📝 라이센스

MIT

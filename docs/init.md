# React脚手架初始化

## Step1:初始化项目( vite + react-ts )

```shell
pnpm init vite@latest react-ci-cd-test -- --template react-ts
```

## Step2: Git init

```shell
git init
#初始化提交
git branch -M main
git remote add origin https://github.com/idootop/react-ci-cd-test.git
git push -u origin main
```

## Step3: 配置ESlint/Prettier

安装依赖

```shell
# eslint
# https://github.com/AlloyTeam/eslint-config-alloy
pnpm install --save-dev eslint \
                      typescript \
                      @typescript-eslint/parser \
                      @typescript-eslint/eslint-plugin \
                      eslint-plugin-react \
                      eslint-config-alloy
# prettier                      
pnpm install prettier -D --save-exact
```

相关配置

```shell
# .eslintignore  / .prettierignore 
node_modules
.DS_Store
dist
dist-ssr
*.local
node_modules/*
                 
# .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Make sure this is always the last element in the array.
  ],
  plugins: ['simple-import-sort', 'prettier'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
};

# .prettierrc.js
module.exports = {
  // 一行最多 120 字符
  printWidth: 120,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾需要有逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // vue 文件中的 script 和 style 内不用缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf
  endOfLine: 'lf',
  // 格式化嵌入的内容
  embeddedLanguageFormatting: 'auto',
};
```

Vscode相关配置（记得安装ESlint/Prettier）

```json
// .vscode/settings.json 
{
  "files.eol": "\n",
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["javascript", "javascriptreact", "vue", "typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Step4: vs code debug

.vscode/launch.json 

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

vite.config.ts

```js
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    sourcemap: true,
  },
});
```

## Step4: CI/CD

[GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

.github/workflows/action.yml

```yaml
name: Build & Deploy
description: Deploy React App to Github Pages
author: idootop
branding:
  color: blue
  icon: code

on: 
  push:
    branches:
      - main 

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps: 
      # 第一步 拉代码
      - name: Checkout ⚡️
        uses: actions/checkout@v2
        with:
          persist-credentials: false

      # 第二步 安装依赖打包
      - name: Install and Build 🔧  
        run: |
          npm install
          npm run build
          cp build/index.html build/404.html
        shell: bash

      # 第三步 将打包后的文件推送至下面填写的分支，部署到github的静态页
      - name: Deploy 🚀 
        id: 'deploy'
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          GITHUB_TOKEN: ${{ secrets.WORKFLOW_TOKEN }}
          BRANCH: static-page # 编译文件分支
          FOLDER: dist # 编译文件的文件夹
      
      # 第三步 发送邮件通知
      # - name: Send Notification 📧 
      #   uses: dawidd6/action-send-mail@master
      #   with:
      #     server_address: smtp.163.com 
      #     server_port: 465
      #     username: ${{ secrets.MAIL_USERNAME }}
      #     password: ${{ secrets.MAIL_PASSWORD }}
      #     subject: 【】#邮件主题
      #     body: 邮件内容
      #     to: xxxx@xxx.com # 收件邮箱
      #     from: GitHub Actions # 发件人
```
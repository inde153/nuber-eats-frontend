npm i -D ts-node @graphql-codegen/cli @graphql-codegen/client-preset

root 폴더에 codegen.ts 파일을 만들고 다음 내용을 적어줍니다.
import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
overwrite: true
schema: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
documents: ['src/**/*.tsx'],
ignoreNoDocuments: true, // for better experience with the watcher
generates: {
'./src/gql/': {
preset: 'client'
}
}
}

export default config

package.json에서 "generate": "graphql-codegen" 추가
/src/gql/graphql.ts파일에 타입들이 다 generate 됩니다.

https://emailregex.com/#google_vignette

Redirect삭제, element로 Navigate를 넣기

<!-- CSS -->

<!-- em은 element의 폰트 크기에 좌우가 된다.
예로 div가 있고 font사이즈가 50px이라면
mgargin Top의 1em도 50px이다
2em이라면 100px이다.

rem은 root의 em이다.
div가 있어도 2rem은 100px가 되지 않는다.
rem은 body의 font사이즈의 em으로 한다.
그래서 body font 사이즈가 5라면 2rem은 10이 된다. -->

[React.js] React에서 Font Awesome 사용하기

<!-- npm i @fortawesome/fontawesome-svg-core
npm i @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
npm i @fortawesome/react-fontawesome -->

출처 :
https://sunho-doing.tistory.com/entry/Reactjs-React%EC%97%90%EC%84%9C-Font-Awesome-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

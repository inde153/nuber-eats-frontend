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

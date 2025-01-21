import { generateApi } from "swagger-typescript-api"
import path from "path"
import fs from "fs"

const outPath = path.join(process.cwd(), 'app', 'frontend', 'sdk')

generateApi({
  name: "client.ts",
  apiClassName: "AuthrApi",
  input: path.join(process.cwd(), 'swagger', 'swagger.yaml'),
  output: outPath,
  templates: path.join(process.cwd(), 'sdk_templates'),
  httpClientType: 'fetch',
  generateResponses: true,
  generateRouteTypes: true,
  extractRequestParams: true,
  extractRequestBody: true,
  extractResponseBody: true,
  extractResponseError: true,
  prettier: {
    printWidth: 150,
    tabWidth: 2,
    trailingComma: 'all',
    parser: 'typescript',
    semi: false,
    singleQuote: true,
  },
  hooks: {
    onCreateRoute: (routeData) => {
      const rawTypeData = routeData.responseBodySchema.rawTypeData
      if (rawTypeData && rawTypeData.name) {
        const name = rawTypeData.name
        const originalName = routeData.responseBodySchema.typeData.name
        routeData.responseBodySchema.typeData.name = name
        routeData.response.type = name
        if (routeData.responseBodyInfo.success?.type == originalName) routeData.responseBodyInfo.success.type = name
        routeData.responseBodyInfo.responses.forEach(r => {
          if (r.type === originalName) r.type = name
          if (r.typeName === originalName) r.typeName = name
        })
      }
      // if (routeData.namespace == 'admin') {
      //   var subModule = routeData.request.path.split('/')[2]
      //   routeData.routeName.usage = subModule+'_'+routeData.routeName.usage
      //   routeData.routeName.original = subModule+'_'+routeData.routeName.original
      // }
      routeData
    },
  }
}).then(({ files, configuration}) => {
  files.forEach(({ fileContent, fileName, fileExtension }) => {
    fs.writeFileSync(path.join(outPath, `${fileName}${fileExtension}`), fileContent)
  })
}).catch(console.error)

import { ApolloServer } from '@apollo/server'
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4'
import { makeExecutableSchema } from '@graphql-tools/schema'
import cors from 'cors'
import express from 'express'
import { readFile } from 'node:fs/promises'
import { useServer as useWsServer } from 'graphql-ws/lib/use/ws'
import { createServer as createHttpServer } from 'node:http'
import { WebSocketServer } from 'ws'
import { resolvers } from './resolvers.js'
import { getHttpContext, getWsContext } from './app/context.js'
import * as ServerConfig from './config/server.js'
import { handleLogin } from './api/auth/auth.controller.js'
import { authMiddleware } from './api/auth/auth.middleware.js'

const PORT = process.env.PORT || ServerConfig.Port

const app = express()
app.use(cors(), express.json())

app.post('/login', handleLogin)

const typeDefs = await readFile('./schema.graphql', 'utf8')
const schema = makeExecutableSchema({ typeDefs, resolvers })

const apolloServer = new ApolloServer({ schema })
await apolloServer.start()
app.use(
  '/graphql',
  authMiddleware,
  apolloMiddleware(apolloServer, {
    context: getHttpContext,
  })
)

const httpServer = createHttpServer(app)
const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' })
useWsServer({ schema, context: getWsContext }, wsServer)

httpServer.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`)
})

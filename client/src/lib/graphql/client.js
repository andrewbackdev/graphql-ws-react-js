import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { Kind, OperationTypeNode } from 'graphql'
import { createClient as createWsClient } from 'graphql-ws'
import { getAccessToken } from '../auth'
import { ServerGraphQlUri, ServerGraphQlWsUrl } from '../../config/server'

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken()
  if (accessToken) {
    operation.setContext({
      headers: { 'Authorization': `Bearer ${accessToken}` },
    })
  }
  return forward(operation)
})

const httpLink = concat(
  authLink,
  createHttpLink({
    uri: ServerGraphQlUri,
  })
)

const wsLink = new GraphQLWsLink(
  createWsClient({
    url: ServerGraphQlWsUrl,
    connectionParams: () => ({ accessToken: getAccessToken() }),
  })
)

export const apolloClient = new ApolloClient({
  link: split(isSubscription, wsLink, httpLink),
  cache: new InMemoryCache(),
})

function isSubscription(operation) {
  const definition = getMainDefinition(operation.query)
  return (
    definition.kind === Kind.OPERATION_DEFINITION &&
    definition.operation === OperationTypeNode.SUBSCRIPTION
  )
}

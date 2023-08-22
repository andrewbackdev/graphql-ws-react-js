import { MessageResolvers } from './api/message/message.resolver.js'
import { mergeDeep } from './app/utils.js'

export const resolvers = mergeDeep({}, MessageResolvers)

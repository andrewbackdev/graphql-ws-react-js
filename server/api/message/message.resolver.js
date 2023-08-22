import * as MessageService from './message.service.js'
import { requireAuth } from '../auth/auth.helper.js'
import { MessageTopic } from './message.config.js'
import { pubSub } from '../../app/pubsub.js'

export const MessageResolvers = {
  Query: {
    messages: (_root, _args, { user }) => {
      requireAuth(user)

      return MessageService.getMessages()
    },
  },

  Mutation: {
    addMessage: (_root, { text }, { user }) => {
      requireAuth(user)

      return MessageService.addMessage({ user, text })
    },
  },

  Subscription: {
    messageAdded: {
      subscribe: (_root, _args, { user }) => {
        requireAuth(user)

        return pubSub.asyncIterator(MessageTopic.MessageAdded)
      },
    },
  },
}

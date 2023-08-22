import * as MessagesRepository from '../../db/messages.js'
import { MessageTopic } from './message.config.js'
import { pubSub } from '../../app/pubsub.js'

export function getMessages() {
  return MessagesRepository.getMessages()
}

export async function addMessage({ user, text }) {
  const message = await MessagesRepository.createMessage(user, text)

  pubSub.publish(MessageTopic.MessageAdded, { messageAdded: message })

  return message
}

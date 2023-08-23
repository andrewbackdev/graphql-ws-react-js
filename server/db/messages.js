import { connection } from './connection.js'
import { generateId } from './ids.js'

const getMessageTable = () => connection.table('message')

export async function getMessages() {
  return await getMessageTable().select().orderBy('createdAt', 'asc')
}

export async function createMessage(user, text) {
  const message = {
    id: generateId(),
    user,
    text,
    createdAt: new Date().toISOString(),
  }
  await getMessageTable().insert(message)
  return message
}

export async function deleteAllMessages() {
  return await getMessageTable().delete()
}

export async function createDefaultSystemMessage() {
  return await getMessageTable().insert([
    {
      id: 'm00000000001',
      user: 'system',
      text: 'Welcome to the GraphQL chat!',
      createdAt: new Date(),
    },
  ])
}

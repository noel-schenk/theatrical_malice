import type * as Party from 'partykit/server'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {}

  // Helper to get/set rooms from durable storage
  async getRooms(): Promise<Set<string>> {
    const rooms = await this.room.storage.get<string[]>('rooms')
    return new Set(rooms ?? [])
  }

  async setRooms(rooms: Set<string>) {
    await this.room.storage.put('rooms', [...rooms])
  }

  async onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    if (this.room.id === 'lobby') {
      const rooms = await this.getRooms()
      conn.send(JSON.stringify({ rooms: [...rooms] }))
      return
    }

    await this.room.context.parties.main.get('lobby').fetch({
      method: 'POST',
      body: JSON.stringify({ roomId: this.room.id, action: 'add' }),
    })
  }

  onMessage(message: string, sender: Party.Connection) {
    if (this.room.id === 'lobby') return
    this.room.broadcast(message, [sender.id])
  }

  async onRequest(req: Party.Request) {
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS })
    }

    if (this.room.id !== 'lobby') {
      return new Response('Not found', { status: 404 })
    }

    const url = new URL(req.url)

    if (req.method === 'GET') {
      const rooms = await this.getRooms()
      const checkRoom = url.searchParams.get('check')

      if (checkRoom) {
        return new Response(
          JSON.stringify({ roomId: checkRoom, exists: rooms.has(checkRoom) }),
          { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
        )
      }

      return new Response(JSON.stringify({ rooms: [...rooms] }), {
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      })
    }

    if (req.method === 'POST') {
      const { roomId, action } = await req.json<{
        roomId: string
        action: string
      }>()
      const rooms = await this.getRooms()

      if (action === 'add') rooms.add(roomId)
      if (action === 'remove') rooms.delete(roomId)

      await this.setRooms(rooms)
      return new Response('OK', { headers: CORS_HEADERS })
    }

    return new Response('Method not allowed', { status: 405 })
  }

  async onClose(conn: Party.Connection) {
    if (this.room.id === 'lobby') return

    if ([...this.room.getConnections()].length === 0) {
      await this.room.context.parties.main.get('lobby').fetch({
        method: 'POST',
        body: JSON.stringify({ roomId: this.room.id, action: 'remove' }),
      })
    }
  }
}

Server satisfies Party.Worker

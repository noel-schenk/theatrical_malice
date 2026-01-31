import type * as Party from "partykit/server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default class Server implements Party.Server {
  rooms = new Set<string>();

  constructor(readonly room: Party.Room) {}

  async onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    if (this.room.id === "lobby") {
      conn.send(JSON.stringify({ rooms: [...this.rooms] }));
      return;
    }

    await this.room.context.parties.main.get("lobby").fetch({
      method: "POST",
      body: JSON.stringify({ roomId: this.room.id, action: "add" }),
    });
  }

  onMessage(message: string, sender: Party.Connection) {
    if (this.room.id === "lobby") return;
    this.room.broadcast(message, [sender.id]);
  }

  async onRequest(req: Party.Request) {
    if (this.room.id !== "lobby") {
      return new Response("Not found", { status: 404 });
    }

    const url = new URL(req.url);

    if (req.method === "GET") {
      const checkRoom = url.searchParams.get("check");

      // Check if specific room exists
      if (checkRoom) {
        return new Response(
          JSON.stringify({
            roomId: checkRoom,
            exists: this.rooms.has(checkRoom),
          }),
          {
            headers: { "Content-Type": "application/json", ...CORS_HEADERS },
          },
        );
      }

      // Return all rooms
      return new Response(JSON.stringify({ rooms: [...this.rooms] }), {
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      });
    }

    if (req.method === "POST") {
      const { roomId, action } = await req.json<{
        roomId: string;
        action: string;
      }>();
      if (action === "add") this.rooms.add(roomId);
      if (action === "remove") this.rooms.delete(roomId);
      return new Response("OK");
    }

    return new Response("Method not allowed", { status: 405 });
  }

  async onClose(conn: Party.Connection) {
    if (this.room.id === "lobby") return;

    if ([...this.room.getConnections()].length === 0) {
      await this.room.context.parties.main.get("lobby").fetch({
        method: "POST",
        body: JSON.stringify({ roomId: this.room.id, action: "remove" }),
      });
    }
  }
}

Server satisfies Party.Worker;

// import { MessageProcessor } from './process';
// import Message = Server.Message;

// export class PingProcessor extends MessageProcessor {
//   protected processors: { [id: number]: Server.ProcessFunction } = {};

//   constructor(game: Server.GameState) {
//     super(game);

//     this.processors[96] = this.ping.bind(this);
//   }

//   async process(msg: Message): Promise<any> {
//     this.processors[msg.id](msg);
//   }

//   ping(msg: Message): void {
//     msg.client.sendMessage(149, Buffer.from([]));
//   }
// }

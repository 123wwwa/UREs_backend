import * as WebSocket from 'ws';
import { machine } from './types';
import { WebSocketObj } from './types';
class Client {
    private server: WebSocketObj;
    private socket: any;
    constructor(server: WebSocketObj, socket:any) {
        this.socket = socket;
        this.server = server;
    }
    handleMessages(){

    }
    msg_reqMachines(address: number, university: string){
        // send all machines to client
    }
    sendMachines(machines: Array<machine>){
        // send all machines to client
    }
}
export default Client;
import * as WebSocket from 'ws';
import { machine } from './types';
class Client {
    private server: WebSocket.Server;
    constructor(server: WebSocket.Server) {
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
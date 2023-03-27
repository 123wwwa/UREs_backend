import * as WebSocket from 'ws';
import { Server } from 'http';
import { createServer } from 'http';
import MariadbRequest  from './mariadb';

class BroadCastServer {
    private wsServer: WebSocket.Server;
    private httpServer: Server;
    private port: number;
    private mariadb: MariadbRequest;
    private config= {
        serverPort: 8080,
        serverBind: "0.0.0.0",
    }
    constructor(port: number) {
        this.port = port;
        this.httpServer = createServer();
        let wsOptions = {
            server: this.httpServer,
            perMessageDeflate: false,
            maxPayload: 4096
        }
        this.wsServer = new WebSocket.Server(wsOptions);
        this.mariadb = new MariadbRequest();
    }
    start(){   
        this.wsServer.on('error', this.onServerSocketError.bind(this));
        this.wsServer.on('connection', this.onClientSocketOpen.bind(this));
        this.httpServer.listen(this.config.serverPort, this.config.serverBind, this.onHttpServerOpen.bind(this));
        this.mariadb.initDatabase(); // init database
    }
    sendAllMachines() {
        // send all machines to client
    }
    mainLoop() {
        // update machine status if new reservation is made
        // update machine status if reservation is deleted
    }
    onClientSocketOpen(ws: WebSocket) {

    }
    onServerSocketError(error: Error) {

    }
    onHttpServerOpen() {

    }
}
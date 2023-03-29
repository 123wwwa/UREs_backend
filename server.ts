import * as WebSocket from 'ws';
import { Server } from 'http';
import { createServer } from 'http';
import MariadbRequest  from './mariadb';
import Client from './client';
import { WebSocketObj } from './types';


class BroadCastServer {
    private wsServer: WebSocket.Server;
    private httpServer: Server;
    private port: number;
    private mariadb: MariadbRequest;
    private timeStamp: number = 0;
    private startTime: number = Date.now();
    private stepDateTime = 0;
    private timerLoopBind: any = null;
    private mainLoopBind: any = null;
    private ticks: number = 0;
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
        this.timerLoopBind = this.timerLoop.bind(this);
        this.mainLoopBind = this.mainLoop.bind(this);
        this.wsServer.on('error', this.onServerSocketError.bind(this));
        this.wsServer.on('connection', this.onClientSocketOpen.bind(this));
        this.httpServer.listen(this.config.serverPort, this.config.serverBind, this.onHttpServerOpen.bind(this));
        this.mariadb.initDatabase(); // init database
    }
    sendAllMachines() {
        // send all machines to client
    }
    timerLoop() {
        let timeStep = 40;
        let ts = performance.now();
        let dt = ts- this.timeStamp;
        if(dt < timeStep) {
            setTimeout(this.mainLoop.bind(this), timeStep);
            return;
        }
        if(dt < 240) {
            this.timeStamp = ts-timeStep;
        }
        setTimeout(this.mainLoopBind, 1);
        setTimeout(this.timerLoopBind, 1);

    }
    mainLoop() {
        
        // update machine status if new reservation is made
        // update machine status if reservation is deleted
    }
    onClientSocketOpen(ws: WebSocketObj, req: any) {

        // let request = req || ws?.upgradeReq;
        let logip = ws?._socket?.remoteAddress + ":" + ws?._socket?.remotePort;
        ws.client = new Client(ws, this);
        ws.on("error",(error)=>{
            console.error(error);
        })
        ws.on("message",(msg)=>{
            //handle message
            ws.client.handleMessages();
        })
    }
    onServerSocketError(error: Error) {
        console.error(error);

    }
    onHttpServerOpen() {
        setTimeout(this.timerLoopBind, 1);
    }
}
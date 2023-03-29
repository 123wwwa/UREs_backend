/*
// data struture
==============================
// database name: Ures
==============================
// table name: machines
==============================
// id:string, 
// gender(M or F):string,
// machineType(dryer or laundry):string,
// address:number,
// university:string,
// machineNumber:number,
// remainingTime:number,
// isRunning:boolean,
// isWaiting:boolean,
==============================
// table name: reservations
==============================
// machineId:string,
// startTime:string,
// endTime:string,
*/
import * as WebSocket from 'ws';
type gender = 'M' | 'F';
type machineType = 'dryer' | 'laundry';
interface machine {
    id: string,
    gender: gender,
    machineType: machineType,
    address: number,
    university: string,
    machineNumber: number,
    remainingTime: number,
    isRunning: boolean,
    isWaiting: boolean,
}
interface reservation {
    machineId: string,
    startTime: string,
    endTime: string,
}
interface address {
    address: number,
    university: string,
}
interface WebSocketObj extends WebSocket {
    client: any; // Define the 'client' property as a string
    _socket: any;
}
export { WebSocketObj, reservation, address,  machine};
export {gender, machineType}
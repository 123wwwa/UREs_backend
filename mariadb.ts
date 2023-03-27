import mariadb from 'mariadb';
import pool from './mariadb.config';
import { gender, machineType, reservation, address,  machine } from './types';
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
// startTime:timestamp,
// endTime:timestamp,
*/

class MariadbRequest {
    constructor() {
    }
    async writeQuery(query: string, params: any[]) {
        let rows, conn;
        try {
            conn = await pool.getConnection();
            rows = await conn.query(query, params);
        } catch (err) {
            console.error(err);
        } finally {
            if (conn) {
                conn.end();
                return rows;
            }
        }
    }
    async initDatabase() {
        let query = "CREATE DATABASE IF NOT EXISTS Ures";
        // create database Ures
        await this.writeQuery(query, []);
        await this.writeQuery("USE Ures", []);
        // create table machines
        await this.writeQuery(`CREATE TABLE IF NOT EXISTS machines (
            id VARCHAR(255) PRIMARY KEY,
            gender VARCHAR(255),
            machineType VARCHAR(255),
            address INT,
            university VARCHAR(255),
            machineNumber INT,
            remainingTime INT,
            isRunning BOOLEAN,
            isWaiting BOOLEAN
          )`, []);
        // create table reservations
        await this.writeQuery(`CREATE TABLE IF NOT EXISTS reservations (
            machineId VARCHAR(255),
            startTime TIMESTAMP,
            endTime TIMESTAMP
            )`, []);
        // create table addresses
        await this.writeQuery(`CREATE TABLE IF NOT EXISTS addresses (
            address INT,
            university VARCHAR(255)
            )`, []);
    }
    async insertMachine(machine: machine) {
        let machineValues = Object.values(machine);
        await this.writeQuery(`INSERT INTO machines 
        (id, gender, machineType, address, university, machineNumber, remainingTime, isRunning, isWaiting) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,  machineValues);
    }
    async insertReservation(reservation: reservation) {
        let reservationValues = Object.values(reservation);
        await this.writeQuery(`INSERT INTO reservations 
        (machineId, startTime, endTime) 
        VALUES (?, ?, ?)`, reservationValues);
    }
    async selectAllMachines(){
        let rows = await this.writeQuery(`SELECT * FROM machines`, []);
        return rows;
    }
    async updateRemainingTime(machineId: string){
        // select corresponding reservation for machineId
        let remainingTime;
        let rows = await this.writeQuery(`SELECT * FROM reservations WHERE machineId = ?`, [machineId]);
        // if there is no reservation, set remainingTime to 0 and iswaiting to false
        if(rows.length === 0){
            remainingTime = 0;
            this.writeQuery(`UPDATE machines SET remainingTime = ?, isWaiting = ? WHERE id = ?`, [remainingTime, false, machineId]);
        }
        // check if reservation is valid at current time
        rows.forEach((element:reservation) => {
            let startTime = new Date(element.startTime);
            let endTime = new Date(element.endTime);
            if(startTime < new Date() && new Date() < endTime){
                // if reservation is valid, update remainingTime
                remainingTime = endTime.getTime() - new Date().getTime();
                this.writeQuery(`UPDATE machines SET remainingTime = ? WHERE id = ?`, [remainingTime, machineId]);
            }
        });
        // check if the machine is running
        this.writeQuery(`UPDATE machines SET isRunning = ? WHERE id = ?`, [!!remainingTime]);
    }
}
export default MariadbRequest;
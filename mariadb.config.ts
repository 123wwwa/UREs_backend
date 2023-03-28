import mariadb from 'mariadb';
//https://fehoon.tistory.com/48 원격 접속 참고;
const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'test',
    password: 'test',
    connectionLimit: 5,
})
export default pool;

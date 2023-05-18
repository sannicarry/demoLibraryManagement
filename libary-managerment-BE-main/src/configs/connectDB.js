import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'libary-managerment'
    // password: '' Vì không có pass nên không cần dòng này
})

export default pool;
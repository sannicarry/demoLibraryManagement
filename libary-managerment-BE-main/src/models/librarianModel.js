import pool from "../configs/connectDb";

const Librarian = class {
    constructor(id, name, address, phoneNumber, username, password) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.password = password;
    }

    static async getLibrarianDetail() {
        const [librarians] = await pool.execute('SELECT `librarian_id`, `librarian_name`, `address`, `phone_number` FROM `librarian`');
        return librarians;
    }
    static async findByUsername(username) {
        const [accout] = await pool.execute('SELECT `username`, `password` FROM `librarian` WHERE username = ? ', [username]);
        return accout;
    }


}

export default Librarian;

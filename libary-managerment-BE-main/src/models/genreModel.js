import pool from "../configs/connectDb";

const Genre = class {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static async getGenreList() {
        const [genreData] = await pool.execute('SELECT * FROM genre');
        return genreData;
    }
}

export default Genre;
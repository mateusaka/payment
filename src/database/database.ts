import mongoose, { Connection } from "mongoose";

class Database {
    private DB: Connection;

    constructor() {
        const DBURL = process.env.DB_URL!;

        this.DB = mongoose.createConnection(DBURL);
    }

    getDB() {
        return this.DB;
    }

    async connect() {
        try {
            await this.DB;

            console.log("DB is connected!");
        } catch (error) {
            console.log("DB error: " + error);
        }
    }
}

export default new Database();
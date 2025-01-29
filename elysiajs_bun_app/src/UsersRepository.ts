import {Pool} from "pg";
import {pool} from './db';

export class UsersRepository {
    private db: Pool;

    constructor() {
        this.db = pool;
    }

    public async count(): Promise<number> {
        try {
            const result = await pool.query('SELECT COUNT(*) FROM users');
            return parseInt(result.rows[0].count, 10);
        } catch (error) {
            console.error('Error fetching user count:', error);
            throw error;
        }
    }

    public async getUsersAfterId(startId: number, limit: number = 30) {
        try {
            const result = await this.db.query(
                `SELECT * FROM users WHERE id >= ${startId} LIMIT ${limit}`
            );
            return result.rows;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
}
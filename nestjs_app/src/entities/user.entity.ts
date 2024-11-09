import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column({name: 'email_verified_at', type: 'timestamp', nullable: true})
    emailVerifiedAt: Date | null;

    @Column()
    password: string

    @Column({name: 'remember_token', nullable: true})
    rememberToken: string | null

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt: Date | null
}

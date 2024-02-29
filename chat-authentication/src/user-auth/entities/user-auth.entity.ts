import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({
        type: 'int4',
        name: 'id'
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
        type: 'text'
    })
    username: string;
    
    @Column({
        nullable: false,
        default: '',
        type: 'text'
    })
    email: string;
    
    @Column({
        nullable: false,
        default: '',
        type: 'text'
    })
    password: string;
}

const entities = [User,];
import users from '../data/users.json';
import { UserEntity } from '../models/user.entity';

async function getUsers(): Promise<UserEntity[]> {
    return users;
}

export async function getUserById(id: string): Promise<UserEntity> {
    const users: UserEntity[] = await getUsers();

    return users?.find((user: UserEntity) => user.id === id) as UserEntity;
}

export async function getAdmin(): Promise<UserEntity> {
    const users: UserEntity[] = await getUsers();

    return users[0] as UserEntity;
}
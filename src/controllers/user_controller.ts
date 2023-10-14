import { sql } from "../database";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { APIError } from '../models/api_error';
import { User } from "../models/user";

export async function createUser(user: User){
    try{
        const hash = await bcrypt.hash(user.password,10)
        await sql<User>`INSERT INTO user (username,password) VALUES (${user.user},${hash})`
    } catch(e){
        console.error(e)
        throw new APIError('Deu ruim!', {status:40} );
    }
}

export async function login(user: User){
    const [response] = await sql<User>`SELECT password FROM user WHERE username = ${user.user}`; 
    if(!response) throw new APIError('Usuário não encontrado!',{ status:404 });

    const hash = response.password;

    if(!await bcrypt.compare(user.password,hash)) throw new APIError('Senha incorreta', { status:401 })

    const token = jwt.sign({username:user},'foron',{expiresIn:'2h'})
    console.log(token)
    return token
}
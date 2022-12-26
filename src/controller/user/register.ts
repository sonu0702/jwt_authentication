import { User } from "orm/entities/users/User";
import { getRepository } from "typeorm";
import { getAccessToken } from "utils/jwt_helper";
import { CustomError } from "utils/response/custom-error/CustomError";
import { v4 as uuidv4 } from 'uuid';

export const registerNewUser = async (email: string, password: string) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
        where: {
            email: email
        }
    });
    if (user) {
        throw new CustomError(400, 'General', `User exists with this email.`,
            [`User exists with this email.`], null, null);
    }
    let newUser = new User()
    newUser.user_uuid = uuidv4()
    newUser.email = email;
    newUser.password = password;
    newUser.hashPassword();
    let savedUser = await userRepository.save(newUser);
    return {
        email: newUser.email,
        name: newUser.name,
        access_token: getAccessToken(savedUser)
    }
}
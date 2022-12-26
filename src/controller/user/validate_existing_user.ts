import { User } from "orm/entities/users/User";
import { getRepository } from "typeorm";
import { getAccessToken } from "utils/jwt_helper";
import { CustomError } from "utils/response/custom-error/CustomError";

export const validateExistingUser = async (email: string, password: string) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
        where: {
            email: email
        }
    });
    if (!user) {
        throw new CustomError(400, 'General', `User not found.`,
            [`User not found.`], null, null);
    }
    if (!user.checkIfPasswordMatch(password)) {
        throw new CustomError(400, 'General', `User password not valid.`,
            [`User password not valid.`], null, null);
    }
    return {
        email: user.email,
        name: user.name,
        access_token: getAccessToken(user)
    }
}
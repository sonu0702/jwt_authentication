import { User } from "orm/entities/users/User";
import { getRepository } from "typeorm";
import { CustomError } from "utils/response/custom-error/CustomError";


export const getProfile = async (user_uuid: string) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
        where: {
            user_uuid: user_uuid
        }
    });
    if (!user) {
        throw new CustomError(400, 'General', `User do not exists.`,
            [`User do not exists.`], null, null);
    }
    return {
        email: user.email,
        name: user.name,
    }
}
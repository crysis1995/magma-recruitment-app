import { IUserService } from "../types/user.service.type";
import { IUserRepository } from "../repositories/user.repository";
import { PaginationInput } from "../inputs/user.input";
import { UserNotFoundError } from "../errors/userNotFound.error";
import { UserIdDto } from "../dto/userId.dto";
import { UserDto } from "../dto/user.dto";
import { createUserDto, CreateUserDto } from "../dto/createUser.dto";
import { updateUserDto, UpdateUserDto } from "../dto/updateUser.dto";
import { UserDataWrongFormatError } from "../errors/userDataWrongFormat.error";
import { ILoggerService } from "../types/logger.service.type";

interface InjectedServices {
    userRepository: IUserRepository;
    logger: ILoggerService;
}

export default class UserService implements IUserService {
    private userRepository: IUserRepository;
    private logger: ILoggerService;

    constructor({ userRepository, logger }: InjectedServices) {
        this.userRepository = userRepository;
        this.logger = logger;
    }

    async isUserExist(userId: UserIdDto): Promise<Boolean> {
        return await this.userRepository.isUserExist(userId);
    }

    async getAllUsers(pagination: PaginationInput): Promise<UserDto[]> {
        return await this.userRepository.findAllUsers(pagination);
    }

    async getUserById(userId: UserIdDto): Promise<UserDto> {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new UserNotFoundError(userId);

        return user;
    }

    async createUser(userData: CreateUserDto): Promise<UserIdDto> {
        const parsedData = createUserDto.safeParse(userData);
        if (!parsedData.success)
            throw new UserDataWrongFormatError(parsedData.error);

        const user = await this.userRepository.createUser(parsedData.data);
        this.logger.info({ message: `User ${user.id} created` });
        return user;
    }

    async updateUser(
        userId: UserIdDto,
        updateUser: UpdateUserDto,
    ): Promise<void> {
        const isUserExist = await this.isUserExist(userId);
        if (!isUserExist) throw new UserNotFoundError(userId);

        const parsedData = updateUserDto.safeParse(updateUser);
        if (!parsedData.success)
            throw new UserDataWrongFormatError(parsedData.error);

        await this.userRepository.updateUser(userId, updateUser);
        this.logger.info({ message: `User ${userId.id} updated` });
    }

    async deleteUser(userId: UserIdDto): Promise<void> {
        const isUserExist = await this.isUserExist(userId);
        if (!isUserExist) throw new UserNotFoundError(userId);

        await this.userRepository.deleteUser(userId);
        this.logger.info({ message: `User ${userId.id} deleted` });
    }
}

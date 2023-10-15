import { PaginationInput } from "../inputs/user.input";
import { UserIdDto } from "../dto/userId.dto";
import { UserDto } from "../dto/user.dto";
import { CreateUserDto } from "../dto/createUser.dto";
import { UpdateUserDto } from "../dto/updateUser.dto";

export interface IUserService {
    isUserExist(userId: UserIdDto): Promise<Boolean>;
    getAllUsers(pagination: PaginationInput): Promise<UserDto[]>;
    getUserById(userId: UserIdDto): Promise<UserDto>;
    createUser(userData: CreateUserDto): Promise<UserIdDto>;
    updateUser(userId: UserIdDto, updateData: UpdateUserDto): Promise<void>;
    deleteUser(userId: UserIdDto): Promise<void>;
}

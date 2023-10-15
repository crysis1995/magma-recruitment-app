import { Model } from "mongoose";
import { PaginationInput } from "../inputs/user.input";
import { userIdDto, UserIdDto } from "../dto/userId.dto";
import { userDto, UserDto } from "../dto/user.dto";
import { CreateUserDto } from "../dto/createUser.dto";
import { UpdateUserDto } from "../dto/updateUser.dto";

export interface IUserRepository {
    isUserExist(userId: UserIdDto): Promise<Boolean>;

    findAllUsers(pagination: PaginationInput): Promise<UserDto[]>;

    findById(userId: UserIdDto): Promise<UserDto | null>;

    createUser(createUserDto: CreateUserDto): Promise<UserIdDto>;

    updateUser(userId: UserIdDto, updateUserDto: UpdateUserDto): Promise<void>;

    deleteUser(userId: UserIdDto): Promise<void>;
}

export default class UserRepository implements IUserRepository {
    private userModel: Model<UserDto>;

    constructor(userModel: Model<UserDto>) {
        this.userModel = userModel;
    }

    async isUserExist(userId: UserIdDto): Promise<Boolean> {
        const data = await this.userModel.exists({ _id: userId.id });
        return !!data;
    }

    async createUser(createUserDto: CreateUserDto) {
        const data = await this.userModel.create(createUserDto);
        await data.save();

        return userIdDto.parse(data);
    }

    async findAllUsers(pagination: PaginationInput): Promise<UserDto[]> {
        const skip = pagination.page_start * pagination.page_count;
        const data = await this.userModel
            .find()
            .limit(pagination.page_count)
            .skip(skip);

        return data.map((x) => userDto.parse(x));
    }

    async findById(userId: UserIdDto): Promise<UserDto | null> {
        const data = await this.userModel.findById(userId.id);
        return data ? userDto.parse(data) : null;
    }

    async updateUser(
        userId: UserIdDto,
        updateUserDto: UpdateUserDto,
    ): Promise<void> {
        await this.userModel.updateOne({ _id: userId.id }, updateUserDto);
    }

    async deleteUser(userId: UserIdDto): Promise<void> {
        await this.userModel.deleteOne({ _id: userId.id });
    }
}

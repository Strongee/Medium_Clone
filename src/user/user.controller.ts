import { BackendValidationPipe } from "@app/shared/pipes/backendValidation.pipe";
import { ExpressRequestInterface } from "@app/types/expressRequest.interface";
import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes } from "@nestjs/common";
import { User } from "./decorators/user.decorator";
import { CreateUserDto } from "./dto/createUser.dto";
import { loginUserDto } from "./dto/login.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { AuthGuard } from "./guards/auth.guard";
import { UserResponseInterface } from "./types/userResponse.interface";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post('users')
    @UsePipes(new BackendValidationPipe())
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Post('users/login')
    @UsePipes(new BackendValidationPipe())
    async login(
        @Body('user') loginUserDto: loginUserDto,
        ): Promise<UserResponseInterface>{
        console.log ('LoginUserDto', loginUserDto)
       
       const user = await this.userService.login(loginUserDto);
        return this.userService.buildUserResponse(user);
    }
    @Get('user')
    @UseGuards(AuthGuard)
    async currentUser (
    @User() user: UserEntity,
    @User('id') currentUserId: number, 
    ): Promise<UserResponseInterface> {
    console.log('userId', currentUserId);
 
        return this.userService.buildUserResponse(user);
    };
    @Put('user')
    @UseGuards(AuthGuard)
    async updateCurrentUser (
    @User('id') currentUserId: number, 
    @Body('user') UpdateUserDto: UpdateUserDto): 
    Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(currentUserId, UpdateUserDto
    );
    return this.userService.buildUserResponse(user); 
}

}

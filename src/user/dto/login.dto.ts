import { IsNotEmpty } from "class-validator";

export class loginUserDto {
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
    static password: string | Buffer;
}
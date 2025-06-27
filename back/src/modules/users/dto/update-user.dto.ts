import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    @IsNumber()
    roles_id: number;

    @IsNotEmpty()
    @IsString()
    names: string;

    @IsNotEmpty()
    @IsString()
    surnames: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsNotEmpty()
    @IsBoolean()
    active: boolean;
}
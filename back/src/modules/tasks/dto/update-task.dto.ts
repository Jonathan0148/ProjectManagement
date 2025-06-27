import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    projects_id: number;

    @IsNotEmpty()
    @IsNumber()
    state: number;
}
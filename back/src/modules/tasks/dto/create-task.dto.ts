import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    projects_id: number;

    @IsNotEmpty()
    @IsNumber()
    state: number;
}
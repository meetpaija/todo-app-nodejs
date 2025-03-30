import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from 'src/tasks/task.schema';
import { TaskDto } from './dto/task.dto';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async fetchTaskList(): Promise<Task[]> {
    return await this.taskService.fetchTaskList();
  }

  @Post()
  async createNewTask(@Body() createTaskDto: TaskDto): Promise<Task> {
    return await this.taskService.createNewTask(createTaskDto);
  }

  @Put(':id')
  async updateTask(
    @Body() updateTaskDto: TaskDto,
    @Param('id') id: string,
  ): Promise<Task> {
    return await this.taskService.updateTask(updateTaskDto, id);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<Task> {
    return await this.taskService.deleteTask(id);
  }
}

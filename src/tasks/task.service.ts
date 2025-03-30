import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/tasks/task.schema';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async fetchTaskList(): Promise<Task[]> {
    return await this.taskModel.find();
  }

  async createNewTask(createTaskDto: TaskDto): Promise<Task> {
    const newTask = new this.taskModel(createTaskDto);
    return newTask.save();
  }

  async updateTask(updateTaskDto: TaskDto, id: string): Promise<Task> {
    return (await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {
      new: true,
    })) as Task;
  }

  async deleteTask(id: string): Promise<Task> {
    return (await this.taskModel.findOneAndDelete({ _id: id })) as Task;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del alma', isDone: false },
  ];
  create(createTodoDto: CreateTodoDto): Todo {
    console.log(createTodoDto);
    const newTodo: Todo = {
      id: this.todos.length + 1,
      ...createTodoDto,
      isDone: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo | string {
    const todo = this.findOne(id);
    if (todo) {
      let updatedTodo;
      this.todos = this.todos.map((memoryTodo) => {
        if (memoryTodo.id === id) {
          updatedTodo = {
            ...memoryTodo,
            ...updateTodoDto,
          };
          return updatedTodo;
        }
        return memoryTodo;
      });
      return updatedTodo;
    }
    return `TODO not found`;
  }

  remove(id: number): Todo[] {
    this.findOne(id);
    this.todos = this.todos.filter((memoryTodo) => memoryTodo.id !== id);
    return this.todos;
  }
}

import { NotFoundError } from "elysia";
import prisma from "../../db";

export async function getTodos() {
    try {
        return await prisma.todo.findMany({ orderBy: { createdAt: "asc" } })
    } catch (error) {
        console.error("Error getting Todo")
    }
}

export async function createTodo(data: { title: string; description: string }) {
    try {
        const todo = prisma.todo.create({ data: data })
        if (!todo) {
            throw new NotFoundError("Error creating Todo");
        }
        return todo;
    } catch (error) {
        console.error("Error getting Todo")
    }
}

export async function getTodoById(id: number) {
    try {
        const todo = await prisma.todo.findUnique({ where: { id } });
        if (!todo) {
            throw new NotFoundError("Todo not found");
        }
        return todo;
    } catch (error) {
        console.error("Error getting Todo with id ", id, error);
    }
}

export async function updateTodo(
    id: number,
    data: { title?: string; content?: string; completed?: boolean }
) {
    try {
        const { title, content, completed } = data;
        const todo = await prisma.todo.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(content && { content }),
                ...(completed !== undefined && completed !== null && { completed }),
            },
        });
        if (!todo) {
            throw new NotFoundError("Todo not found");
        }
        return todo;
    } catch (error) {
        console.error("Error updating Todo with id ", id, error);
    }
}
export async function deleteTodo(id: number) {
    try {
        const todo = await prisma.todo.delete({ where: { id } })
        if (!todo) {
            throw new NotFoundError("Error deleting Todo with id:" + id);
        }
    } catch (error) {
        console.error("Error delete Todo with id", id, error)
    }
}
export async function deleteAllTodo() {
    try {
        const todo = await prisma.todo.deleteMany()
        return todo;
    } catch (error) {
        console.error("Error deleting todo")
    }
}
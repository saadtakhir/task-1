import { Status } from '.prisma/client'
import prisma from '../database'

export async function findTaskById(id: number) {
    return prisma.task.findUnique({ where: { id } })
}

export async function createTask(message: string, owner: string, target: string, created: Date, deadline: Date) {
    return prisma.task.create({
        data: { message, owner, target, created, deadline }
    })
}

export async function updateTask(id: number, message: string, owner: string, target: string, created: Date, deadline: Date) {
    return prisma.task.update({
        where: { id },
        data: { message, owner, target, created, deadline }
    })
}

export async function findAllTask() {
    return prisma.task.findMany()
}

export async function findTasksByStatus(status: Status) {
    return prisma.task.findMany({ where: { status } })
}

export async function findTasksByTarget(target: string) {
    return prisma.task.findMany({ where: { target } })
}

export async function removeTaskById(id: number) {
    return prisma.task.delete({ where: { id } })
}

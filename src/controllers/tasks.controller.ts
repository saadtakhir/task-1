import { Status } from "@prisma/client"
import { Request, Response } from "express"
import type { TaskDto } from '../models/tasks.model'
import { createTask, findAllTask, findTaskById, findTasksByStatus, findTasksByTarget, removeTaskById, updateTask } from "../services/tasks.service"

export async function postTask(req: Request, res: Response) {
    const body: TaskDto = req.body
    const task = await createTask(body.message, body.owner, body.target, new Date(body.created), new Date(body.deadline))
    res.status(200).json({
        message: "Task already created",
        task
    })
}

export async function getAllTask(req: Request, res: Response) {
    const status = req.query.status
    if(status) {
        const tasks = await findTasksByStatus(status as Status)
        return res.status(200).json({
            message: status + " tasks",
            tasks
        })
    }
    const tasks = await findAllTask()
    res.status(200).json({
        message: "All task",
        tasks
    })
}

export async function getTasksByStatus(req: Request, res: Response) {
    const status = req.query.status
    const tasks = await findTasksByStatus(status as Status)
    res.status(200).json({
        message: status + " tasks",
        tasks
    })
}

export async function getTaskById(req: Request, res: Response) {
    const { id } = req.params
    const task = await findTaskById(+id)
    if(!task){
        return res.status(404).json({
            message: "Task not found with this id " + id
        })
    }
    res.status(200).json({
        message: "Task id " + id,
        task
    })
}

export async function getTasksByTarget(req: Request, res: Response) {
    const { target } = req.params
    const tasks = await findTasksByTarget(target)
    res.status(200).json({
        message: target + " tasks",
        tasks
    })
}

export async function putTaskById(req: Request, res: Response) {
    const { id } = req.params
    const taskExsist = await findTaskById(+id)
    if(!taskExsist) {
        return res.status(404).json({
            message: "Task not found"
        })
    }
    const body: TaskDto = req.body
    const task = await updateTask(+id, body.message, body.owner, body.target, new Date(body.created), new Date(body.deadline))
    res.status(200).json({
        message: "Task updated",
        task
    })
}

export async function deleteTaskById(req: Request, res: Response) {
    const { id } = req.params
    const taskExsist = await findTaskById(+id)
    if(!taskExsist){
        return res.status(404).json({
            message: "Task not found with this id " + id
        })
    }
    const task = await removeTaskById(+id)
    res.status(200).json({
        message: id + " task deleted",
        task
    })
}

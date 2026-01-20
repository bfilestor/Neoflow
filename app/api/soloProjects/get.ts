import { getServerSession } from "next-auth"
import { options } from "../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const GetProjects = async () => {
    const session: any = await getServerSession(options)
    const id = session?.user?.id

    if (!id) {
        return { total: 0, projects: [] }
    }

    const count = await prisma.project.count({
        where: {
            autherId: id,
            isSolo: true
        }
    })

    const projects = await prisma.project.findMany({
        where: {
            autherId: id,
            isSolo: true
        },
        select: {
            id: true,
            title: true,
            isSolo: true,
            createAt: true,
            updatedAt: true,
            auther: true,
        },
        orderBy: {
            createAt: "desc"
        },
    })


    return {
        total: count,
        projects: projects
    }
}

//@ts-nocheck
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { options } from "../../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async(request: Request) => {

    const session: any = await getServerSession(options)
    const id = session?.user?.id

    if (!id) {
        return NextResponse.json({ success: false }, { status: 401 })
    }
    const { projectId } = await request.json()


    const copy = await prisma.project.findFirst({
        where: {
            id: projectId,
            autherId: id
        }
    })


    if (!copy) {
        return NextResponse.json({
            success: false
        })
    }

    delete copy.id

    const project = await prisma.project.create({
        data: {
            title: copy.title + ' (copy)',
            autherId: copy.autherId,
            isSolo: copy.isSolo,
            state: copy.state,
        }
    })


    return NextResponse.json({
        success: true,
        id: project.id
    })
}

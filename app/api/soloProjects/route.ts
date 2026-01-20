//@ts-nocheck
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { options } from "../auth/[...nextauth]/Options"
import Randrom from "randomstring"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async () => {
    const session: any = await getServerSession(options)

    if (!session?.user?.email) {
        return NextResponse.json({ state: "unauthorized" }, { status: 401 })
    }

    const userId = session?.user?.id
    const userEmail = session.user.email

    const project = await prisma.project.create({
        data: {
            title: `Untitled-${Randrom.generate(7)}`,
            isSolo: true,
            auther: userId
                ? { connect: { id: userId } }
                : {
                    connectOrCreate: {
                        where: { email: userEmail },
                        create: {
                            email: userEmail,
                            name: session?.user?.name ?? null,
                            image: session?.user?.image ?? null,
                        },
                    },
                },
        }
    })


    return NextResponse.json({
        state: "success",
        id: project.id
    })
}


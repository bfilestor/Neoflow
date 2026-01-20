"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { AppWindow, File, Folder, FolderOpen, LayoutDashboard, Settings, Sparkle, Users2 } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Tree({ team }) {

    const { id } = useParams()
    const [open, setOpen] = useState(id ? [] :  team.map((v) => { return v.id }).slice(0, 3))

    const paths = [
        { id: "/app", icon: Sparkle, name: "Get started" },
        { id: "/app/solo", icon: LayoutDashboard, name: "Solo projects" },
        { id: "/app/team/new", icon: Folder, name: "Workspace" },
        // { id: "/app/chat", icon: Bot, name: "Neochat" },
        // { id: "/app/subscribe", icon: DollarSign, name: "Subscribe" },

    ]

    useEffect(() => {
        if (!id) return
        setOpen((prev) => (prev.includes(id) ? prev : [...prev, id]))
    }, [id])

    const pathname = usePathname()

    return (
        <div className="w-full flex-1 py-3 px-7 overflow-auto">
            <div className="flex flex-col gap-2.5 mb-">
                {paths.map((p, i) => (
                    <Link key={p.id} className={`${pathname === p.id ? "bg-primary/20 border-primary/60" : "border-transparent"} w-full  border  px-2.5 py-1 rounded-md flex gap-3 items-center justify-start text-foreground/80`} href={p.id}>
                        <p.icon size={18} />
                        {p.name}
                    </Link>
                ))}
            </div>
            <div className=" my-3  w-full" />
            <Accordion type="multiple" value={open} onValueChange={(e) => setOpen(e)} className="w-full ">
                {team.map((t) => (
                    <AccordionItem key={t.id} className="border-none " value={t.id}>
                        <AccordionTrigger className={`my-1 py-2 px-2.5 rounded-md border ${id === t.id ? "bg-primary/10  border-primary/50" : "border border-transparent"}`}>
                            <div className=" justify-start gap-2 flex ">
                                <Link className="text-sm flex flex-row-reverse gap-2 items-center justify-center text-foreground hover:underline" href={`/app/team/${t.id}/projects`}>
                                    {t.name.substring(0, 15)}
                                    <div className="h-4 w-4 rounded-md" style={{ backgroundColor: t.color }} />
                                </Link>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-5  pt-1 pb-5 ">
                            <div className="border-l border-input   space-y-2">
                                <div className="flex items-start gap-2 w-full ">
                                    <div className="border border-input w-5 mt-2" />
                                    <div className="w-full">
                                        <Link href={`/app/team/${t.id}/projects`} className="flex gap-2 text-foreground/80 hover:text-foreground"><FolderOpen style={{ color: t.color }} size={17} /> Projects</Link>
                                        <div className="w-full flex flex-col gap-1.5 border-input ml-6 border-l ">
                                            {t.Project.map((v) => (
                                                <div key={v.id} className="flex items-center justify-start gap-2 opacity-70 hover:opacity-90 first:mt-2">
                                                    <div className="border w-3 border-input" />
                                                    <File style={{ color: t.color }} size={17} />
                                                    <Link href={`/app/${v.id}`}>{v.title.substring(0, 15)}</Link>
                                                </div>
                                            ))}
                                        </div>
                                        {t.Project.length > 0 && <div className="h-3" />}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 w-full ">
                                    <div className="border border-input w-5" />
                                    <div className="flex items-center justify-between w-full">
                                        <Link href={`/app/team/${t.id}/members`} className="flex items-center justify-start gap-2 opacity-70 hover:opacity-90"><Users2 style={{ color: t.color }} size={17} /> Members</Link>
                                        <div className="flex -space-x-3">
                                            {t.memberShip.map((u) => (
                                                <Avatar key={u.id ?? u.user?.id ?? u.user?.email ?? u.user?.name} className="h-8 w-8 shadow-md border border-input">
                                                    <AvatarImage src={u.user.image} className="object-cover" />
                                                    <AvatarFallback>{u.user.name.substring(0, 2)}</AvatarFallback>
                                                </Avatar>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 w-full ">
                                    <div className="border border-input w-5 mt-2" />
                                    <Link href={`/app/team/${t.id}/setting`} className="flex gap-2 text-foreground/80 hover:text-foreground w-full"><Settings style={{ color: t.color }} size={17} /> Settings</Link>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

        </div>
    )
}

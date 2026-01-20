import { getTeam } from "@/app/api/team/getSide"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, Users } from "lucide-react"
import { Button } from "../ui/button"
import Tree from "./Side/Tree"
import { ModeToggle } from "./Side/ThemeMode"
import { Suspense } from "react"
import { options } from "@/app/api/auth/[...nextauth]/Options"


export default function Sidebar() {

    return (
        <div className='h-full w-full flex flex-col items-center justify-center'>
            <div className='px-5 pt-6 pb-2 w-full flex gap-1 items-center justify-start '>
                <svg className="scale-[0.5] " width="55" height="87" viewBox="0 0 55 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect className="stroke-primary/80" x="14.4954" y="0.998303" width="18" height="60" rx="9" transform="rotate(13 14.4954 0.998303)" stroke="black" strokeWidth="5" />
                    <rect className="stroke-primary/80" x="36.4954" y="22.9983" width="18" height="60" rx="9" transform="rotate(13 36.4954 22.9983)" stroke="black" strokeWidth="5" />
                </svg>
                <h1 className='text-2xl font-semibold tracking-wider'>Neoflow</h1>
            </div>
            <Suspense fallback={<LoadUi />}>
                <Loader />
            </Suspense>
        </div>
    )
}

const LoadUi = () => {

    return (
        <>
            <div className="w-full flex-1" >
                <ul className="flex gap-4 p-5 flex-col ">
                    <li className="flex items-center gap-3 w-full">
                        <div className="h-5 w-5 rounded-full bg-primary/70" />
                        <div className="flex-1 animate-pulse h-4 rounded bg-primary/5"></div>
                    </li>
                    <li className="flex items-center gap-3 w-full">
                        <div className="h-5 w-5 rounded-full bg-primary/70" />
                        <div className="flex-1 animate-pulse h-4 rounded bg-primary/5"></div>
                    </li>
                    <li className="flex items-center gap-3 w-full">
                        <div className="h-5 w-5 rounded-full bg-primary/70" />
                        <div className="flex-1 animate-pulse h-4 rounded bg-primary/5"></div>
                    </li>
                    <li className="flex items-center gap-3 w-full">
                        <div className="h-5 w-5 rounded-full bg-primary/70" />
                        <div className="flex-1 animate-pulse h-4 rounded bg-primary/5"></div>
                    </li>
                </ul>
            </div>

            <div className="w-full border-t border-input">
                <div className=" p-3 w-full flex gap-2 items-center justify-start ">
                    <Avatar>
                        <AvatarFallback className="animate-pulse" />
                    </Avatar>
                    <div className="w-max space-y-1">
                        <div className="w-full flex items-center justify-between">
                            <div className="w-32 animate-pulse h-3 rounded bg-primary/5"></div>
                        </div>
                        <div className="w-max">
                            <div className="w-40 animate-pulse h-3 rounded bg-primary/5"></div>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center  ml-2">
                        <Button size="icon" variant="outline" className="bg-primary/5 animate-pulse border-0">
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

const Loader = async () => {

    const team = await getTeam()
    const session = await getServerSession(options)

    if (!session?.user) {
        redirect("/api/auth/signin")
    }

    const { user } = session

    return (
        <>
            <Tree team={team} />
            <div className="w-full border-t border-input ">
                <div className=" p-3 w-full flex gap-2 items-center justify-between ">
                    <Avatar>
                        <AvatarImage className="object-cover" src={user.image} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="w-max  flex-1">
                        <div className="w-full flex items-center justify-between">
                            <p>{user.name}</p>
                        </div>
                        <div className="w-max ">
                            <p className="font-extralight text-foreground/65 max-w-40 mr-3"> {user.email.length > 20 ? `${user.email.substring(0, 15)}...` : user.email}</p>
                        </div>
                    </div>
                    <Link href="/app/profile" className=" flex items-center justify-center">
                        <Button size="icon" variant="outline">
                            <Settings size={20} />
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )

}

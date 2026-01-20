import { getServerSession } from 'next-auth'
import { redirect } from "next/navigation"
import { options } from "@/app/api/auth/[...nextauth]/Options"
import CreateForm from "@/components/dashboard/team/CreateForm"
import { Suspense } from 'react'

export async function metadata() {
    return {
        title: "Neoflow - New team",
    };
}

export default function page() {

    return (
        <Suspense fallback={<Loader />}>
            <LoaderUi />
        </Suspense>
    )
}

const LoaderUi = async () => {

    const session = await getServerSession(options)

    if (!session?.user) {
        redirect("/api/auth/signin")
    }

    return (
        <>
            <div className="w-full p-7 border-b border-input lg:flex hidden">
                <h1 className="text-xl opacity-70">Dashboard / Team / <span className="text-foreground/80 px-3 text-base rounded-full bg-primary/50">New</span></h1>
            </div>
            <div className="p-7 w-full  max-h-[85svh] h-full" >
                <CreateForm user={session.user} />
            </div>
        </>
    )
}


const Loader = () => {

    return (

        <>
            <div className="w-full p-7 border-b border-input">
                <h1 className="text-xl opacity-70">Dashboard / Team / <span className="text-foreground/80 px-3 text-base rounded-full bg-primary/50">New</span></h1>
            </div>
            <div className="p-7 w-full  max-h-[85svh] h-full" >
                <div className="pb-7 h-full w-full">
                    <div className="w-full h-full flex">
                        <div className='px-3 w-full max-w-2xl mx-auto h-full flex items-center justify-center flex-col gap-8'>
                            <div className='w-full px-5 rounded-md'>
                                <h1 className="w-52 h-6 bg-primary/5 backdrop-blur-xl animate-pulse mb-2"></h1>
                                <p className="w-full h-6 bg-primary/5 backdrop-blur-xl animate-pulse"></p>
                                <div className="h-16 mt-4 w-full bg-primary/5 backdrop-blur-xl animate-pulse">
                                </div>
                                <div className='w-full mt-10 rounded-md max-w-lg mx-auto'>
                                    <p className="h-6 bg-primary/5 backdrop-blur-xl animate-pulse w-1/3"></p>
                                    <div className="h-10 my-2 w-full bg-primary/5 backdrop-blur-xl animate-pulse" />
                                    <div className="w-full flex items-center justify-end">
                                        <div className="h-10 w-44 rounded-full bg-primary/5 backdrop-blur-xl animate-pulse">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

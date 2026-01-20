import { getTeam } from "@/app/api/team/get"
import Members from "@/components/dashboard/team/Members"
import Link from "next/link"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Suspense } from "react";
import { Button } from "@/components/ui/button"
import { GetTeam } from "@/app/api/seo/GetTitles";
import { ColorTranslator } from 'colortranslator'

export default async function page({ params }) {

    return (
        <Suspense fallback={<LoadUi />}>
            <Loader params={params} rootUrl={process.env.ROOT_URL} />
        </Suspense>
    )
}

export async function generateMetadata({ params }) {

    const team = await GetTeam(params.id)

    return {
        title: team ? `${team.name} - Members` : '404 - Page not found !'
    };
}

const Loader = async ({ params }) => {

    const team = await getTeam(params.id)

    if (!team) {
        return <div className="h-full w-full flex items-center justify-center flex-col gap-2">
            <h1 className="text-5xl font-bold">404</h1>
            <p className="text-primary/60">Page not found !</p>
            <Link href="/app/team/new">
                <Button variant="outline" className="mt-3 rounded-full bg-primary/60 px-7">
                    Create new team
                </Button>
            </Link>
        </div>
    }

    return <>
        <style>
            {`:root { --primaryBase: ${new ColorTranslator(team.color).HSL.replace("hsl(", "").replace(")", "")} !important}  `}
        </style>
        <div className="w-full p-2 lg:p-7 border-b border-input lg:flex hidden">
            <h1 className="text-lg text-foreground/70">Dashboard / Team / <span style={{ backgroundColor: team.color }} className="px-3 mx-1 rounded-full !text-foreground/100">{team.name}</span> / Members</h1>
        </div>
        <div className="p-2 lg:p-7 w-full  max-h-[80svh] h-full" >
            <div className="w-full h-full max-w-7xl mx-auto 2xl:pt-14">
                <div className="bg-transparent mb-4 inline-flex h-10 items-center justify-center rounded-md  p-1 text-muted-foreground">
                    <Link className={`inline-flex items-center border-input justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b data-[state=active]:text-foreground data-[state=active]:shadow-sm`} href='./projects'>Projects</Link>
                    <Link style={{ color: team.color, borderColor: team.color }} className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-b shadow-sm opacity-100 font-semibold`} href='./members'>Members</Link>
                    <Link className={`inline-flex items-center border-input justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b data-[state=active]:text-foreground data-[state=active]:shadow-sm`} href='./setting'>Setting</Link>
                </div>
                <div className="pb-7 h-full w-full z-10">
                    <Members id={params.id} />
                </div>
            </div>
        </div>
    </>

}

const LoadUi = () => {

    return (

        <>

            <div className="w-full p-2 lg:p-7 border-b border-input">
                <h1 className="text-lg text-foreground/70 flex gap-2">Dashboard / Team / <div className="bg-primary/5 w-24 h-7 rounded-full animate-pulse" /> / Members</h1>
            </div>
            <div className="p-2 lg:p-7 w-full  max-h-[80svh] h-full  max-w-7xl mx-auto 2xl:pt-14" >
                <div className="w-full h-full">
                    <div className="bg-transparent mb-4 inline-flex h-10 items-center justify-center rounded-md  p-1 text-muted-foreground gap-4">
                        <div className={`inline-flex items-center border-input justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b data-[state=active]:text-foreground data-[state=active]:shadow-sm bg-primary/5 w-24 h-7 rounded-full animate-pulse`} ></div>
                        <div className={`inline-flex items-center border-input justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b data-[state=active]:text-foreground data-[state=active]:shadow-sm bg-primary/5 w-24 h-7 rounded-full animate-pulse`} ></div>
                        <div className={`inline-flex items-center border-input justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b data-[state=active]:text-foreground data-[state=active]:shadow-sm bg-primary/5 w-24 h-7 rounded-full animate-pulse`} ></div>
                    </div>
                    <div className="pb-7 h-full w-full">
                        <div className="px-3">
                            <div className="border border-input rounded-xl overflow-hidden">
                                <Table >
                                    <TableHeader className="bg-primary/5">
                                        <TableRow className="border-input">
                                            <TableHead className="font-medium w-20"></TableHead>
                                            <TableHead className="font-medium">Name</TableHead>
                                            <TableHead className="font-medium">Email</TableHead>
                                            <TableHead className="font-medium">Joit at</TableHead>
                                            <TableHead className="font-medium">Role</TableHead>
                                            <TableHead className="font-medium"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[...Array(4)].map((_, rowIndex) => (<TableRow key={rowIndex} className="border-input">
                                            <TableCell key="avatar">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 animate-pulse" />
                                            </TableCell>
                                            {[...Array(5)].map((_, cellIndex) => (
                                                <TableCell key={cellIndex}>
                                                    <div className="w-full p-2 rounded bg-primary/10 animate-pulse" />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


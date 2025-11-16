import { GetProjectSeo } from "@/app/api/seo/GetTitles";
import { GetProject } from "@/app/api/soloProjects/[id]/get"
import Editor from "@/components/Tl/editor"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateMetadata({ params }) {

    const pro = await GetProjectSeo(params.projectId)

    return {
        title: pro ? pro.title : '404 - Page not found !',
    };
}

export default async function page({ params }) {

    const project = await GetProject(params)

    if (!project) {
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
    
    const readmode = project?.Team?.memberShip[0]?.role === "reader"

    return (
        <Editor project={project} id={params.projectId} readmode={readmode}/>
    )
}

import TableTop from "./TableHeader"
import { GetProjects } from "@/app/api/soloProjects/get";
import Cell from "./solo/Cell"

export default async function LinksTable() {

    const projects = await GetProjects()

    return (
        <div className="max-w-7xl mx-auto 2xl:pt-10">
            <TableTop total={projects.total}>
                {projects.projects && (
                    projects.projects.map((project) => (
                        <Cell key={project.id} project={project} />
                    ))
                )}
            </TableTop>
        </div>
    )
}

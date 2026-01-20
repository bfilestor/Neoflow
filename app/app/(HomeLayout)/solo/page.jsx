import TableData from "@/components/dashboard/Table"
import { Suspense } from "react"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export async function metadata() {
    return {
        title: "Neoflow - Solo projects",
    };
}

export default function page() {

    return (
        <>
            <div className="w-full lg:flex hidden p-7 border-b border-input">
                <h1 className="text-xl opacity-70">Dashboard / Projects</h1>
            </div>
            <div className="p-7">
                <Suspense fallback={<LoadTable />}>
                    <TableData />
                </Suspense>
            </div>
        </>
    )
}

const LoadTable = () => (
    <div className="max-w-7xl mx-auto 2xl:pt-10">
        <div className="mb-3 flex items-center justify-between">
            <h1><span className="font-semibold">Projects</span></h1>
            <Button variant="outline" className="w-40 bg-primary/5 rounded-full  font-medium animate-pulse">

            </Button>
        </div>
        <div className="border border-input rounded-xl overflow-hidden">
            <Table >
                <TableHeader className="bg-primary/5">
                    <TableRow className="border-input">
                        <TableHead className="font-medium">Name</TableHead>
                        <TableHead className="font-medium">Last update</TableHead>
                        <TableHead className="font-medium">Created at</TableHead>
                        <TableHead className="font-medium">Auther</TableHead>
                        <TableHead className="font-medium"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(6)].map((_, rowIndex) => (<TableRow key={rowIndex} className="border-input">
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
)

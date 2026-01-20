import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "@/app/api/auth/[...nextauth]/Options";

export default async function layout({ children }) {

    const session = await getServerSession(options)

    if (!session) {
        redirect("/api/auth/signin")
    }

    return children
}

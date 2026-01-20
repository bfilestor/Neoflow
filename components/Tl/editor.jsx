"use client"
import ToolBar from "./ToolBar"
import Zoom from "./Zoom"
import GroupActions from "./GroupActions"
import { Tldraw, useEditor, track, BaseBoxShapeTool, createTLStore, defaultShapeUtils, throttle } from "tldraw"
import { useTheme } from "next-themes"
import ExtraToolBar from "./ExtraToolBar"
import { useEffect, useLayoutEffect, useState } from "react"
import { Mermaid } from './Mermaid/Mermaid'
import Code from "./Mermaid/Code"
import Loading from "@/app/app/[projectId]/loading"
import mermaid from "mermaid";
import { toast } from "sonner"
import Link from "next/link"

export class CardShapeTool extends BaseBoxShapeTool {
    static id = 'card';
    static initial = 'idle';
    shapeType = 'card';
}

const customShapeUtils = [Mermaid]
const customTools = [CardShapeTool]

export default function Editor({ id, project, readmode }) {

    const [loadingState, setLoadingState] = useState({ status: 'loading' })
    const [store] = useState(() => createTLStore({ shapeUtils: [...customShapeUtils, ...defaultShapeUtils] }))
    const { resolvedTheme } = useTheme()

    const handleSave = async () => {

        try {
            const snapshot = store.getSnapshot()

            const toasts = toast.loading("Saving...")
            await fetch(`/api/soloProjects/${id}`, {
                cache: "no-cache",
                body: JSON.stringify({ state: JSON.stringify(snapshot) }),
                method: "PUT",
            })
            toast.dismiss(toasts)
            toast.success("Saved successfully")
        } catch (e) {
            toast.error("Error saving")
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            handleSave();
        }, 60000)

        return () => clearInterval(intervalId);
    }, [])

    useLayoutEffect(() => {
        setLoadingState({ status: 'loading' })

        const persistedSnapshot = project.state

        if (project && persistedSnapshot) {
            try {
                const snapshot = JSON.parse(persistedSnapshot)
                store.loadSnapshot(snapshot)
                setLoadingState({ status: 'ready' })
            } catch (error) {
                setLoadingState({ status: 'error', error: error.message })
            }
        } else {
            setLoadingState({ status: 'ready' })
        }

    }, [store])


    useEffect(() => {
        mermaid.initialize({
            theme: "dark"
        });
    }, [])

    if (typeof window === "undefined") {
        return <Loading />
    }


    if (loadingState.status === 'loading') {
        return (
            <Loading />
        )
    }


    return (
        <div className="h-full w-full flex flex-col">
            <div className="h-full w-full flex-1">
                <Tldraw
                    project={project.state}
                    store={store}
                    shapeUtils={customShapeUtils}
                    tools={customTools}
                    onMount={(editor) => {
                        editor.updateInstanceState({ isReadonly: readmode })
                    }}
                    inferDarkMode={resolvedTheme !== "light"}>
                    <Tools project={project} id={id} handleSave={handleSave} readmode={readmode} />
                </Tldraw>
            </div>
        </div>

    )
}


const Tools = track(({ handleSave, readmode }) => {

    const editor = useEditor()


    const [showStyle, setShowStyle] = useState(false)
    const [openCode, setOpenCode] = useState(false)

    useEffect(() => {
        editor?.zoomToFit?.()
    }, [editor])


    return (
        <>
            <Code editor={editor} open={openCode} setOpenCode={setOpenCode} />
            <div className="h-full w-full flex p-4 custom-layout ">
                <div className="h-max my-auto flex items-center justify-center gap-2 flex-col  ">
                    <ExtraToolBar readmode={readmode} setOpenCode={setOpenCode} elements={editor} editor={editor} />
                    <ToolBar readmode={readmode} isLocked={editor.getInstanceState().isToolLocked} tool={editor.getCurrentToolId()} editor={editor} />
                </div>
                <div className={`w-full h-full  flex`}>
                    <div className='w-full h-full flex justify-between flex-col items-start '>
                        <div className="w-full flex items-start justify-between">
                            <Link href={"/app"} className=' w-max gap-2 flex g items-center justify-between bg-muted/10 p-2.5  rounded-xl border border-input px-4 -translate-x-12 pointer-events-auto'>
                                <svg className="" width="20" height="20" viewBox="0 0 55 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect className="stroke-primary/80" x="14.4954" y="0.998303" width="18" height="60" rx="9" transform="rotate(13 14.4954 0.998303)" stroke="black" strokeWidth="5" />
                                    <rect className="stroke-primary/80" x="36.4954" y="22.9983" width="18" height="60" rx="9" transform="rotate(13 36.4954 22.9983)" stroke="black" strokeWidth="5" />
                                </svg>
                                <h1 className='text-sm font-semibold tracking-wider'>Neoflow</h1>
                            </Link>

                            <img className="h-10 opacity-70" src="https://tldraw.dev/_next/static/media/watermark-desktop-dark.246eb9a3.svg" />
                        </div>
                        <div className='flex  w-full items-end justify-end h-full py-1'>
                            <div className='flex rounded-md text-foreground w-3/5 items-center justify-center  scale-90  pointer-events-auto '>
                                {editor.getSelectedShapeIds().length > 0 && <GroupActions readmode={readmode} openCode={openCode} setOpenCode={setOpenCode} showStyle={showStyle} setShowStyle={setShowStyle} editor={editor} />}
                                {openCode && <div className="mx-5 flex-1"><Zoom editor={editor} handleSave={handleSave} readmode={readmode} zoom={editor.getZoomLevel()} /></div>}
                            </div>
                            <div className={`h-max w-72 gap-2  pointer-events-auto flex items-end justify-end flex-col ${!openCode ? "opacity-100" : "opacity-0"}`}>
                                <Zoom readmode={readmode} handleSave={handleSave} editor={editor} zoom={editor.getZoomLevel()} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
})

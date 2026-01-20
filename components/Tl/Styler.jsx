import { Button } from "../ui/button";
import {
    PopoverContent,
} from "@/components/ui/popover"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { PaintBucket, Square } from "lucide-react";
import { Slider } from "@/components/ui/slider"
import { ArrowShapeArrowheadEndStyle, ArrowShapeArrowheadStartStyle, DefaultColorStyle, DefaultDashStyle, DefaultFillStyle, DefaultFontStyle, DefaultHorizontalAlignStyle, DefaultSizeStyle, DefaultVerticalAlignStyle } from "tldraw";

export function Box({ editor, types }) {

    const tools = [
        {
            name: "Fill",
            val: DefaultFillStyle,
            children: [
                { val: "none", index: 8 },
                // { val: "semi", index: 9 },
                { val: "solid", index: 10 },
                { val: "pattern", index: 11 },
            ]
        },
        {
            name: "Dash",
            val: DefaultDashStyle,
            children: [
                { val: "draw", index: 12 },
                { val: "dashed", index: 13 },
                { val: "dotted", index: 14 },
                { val: "solid", index: 15 },
            ]
        },
        {
            name: "Size",
            val: DefaultSizeStyle,
            children: [
                { val: "s", index: 16 },
                { val: "m", index: 17 },
                { val: "l", index: 18 },
                { val: "xl", index: 19 },
            ]
        },
    ]

    return (
        <PopoverContent onOpenAutoFocus={(event) => event.preventDefault()} className=" custom-layout-pop  m-1 border-input w-max p-1.5">
            <div className="grid grid-cols-2 gap-4 p-2">
                {tools.map((tool, i) => (
                    ((i === 0 && types.includes("geo")) || i !== 0) && <div className="space-y-1">
                        <h1 className="text-sm font-medium">{tool.name}</h1>
                        <div className="grid grid-cols-2 gap-1">
                            <TooltipProvider>
                                {tool.children.map((variant) => (
                                    <Tooltip defaultOpen={false} >
                                        <TooltipTrigger asChild>
                                            <Button onClick={() => {
                                                editor.setStyleForSelectedShapes(tool.val, variant.val)
                                            }} size="icon" variant="outline" className=' custom-button'>
                                                <svg className={` scale-[0.6] fill-transparent opacity-70`} xmlns="http://www.w3.org/2000/svg" width="30" height="30">
                                                    {svg[variant.index]}
                                                </svg>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="border-input">
                                            <p>{variant.val.charAt(0).toUpperCase() + variant.val.slice(1).toLowerCase()}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </TooltipProvider>
                        </div>
                    </div>
                ))}
            </div>
        </PopoverContent>
    )
}

export function Colors({ editor }) {

    const tools = [
        { val: "black", color: "#1d1d1d" },
        { val: "grey", color: "#adb5bd" },
        { val: "light-violet", color: "#e599f7" },
        { val: "violet", color: "#ae3ec9" },
        { val: "blue", color: "#4263eb" },
        { val: "light-blue", color: "#4dabf7" },
        { val: "yellow", color: "#ffc078" },
        { val: "orange", color: "#f76707" },
        { val: "green", color: "#099268" },
        { val: "light-green", color: "#40c057" },
        { val: "light-red", color: "#ff8787" },
        { val: "red", color: "#e03131" },
    ]

    return (
        <PopoverContent onOpenAutoFocus={(event) => event.preventDefault()} className=" custom-layout-pop  m-1 border-input w-max p-1.5">
            <div className="grid grid-cols-1 gap-4 p-3">
                <div className="space-y-3">
                    <h1 className="text-sm font-medium flex items-center justify-center gap-2 w-max">
                        <PaintBucket className="text-primary/70" size={17} />
                        Colors
                    </h1>
                    <div className="grid grid-cols-6 gap-1.5">
                        <TooltipProvider>
                            {tools.map((col) => (
                                <Tooltip defaultOpen={false} >
                                    <TooltipTrigger asChild>
                                        <div style={{ backgroundColor: col.color }} className="h-6 w-6 bg-opacity-25 hover:cursor-pointer rounded-full border border-input flex items-center justify-center coust custom-button"
                                            onClick={() => {
                                                editor.setStyleForSelectedShapes(DefaultColorStyle, col.val)
                                            }}>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="border-input">
                                        <p>{col.val.charAt(0).toUpperCase() + col.val.slice(1).toLowerCase()}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </TooltipProvider>

                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 p-2">
                <div className="space-y-1.5 mb-1">
                    <h1 className="text-sm font-medium">
                        Opacity
                    </h1>
                    <div className="grid grid-cols-1 gap-1">
                        <Slider
                            defaultValue={[
                                Array.from(new Set(editor.getSelectedShapes().map((e) => { return e.opacity }))).length === 1
                                    ? Array.from(new Set(editor.getSelectedShapes().map((e) => { return e.opacity })))
                                    : 1
                            ]}
                            onValueChange={(e) => {
                                editor.setOpacityForSelectedShapes(e[0])
                            }}
                            max={1} min={0} step={0.1} className="custom-button w-full" />
                    </div>
                </div>
            </div>
        </PopoverContent>
    )
}

export function Text({ editor, types }) {

    const tools = [
        {
            name: "Font",
            val: DefaultFontStyle,
            children: [
                { val: "draw", index: 20 },
                { val: "sans", index: 21 },
                { val: "serif", index: 22 },
                { val: "mono", index: 23 },
            ]
        },
        {
            name: "Size",
            val: DefaultSizeStyle,
            children: [
                { val: "s", index: 16 },
                { val: "m", index: 17 },
                { val: "l", index: 18 },
                { val: "xl", index: 19 },
            ]
        },
        {
            name: "Align",
            val: DefaultHorizontalAlignStyle,
            children: [
                { val: "start", index: 24 },
                { val: "middle", index: 25 },
                { val: "end", index: 26 },
            ]
        },
        {
            name: "Justify",
            val: DefaultVerticalAlignStyle,
            children: [
                { val: "start", index: 27 },
                { val: "middle", index: 28 },
                { val: "end", index: 29 },
            ]
        },
    ]

    return (
        <PopoverContent onOpenAutoFocus={(event) => event.preventDefault()} className=" custom-layout-pop  m-1 border-input w-max p-1.5">
            <div className="grid grid-cols-2 gap-4 p-2">
                {tools.map((tool, i) => (
                    ((i === 3 && types.includes("geo")) || i !== 3) && <div className="space-y-1">
                        <h1 className="text-sm font-medium">{tool.name}</h1>
                        <div className="grid grid-cols-2 gap-1">
                            <TooltipProvider>
                                {tool.children.map((variant) => (
                                    <Tooltip defaultOpen={false} >
                                        <TooltipTrigger asChild>
                                            <Button onClick={() => {
                                                editor.setStyleForSelectedShapes(tool.val, variant.val)
                                            }} size="icon" variant="outline" className=' custom-button'>
                                                <svg className={` scale-[0.6] fill-transparent opacity-70`} xmlns="http://www.w3.org/2000/svg" width="30" height="30">
                                                    {svg[variant.index]}
                                                </svg>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="border-input">
                                            <p>{variant.val.charAt(0).toUpperCase() + variant.val.slice(1).toLowerCase()}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </TooltipProvider>
                        </div>
                    </div>
                ))}
            </div>
        </PopoverContent>
    )
}

export function Arrow({ editor }) {

    const tools = [
        {
            name: "Start arrow",
            val: ArrowShapeArrowheadStartStyle,
            children: [
                { val: "none", index: 0 },
                { val: "arrow", index: 1 },
                { val: "triangle", index: 2 },
                { val: "square", index: 3 },
                { val: "dot", index: 4 },
                { val: "diamond", index: 5 },
                { val: "inverted", index: 6 },
                { val: "bar", index: 7 },

            ]
        },
        {
            name: "End Arrow",
            val: ArrowShapeArrowheadEndStyle,
            children: [
                { val: "none", index: 0 },
                { val: "arrow", index: 1 },
                { val: "triangle", index: 2 },
                { val: "square", index: 3 },
                { val: "dot", index: 4 },
                { val: "diamond", index: 5 },
                { val: "inverted", index: 6 },
                { val: "bar", index: 7 },
            ]
        },
    ]

    return (
        <PopoverContent onOpenAutoFocus={(event) => event.preventDefault()} className=" custom-layout-pop  m-1 border-input w-max p-1.5">
            <div className="grid grid-cols-1 gap-4 p-2">
                {tools.map((tool, index) => (
                    <div className="space-y-1">
                        <h1 className="text-sm font-medium">{tool.name}</h1>
                        <div className="grid grid-cols-4 gap-1">
                            <TooltipProvider>
                                {tool.children.map((variant) => (
                                    <Tooltip defaultOpen={false} >
                                        <TooltipTrigger asChild>
                                            <Button onClick={() => {
                                                editor.setStyleForSelectedShapes(tool.val, variant.val)
                                            }} size="icon" variant="outline" className=' custom-button'>
                                                <svg className={`fill-transparent scale-[0.5] stroke-foreground ${index === 0 && "rotate-180"}`} xmlns="http://www.w3.org/2000/svg" width="30" height="30">
                                                    {svg[variant.index]}
                                                </svg>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="border-input">
                                            <p>{variant.val.charAt(0).toUpperCase() + variant.val.slice(1).toLowerCase()}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </TooltipProvider>
                        </div>
                    </div>
                ))}
            </div>
        </PopoverContent>
    )
}

const svg = [
    <path xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeWidth="2" d="M1 15h28" />,
    <path xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 15h26M13 26l16-11L13 4" />,
    <path xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 15.154h10.692m1-11.692v23.077L28.846 15z" />,
    <path xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeWidth="2" d="M1 15h4m3 12h18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3Z" />,
    <>
        <path strokeWidth="2" d="M29 15c0 6.075-4.925 11-11 11S7 21.075 7 15 11.925 4 18 4s11 4.925 11 11Z" />
        <path strokeLinecap="round" strokeWidth="2" d="M1 15h5" />
    </>,
    <>
        <path strokeWidth="2" d="m18.414 3.828 9.9 9.9a2 2 0 0 1 0 2.828l-9.9 9.9a2 2 0 0 1-2.828 0l-9.9-9.9a2 2 0 0 1 0-2.828l9.9-9.9a2 2 0 0 1 2.828 0Z" /><path strokeLinecap="round" strokeWidth="2" d="M1 15h4" />
    </>,
    <>
        <path d="M1 14a1 1 0 1 0 0 2zM29 2h1a1 1 0 0 0-1.585-.81zm0 26-.585.81A1 1 0 0 0 30 28zM1 16h10v-2H1zM28 2v26h2V2zm1.585 25.19-18-13-1.17 1.62 18 13zm-18-11.38 18-13-1.17-1.62-18 13z" />
    </>,
    <>
        <path strokeLinecap="round" strokeWidth="2" d="M1 15h28m0 0V2m0 13v13" />
    </>, // 7
    <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" fillRule="evenodd" d="M8 4h18v18h-2V8a2 2 0 0 0-2-2H8zM6 6V4a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2h-2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm16 18v2H4V8h2v14a2 2 0 0 0 2 2zm0-2H8V8h14z" clipRule="evenodd" />,
    <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" fillRule="evenodd" d="M26 4H8v2h14a2 2 0 0 1 2 2v14h2zM6 4v2H4a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-2h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2m16 22H4V8h18v18" clipRule="evenodd" />,
    <>
        <path fill="currentColor" fillRule="evenodd" d="M26 4H8v2h14a2 2 0 0 1 2 2v14h2zM6 4v2H4a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-2h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2m16 22H4V8h18z" clipRule="evenodd" /><path fill="currentColor" fillOpacity=".32" d="M4 8h18v18H4z" />
    </>,
    <>
        <path fill="currentColor" fillRule="evenodd" d="M26 4H8v2h14a2 2 0 0 1 2 2v14h2zM6 4v2H4a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-2h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2m16 22H4V8h18z" clipRule="evenodd" /><path fill="currentColor" fillRule="evenodd" d="M23.438 15.553a.97.97 0 0 1 0 1.417l-1.49 1.418a1.09 1.09 0 0 1-1.49 0 .97.97 0 0 1 0-1.418l1.49-1.417a1.09 1.09 0 0 1 1.49 0m-4.468 5.67a.97.97 0 0 0 0-1.418 1.09 1.09 0 0 0-1.49 0l-1.49 1.417a.97.97 0 0 0 0 1.418 1.09 1.09 0 0 0 1.49 0zm-4.468 2.834a.97.97 0 0 1 0 1.418l-1.49 1.417a1.09 1.09 0 0 1-1.49 0 .97.97 0 0 1 0-1.417l1.49-1.418a1.09 1.09 0 0 1 1.49 0m0-17.01a.97.97 0 0 1 0 1.418l-1.49 1.418a1.09 1.09 0 0 1-1.49 0 .97.97 0 0 1 0-1.418l1.49-1.417a1.09 1.09 0 0 1 1.49 0m-4.469 5.67a.97.97 0 0 0 0-1.417 1.09 1.09 0 0 0-1.489 0l-1.49 1.417a.97.97 0 0 0 0 1.418 1.09 1.09 0 0 0 1.49 0zm-4.467 2.835a.97.97 0 0 1 0 1.418l-1.49 1.417a1.09 1.09 0 0 1-1.49 0 .97.97 0 0 1 0-1.417l1.49-1.417a1.09 1.09 0 0 1 1.49 0M23.437 11.3a.97.97 0 0 0 0-1.418 1.09 1.09 0 0 0-1.489 0l-1.49 1.418a.97.97 0 0 0 0 1.417 1.09 1.09 0 0 0 1.49 0zm-4.467 2.835a.97.97 0 0 1 0 1.417l-1.49 1.418a1.09 1.09 0 0 1-1.49 0 .97.97 0 0 1 0-1.418l1.49-1.417a1.09 1.09 0 0 1 1.49 0m-4.468 5.67a.97.97 0 0 0 0-1.418 1.09 1.09 0 0 0-1.49 0l-1.49 1.418a.97.97 0 0 0 0 1.417 1.09 1.09 0 0 0 1.49 0zm-4.468 2.835a.97.97 0 0 1 0 1.417l-1.49 1.418a1.09 1.09 0 0 1-1.49 0 .97.97 0 0 1 0-1.418l1.49-1.417a1.09 1.09 0 0 1 1.49 0m0-15.593-1.49 1.418a1.09 1.09 0 0 1-1.49 0 .97.97 0 0 1 0-1.418c1.105-1.05 4.772-1.705 2.98 0M5.566 11.3a.97.97 0 0 0 0-1.418 1.09 1.09 0 0 0-1.49 0L2.586 11.3a.97.97 0 0 0 0 1.417 1.09 1.09 0 0 0 1.49 0zm17.871 9.922a.97.97 0 0 1 0 1.418l-1.489 1.417a1.09 1.09 0 0 1-1.49 0 .97.97 0 0 1 0-1.417l1.49-1.418a1.09 1.09 0 0 1 1.49 0m-4.468 5.67a.97.97 0 0 0 0-1.417 1.09 1.09 0 0 0-1.489 0l-1.49 1.417c-1.818 1.731 1.86 1.066 2.98 0m0-17.01a.97.97 0 0 0 0-1.417 1.09 1.09 0 0 0-1.489 0l-1.49 1.417a.97.97 0 0 0 0 1.418 1.09 1.09 0 0 0 1.49 0zm-4.468 2.835a.97.97 0 0 1 0 1.418l-1.489 1.417a1.09 1.09 0 0 1-1.49 0 .97.97 0 0 1 0-1.417l1.49-1.418a1.09 1.09 0 0 1 1.49 0m-4.467 5.67a.97.97 0 0 0 0-1.417 1.09 1.09 0 0 0-1.49 0l-1.49 1.417a.97.97 0 0 0 0 1.418 1.09 1.09 0 0 0 1.49 0zm-4.468 2.835a.97.97 0 0 1 0 1.418l-1.49 1.417a1.09 1.09 0 0 1-1.49 0 .97.97 0 0 1 0-1.417l1.49-1.418a1.09 1.09 0 0 1 1.49 0" clipRule="evenodd" />
    </>,

    <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" fillRule="evenodd" d="M21.888 15.733c0-4.16-4.022-6.81-8.776-6.81-3.63 0-6.13 2.641-6.84 5.246-1.311 4.806 1.622 8.859 5.403 9.922 6.038 1.19 10.213-2.599 10.213-8.358M17.143 2.184c4.913.72 8.952 4.417 10.281 9.17C31.281 24.46 14.814 33.131 6.271 24.59-3.459 14.861 4.831.187 17.143 2.184" clipRule="evenodd" />,
    <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" fillRule="evenodd" d="M12.465 2.247a13.1 13.1 0 0 1 5.07 0 1.61 1.61 0 1 1-.625 3.16 9.8 9.8 0 0 0-3.82 0 1.61 1.61 0 1 1-.625-3.16M10.01 4.633a1.61 1.61 0 0 1-.442 2.234 9.8 9.8 0 0 0-2.7 2.7A1.61 1.61 0 0 1 4.19 7.777 13.1 13.1 0 0 1 7.776 4.19a1.61 1.61 0 0 1 2.234.442m9.98 0a1.61 1.61 0 0 1 2.234-.442 13.1 13.1 0 0 1 3.585 3.585 1.61 1.61 0 1 1-2.676 1.792 9.8 9.8 0 0 0-2.7-2.7 1.61 1.61 0 0 1-.443-2.235M4.14 11.197a1.61 1.61 0 0 1 1.267 1.893 9.8 9.8 0 0 0 0 3.82 1.61 1.61 0 1 1-3.16.625 13.1 13.1 0 0 1 0-5.07 1.61 1.61 0 0 1 1.893-1.268m21.72 0a1.61 1.61 0 0 1 1.893 1.268 13.1 13.1 0 0 1 0 5.07 1.61 1.61 0 0 1-3.16-.625 9.8 9.8 0 0 0 0-3.82 1.61 1.61 0 0 1 1.267-1.893M4.633 19.99a1.61 1.61 0 0 1 2.234.442 9.8 9.8 0 0 0 2.7 2.7 1.61 1.61 0 0 1-1.791 2.677 13.1 13.1 0 0 1-3.585-3.585 1.61 1.61 0 0 1 .442-2.234m20.734 0a1.61 1.61 0 0 1 .442 2.234 13.1 13.1 0 0 1-3.585 3.585 1.61 1.61 0 1 1-1.792-2.676 9.8 9.8 0 0 0 2.7-2.7 1.61 1.61 0 0 1 2.235-.443m-14.17 5.87a1.61 1.61 0 0 1 1.893-1.267 9.8 9.8 0 0 0 3.82 0 1.61 1.61 0 1 1 .625 3.16 13.1 13.1 0 0 1-5.07 0 1.61 1.61 0 0 1-1.268-1.893" clipRule="evenodd" />,
    <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" d="M17 3.792a2 2 0 1 1-4 0 2 2 0 0 1 4 0M17 25.792a2 2 0 1 1-4 0 2 2 0 0 1 4 0M22.232 6.265a2 2 0 1 1-3.464-2 2 2 0 0 1 3.464 2M11.232 25.318a2 2 0 1 1-3.464-2 2 2 0 0 1 3.464 2M25.526 11.024a2 2 0 1 1-2-3.465 2 2 0 0 1 2 3.465M6.474 22.024a2 2 0 1 1-2-3.465 2 2 0 0 1 2 3.465M26 16.792a2 2 0 1 1 0-4 2 2 0 0 1 0 4M4 16.792a2 2 0 1 1 0-4 2 2 0 0 1 0 4M23.526 22.024a2 2 0 1 1 2-3.465 2 2 0 0 1-2 3.465M4.474 11.024a2 2 0 1 1 2-3.465 2 2 0 0 1-2 3.465M18.768 25.318a2 2 0 1 1 3.464-2 2 2 0 0 1-3.464 2M7.768 6.265a2 2 0 1 1 3.464-2 2 2 0 0 1-3.464 2" />,
    <circle xmlns="http://www.w3.org/2000/svg" cx="15" cy="15" r="11.5" stroke="currentColor" strokeWidth="3" />,
    <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" d="M18.065 11.068q-.103-1.035-.881-1.608t-2.112-.573q-.907 0-1.53.257-.625.248-.959.692a1.67 1.67 0 0 0-.325 1.01q-.016.47.197.82.222.35.607.607.385.247.89.436.504.18 1.077.308l1.573.376q1.146.257 2.104.684a6.4 6.4 0 0 1 1.659 1.052q.701.625 1.086 1.471.393.846.402 1.941-.01 1.608-.821 2.788-.804 1.17-2.326 1.821-1.514.642-3.651.642-2.12 0-3.694-.65-1.566-.65-2.446-1.924-.872-1.283-.915-3.173h3.583q.06.881.504 1.471.454.582 1.206.88.761.292 1.719.291.94 0 1.633-.273.702-.274 1.086-.761.385-.488.385-1.12 0-.59-.35-.992-.343-.402-1.01-.684-.658-.282-1.616-.514l-1.907-.478q-2.214-.54-3.497-1.685t-1.274-3.087q-.009-1.59.846-2.779.864-1.187 2.369-1.856 1.505-.667 3.42-.667 1.95 0 3.404.667 1.462.668 2.274 1.856t.838 2.754z" />,
    <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" d="M5 5.792h4.693l4.957 12.093h.211l4.957-12.094h4.694v18H20.82V12.077h-.15l-4.657 11.628h-2.514L8.841 12.032h-.15v11.76H5z" />,
    <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" d="M9 23.792v-18h3.806v14.862h7.717v3.137z" />,
    <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" d="m4.42 5.792 3.63 6.134h.141l3.648-6.134h4.298l-5.493 9 5.616 9h-4.377L8.19 17.648h-.14L4.359 23.79H0l5.634-9-5.529-9zM18.545 23.792v-18h3.806v14.862h7.716v3.137z" />,

    <path xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeWidth="3.2" d="M22.965 11.963c-3.936 0-7.305 6.369-3.908 9.663s5.787-4.173 5.853-7.028 1.406 5.128 3.293 7.47M1.8 18.58s4.336-1.311 11.29-1.399m-9.367-6.373a159 159 0 0 0-.085 6.217m0 0c.014 3.29.08 4.733-.395 5.165-.294.268-.16-2.19.395-5.165Zm0 0c.779-4.18 2.384-9.384 4.788-9.499 4.116-.197 1.386 8.11 5.823 15.055" />,
    <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" d="m12.504 24-1.42-4.515h-6.29L3.399 24H0L5.935 6.296h4.16L15.979 24zM7.99 9.34h-.126l-2.258 7.28h4.667zM28.2 24q-1.066 0-1.7-.609-.61-.634-.761-1.674h-.152q-.33 1.294-1.344 1.953-1.015.634-2.511.634-2.03 0-3.12-1.065t-1.09-2.84q0-2.055 1.47-3.044 1.471-1.015 4.185-1.015h2.258v-.964q0-1.116-.584-1.724-.583-.61-1.877-.61-1.14 0-1.851.508a4.8 4.8 0 0 0-1.167 1.167l-1.927-1.725a5.5 5.5 0 0 1 1.952-1.826q1.218-.71 3.222-.71 2.688 0 4.083 1.217t1.395 3.5v6.24H30V24zm-5.378-2.055q1.09 0 1.852-.482.76-.48.76-1.42v-1.75h-2.08q-2.535 0-2.536 1.623v.431q0 .812.508 1.218.533.38 1.496.38" />,
    <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" d="M0 22.003h1.262L6.706 6.215H9.8l5.445 15.788h1.262v1.485H9.65v-1.485h2.054l-1.287-3.885H4.454l-1.286 3.885H5.22v1.485H0zm4.9-5.444h5.073L7.498 8.888h-.124zM21.685 23.785q-2.004 0-2.97-.965-.964-.966-.964-2.673 0-1.88 1.36-2.846 1.387-.965 4.307-.965h1.756v-1.559q0-1.51-.618-2.276-.619-.792-2.03-.792-1.088 0-1.682.321v.1q.248.147.47.47.248.296.248.84 0 .719-.446 1.189-.42.445-1.262.445-.717 0-1.188-.47-.445-.47-.445-1.237 0-.594.322-1.139.346-.57 1.014-.99.669-.444 1.633-.692.99-.273 2.277-.273 2.475 0 3.712 1.139 1.237 1.113 1.237 3.143v7.473H30v1.237q-.37.248-.99.371a5.4 5.4 0 0 1-1.262.149q-1.237 0-1.782-.594-.544-.618-.544-1.56v-.073h-.124a4.4 4.4 0 0 1-.445.816 3.2 3.2 0 0 1-.693.718q-.42.297-1.04.495-.593.198-1.435.198m1.262-1.98q.99 0 1.609-.47.618-.47.618-1.584v-2.079h-1.41q-1.485 0-2.128.545-.62.52-.619 1.51v.445q0 .84.52 1.237.544.396 1.41.396" />,
    <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" d="m11.358 23.935-1.277-4.61H4.69l-1.25 4.61H0L5.106 5.752h4.741l5.132 18.183zM7.503 9.113h-.209l-2.006 7.424h4.22zM28.046 23.935q-1.224 0-1.901-.599-.652-.625-.782-1.72h-.13a3.4 3.4 0 0 1-1.433 1.955q-1.069.677-2.631.677-2.032 0-3.23-1.068-1.2-1.068-1.199-2.97 0-4.065 5.966-4.064h2.37v-.886q0-1.275-.625-1.927t-2.032-.652q-1.276 0-2.058.496-.781.495-1.328 1.276l-1.902-1.615q.625-1.12 2.006-1.876 1.407-.78 3.621-.781 2.657 0 4.142 1.25 1.51 1.224 1.51 3.673v6.33H30v2.501zm-5.757-1.98q1.198 0 1.98-.547.808-.573.808-1.537v-1.797h-2.293q-2.735 0-2.735 1.72v.52q0 .808.599 1.225.6.416 1.641.416" />,

    <path xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 21h16M5 15h10M5 9h20" />,
    <path xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7 21h16M9 15h12M5 9h20" />,
    <path xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9 21h16m-10-6h10M5 9h20" />,

    <>
        <rect width="2" height="22" x="4" y="10.707" fill="currentColor" rx="1" transform="rotate(-90 4 10.707)" /><rect width="2" height="8" x="15" y="13.799" fill="currentColor" rx="1" transform="rotate(45 15 13.799)" /><rect width="2" height="8" x="13.586" y="15.213" fill="currentColor" rx="1" transform="rotate(-45 13.586 15.213)" />
    </>,
    <>
        <rect width="2" height="8" x="15" y="19.297" fill="currentColor" rx="1" transform="rotate(45 15 19.297)" /><rect width="2" height="8" x="13.586" y="20.711" fill="currentColor" rx="1" transform="rotate(-45 13.586 20.711)" /><rect width="2" height="8" x="15" y="11.118" fill="currentColor" rx="1" transform="rotate(-135 15 11.118)" /><rect width="2" height="8" x="16.414" y="9.704" fill="currentColor" rx="1" transform="rotate(135 16.414 9.704)" /><rect width="2" height="22" x="4" y="16.207" fill="currentColor" rx="1" transform="rotate(-90 4 16.207)" />
    </>,
    <>
        <rect width="2" height="22" x="26" y="19.707" fill="currentColor" rx="1" transform="rotate(90 26 19.707)" /><rect width="2" height="8" x="15" y="16.617" fill="currentColor" rx="1" transform="rotate(-135 15 16.617)" /><rect width="2" height="8" x="16.414" y="15.203" fill="currentColor" rx="1" transform="rotate(135 16.414 15.203)" />
    </>
]

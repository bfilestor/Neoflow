import React from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import { AlignJustify, MoreHorizontalIcon } from 'lucide-react'


export default function layout({ children }) {

    return (
        <div className='w-full h-full flex-col lg:flex-row flex'>
            <div className='w-96 h-full border-r border-input lg:block hidden bg-muted/5'>
                <Sidebar />
            </div>
            <div className='p-4 lg:hidden flex items-center justify-between border-b border-input'>
                <div className=' w-full flex gap-1 items-center justify-start '>
                    <svg className="" width="30" height="30" viewBox="0 0 55 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect className="stroke-primary/80" x="14.4954" y="0.998303" width="18" height="60" rx="9" transform="rotate(13 14.4954 0.998303)" stroke="black" strokeWidth="5" />
                        <rect className="stroke-primary/80" x="36.4954" y="22.9983" width="18" height="60" rx="9" transform="rotate(13 36.4954 22.9983)" stroke="black" strokeWidth="5" />
                    </svg>
                    <h1 className='text-base font-semibold tracking-wider'>Neoflow</h1>
                </div>
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button size="icon" variant="outline">
                            <AlignJustify size={20} />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className='border-input overflow-hidden'>
                        <div className='w-full overflow-auto h-full max-h-[30em] pointer-events-auto'>
                            <Sidebar />
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
            <div className='w-full h-full flex relative overflow-hidden'>
                <div className='w-full h-8 bg-primary absolute bottom-0 -z-50 blur-3xl opacity-40' />
                <div className="w-full h-full overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}


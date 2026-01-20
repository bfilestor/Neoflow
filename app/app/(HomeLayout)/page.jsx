import TableData from "@/components/dashboard/Table"
import { Suspense } from "react";

export function metadata() {
  return {
    title: "Neoflow - Get started",
  };
}

export default async function WavyBackgroundDemo() {

  const project = { "total": 1, "projects": [{ "id": "8e3b14ef-4ad0-4b25-8fd9-c48da9f95258", "title": "Untitled-lcN5sLp", "isSolo": true, "createAt": "2025-01-20T08:54:39.916Z", "updatedAt": "2025-01-20T09:17:43.754Z", "auther": { "id": "cm64t8dot0000cf07tyn0fgnw", "name": "Kira Aziz", "email": "kiraaziz-local@gmail.com", "emailVerified": null, "image": "https://static.wikia.nocookie.net/viloes/images/3/3e/Light_YagamiHD.webp/revision/latest?cb=20220801003640&path-prefix=pt-br" } }] }

  return (
    <div className="h-full w-full relative">
      <div className="h-full w-full overflow-y-auto  p-3 lg:p-10  absolute top-0 right-0 ">
        <h1 className="text-3xl font-bold">Get started</h1>
        <div className="w-full grid grid-cols-5 gap-2 my-5">
          <div className="w-full col-span-full border border-input rounded-lg p-3 flex items-center justify-center overflow-hidden relative lg:p-10">
            <img src="/bg.jpg" className="absolute top-0 left-0 w-full h-full object-cover object-left-top opacity-30 blur" />
            <div className="top-0 left-0 w-full h-max flex flex-col items-center justify-center p-3 lg:p-10">
              <h1 className="flex items-center justify-center gap-1">
                <svg className="-translate-y-2" width="60" height="60" viewBox="0 0 55 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect className="stroke-primary/80" x="14.4954" y="0.998303" width="18" height="60" rx="9" transform="rotate(13 14.4954 0.998303)" stroke="black" strokeWidth="5" />
                  <rect className="stroke-primary/80" x="36.4954" y="22.9983" width="18" height="60" rx="9" transform="rotate(13 36.4954 22.9983)" stroke="black" strokeWidth="5" />
                </svg>
                <span className="text-lg lg:text-4xl font-bold">Welcome to Neoflow</span>
              </h1>
              <p className="max-w-lg text-foreground/70 text-center text-sm">Your ultimate open-source application for whiteboard collaboration, project management, AI-powered support</p>
            </div>
          </div>
          <div className="col-span-3 pointer-events-auto">
            <Suspense fallback={<p>Loading...</p>}>
              <TableData />
            </Suspense>
          </div>
          <div className="col-span-2 pointer-events-auto py-10 px-5 space-y-2">
            <h1 className="text-xl font-bold ">Follow Us</h1>
            <div className="grid grid-cols-2 gap-2">
              {
                Object.keys(contact).map((link) => (
                  <a
                    key={link}
                    href={contact[link].name}
                    className="flex border-input lg:hover:text-foreground ease-in-out duration-200 lg:hover:bg-muted/40 gap-3 p-4 bg-muted/20 backdrop-blur rounded-lg border w-full text-sm lg:last:items-center lg:last:justify-center text-foreground/70  last:col-span-2"
                  >
                    <img
                      src={`/contact/${contact[link].icon}.svg`}
                      height={20}
                      width={20}
                    />
                    {contact[link].title}
                  </a>
                ))
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


const contact = {
  "discord": {
    "title": "Discord",
    "name": "https://discord.gg/4BpxBW5g",
    "icon": "9"
  },
  "devto": {
    "title": "DEV.to",
    "name": "https://dev.to/kiraaziz",
    "icon": "7"
  },
  "email": {
    "title": "Email",
    "name": "mailto:kiraaziz2020@gmail.com",
    "icon": "1"
  }, 
  "github": {
    "title": "Github",
    "name": "https://github.com/kiraaziz",
    "icon": "5"
  },
  "facebook": {
    "title": "Facebook",
    "name": "https://www.facebook.com/aziz.kira.581/",
    "icon": "4"
  },
  "Instagram": {
    "title": "Instagram",
    "name": "https://www.instagram.com/kiracancode/",
    "icon": "8"
  },
  "linkedin": {
    "title": "Linkedin",
    "name": "https://www.linkedin.com/in/med-aziz-rjeibi-3b07832a5/",
    "icon": "6"
  },

}

import { IconLeaf, IconSearch } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "./ui/mode-toggle"
import { AuthNavButton } from "@/components/auth-nav-button"

export function SiteHeader() {
  return (
    <header className="flex h-[var(--header-height)] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[var(--header-height)]">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex items-center gap-2">
          <IconLeaf className="text-primary h-5 w-5" />
          <h1 className="text-base font-medium">Krishok's</h1>
        </div>
        <div className="ml-6 hidden md:flex relative w-64">
          <Input
            type="search"
            placeholder="Search crops, prices..."
            className="pl-9 h-9"
          />
          <IconSearch className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            Data Entry
          </Button>
          <ModeToggle/>
          <AuthNavButton />
        </div>
      </div>
    </header>
  )
}

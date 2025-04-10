import { IconLeaf, IconSearch } from '@tabler/icons-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Separator } from '~/components/ui/separator';
import { SidebarTrigger } from '~/components/ui/sidebar';
import { ThemeModeToggle } from '~/components/theme-mode-toggle';
// import { AuthNavButton } from '~/components/auth-nav-button';

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
        <div className="relative ml-6 hidden w-64 md:flex">
          <Input
            type="search"
            placeholder="Search crops, prices..."
            className="h-9 pl-9"
          />
          <IconSearch className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            Data Entry
          </Button>
          <ThemeModeToggle />
          {/* <AuthNavButton /> */}
        </div>
      </div>
    </header>
  );
}

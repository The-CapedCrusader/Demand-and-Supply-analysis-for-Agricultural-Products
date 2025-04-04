"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

type Item = {
  name: string
  url: string
  icon: React.ComponentType<{ className?: string }>
}

export function NavDocuments({ items }: { items: Item[] }) {
  const pathname = usePathname()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Resources</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.url
          
          return (
            <SidebarMenuItem key={item.url} active={isActive}>
              <SidebarMenuButton asChild active={isActive}>
                <Link href={item.url} prefetch={true}>
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

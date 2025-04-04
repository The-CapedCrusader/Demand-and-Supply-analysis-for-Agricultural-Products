"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth/auth-context"
import Link from "next/link"
import { IconUser, IconLogout } from "@tabler/icons-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AuthNavButton() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <IconUser className="h-4 w-4" />
          {user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-destructive">
          <IconLogout className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 
"use client"

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export const AppbarAuth = ({ isInMenu = false }: { isInMenu?: boolean }) => {
  const session = useSession()
  const router = useRouter()

  return (
    <Button
      size={"sm"}
      variant={isInMenu ? "navLink" : "outline"}
      id="navbar-default"
      onClick={() => {
        if (session.data?.user) {
          signOut()
        } else {
          router.push("/api/auth/signin")
        }
      }}
    >
      {session.data?.user ? "Logout" : "Login"}
    </Button>
  )
}

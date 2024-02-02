"use client"

import Link from "next/link"
import React from "react"
import { JoinDiscord } from "./JoinDiscord"
import { AppbarAuth } from "./AppbarAuth"
import { useSession } from "next-auth/react"
import Logo from "./landing/logo/logo"
import { Button } from "./ui/button"
import { Sparkles } from "lucide-react"
import { ThemeToggler } from "./ThemeToggler"
import { NavigationMenu } from "./landing/appbar/nav-menu"

export const Appbar = () => {
  const session = useSession()

  return (
    <>
      <nav className="fixed z-50 top-0 px-4 w-full h-16 border-b shadow-sm bg-background/80 backdrop-blur-md flex items-center">
        <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
          <Logo onFooter={false} />

          {session?.data?.user ? (
            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex items-center justify-around md:w-auto md:block space-x-2">
                <Button variant={"link"} size={"sm"} asChild>
                  <JoinDiscord isNavigated={false} />
                </Button>

                <Button size={"sm"} variant={"link"} asChild>
                  <Link
                    href={"https://github.com/100xdevs-cohort-2/assignments"}
                    target="_blank"
                  >
                    Assignments
                  </Link>
                </Button>

                <AppbarAuth />
              </div>

              <ThemeToggler />

              <div className="block sm:hidden">
                <NavigationMenu />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex items-center justify-around md:w-auto md:block space-x-3">
                <AppbarAuth />

                <Button size={"sm"} asChild>
                  <Link
                    href={"https://harkirat.classx.co.in/new-courses"}
                    target="_blank"
                  >
                    Join now <Sparkles className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <ThemeToggler />

              <div className="block sm:hidden">
                <NavigationMenu />
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="h-16 w-full" />
    </>
  )
}

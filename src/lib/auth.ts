import db from "@/db"
import CredentialsProvider from "next-auth/providers/credentials"

async function validateUser(
  email: string,
  password: string,
): Promise<
  | { data: null }
  | {
      data: {
        name: string
        userid: string
      }
    }
> {
  if (process.env.LOCAL_CMS_PROVIDER) {
    if (password === "123456") {
      return {
        data: {
          name: "Random",
          userid: "1",
        },
      }
    }
    return { data: null }
  }
  const url = "https://harkiratapi.classx.co.in/post/userLogin"
  const headers = {
    "Client-Service": process.env.APPX_CLIENT_SERVICE || "",
    "Auth-Key": process.env.APPX_AUTH_KEY || "",
    "Content-Type": "application/x-www-form-urlencoded",
  }
  const body = new URLSearchParams()
  body.append("email", email)
  body.append("password", password)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data as any // Or process data as needed
  } catch (error) {
    console.error("Error validating user:", error)
  }
  return {
    data: null,
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      async authorize(credentials: any) {
        try {
          //@ts-ignore
          const user = await validateUser(
            credentials.username,
            credentials.password,
          )
          console.log(user.data)
          if (user.data) {
            try {
              await db.user.upsert({
                where: {
                  id: user.data.userid,
                },
                create: {
                  id: user.data.userid,
                  name: user.data.name,
                  email: credentials.username,
                },
                update: {
                  id: user.data.userid,
                  name: user.data.name,
                  email: credentials.username,
                },
              })
            } catch (e) {
              console.log(e)
            }

            return {
              id: user.data.userid,
              name: user.data.name,
              email: credentials.username,
            }
          }
          // Return null if user data could not be retrieved
          return null
        } catch (e) {
          console.error(e)
        }
        return null
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secr3t",
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user.id = token.uid
      }
      return session
    },
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
}

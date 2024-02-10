import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./dbConnect"
import { getServerSession } from "next-auth"



const authOptions = {
  adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET,
        }),
         GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: {label:"Email", type:"email" , placeholder:"enter you email address"},
            password: { label: "Password", type: "password", placeholder:"enter your password"}
          },
          async authorize(credentials, req) {
            
            const { email, password } =   credentials

            try {

              const user =   await prisma.user.findUnique({
                where: {
                  email,
                },
              })
  
               if(!user)return null
              if(password !== user.password) return null 

             return user
            } catch (err) {
              console.error({"Error":err});
            }
            
          }
        }),

      ],
      secert: process.env.NEXTAUTH_SECRET,
      session : {
        strategy:'jwt',
      },
      pages: {
        signIn: '/login',
        /* signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest) */
      },
      debug: process.env.NODE_ENV === 'development' 
}

export const getAuthSession= ()=>getServerSession(authOptions)


export default authOptions 
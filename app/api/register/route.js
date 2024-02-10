import prisma from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json()

    // first check if email exit in our db
    const userExists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if(userExists) return  NextResponse.json({ message: "user already Registered" }, { status: 409 })

    const user =
      await prisma.User.create({
        data: {
          email,
          name: username,
          password

        }

      })

    return NextResponse.json({ message: "user Registered" }, { status: 201 })
  } catch (error) {

    return NextResponse.json({ message: 'an error accrue while registering the user' }, { status: 500 })
  }
}
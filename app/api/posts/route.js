

import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/dbConnect";
import { NextResponse } from "next/server";


// GET ALL POSTS
export const GET = async (req) => {

    const { searchParams } = new URL(req.url)
    const page = searchParams.get('page'),
        cat = searchParams.get('cat'),
        postPerPage = 5;

    try {
        const [posts, count] = await prisma.$transaction([
            prisma.post.findMany({
                take: postPerPage,
                skip: postPerPage * (page - 1),
                where: {
                    ...cat && { catSlug: cat }
                }

            }),

            prisma.post.count(),
        ])

        return new NextResponse(JSON.stringify({ posts, count }, { status: 200 }))
    } catch (error) {

        return new NextResponse(JSON.stringify({ message: 'something went wrong!', status: 500 }))
    }
}


// CREATE NEW POST
export const POST = async (req) => {
    const session = await getAuthSession()
    if (!session) {
        return new NextResponse(JSON.stringify({ message: `something went wrong, Not Authenticated`, status: 401 }))
    }
    
    try {
        const body = await req.json()
        
        const post = await prisma.post.create({
            data: {
                ...body, userEmail: session.user.email
            }
        })
        return new NextResponse(JSON.stringify(post, { status: 200 }))
    } catch (err) {
        return new NextResponse(JSON.stringify({ message: `something went wrong, couldn't create a comment`, status: 500 }))

    }
}
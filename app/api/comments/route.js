

import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/dbConnect";
import { NextResponse } from "next/server";


// GET ALL COMMENTS OF A POST
export const GET = async (req)=> {

    const {searchParams} = new URL(req.url)
    const postSlug = searchParams.get('postSlug');

    try {
        const comments= await prisma.comment.findMany({
            where:{
                ...(postSlug && {postSlug}),

            },
            /* orderBy: [
                {
                    createdAt: 'desc',
                },
                
              ], */
            include:{user:{
                select: {
                    email: true,
                    name: true,
                    image: true,
                  },
            }},
        })
     
        return new NextResponse(JSON.stringify(comments,{status:200}))
    } catch (error) {

        return new NextResponse(JSON.stringify({message:'something went wrong!',status:500}))
    }
} 


// CREATE A COMMENT OF POST

export const POST = async (req)=> {
const session = await getAuthSession()
if(!session){
    return new NextResponse (JSON.stringify({message: `something went wrong, Not Authenticated`,status:401}))
}
  
    try {
        const body = await req.json()


        const comment = await prisma.comment.create({data:{
            ...body,userEmail: session.user.email
        }})
     
        return new NextResponse (JSON.stringify(comment,{status:200}))
    } catch (err) {

        return new NextResponse (JSON.stringify({message: `something went wrong, couldn't create a comment`,status:500}))
        
    }
}
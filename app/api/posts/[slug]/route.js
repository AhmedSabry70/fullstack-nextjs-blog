import prisma from "@/utils/dbConnect";
import { NextResponse } from "next/server";

// get single page == post

export const GET = async (req,{params})=> {

   const {slug}=params

    try {
        const post= await prisma.post.findUnique({
            where:{slug},
            include:{user:{
                select: {
                email: true,
                name: true,
                image:true,
              }}
              ,}
        
        })
        
        return new NextResponse(JSON.stringify(post,{status:200}))
    } catch (error) {

        return new NextResponse(JSON.stringify({message:'something went wrong!',status:500}))
    }
}
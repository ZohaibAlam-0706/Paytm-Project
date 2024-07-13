"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnrampTransaction(amount: number, provider: string){
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const token = Math.random().toString();
    if(!userId){
        return {message: "User not logged in"}
    }
    try{
        await prisma.onRampTransaction.create({
            data: {
                userId: Number(userId),
                amount: amount,
                status: "Processing",
                startTime: new Date(),
                provider: provider,
                token: token
            }
        })

        return {
            message: "On Ramp Transaction added"
        }
    }catch(e){
        return {
            message: "Error while making a transaction"
        }
    }
}
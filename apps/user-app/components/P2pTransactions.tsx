import { Card } from "@repo/ui/card"
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import prisma from "@repo/db/client";

async function currentUserId() {
    const session = await getServerSession(authOptions);
    return Number(session?.user?.id);
}

export const P2pTransfer = async ({
    transactions
}: {
    transactions: {
        id: number,
        amount: number,
        timestamp: Date,
        fromUserId: number,
        toUserId: number
    }[]
}) => {
    const currentId = await currentUserId();
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                {t.fromUserId === currentId ? 
                    <div className="flex justify-between w-full">
                        <div>
                            <div className="text-sm">
                                Sent INR
                            </div>
                            <div className="text-slate-600 text-xs">
                                {t.timestamp.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            - Rs {t.amount / 100}
                        </div>
                    </div> : 
                    <div  className="flex justify-between w-full">
                        <div>
                            <div className="text-sm">
                                Received INR
                            </div>
                            <div className="text-slate-600 text-xs">
                                {t.timestamp.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            + Rs {t.amount / 100}
                        </div>
                    </div>
                }
            </div>)}
        </div>
    </Card>
}
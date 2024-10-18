import { connect } from "@/dbConfig/dbConfig"
import Data from "@/models/dataModel"
import { NextResponse } from "next/server"

connect()

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const data = await Data.find({})
        return NextResponse.json({
            message: "data imported successfully",
            data,
            status : 200,
    },{status : 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                message: "Problem in fetching data",
                error,
                status : 500,
        },{status : 500})
    }
}
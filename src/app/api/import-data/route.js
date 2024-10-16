import { connect } from "@/dbConfig/dbConfig";
import Data from "@/models/dataModel";
import csvtojson from "csvtojson"
import { NextResponse } from "next/server";

connect()

export async function GET() {
    try {
        const data = await csvtojson().fromFile("data-set.csv");
            const dataset = await Data.insertMany(data)
        return NextResponse.json({
            message: "data imported successfully",
            dataset,
            status : 200,
    },{status : 200})
    } catch (error) {
        return NextResponse.json({
                message: "Problem in importing data",
                error,
                status : 500,
        },{status : 500})
    }
}
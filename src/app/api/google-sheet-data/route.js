import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect()

export async function GET() {
    const SPREADSHEET_ID = "1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0";
     const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json`;
    try {
        const response = await fetch(url);
        const text = await response.text();
        const jsonData = JSON.parse(text.substring(47).slice(0, -2));
        const rows = jsonData.table.rows;
        const headers = jsonData.table.cols.map((col) => col.label || "");
    
        const sheetData = rows.map((row) =>
          row.c.reduce((obj, cell, index) => {
            obj[headers[index]] = cell ? cell.v : "";
            return obj;
          }, {})
        );
        console.log( "date is here : " , sheetData[0].Day)

        return NextResponse.json({
            message: "Google sheet data imported successfully",
            sheetData,
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
import { connect } from "@/dbConfig/dbConfig";
import Data from "@/models/dataModel";
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
        function parseDateString(dateString) {
          const regex = /Date\((\d{4}),(\d{1,2}),(\d{1,2})\)/;
          const match = dateString.match(regex);
      
          if (match) {
              const year = parseInt(match[1], 10);
              const month = parseInt(match[2], 10); // Month is 0-indexed
              const day = parseInt(match[3], 10);
              return new Date(year, month-1, day+1);
          } else {
              throw new Error('Invalid date string format');
          }
      }
      
      const dateObj = parseDateString(sheetData[103].Day);
        // const tr = await Data.insertMany(sheetData.map(({Day,Age,Gender,A,B,C,D,E,F}) => {
        //   return {Day : parseDateString(Day),Age,Gender,A,B,C,D,E,F}
        // }))
        return NextResponse.json({
            message: "Google sheet data imported successfully",
            sheetData,
            // tr,
            status : 200,
    },{status : 200})
    } catch (error) {
      console.log(error.message)
        return NextResponse.json({
                message: "Problem in importing data",
                error,
                status : 500,
        },{status : 500})
    }
}
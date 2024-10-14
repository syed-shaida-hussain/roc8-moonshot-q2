import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connect } from "@/dbConfig/dbConfig";

connect();

const handleErrors = (error) => {
    let errors = {username : '' , password : ''};

    if(error.message === "username is required") {
        errors.username = "username is required"
    }

    if(error.message === "Password is required") {
        errors.password = "Password is required"
    }

    if(error.message === "password should be greater than or equal to 8"){
        errors.password = "password should be greater than or equal to 8"
    }

    if(error.message.includes("username already registered")) {
        errors.username = "username already registered"
        return errors
    }

    if(error.message.includes("users validation failed")) {
        Object.values(error.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

export async function POST (request) {
    const {username,password} = await request.json();
    try {
        if(!username) {
            throw Error("username is required")
        }
        if(!password) {
            throw Error("Password is required")
        }
        if(password.length < 8) {
            throw Error("password should be greater than or equal to 8")
        }

        const existingUser = await User.findOne({username});
        if(existingUser) {
            throw Error ("username already registered")
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);
        const newUser = await User.create({ username, password : hashedPassword});
        return NextResponse.json({
                message : "User Created Successfully",
                success : true,
                status : 201,
                newUser
        });
        } catch (error) {
        const errors = handleErrors(error);
        return NextResponse.json({
                message: "Problem in signing up",
                errors,
                status : 500,
        })
    }
}
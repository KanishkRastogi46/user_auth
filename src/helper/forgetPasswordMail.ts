import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs';
//import jwt from 'jsonwebtoken';
import user from "@/model/userModel";

export async function forgetEmail(email:any){
    try {
        let hashed= await bcryptjs.hash(email, 10);

        await user.findOneAndUpdate({email}, 
            {
                forgetPasswordToken: hashed,
                forgetPasswordExpiry: Date.now() + 3600000
            },
            {
                new: true,
                runValidators: true
            }
        )
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "e0f1d528083ab4",
            pass: "703c5edf79926b"
            }
        });
        
        const emailOptions= {
            from: 'kanishk@gmail.com',
            to: email,
            subject: "Reset your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/resetpassword">here<a/> to reset your password</p>`
        }

        await transport.sendMail(emailOptions);
        return hashed;
    } catch (error) {
        throw error;
    }
}
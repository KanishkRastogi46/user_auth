import nodemailer from 'nodemailer';
import user from '@/model/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail= async({email, emailType, userId}:any)=>{
    try {
        let hashed= await bcryptjs.hash(userId.toString(), 10);
        
        if(emailType==='VERIFY'){
            await user.findByIdAndUpdate(userId, {
                verifyToken: hashed,
                verifyTokenExpiry: Date.now() + 3600000
            }, {
                new: true,
                runValidators: true
            })
        } else if(emailType==='RESET'){
            await user.findByIdAndUpdate(userId, {
                forgetPasswordToken: hashed,
                forgetPasswordExpiry: Date.now() + 3600000
            }, {
                new: true,
                runValidators: true
            })
        }

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
            subject: emailType==="VERIFY" ? "Email Verification" : "Reset your Password",
            html: `<p>
                    Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashed}"> here </a><span> ${emailType==="VERIFY" ? "to verify your Email" : "to reset your Password"} and paste this link in the browser </span><br> ${process.env.DOMAIN}/verifyemail?token=${hashed}
                   </p>`
          }

          const mailResponse= await transport.sendMail(emailOptions);
          return mailResponse;
    } catch (error) {
        console.log(error);
    }
}
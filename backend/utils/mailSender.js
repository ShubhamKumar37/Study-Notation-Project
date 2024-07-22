const nodemailer = require('nodemailer');
require("dotenv").config();

const mailSender = async (title, email, body) =>
    {
        try{
            let transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            });

            let info = await transporter.sendMail({
                from: `StudyNotation by Shubham Kumar`,
                to: `${email}`,
                subject: `${title}`,
                html: `${body}`,
            });
            
            console.log(info);
            return info;
        }
        catch(Error){
            console.log(Error);
        }
    }

module.exports = mailSender;
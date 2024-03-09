const nodeMailer = require('nodemailer');
require('dotenv').config();

const LoginBody = (token) => {
    return `
    <body>
        <table width="600" cellpadding="0" cellspacing="0" style="margin:auto; background-color:#f8f9fa; border:1px solid #e0e0e0; padding:20px;">
            <tr>
                <td style="text-align:center; padding:20px; background-color:#ffffff;">
                    <img src="" alt="Logo" style="max-width:100%; height:auto;">
                </td>
            </tr>
            <tr>
                <td style="padding:20px; background-color:#ffffff;">
                    <h1 style="font-size:24px; font-family: Arial, sans-serif; color:#333333;">Welcome to Our Service!</h1>
                    <p style="font-size:16px; font-family: Arial, sans-serif; color:#666666; line-height:1.5;">Thank you for signing up for our service. We are excited to have you on board!</p>
                    <a href="${process.env.LINK}/api/user/verify?id=${token}" style="display:inline-block; background-color:#28a745; color:#ffffff; text-decoration:none; padding:10px 20px; margin-top:20px; border-radius:4px; font-family: Arial, sans-serif;">Verify Email</a>
                </td>
            </tr>
            <tr>
                <td style="text-align:center; padding:20px; background-color:#e9ecef;">
                    <p style="font-size:14px; font-family: Arial, sans-serif; color:#666666;">© 2023 LOW CODE API. All Rights Reserved.</p>
                    <p style="font-size:14px; font-family: Arial, sans-serif; color:#666666;">Rudhram Saraswat</p>
                </td>
            </tr>
        </table>
    </body>
    `;
}

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        requireTLS: true,
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },

});

const sendMail = (to, token, type) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to, 
        subject: type === 'login' ? 'Verify your email' : '', 
        html : type === 'login' ? LoginBody(token) : '', 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending mail: ', error);
        } else {
            console.log('Email sent: ', info.response);
        }
    });


};


module.exports = sendMail;
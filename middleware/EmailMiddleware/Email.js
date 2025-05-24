
const { transporter } = require('./EmailConfigration');

const sendVerificationCode = async (email, verficode)=>{
    try {
        const response = await transporter.sendMail({
            from: '"RamjiKiRassoi" <msharma7055084627@gmail.com>',
            to: email,
            subject: "Login/Signup",
            text: "Verify your Email",
            html: verficode,
        })
        console.log("Send Verification Code Successfully", response);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {sendVerificationCode};
import nodemailer from "nodemailer";
import ejs from "ejs";

//For __dirname
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async (options) => {
  const { email, subject, message, name, ejsUrl } = options;

  //ejs file directory
  ejs.renderFile(
    path.join(__dirname, `../mails/${ejsUrl}`),
    { email, message, name },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const mailOptions = {
          from: process.env.SMTP_MAIL,
          to: email,
          subject,
          html: data,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log(`Email sent successful to ${email} `);
        });
      }
    }
  );
};
export default sendEmail;

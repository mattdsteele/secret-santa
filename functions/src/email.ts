import FormData = require("form-data");
import Mailgun from "mailgun.js";

export const email = async (
  emails: string[],
  htmlBody: string,
  subject: string,
  apiKey: string
) => {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "orphum",
    key: process.env.MAILGUN_API_KEY,
  });
  for (const email of emails) {
  const data = await mg.messages.create("secretsanta.steele.blue", {
    from: "Burt the Elf 🧝‍♂️ <burt@secretsanta.steele.blue>",
    to: email,
    subject,
    html: `
          <html><body>
          ${htmlBody}
        </body></html>
        `,
  });
  }
  return JSON.stringify({done: true});
};

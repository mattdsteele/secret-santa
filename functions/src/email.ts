import * as SparkPost from 'sparkpost';

export const email = async (
  emails: string[],
  htmlBody: string,
  subject: string,
  apiKey: string
) => {
  const client = new SparkPost(apiKey);
  const response = await client.transmissions.send({
    content: {
      from: 'Burt the Elf 🧝‍♂️ <burt@secretsanta-mail.steele.blue>',
      reply_to: 'burt@secretsanta.steele.blue',
      subject,
      html: `
          <html><body>
          ${htmlBody}
        </body></html>
          `
    },
    recipients: emails.map(address => {
      return { address };
    })
  });
  return response.results;
};

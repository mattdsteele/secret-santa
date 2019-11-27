import { User } from './firestore-repo';
import MarkdownIt = require('markdown-it');
export const makeSecretSantaEmail = (
  pal: User,
  santaList: string,
  user: User
) => {
  const md = new MarkdownIt({ html: true, linkify: true });
  const htmlList = md.render(santaList);
  return `
    <p>Hello ${user.displayName}! We have a Secret Pal for you.</p>
    <p><strong>Your Secret Pal is ${pal.displayName}</strong></p>
    <p>${pal.displayName}'s list is:</p>
    <hr>
    ${htmlList}
    <hr>
    <p>You can also view ${pal.displayName}'s list at <a href="https://secretsanta.steele.blue">secretsanta.steele.blue</a></p>
    <p>Enjoy!</p>
    <em>🧝‍♀️ Burt the Elf 🧝‍♂️</em>
    `;
};

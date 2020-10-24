import React, { useState } from 'react';
import { functions } from '../store/firebase';
import Commonmark from 'commonmark';
const parser = new Commonmark.Parser();
const writer = new Commonmark.HtmlRenderer();
const sendEmailAsBurt = functions.httpsCallable('sendEmailAsBurt');

const TEST_MODE = false;

const burtIntroEmail = `Hello there boys and girls. It's me Burt (aka Santa's Little Helper (no, not the greyhound)). Santa and all his helpers are starting to get real busy here at the North Pole. Before you know it, Christmas will be here. So stop doing the Monster Mash already.

I assume that everyone is participating in the Steele Family Gift exchange. If this is a bad assumption, let me know.

As in year's past, there are a few rules:

* $50 limit (includes tax, shipping) on gifts. So keep each item on your wish list to under $50.
* You can (and are encouraged to) have multiple items that when combined cost $50 or less.
* Again, your Secret Santa does not have to spend $50 but that's the limit he/she can spend.

Your "Secret Pal" will not be your spouse/significant other. You're still on "the hook" for them. It also won't be someone you've had in recent years (assuming the supercomputer got it right).

**Click here to sign up for the Steele Family Gift Exchange: [https://secretsanta.steele.blue](https://secretsanta.steele.blue)**

Fill out your form early! You can save/update it until **November 26th**, at which point I'll push a button on the supercomputer and it will e-mail your list to your Secret Santa. If you fail to submit before the deadline, all gifts intended for you may go to Santa's Little Helper.

To help you organize your time and get your wish list in on or before the November 26th deadline, I will sent you reminders. They will be friendly reminders at first. But the closer we get to the deadline, the angrier the reminders will become. Believe me, you do not want to suffer the verbal wrath of Santa's Little Helper. 🧝

On November 27th I will e-mail you the list submitted by your Secret Pal, and you should be off to the races. And if you have any problems entering your list, don't bug me. Bug Matt.

Burt the elf
`;

const burtReminderEmail = `Friendly reminder that you have **3 days left** to put in your lists for your Secret Santa.

I'll be firing up the supercomputer to assign Secret Pals at **11:59pm on November 26**, so get on it!

[https://secretsanta.steele.blue](https://secretsanta.steele.blue)

Burt the Elf
`;

function BurtMailer() {
  const matt = ['Matt S <orphum@gmail.com>'];
  const rest = [
    'Merle Steele <merleds2006@gmail.com>',
    'Carla Steele <carlaps2006@gmail.com>',
    'Patrick Steele <patrick.w.steele@gmail.com>',
    'Eric Steele <e.steele@gmail.com>',
    // 'Jessica Steele <jess.m.hensley@gmail.com>',
    'Jessica Codr <jcake2@gmail.com>',
    'Angela Steele <ange.m.steele@gmail.com>',
    'Judy Steele <rsteele1@kc.rr.com>',
    'Rick Steele <rickandjudysteele@gmail.com>',
  ];
  const fullEmailList = [...matt, ...rest];
  const emailList = TEST_MODE ? matt : fullEmailList;
  const [content, setContent] = useState('');
  const [renderedResult, setRenderedResult] = useState('');
  const [subject, setSubject] = useState('A message from Burt the Elf');
  const sendEmail = async (e) => {
    e.preventDefault();
    console.log('okay send email', parser);
    const htmlContent = writer.render(parser.parse(content));
    console.log('parsed, content', htmlContent);
    const result = await sendEmailAsBurt({
      emailList,
      subject,
      content: htmlContent,
    });
    // Read result of the Cloud Function.
    var sanitizedMessage = result.data;
    console.log(sanitizedMessage);
  };
  const renderResult = () => {
    const htmlContent = writer.render(parser.parse(content));
    setRenderedResult(htmlContent);
  };
  const setText = (content) => {
    setContent(content);
  };

  return (
    <div>
      <p>
        Subject:{' '}
        <input
          name=""
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </p>
      <p>Emailers:</p>
      <ul>
        {emailList.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
      <p>Content</p>
      <button onClick={() => setText(burtIntroEmail)}>Intro</button>
      <button onClick={() => setText(burtReminderEmail)}>Reminder</button>
      <form onSubmit={sendEmail}>
        <textarea
          name="data"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <div>
          <button type="button" onClick={renderResult}>
            Preview
          </button>
          {renderedResult && (
            <>
              <div
                style={{ border: '1px solid black' }}
                dangerouslySetInnerHTML={{ __html: renderedResult }}
              />
              <button type="submit">
                Email with data ({TEST_MODE ? 'TEST MODE' : 'EVERYONE'})
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export { BurtMailer };

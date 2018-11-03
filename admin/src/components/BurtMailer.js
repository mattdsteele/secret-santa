import React, { useState } from 'react';
import { functions } from '../store/firebase';
import Commonmark from 'commonmark';
const parser = new Commonmark.Parser();
const writer = new Commonmark.HtmlRenderer();
const sendEmailAsBurt = functions.httpsCallable('sendEmailAsBurt');

function BurtMailer() {
  const matt = ['Matt S <orphum@gmail.com>'];
  const rest = [
    'Merle Steele <merleds2006@gmail.com>',
    'Carla Steele <carlaps2006@gmail.com>',
    'Patrick Steele <patrick.w.steele@gmail.com>',
    'Eric Steele <e.steele@gmail.com>',
    'Jessica Steele <jess.m.hensley@gmail.com>',
    'Jessica Codr <jcake2@gmail.com>',
    'Angela Steele <ange.m.steele@gmail.com>',
    'Judy Steele <rsteele1@kc.rr.com>',
    'Rick Steele <rickandjudysteele@gmail.com>'
  ];
  const fullEmailList = [...matt, ...rest];
  const testMode = false;
  const emailList = testMode ? matt : fullEmailList;
  const [content, setContent] = useState('');
  const [renderedResult, setRenderedResult] = useState('');
  const sendEmail = async e => {
    e.preventDefault();
    console.log('okay send email', parser);
    const htmlContent = writer.render(parser.parse(content));
    console.log('parsed, content', htmlContent);
    const result = await sendEmailAsBurt({
      emailList,
      content: htmlContent
    });
    // Read result of the Cloud Function.
    var sanitizedMessage = result.data;
    console.log(sanitizedMessage);
  };
  const renderResult = () => {
    const htmlContent = writer.render(parser.parse(content));
    setRenderedResult(htmlContent);
  };

  return (
    <div>
      <p>Emailers:</p>
      <ul>
        {emailList.map(e => (
          <li key={e}>{e}</li>
        ))}
      </ul>
      <p>Content</p>
      <form onSubmit={sendEmail}>
        <textarea name="data" onInput={e => setContent(e.target.value)} />
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
              <button type="submit">Email with data</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export { BurtMailer };

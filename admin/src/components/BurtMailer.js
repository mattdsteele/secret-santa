import React, { Component } from 'react';
import { functions } from '../store/firebase';
import Commonmark from 'commonmark';
const parser = new Commonmark.Parser();
const writer = new Commonmark.HtmlRenderer();
const sendEmailAsBurt = functions.httpsCallable('sendEmailAsBurt');

export class BurtMailer extends Component {
  emailList = ['Matt S <orphum@gmail.com>'];
  state = {
    content: ''
  };
  sendEmail = async e => {
    e.preventDefault();
    console.log('okay send email', parser);
    const content = writer.render(parser.parse(this.state.content));
    console.log('parsed, content', content);
    const result = await sendEmailAsBurt({
      emailList: this.emailList,
      content
    });
    // Read result of the Cloud Function.
    var sanitizedMessage = result.data;
    console.log(sanitizedMessage);
  };
  renderResult() {
    const content = writer.render(parser.parse(this.state.content));
    this.setState({
      renderedResult: content
    });
  }

  render() {
    return (
      <div>
        <p>Emailers:</p>
        <ul>
          {this.emailList.map(e => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        <p>Content</p>
        <form onSubmit={e => this.sendEmail(e)}>
          <textarea
            name="data"
            onInput={e => this.setState({ content: e.target.value })}
          />
          <div>
            <button type="button" onClick={() => this.renderResult()}>
              Preview
            </button>
            {this.state.renderedResult && (
              <>
                <div
                  style={{ border: '1px solid black' }}
                  dangerouslySetInnerHTML={{
                    __html: this.state.renderedResult
                  }}
                />
                <button type="submit">Email with data</button>
              </>
            )}
          </div>
        </form>
      </div>
    );
  }
}

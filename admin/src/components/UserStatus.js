import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllLists } from '../store/actions';
import MarkdownIt from 'markdown-it';

const mapStateToProps = ({ users, lists }) => {
  return {
    users: users.activeUsers,
    lists: lists.all,
    year: lists.year,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onConnect: () => dispatch(getAllLists()),
  };
};

class userStatus extends Component {
  state = {
    showHtml: false
  }
  componentDidMount() {
    this.props.onConnect();
  }
  newYear = (e) => {
    this.setState({ year: parseInt(e.target.value) });
  };
  nameOfUser(uid) {
    return (
      this.props.users.find((user) => user.uid === uid)?.displayName ||
      'NOT_FOUND'
    );
  }
  render() {
    console.log('rendering status');
    let usersWithoutLists = undefined;
    if (this.props.lists && this.props.users) {
      console.log('has data')
      const currentYearLists = this.props.lists?.filter(
        (l) => l.year === this.props.year
      );
      usersWithoutLists = this.props.users?.filter((u) =>
        currentYearLists.every((s) => s.user !== u.uid)
      );
      console.log(currentYearLists);
      console.log('users', this.props.users);
      console.log('without lists', usersWithoutLists);
    }
    return (
      <>
        <label htmlFor="year">Year:</label> {this.props.year}
        <p>Has submitted a list:</p>
        <ul>
          {this.props.lists &&
            this.props.lists
              .filter((list) => list.year === this.props.year)
              .map((list) => {
                const md = new MarkdownIt({ html: true, linkify: true });
                let htmlList = md.render(list.list);
                return (
                  <li key={list.user}>
                    {this.nameOfUser(list.user)}
                    {this.state.showHtml ? (
                      <div dangerouslySetInnerHTML={{__html : htmlList}} onClick={() => this.setState({showHtml: false})}></div>
                    ) : (
                      <pre
                        onClick={() => {
                          this.setState({ showHtml: true });
                        }}
                      >
                        <code>{JSON.stringify(list.list)}</code>
                      </pre>
                    )}
                  </li>
                );
              })}
        </ul>

        <p>Has <strong>not</strong> submitted a list:</p>
        <ul>
          {usersWithoutLists &&
            usersWithoutLists
              .map((list) => {
                return <li key={list.uid}>{this.nameOfUser(list.uid)}</li>;
              })}
        </ul>
      </>
    );
  }
}

const UserStatus = connect(mapStateToProps, mapDispatchToProps)(userStatus);

export { UserStatus };

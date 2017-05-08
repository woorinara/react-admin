import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Profile from '../components/widgets/Profile';

import { logout, sendMessage } from '../actions';

import ReduxOutlet from '../outlets/ReduxOutlet';
import ModalFactory from '../components/modals/factory';

let Factory = ModalFactory.modalFromFactory;

import LineChart from '../components/charts/LineChart';
import EasyPie from '../components/charts/EasyPie';
import ProgressBar from '../components/charts/ProgressBar';


import {I, Panel, Button, Comp} from '../components/ui/';
import {Row, Col, Page} from '../components/ui/Layout';

import moment from 'moment';
moment.locale('ko');

var shallowCompare = require('react-addons-shallow-compare');

import Database from '../components/firebase/database';
import * as firebase from "firebase";

const convo = []

class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: []
    }

    this.handleMessageKeypress = this.handleMessageKeypress.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.handleSendMessage = this.handleSendMessage.bind(this)
  }

  async componentDidMount() {

    try {
      Database.listenMessage((message) => {
        const user = firebase.auth().currentUser;
        convo.push({
          userId: user.uid,
          name: user.email,
          message: message.text,
          createdAt: message.createdAt
        });
        this.setState({
          messages: [...convo].reverse(),
          message: ''
        })
      });

    } catch (error) {
        console.log(error);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleMessageKeypress(e) {
    if(e.keyCode == 13 && e.shiftKey) {
      e.preventDefault()
      this.setState({ message: '' });
      this.props.dispatch(sendMessage(this.state.message))
    }
  }

  handleMessageChange(e) {
    this.setState({ message: e.target.value });
  }

  handleSendMessage() {
    this.setState({ message: '' });
    this.props.dispatch(sendMessage(this.state.message))
  }

  render() {

    var options = {
      mode: 'markdown',
      theme:'monokai'
    };

    const { messages } = this.state;
    const { dispatch } = this.props;

    const Feed = messages.map((message, idx) => {

      return (
        <div className="media chat-item" key={idx}>
          <div className="media-left p-r">
            <a href="#" className="sa-thumb-small">
              <img className="media-object avatar circle" src="https://s3-us-west-2.amazonaws.com/mindcraft.io/avatars/4.png" alt="" />
            </a>
            <div className="backbar"></div>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{message.name} on {message.message}</h4>
            <p>{moment(message.createdAt).fromNow()}</p>
          </div>
        </div>
      )
    })

    return (
      <Page>
        <Row>
          <Col size={6}>
            <Panel title="Message">
              <form role="form">
                <div className="form-group">
                  <textarea
                    className="form-control" rows="3"
                    placeholder="메시지를 입력해 주세요."
                    value={this.state.message}
                    onKeyDown={this.handleMessageKeypress}
                    onChange={this.handleMessageChange} />
                </div>
              </form>
              <Button
                label="전송" icon="fa-send"
                size="btn-default" color="btn-primary"
                rounded={false} classes={'m-r-sm m-b-sm'}
                onClick={this.handleSendMessage}
                />
            </Panel>
          </Col>
          <Col size={6}>
            <Row>
              <Col size={12}>
                <Panel title="feed" style={{textAlign:'left'}} scrollHeight={315}>
                  {Feed}
                </Panel>
              </Col>
            </Row>

          </Col>
        </Row>
    </Page>
		);
	}
}

function mapStateToProps(state) {
  return {
    token: state.app.token,
    user: state.user,
    app:state.app
  };
}

export default connect(mapStateToProps)(Message);

/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Dashboard
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Profile from '../components/widgets/Profile';

import { selectApp, logout } from '../actions';

import ReduxOutlet from '../outlets/ReduxOutlet';
import moment from 'moment';
import ModalFactory from '../components/modals/factory';

let Factory = ModalFactory.modalFromFactory;

import LineChart from '../components/charts/LineChart';
import EasyPie from '../components/charts/EasyPie';
import ProgressBar from '../components/charts/ProgressBar';


import {I, Panel, Button, Comp} from '../components/ui/';
import {Row, Col, Page} from '../components/ui/Layout';

var shallowCompare = require('react-addons-shallow-compare');

class Dashboard extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { dispatch } = this.props;
    let i = 0;
    return (
      <Page>
        <Row>
          <Col size={12}>
            <Panel classes={'no-padder'}>
              <div className="col-md-3 summaryItem">
                <h1>1,200</h1>
                <p>추종자</p>
              </div>

              <div className="col-md-3 summaryItem">
                <h1>12</h1>
                <p>레벨</p>
              </div>

              <div className="col-md-3 summaryItem">
                <h1 style={{color:'#a48ad4'}}>12,300</h1>
                <p>기여 포인트</p>
              </div>

              <div className="col-md-3 summaryItem">
                <h1 style={{color:'#28dbec'}}>$112,375</h1>
                <p>현금 포인트</p>
              </div>

            </Panel>
          </Col>
        </Row>

        <Row>
          <Col size={9}>
            <Panel title="포인트">
              <LineChart data={{labels: ['M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
                series: [
                [30, 20, 50, 40, 45, 15, 25, 65, 70, 80],
                [5, 10, 20, 70, 85, 45, 15, 65, 20, 30]
                ]}} />
            </Panel>
          </Col>

          <Col size={3}>
            <Comp title="프로필">
              <div className="avatar">
                <img className="img-circle" src={'/dist/images/5.png'} alt="" />
              </div>
              <a href="javascript:;" onClick={(e)=>handleUserSelected(user)}><h2 className="text-uppercase">브루스리</h2></a>
              <p>to_erae@naver.com</p>
            </Comp>


          </Col>
        </Row>

        {/*
        <Row>
          <Col size={4}>
            <Panel classes={'text-center'}>
              <EasyPie
                  size={150}
                  barColor={'#F06292'}
                  trackColor={'rgba(0,0,0,0.1)'}
                  lineWidth={5}
                  percent={30}
                  theme="honeycomb_light"
                />
              <h4 className="m-b-none">Proposals</h4>
              <small>Total proposals</small>
            </Panel>
          </Col>
          <Col size={4}>
            <Panel classes={'text-center'}>
              <EasyPie
                  size={150}
                  barColor={'#3949AB'}
                  trackColor={'rgba(0,0,0,0.1)'}
                  lineWidth={5}
                  percent={80}
                  theme="honeycomb_light"
                />
              <h4 className="m-b-none">Reports</h4>
              <small>Total reports</small>
            </Panel>
          </Col>
          <Col size={4}>
            <Panel classes={'text-center'}>
              <EasyPie
                  size={150}
                  barColor={'#F4511E'}
                  trackColor={'rgba(0,0,0,0.1)'}
                  lineWidth={5}
                  percent={70}
                  theme="honeycomb_light"
                />
              <h4 className="m-b-none">Sales</h4>
              <small>Total Sales</small>
            </Panel>
          </Col>
        </Row>
        */}
        <Row>
          <Col size={9}>
            <Panel>
              <table className="table">
                <thead>
                  <tr>
                    <th>미션</th>
                    <th className="hidden-xs">기여포인트</th>
                    <th className="hidden-xs">현금포인트</th>
                    <th>상태</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>3일 연속 들어오기</td>
                    <td className="hidden-xs">@45</td>
                    <td className="hidden-xs">$30</td>
                    <td>
                      <ProgressBar style={{backgroundColor:'#f77373'}} now={30} max={100} theme="progress-bar-warning" />
                    </td>
                    <td className="text-right">
                      <a href="javascript:;" className="m-r-sm"><i className="fa text-muted fa-trash-o"></i></a>
                      <a href="javascript:;"><i className="fa text-muted fa-edit"></i></a>
                    </td>
                  </tr>
                  <tr>
                    <td>Level 10 달성</td>
                    <td className="hidden-xs">@45</td>
                    <td className="hidden-xs">$30</td>
                    <td>
                      <ProgressBar style={{backgroundColor:'#f77373'}} now={80} max={100} theme="progress-bar-success" />
                    </td>
                    <td className="text-right">

                      <a href="javascript:;" className="m-r-sm"><i className="fa text-muted fa-trash-o"></i></a>
                      <a href="javascript:;"><i className="fa text-muted fa-edit"></i></a>
                    </td>
                  </tr>
                  <tr>
                    <td>기여포인트 500 달성</td>
                    <td className="hidden-xs">@45</td>
                    <td className="hidden-xs">$30</td>
                    <td>
                      <ProgressBar style={{backgroundColor:'#f77373'}} now={10} max={100} theme="progress-bar-danger" />
                    </td>
                    <td className="text-right">
                      <a href="javascript:;" className="m-r-sm"><i className="fa text-muted fa-trash-o"></i></a>
                      <a href="javascript:;"><i className="fa text-muted fa-edit"></i></a>
                    </td>
                  </tr>
                  <tr>
                    <td>Level 100 달성</td>
                    <td className="hidden-xs">45 kW</td>
                    <td className="hidden-xs">30 kW</td>
                    <td>
                      <ProgressBar style={{backgroundColor:'#f77373'}} now={40} max={100} theme="progress-bar-info" />
                    </td>
                    <td className="text-right">
                      <a href="javascript:;" className="m-r-sm"><i className="fa text-muted fa-trash-o"></i></a>
                      <a href="javascript:;"><i className="fa text-muted fa-edit"></i></a>
                    </td>
                  </tr>
                  <tr>
                    <td>추종자 100명 달성</td>
                    <td className="hidden-xs">@45</td>
                    <td className="hidden-xs">$30</td>
                    <td>
                      <ProgressBar style={{backgroundColor:'#f77373'}} now={40} max={100} theme="progress-bar-warning" />
                    </td>
                    <td className="text-right">
                      <a href="javascript:;" className="m-r-sm"><i className="fa text-muted fa-trash-o"></i></a>
                      <a href="javascript:;"><i className="fa text-muted fa-edit"></i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Panel>
          </Col>
          <Col size={3}>
            <Panel title="추종자" scrollHeight={315}>
              <article className="comment-item">
                <a className="pull-left thumb-sm m-r-sm"><img src="/dist/images/5.png" className="img-circle" /></a>
                <section className="comment-body">
                  <header> <a href="#"><strong>이강훈</strong></a></header>
                  <div className="text-muted">LEVEL 10 / 10,000</div>
                </section>
              </article>

              <article className="comment-item">
                <a className="pull-left thumb-sm m-r-sm"><img src="/dist/images/7.png" className="img-circle" /></a>
                <section className="comment-body">
                  <header> <a href="#"><strong>김괴테</strong></a></header>
                  <div className="text-muted">Level 1 / 50</div>
                </section>
              </article>

              <article className="comment-item">
                <a className="pull-left thumb-sm m-r-sm"><img src="/dist/images/8.png" className="img-circle" /></a>
                <section className="comment-body">
                  <header> <a href="#"><strong>신나라</strong></a></header>
                  <div className="text-muted">Level 5 / 3,000</div>
                </section>
              </article>

              {/*
              <footer className="text-center">
                <hr/>
                  <Button color="btn-info" label="Show More" />
              </footer>
              */}
            </Panel>
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

export default connect(mapStateToProps)(Dashboard);

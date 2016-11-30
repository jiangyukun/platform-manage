/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component} from 'react'
import classnames from 'classnames'
import {events} from 'dom-helpers'

export default class Settings extends Component {
    constructor(props) {
        super(props)
        this.handleWindowClick = this.handleWindowClick.bind(this)
        this.handleContainerClick = this.handleContainerClick.bind(this)
        this.state = {active: false}
    }

    open() {
        this.flag = true
        this.setState({active: true})
    }

    handleWindowClick() {
        if (this.flag) {
            this.flag = false
        } else {
            this.setState({active: false})
        }
    }

    handleContainerClick(event) {
        event.stopPropagation()
    }

    componentDidMount() {
        events.on(document, 'click', this.handleWindowClick)
        events.on(this._container, 'click', this.handleContainerClick)
    }

    componentWillUnmount() {
        events.off(document, 'click', this.handleWindowClick)
        events.off(this._container, 'click', this.handleContainerClick)
    }

    render() {
        return (
            <div ref={c=>this._container = c} className={classnames('settings', 'panel', 'panel-default', {'active': this.state.active})}>
                <div className="panel-heading">
                    设置
                </div>
                <div className="panel-body">
                    <div className="m-b-sm">
                        <label className="i-switch bg-info pull-right">
                            <input type="checkbox" data-ng-model="app.settings.headerFixed"/>
                            <i></i>
                        </label>
                        固定头部
                    </div>
                    <div className="m-b-sm">
                        <label className="i-switch bg-info pull-right">
                            <input type="checkbox" data-ng-model="app.settings.asideFixed"/>
                            <i></i>
                        </label>
                        固定导航
                    </div>
                    <div className="m-b-sm">
                        <label className="i-switch bg-info pull-right">
                            <input type="checkbox" data-ng-model="app.settings.asideFolded"/>
                            <i></i>
                        </label>
                        折叠导航
                    </div>
                </div>

                <div className="wrapper b-t b-light bg-light lter r-b">
                    <div className="row row-sm">
                        <div className="col-xs-6">
                            <label className="i-checks block m-b" data-ng-click="">
                                <input type="radio" name="a" data-ng-model="app.settings.themeID" value="1"/>
                                <span className="block bg-light clearfix pos-rlt">
                                    <span className="active pos-abt w-full h-full bg-black-opacity text-center">
                                      <i className="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                    </span>
                                    <b className="bg-black header"></b>
                                    <b className="bg-white header"></b>
                                    <b className="bg-black"></b>
                                </span>
                            </label>

                            <label className="i-checks block m-b" data-ng-click="">
                                <input type="radio" name="a" data-ng-model="app.settings.themeID" value="13"/>
                                <span className="block bg-light clearfix pos-rlt">
                                    <span className="active pos-abt w-full h-full bg-black-opacity text-center">
                                      <i className="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                    </span>
                                    <b className="bg-dark header"></b>
                                    <b className="bg-white header"></b>
                                    <b className="bg-dark"></b>
                                </span>
                            </label>

                            <label className="i-checks block m-b" data-ng-click="">
                                <input type="radio" data-ng-model="app.settings.themeID" value="2"/>
                                <span className="block bg-light clearfix pos-rlt">
                                    <span className="active pos-abt w-full h-full bg-black-opacity text-center">
                                      <i className="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                    </span>
                                    <b className="bg-white header"></b>
                                    <b className="bg-white header"></b>
                                    <b className="bg-black"></b>
                                  </span>
                            </label>

                            <label className="i-checks block m-b" data-ng-click="">
                                <input type="radio" data-ng-model="app.settings.themeID" value="3"/>
                                <span className="block bg-light clearfix pos-rlt">
                                    <span className="active pos-abt w-full h-full bg-black-opacity text-center">
                                      <i className="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                    </span>
                                    <b className="bg-primary header"></b>
                                    <b className="bg-white header"></b>
                                    <b className="bg-dark"></b>
                                  </span>
                            </label>

                            <label className="i-checks block m-b" data-ng-click="">
                                <input type="radio" data-ng-model="app.settings.themeID" value="4"/>
                                <span className="block bg-light clearfix pos-rlt">
                                    <span className="active pos-abt w-full h-full bg-black-opacity text-center">
                                      <i className="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                    </span>
                                    <b className="bg-info header"></b>
                                    <b className="bg-white header"></b>
                                    <b className="bg-black"></b>
                                  </span>
                            </label>

                            <label className="i-checks block m-b" data-ng-click="">
                                <input type="radio" data-ng-model="app.settings.themeID" value="5"/>
                                <span className="block bg-light clearfix pos-rlt">
                                    <span className="active pos-abt w-full h-full bg-black-opacity text-center">
                                      <i className="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                    </span>
                                    <b className="bg-success header"></b>
                                    <b className="bg-white header"></b>
                                    <b className="bg-dark"></b>
                                  </span>
                            </label>

                            <label className="i-checks block" data-ng-click="">
                                <input type="radio" data-ng-model="app.settings.themeID" value="6"/>
                                <span className="block bg-light clearfix pos-rlt">
                                    <span className="active pos-abt w-full h-full bg-black-opacity text-center">
                                      <i className="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                    </span>
                                    <b className="bg-danger header"></b>
                                    <b className="bg-white header"></b>
                                    <b className="bg-dark"></b>
                                  </span>
                            </label>
                        </div>
                        <div className="col-xs-6">
                            <label className="i-checks block m-b" data-ng-click="">
                                <input type="radio" data-ng-model="app.settings.themeID" value="7"/>
                                <span className="block bg-light clearfix pos-rlt">
                                    <span className="active pos-abt w-full h-full bg-black-opacity text-center">
                                      <i className="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                    </span>
                                    <b className="bg-black header"></b>
                                    <b className="bg-black header"></b>
                                    <b className="bg-white"></b>
                                  </span>
                            </label>

                            <label className="i-checks block m-b" data-ng-click="">
                                <input type="radio" name="a" data-ng-model="app.settings.themeID" value="14"/>
                                <span className="block bg-light clearfix pos-rlt">
                                    <span className="active pos-abt w-full h-full bg-black-opacity text-center">
                                      <i className="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                    </span>
                                    <b className="bg-dark header"></b>
                                    <b className="bg-dark header"></b>
                                    <b className="bg-light"></b>
                                  </span>
                            </label>

                            <label className="i-checks block m-b" data-ng-click="">
                                <input type="radio" data-ng-model="app.settings.themeID" value="8"/>
                                <span className="block bg-light clearfix pos-rlt">
                                <span className="active pos-abt w-full h-full bg-black-opacity text-center">
                                  <i className="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                </span>
                                <b className="bg-info dker header"></b>
                                <b className="bg-info dker header"></b>
                                <b className="bg-light dker"></b>
                              </span>
                            </label>

                            <label className="i-checks block m-b" data-ng-click="">
                                <input type="radio" data-ng-model="app.settings.themeID" value="9"/>
                                <span className="block bg-light clearfix pos-rlt">
                                <span className="active pos-abt w-full h-full bg-black-opacity text-center">
                                  <i className="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                </span>
                                <b className="bg-primary header"></b>
                                <b className="bg-primary header"></b>
                                <b className="bg-dark"></b>
                              </span>
                            </label>

                            <label className="i-checks block m-b" data-ng-click="">
                                <input type="radio" data-ng-model="app.settings.themeID" value="10"/>
                                <span className="block bg-light clearfix pos-rlt">
                                <span className="active pos-abt w-full h-full bg-black-opacity text-center">
                                  <i className="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                </span>
                                <b className="bg-info dker header"></b>
                                <b className="bg-info dk header"></b>
                                <b className="bg-black"></b>
                              </span>
                            </label>

                            <label className="i-checks block m-b" data-ng-click="">
                                <input type="radio" data-ng-model="app.settings.themeID" value="11"/>
                                <span className="block bg-light clearfix pos-rlt">
                                <span className="active pos-abt w-full h-full bg-black-opacity text-center">
                                  <i className="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                </span>
                                <b className="bg-success header"></b>
                                <b className="bg-success header"></b>
                                <b className="bg-dark"></b>
                              </span>
                            </label>

                            <label className="i-checks block" data-ng-click="">
                                <input type="radio" data-ng-model="app.settings.themeID" value="12"/>
                                <span className="block bg-light clearfix pos-rlt">
                                    <span className="active pos-abt w-full h-full bg-black-opacity text-center">
                                      <i className="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                    </span>
                                    <b className="bg-danger dker header"></b>
                                    <b className="bg-danger dker header"></b>
                                    <b className="bg-dark"></b>
                                  </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

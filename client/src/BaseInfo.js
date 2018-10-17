import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import sr from './ScrollReveal'
import Icon from './images/icon.jpg'
import Facebook from './images/facebook_logo.png'
import Github from './images/github_logo.png'
import './BaseInfo.css'

export default class BaseInfo extends Component {
	componentDidMount() {
    const config = {
      origin: 'left',
      duration: 1000,
      delay: 150,
      distance: '50px',
      scale: 1,
      easing: 'ease',
    }
    sr.reveal(this.refs.logo, config)
  }

  constructor(props) {
    super(props)
    this.state = {
      style: {
        display: "none"
      },
      changeCard: {
      	height: 500,
      },
      state: false,
      text: "Show Detail",
    }
  }

  handleExpandClick() {
    this.setState((previousState, currentprops) => { if(this.state.state === false) return {style: { display: "block"}, changeCard: { height: 540}, state: true, text: "Close Detail"}
                    else return {style: {display: "none"}, changeCard: { height: 250}, state: false, text: "Show Detail"} });
  }

  render() {
  	return (
      <div className="card">
    		<Card className="base-info">
        	<div className="card-base">
            <CardContent>
              <Avatar src={Icon} className="user-icon" refs="logo"/>
            </CardContent>
            <CardContent>
            	<div className="baseInfo">
                <div className="university">
                  <Typography color="textSecondary">
                  	{this.props.university}
                  </Typography>
                  <Typography color="textSecondary">
                    {this.props.department}
                  </Typography>
                  <Typography color="textSecondary">
                    {this.props.subject}
                  </Typography>
                  <Typography color="textSecondary">
                    {this.props.graduate_year}卒
                  </Typography>
                </div>
                <div className="my-name">
                  <Typography variant="headline">
                    {this.props.name}
                  </Typography>
                  <Typography color="textSecondary">
                    {this.props.furigana}
                  </Typography>
                </div>
                <br/>
                <div className="access">
                  <Typography color="textSecondary">
                    Email: {this.props.email}
                  </Typography>
                  <Typography color="textSecondary">
                    Tel: {this.props.tel}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
        <div className="card-logo" ref="logo">
          <a href="https://www.facebook.com/M01tyan">
            <img src={Facebook} alt="facebook" className="logo-facebook" />
          </a>
          <a href="https://github.com/M01tyan">
            <img src={Github} alt="github" className="logo-github" />
          </a>
        </div>
      </div>
  	)
  }
}
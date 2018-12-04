import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import Avatar from '@material-ui/core/Avatar'
import sr from './ScrollReveal'
import axios from 'axios'
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

    const path = window.location.pathname
    const paths = path.split("/")
    axios
      .get("https://find-me-apiserver.herokuapp.com/api/users/"+paths[1]+"/"+paths[2]+"/edits/base", {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(results => {
        const message = results.data
        if(message.sites === null) message.sites = []
        this.setState({base: message})
        axios
          .get("https://find-me-apiserver.herokuapp.com/api/users/"+paths[1]+"/"+paths[2]+"/edits/icon", {
            headers: {
              'Content-Type': 'application/json',
            }
          })
          .then(results => {
            if(String(results.data) !== "") {
              let img = "data:image/png;base64,"+String(results.data)
              this.setState({icon: img})
            } else {
              console.log("NOT ICON")
              this.setState({icon: 'https://raw.githubusercontent.com/M01tyan/Find_me_Golang/master/client/src/images/sample_icon.png'})
            }
          })
      })
  }

  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      base: {
        sites: [],
      },
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
  	return (
      <div className="base-info">
    		<Card className="base-info-card">
          <CardContent>
            <Avatar src={this.state.icon} className="base-info-user-icon" refs="logo"/>
          </CardContent>
        	<div className="base-info-card-base">
            <CardContent>
            	<div className="base-info-card-content">
                <div className="base-info-university">
                  <Typography color="textSecondary" className="base-info-university-name">
                  	{this.state.base.university}
                  </Typography>
                  <Typography color="textSecondary">
                    {this.state.base.department}
                  </Typography>
                  <Typography color="textSecondary">
                    {this.state.base.subject}
                  </Typography>
                </div>
                <div className="base-info-user-name">
                  <Typography color="textSecondary">
                    {this.state.base.graduate}卒
                  </Typography>
                  <Typography variant="headline">
                    {this.state.base.name}
                  </Typography>
                  <Typography color="textSecondary">
                    {this.state.base.furigana}
                  </Typography>
                </div>
                <br/>
              </div>
            </CardContent>
            <CardActions className="base-info-links">
              <IconButton
                aria-owns={open ? 'fade-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleClose}
                TransitionComponent={Fade}
              >
                {this.state.base.sites.map((link, i) => (
                  <MenuItem onClick={this.handleClose} key={i}><a href={link.url}>{link.url_title}</a></MenuItem>
                ))}
              </Menu>
            </CardActions>
          </div>
        </Card>
      </div>
  	)
  }
}
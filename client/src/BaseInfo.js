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
import MenuList from '@material-ui/core/MenuList'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import sr from './ScrollReveal'
import Icon from './images/icon.jpg'
import Facebook from './images/facebook_logo.png'
import Github from './images/github_logo.png'
import Twitter from './images/twitter_logo.png'
import Other from './images/other_site.png'
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
      anchorEl: null,
      links: [
        {
          title: 'Facebook',
          image: Facebook,
          link: 'https://www.facebook.com/M01tyan',
        },
        {
          title: 'Github',
          image: Github,
          link: 'https://github.com/M01tyan'
        },
        {
          title: 'Find me!',
          image: Other,
          link: 'https://find-me-site.herokuapp.com/'
        },
      ],
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
            <Avatar src={Icon} className="base-info-user-icon" refs="logo"/>
          </CardContent>
        	<div className="base-info-card-base">
            <CardContent>
            	<div className="base-info-card-content">
                <div className="base-info-university">
                  <Typography color="textSecondary" className="base-info-university-name">
                  	{this.props.university}
                  </Typography>
                  <Typography color="textSecondary">
                    {this.props.department}
                  </Typography>
                  <Typography color="textSecondary">
                    {this.props.subject}
                  </Typography>
                </div>
                <div className="base-info-user-name">
                  <Typography color="textSecondary">
                    {this.props.graduate_year}卒
                  </Typography>
                  <Typography variant="headline">
                    {this.props.name}
                  </Typography>
                  <Typography color="textSecondary">
                    {this.props.furigana}
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
                <MenuList>
                  {this.state.links.map((link, i) => (
                    <a href={link.link} key={i}>
                      <MenuItem>
                        <ListItemIcon>
                          <img src={link.image} alt={link.title} className="base-info-links-logo" />
                        </ListItemIcon>
                        <ListItemText inset primary={link.title} />
                      </MenuItem>
                    </a>
                  ))}
                </MenuList>
              </Menu>
            </CardActions>
          </div>
        </Card>
      </div>
  	)
  }
}
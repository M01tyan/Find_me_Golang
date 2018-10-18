import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Checkbox from '@material-ui/core/Checkbox'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Badge from '@material-ui/core/Badge'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Aizulogo from './images/logo2g.jpg'
import Monaca from './images/monaca.jpg'
import Nifty from './images/mobile_backend.jpeg'
import Onsen from './images/onsen_ui.png'
import Js from './images/JavaScript-logo.png'
import './TodoCard.css'

export default class TodoCardItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        { 
          title: "会津大学アプリケーション",
          links: [
            { 
              title: "Github",
              url: "https://github.com/M01tyan/U-Aizu",
            },
          ],
          images: [Aizulogo, Monaca, Nifty, Onsen, Js],
          detail: "会津大学の施設利用状況を直感的に認識できるアプリケーション",
          motivation: "現在利用できる教室の利用状況がわかりにくので、スマホでいつでも確認できる物が欲しいと思った",
          technologies: ["HTML5", "CSS3", "JavaScript", "Monaca", "Nifty Cloud", "Js"],
          period: "3ヶ月",
          member: "１人",
          favorite: 0,
        },
        { 
          title: "OGCとのIoTプロジェクト",
          links: [
            { 
              title: "Github",
              url: "https://github.com/M01tyan/Pepper",
            },
          ],
          images: [Aizulogo, Monaca, Nifty, Onsen, Js],
          detail: "ロボットのIoT化を促進する活動でMQTTSなどでバックエンド開発を体験することができた。",
          motivation: "IoTに興味があり、何かIoTに活動を行いたいと思っていた時に大学の課外活動に参加した際にPepperのソフトウェア開発者を探しており、良い機会だと思い参加しました。",
          technologies: ["Python", "MQTTS", "Pepper", "Choregraphe"],
          period: "6ヶ月",
          member: "TIS株式会社、会津大学4名",
          favorite: 0,
        },
      ],
    }
  }

  render() {
    return (
      <div className="todo-card-items">
        <h2 className="title">これまでの制作物</h2>
        <div className="todo-card-items-item">
          {this.state.items.map((item, i) => (
            <TodoCard item={item} key={i} />
          ))}
        </div>
      </div>
    )
  }
}

class TodoCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      anchorEl: null,
      item: this.props.item,
    }
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded})
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  favoriteAdd = () => {
    this.setState( prevState => ({
      item: {
          ...prevState.item,
          favorite: this.state.item.favorite + 1
      }
    }))
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className="todo-card">
        <Card className="todo-card-card">
          <CardHeader
            action={
              <div>
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
                  {this.state.item.links.map((link, i) => (
                    <MenuItem onClick={this.handleClose}><a href={link.url} key={i}>{link.url}</a></MenuItem>
                  ))}
                </Menu>
              </div>
            }
            title={this.state.item.title}
            subheader="December, 2016 ~ May, 2018"
          />
          <div className="todo-card-media">
            <GridList cols={1.0} className="todo-card-media-gridList">
              {this.state.item.images.map(image => (
                <GridListTile key={image}>
                  <img src={image} alt="image" />
                </GridListTile>
              ))}
            </GridList>
          </div>
          <CardContent>
            <Typography component="p">
              {this.state.item.detail}
            </Typography>
          </CardContent>
          <CardActions className="todo-card-actions" disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <Badge badgeContent={this.state.item.favorite} color="primary">
                <FormControlLabel
                  control={
                    <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={this.favoriteAdd} value="checkedH" />
                  }
                />
              </Badge>
            </IconButton>
            <IconButton
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <h2 paragraph>タイトル</h2>
              <Typography paragraph>
                {this.state.item.title}
              </Typography>
              <h3 paragraph>詳細</h3>
              <Typography paragraph>
                {this.state.item.detail}
              </Typography>
              <h3 paragraph>使用技術</h3>
              <Typography paragraph>
                <ul className="todo-card-tech">
                  {this.state.item.technologies.map(tech => (
                    <li className="todo-card-tech-item">tech</li>
                  ))}
                </ul>
              </Typography>
              <h3 paragraph>開発期間</h3>
              <Typography>
                {this.state.item.period}
              </Typography>
              <h3 paragraph>開発人数</h3>
              <Typography>
                {this.state.item.member}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    )
  }
}
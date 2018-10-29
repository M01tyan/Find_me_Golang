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
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Aizulogo from './images/logo2g.jpg'
import Monaca from './images/monaca.jpg'
import Nifty from './images/mobile_backend.jpeg'
import Onsen from './images/onsen_ui.png'
import Js from './images/JavaScript-logo.png'
import './TodoCard.css'


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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
          technologies: ["HTML5", "CSS3", "JavaScript", "Monaca", "Nifty Cloud"],
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
        {
          title: "TechMate ~LINE Bot~",
          links: [
            {
              title: "Github",
              url: "https://github.com/M01tyan/TechMate/",
            },
          ],
          images: [Aizulogo, Monaca, Nifty, Onsen, Js],
          detail: "大学内で同じ技術を学びたいと思う仲間を繋げる手助けをするLINE Bot。",
          motivation: "大学のハッカソンに参加し、普段個人での開発ばかりで大学内にはどんな技術を学んでいる人がいるのかわからず、同じ技術を学びたいと思っていたり、仲間が欲しいと思う人のきっかけづくりを作ってあげたいと思い作成しました。",
          technologies: ["LINE Messaging API", "Go言語", "PostgreSQL", "Heroku"],
          period: "4日間",
          member: "３人",
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
            <TodoCard item={item} key={item.title} />
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
      activeStep: 0,
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
  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { activeStep } = this.state
    const maxSteps = this.state.item.images.length
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
                    <MenuItem onClick={this.handleClose} key={i}><a href={link.url}>{link.title}</a></MenuItem>
                  ))}
                </Menu>
              </div>
            }
            title={this.state.item.title}
            subheader="December, 2016 ~ May, 2018"
          />
          <div className="todo-card-media">
            <AutoPlaySwipeableViews
              index={activeStep}
              onChangeIndex={this.handleStepChange}
              enableMouseEvents
            >
              {this.state.item.images.map((step, index) => (
                <div key={index}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <img className="todo-card-media-img" src={step} alt={step} />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              style={{width: '90%'}}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                  Back
                  <KeyboardArrowLeft />
                </Button>
              }
            />
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
              <h3>タイトル</h3>
              <Typography variant="h5">
                {this.state.item.title}
              </Typography>
              <h3 >動機</h3>
              <Typography>
                {this.state.item.motivation}
              </Typography>
              <h3>使用技術</h3>
              <ul className="todo-card-tech">
                {this.state.item.technologies.map((tech, i) => (
                  <li className="todo-card-tech-item" key={i}>{tech}</li>
                ))}
              </ul>
              <h3>開発期間</h3>
              <Typography>
                {this.state.item.period}
              </Typography>
              <h3>開発人数</h3>
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
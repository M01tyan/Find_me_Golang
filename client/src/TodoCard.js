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
import axios from 'axios'
import Sample from './images/Find_me_logo.png'
import './TodoCard.css'


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default class TodoCardItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
  }
  componentDidMount() {
    const path = window.location.pathname
    const paths = path.split("/")
    axios
      .get("https://find-me-apiserver.herokuapp.com/api/users/"+paths[1]+"/"+paths[2]+"/edits/todos", {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(results => {
        const message = results.data
        if(message === null) this.setState({items: []})
        else this.setState({items: message})
      })
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
  componentWillMount() {
    let { item } = this.state
    if(this.state.item.sites === null) item.sites = []
    if(this.state.item.images === null) {
      item.images = []
      item.images.push(Sample)
    } 
    this.setState({item: item})
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
    //const maxSteps = this.state.item.images.length
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
                  {this.state.item.sites.map((link, i) => (
                    <MenuItem onClick={this.handleClose} key={i}><a href={link.url}>{link.url_title}</a></MenuItem>
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
              steps={this.state.item.img_num}
              position="static"
              activeStep={activeStep}
              style={{width: '90%'}}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={activeStep === this.state.item.img_num - 1}>
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
              <Badge badgeContent={this.state.item.liked} color="primary">
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
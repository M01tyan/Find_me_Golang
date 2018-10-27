import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Avatar from '@material-ui/core/Avatar'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Sample from './images/sample_icon.png'
import './Edits.css'

export default class Edits extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    }
  }
  handleChange = (event, value) => {
    this.setState({ value: value })
  }
  render() {
    const { value } = this.state;
    return (
      <div className="edits">
        <h2 className="title">編集フォーム</h2>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} scrollable scrollButtons="auto">
            <Tab label="基本情報" />
            <Tab label="これまでの制作物" />
            <Tab label="プログラミングレベル" />
            <Tab label="これまでの経歴" />
            <Tab label="キャリア" />
            <Tab label="自己PR" />
          </Tabs>
        </AppBar>
        { this.state.value === 0 && <BaseEdit /> }
        { this.state.value === 1 && <TodoEdit /> }
        { this.state.value === 2 && <BaseEdit /> }
        { this.state.value === 3 && <BaseEdit /> }
        { this.state.value === 4 && <BaseEdit /> }
        { this.state.value === 5 && <BaseEdit /> }
      </div>
    )
  }
}

class BaseEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      base: {
        name: '',
        furigana: '',
        university: '',
        department: '',
        subject: '',
        liked: '',
        icon: Sample,
        sites: [],
        graduate: '',
        todo_id: '',
        visitor_id: '',
      },
      new_site: {
        url_title: '',
        url: '',
      },
      open: false,
    }
  }

  handleChange = name => event => {
    let base = this.state.base
    base[name] = event.target.value
    this.setState({base: base})
  }
  handleSitesChange = (name, id) => event => {
    let base = this.state.base
    base.sites[id][name] = event.target.value
    this.setState({base: base})
  }
  handleNewSiteChange = name => event => {
    let new_site = this.state.new_site
    new_site[name] = event.target.value
    this.setState({new_site: new_site})
  }
  deleteSite = id => event => {
    let base = this.state.base
    base.sites.splice(id, 1)
    this.setState({base: base})
  }
  handleSubmit = event => {
    //event.preventDefalut();
    console.log("form ok")
    this.handleMessageSubmit({name: this.state.name, furigana: this.state.furigana, university: this.state.university, department: this.state.department, subject: this.state.subject, graduate_year: this.state.graduate_year, email: this.state.email, tel: this.state.tel, github: this.state.github, facebook: this.state.facebook, twitter: this.state.twitter})
    console.log("form success")
  }
  pushNewSite = event => {
    let base = this.state.base
    base.sites.push(this.state.new_site)
    this.setState({base: base})
    this.setState({new_site: { url_title: '', url: ''}})
  }
  handleChangeFile = event => {
    let createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL
    // ①イベントからfileの配列を受け取る
    let files = event.target.files

    // ②createObjectURLで、files[0]を読み込む
    let image_url = createObjectURL(files[0])
    let base = this.state.base
    base.icon = image_url
    // ③setStateする！
    this.setState({base: base});

  }
  onKeyPress = event => {
    if (event.charCode === 13) { // enter key pressed
      // do something here
      event.preventDefault();
      this.pushNewSite()
    } 
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }
  handleMessageSubmit = () => {
    this.setState({ open: false });
    console.log(this.state.base)
    /*
    $.ajax({
        url: "/bases/1",
        dataType: 'json',
        type: 'PATCH',
        data: message,
        success: function(message) {
          window.location.href = '/'
        }.bind(this),
        error: function(_xhr, status, err) {
          console.error(this.props.url, status, err.toString())
        }.bind(this)
      })
    */
  }
  componentDidMount() {
    /*
    axios
      .get("http://localhost:8000/api/users", {
        headers: {
          'Content-Type': 'application/json',
      }})
      .then(results => {
        const message = results.data
        this.setState({ base: message })
      })
      */
  }
  
  render() {
    return (
      <div className="edit">
        <div className="edit-form">
          <div className="edit-form-base">
            <TextField
              required
              id="standard-required"
              label="Name(名前)"
              className="edit-form-text-field"
              type="search"
              value={this.state.base.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
            
            <TextField
              id="standard-normal"
              label="Furigana(ふりがな)"
              className="edit-form-text-field"
              type="search"
              value={this.state.base.furigana}
              onChange={this.handleChange('furigana')}
              margin="normal"
            />
            <TextField
              required
              id="standard-required"
              label="University(大学)"
              type="search"
              value={this.state.base.university}
              onChange={this.handleChange('university')}
              className="edit-form-text-field"
              margin="normal"
            />
            <TextField
              required
              id="standard-required"
              label="Department(学部)"
              type="search"
              value={this.state.base.department}
              onChange={this.handleChange('department')}
              className="edit-form-text-field"
              margin="normal"
            />
            <TextField
              required
              id="standard-required"
              label="subject(学科)"
              type="search"
              value={this.state.base.subject}
              onChange={this.handleChange('subject')}
              className="edit-form-text-field"
              margin="normal"
            />
            <TextField
              required
              id="standard-required"
              label="Graduate Year(卒業年度)"
              type="search"
              value={this.state.base.graduate}
              onChange={this.handleChange('graduate')}
              className="edit-form-text-field"
              margin="normal"
            />
          </div>
          <div className="edit-form-sites">
            {this.state.base.sites.map((site, i) => (
              <div className="edit-form-site" key={i}>
                <TextField
                  id="standard-required"
                  label="Site Title"
                  type="search"
                  value={site.url_title}
                  onChange={this.handleSitesChange('url_title', i)}
                  className="edit-form-url-title"
                  margin="normal"
                />
                <TextField
                  id="standard-required"
                  label="Site URL"
                  type="search"
                  placeholder="https://www.facebook.com/"
                  value={site.url}
                  fullWidth
                  onChange={this.handleSitesChange('url', i)}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <IconButton aria-label="Delete" onClick={this.deleteSite(i)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
            <div className="edit-form-site">
              <TextField
                id="standard-required"
                label="New Site Title"
                type="search"
                value={this.state.new_site.url_title}
                onChange={this.handleNewSiteChange('url_title')}
                className="edit-form-url-title"
                margin="normal"
              />
              <TextField
                id="standard-required"
                label="New Site URL"
                type="search"
                placeholder="https://www.facebook.com/"
                value={this.state.new_site.url}
                fullWidth
                onChange={this.handleNewSiteChange('url')}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onKeyPress={this.onKeyPress}
              />
            </div>
          </div>
          <div className="edit-form-post-button">
            <h3 className="edit-form-icon-title">Icon</h3>
            <Button variant="contained" color="default" onChange={this.handleChangeFile} >
              <input type="file" className="edit-form-icon-input" />
                Upload
                <CloudUploadIcon />
            </Button>
            <Avatar src={this.state.base.icon} className="edit-form-icon-img" />
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
              POST
            </Button>
          </div>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">更新しますか？</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleMessageSubmit} key="agree" color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

class TodoEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [
        {
          title: '',
          sites: [{url_title: '', url: '',},],
          comment: '',
          motivation: '',
          liked: '',
          technologies: [],
          images: [],
          period: '',
          member: '',
        },
      ],
      new_todo: [
        {
          title: '',
          sites: [{url_title: '', url: '',},],
          comment: '',
          motivation: '',
          liked: '',
          technologies: [],
          images: [],
          period: '',
          member: '',
        },
      ],
      tech: '',
      open: false,
      delete: {
        i: '',
        j: '',
      },
    }
  }
  handleChange = (name, id) => event => {
    let todos = this.state.todos
    todos[id][name] = event.target.value
    this.setState({todos: todos})
  }
  handleTechChange = event => {
    this.setState({tech: event.target.value})
  }
  onKeyPress = (id) => event => {
    if (event.charCode === 13) { // enter key pressed
      // do something here
      event.preventDefault();
      let todos = this.state.todos
      todos[id].technologies.push(event.target.value)
      this.setState({todos: todos})
      this.setState({tech: ''})
      console.log(this.state.todos[0].technologies)
    } 
  }
  handleChangeFile = (id) => event => {
    let createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL
    // ①イベントからfileの配列を受け取る
    let files = event.target.files

    // ②createObjectURLで、files[0]を読み込む
    if(files[0] != null) {
      let image_url = createObjectURL(files[0])
      let todos = this.state.todos
      todos[id].images.push(image_url)
      // ③setStateする！
      this.setState({todos: todos})
    }
  }
  deleteTechs = (i, j) => event => {
    let todos = this.state.todos
    todos[i].technologies.splice(j, 1)
    this.setState({todos: todos})
  }
  deleteImages = event => {
    let todos = this.state.todos
    console.log(todos[this.state.delete.i].images)
    todos[this.state.delete.i].images.splice(this.state.delete.j, 1)
    this.setState({todos: todos})
    this.setState({ open: false })
  }
  deleteState = (i, j) => event => {
    let delete_ij = this.state.delete
    delete_ij.i = i
    delete_ij.j = j
    this.setState({delete: delete_ij})
    this.setState({ open: true })
  }
  handleClickOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  handleMessageSubmit = () => {
    console.log(this.state.todos)
  }
  render() {
    return (
      <div className="edit">
        <div className="edit-form">
          <div className="edit-form-todo">
            {this.state.todos.map((todo, i) => (
              <Card key={i} className="edit-form-todo-card">
                <CardContent className="edit-form-todo-card-content">
                  <TextField
                    required
                    id="outlined-required"
                    label="Title(タイトル)"
                    type="search"
                    value={todo.title}
                    onChange={this.handleChange('title', i)}
                    className="edit-form-todo-card-text-field"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    required
                    id="outlined-multiline-static"
                    label="Detail(詳細)"
                    rows="4"
                    multiline
                    value={todo.comment}
                    onChange={this.handleChange('comment', i)}
                    className="edit-form-todo-card-text-field"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    required
                    id="outlined-multiline-static"
                    label="Motivation(動機)"
                    rows="4"
                    multiline
                    value={todo.motivation}
                    onChange={this.handleChange('motivation', i)}
                    className="edit-form-todo-card-text-field"
                    margin="normal"
                    variant="outlined"
                  />{/*
                    <ul>
                      <div className="edit-form-todo-card-tech">
                        {todo.technologies.map((tech, k) => (
                          <li className="edit-form-todo-card-tech-item" key={k}>{tech}</li>
                        ))}
                      </div>
                    </ul>
                  */}
                    <ExpansionPanel className="edit-form-todo-card-tech">
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <h3 className="edit-form-icon-title">開発技術一覧</h3>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <List className="edit-form-todo-card-tech-items">
                          {todo.technologies.map((tech, j) => {
                            return (
                              <ListItem className="edit-form-todo-card-tech-item" key={j}>
                                <ListItemText primary={tech} />
                                <IconButton aria-label="Delete" onClick={this.deleteTechs(i, j)}>
                                  <DeleteIcon />
                                </IconButton>
                              </ListItem>
                            )
                          })}
                        </List>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <TextField
                      required
                      id="outlined-multiline-static"
                      label="Add Technology(開発技術の追加)"
                      value={this.state.tech}
                      onChange={this.handleTechChange}
                      className="edit-form-todo-card-text-field"
                      margin="normal"
                      variant="outlined"
                      onKeyPress={this.onKeyPress(i)}
                    />
                  <TextField
                    required
                    id="outlined-required"
                    label="Period(開発期間)"
                    type="search"
                    value={todo.period}
                    onChange={this.handleChange('period', i)}
                    className="edit-form-todo-card-text-field"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Member(開発メンバー・人数)"
                    type="search"
                    value={todo.member}
                    onChange={this.handleChange('member', i)}
                    className="edit-form-todo-card-text-field"
                    margin="normal"
                    variant="outlined"
                  />
                </CardContent>
                <CardContent className="edit-form-todo-card-img">
                  <h3 className="edit-form-icon-title">Image</h3>
                  <GridList cellHeight={180} className="edit-form-todo-card-grid">
                    {todo.images.map((image, j) => (
                      <GridListTile style={{height: 158, width: 256}} key={j}>
                        <img src={image} alt={j} style={{height: 158, width: 256, objectFit: 'cover'}}/>
                        <IconButton aria-label="Delete" color="secondary" className="edit-form-todo-card-grid-delete" onClick={this.deleteState(i, j)} >
                          <DeleteIcon />
                        </IconButton>
                        <Dialog
                          open={this.state.open}
                          onClose={this.handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">本当に削除していいですか？</DialogTitle>
                          <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                              Disagree
                            </Button>
                            <Button onClick={this.deleteImages} color="primary" autoFocus>
                              Agree
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </GridListTile>
                    ))}
                    <GridListTile style={{height: 158, width: 256}}>
                      <Button variant="contained" className="edit-form-todo-card-grid-new" color="default" onChange={this.handleChangeFile(i)} >
                        <input type="file" className="edit-form-icon-input edit-form-todo-card-grid-new" />
                        Upload
                        <CloudUploadIcon />
                      </Button>
                    </GridListTile>
                  </GridList>
                  <Button variant="outlined" color="primary" onClick={this.handleMessageSubmit}>
                    POST
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

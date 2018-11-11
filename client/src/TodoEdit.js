import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
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
import {UploadButton} from './Edits'
import './Edits.css'


/*Todo一覧編集フォーム*/
export default class TodoEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [
        {
          title: '',
          detail: '',
          motivation: '',
          sites: [],
          technologies: [],
          images: [],
          period: '',
          member: '',
          liked: 0,
        }
      ],
      new_todo: {
        id: 0,
        title: '',
        detail: '',
        motivation: '',
        sites: [],
        technologies: [],
        images: [],
        period: '',
        member: '',
        liked: 0,
      },
      tech: '',
      open: false,
      delete: {
        i: '',
        j: '',
      },
    }
  }
  componentDidMount() {
    const path = window.location.pathname
    const paths = path.split("/")
    axios
      .get("http://localhost:8000/api/users/"+paths[1]+"/"+paths[2]+"/edits/todos", {
        headers: {
          'Content-Type': 'application/json',
      }})
      .then(results => {
        let message = results.data
        if(message === null) message = []
        this.setState({todos: message})
      })
  }
  deleteTodo = (i) => event => {
    let todos = this.state.todos
    todos.splice(i, 1)
    this.setState({todos: todos})
    console.log(todos)
  }
  handleNewTodo = (new_todo) => {
    let todos = this.state.todos
    todos.push(new_todo)
    this.setState({todos: todos})
  }
  render() {
    return (
      <div className="edit">
        <div className="edit-form">
          <div className="edit-form-todo">
            {this.state.todos.map((todo, i) => (
              <div key={i}>
                <TodoEditItem todo={todo} handleNewTodo={console.log("UPDATE")}/>
                <DeleteTodo id={todo.id} deleteTodo={this.deleteTodo(i)} />
              </div>
            ))}
            <TodoEditItem todo={this.state.new_todo} handleNewTodo={this.handleNewTodo} />
          </div>
        </div>
      </div>
    )
  }
}





class TodoEditItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todo: this.props.todo,
      new_site: {
        url_title: '',
        url: '',
      },
      tech: '',
      open: false,
      delete_i: '',
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({todo: nextProps.todo})
  }
  handleChange = name => event => {
    let todo = this.state.todo
    todo[name] = event.target.value
    this.setState({todo: todo})
  }
  handleTechChange = event => {
    this.setState({tech: event.target.value})
  }
  handleSitesChange = (name, i) => event => {
    let todo = this.state.todo
    todo.sites[i][name] = event.target.value
    console.log(todo.sites[i][name])
    this.setState({todo: todo})
  }
  handleNewSiteChange = name => event => {
    let new_site = this.state.new_site
    new_site[name] = event.target.value
    this.setState({new_site: new_site})
  }
  AddSite = event => {
    let todo = this.state.todo
    todo.sites.push(this.state.new_site)
    this.setState({todo: todo})
    this.setState({new_site: {url_title: '', url: ''}})
  }
  AddTech = event => {
    let todo = this.state.todo
    todo.technologies.push(this.state.tech)
    this.setState({todo: todo})
    this.setState({tech: ''})
  }
  handleChangeFile = event => {
    let createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL
    // ①イベントからfileの配列を受け取る
    let files = event.target.files

    // ②createObjectURLで、files[0]を読み込む
    if(files[0] != null) {
      let image_url = createObjectURL(files[0])
      let todo = this.state.todo
      todo.images.push(image_url)
      // ③setStateする！
      this.setState({todo: todo})
    }
  }
  deleteTechs = j => event => {
    let todo = this.state.todo
    todo.technologies.splice(j, 1)
    this.setState({todo: todo})
  }
  deleteState = j => event => {
    this.setState({delete_i: j})
    this.setState({ open: true })
  }
  deleteSite = i => event => {
    let todo = this.state.todo
    todo.sites.splice(i, 1)
    this.setState({todo: todo})
  }
  deleteImages = event => {
    let todo = this.state.todo
    todo.images.splice(this.state.delete_i, 1)
    this.setState({ todo: todo })
    this.setState({ open: false })
  }
  handleClickOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  handleMessageSubmit = () => {
    const path = window.location.pathname
    const paths = path.split("/")
    axios
      .post("http://localhost:8000/api/users/"+paths[1]+"/"+paths[2]+"/edits/todos", {
        id: this.state.todo.id,
        title: this.state.todo.title,
        detail: this.state.todo.detail,
        motivation: this.state.todo.motivation,
        sites: this.state.todo.sites,
        technologies: this.state.todo.technologies,
        period: this.state.todo.period,
        member: this.state.todo.member
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(results => {
        const message = results.data
        console.log(message)
        if(message === "true") {
          this.props.handleNewTodo(this.state.todo)
          this.setState({todo: {title: '', detail: '', motivation: '', sites: [], technologies: [], period: '', member: '', images: [], liked:0}})
        }
      })
  }
  render() {
    return (
      <Card className="edit-form-todo-card">
        <div className="edit-form-todo-card-item">
          <CardContent className="edit-form-todo-card-content">
            <TextField
              required
              id="outlined-required"
              label="Title(タイトル)"
              type="search"
              value={this.state.todo.title}
              onChange={this.handleChange('title')}
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
              value={this.state.todo.detail}
              onChange={this.handleChange('detail')}
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
              value={this.state.todo.motivation}
              onChange={this.handleChange('motivation')}
              className="edit-form-todo-card-text-field"
              margin="normal"
              variant="outlined"
            />
              <ExpansionPanel className="edit-form-todo-card-tech">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <h3 className="edit-form-icon-title">開発技術一覧</h3>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <List className="edit-form-todo-card-tech-items">
                    {this.state.todo.technologies.map((tech, j) => {
                      return (
                        <ListItem className="edit-form-todo-card-tech-item" key={j}>
                          <ListItemText primary={tech} />
                          <IconButton aria-label="Delete" onClick={this.deleteTechs(j)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItem>
                      )
                    })}
                  </List>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <div className="edit-form-site edit-form-todo-card-text-field">
                <TextField
                  required
                  id="outlined-multiline-static"
                  label="Add Technology(開発技術の追加)"
                  value={this.state.tech}
                  onChange={this.handleTechChange}
                  className="edit-form-todo-card-tech"
                  margin="normal"
                  variant="outlined"
                />
                <Button variant="outlined" color="primary" onClick={this.AddTech} className="edit-form-site-post">
                  ADD
                </Button>
              </div>
              <div className="edit-form-sites edit-form-todo-card-text-field">
              {this.state.todo.sites.map((site, i) => (
                <div className="edit-form-site" key={i}>
                  <TextField
                    id="outlined-required"
                    label="Site Title"
                    type="search"
                    variant="outlined"
                    value={site.url_title}
                    onChange={this.handleSitesChange('url_title', i)}
                    margin="normal"
                  />
                  <TextField
                    id="outlined-required"
                    label="Site URL"
                    type="search"
                    variant="outlined"
                    placeholder="https://www.facebook.com/"
                    value={site.url}
                    fullWidth
                    onChange={this.handleSitesChange('url', i)}
                    margin="normal"
                  />
                  <IconButton aria-label="Delete" onClick={this.deleteSite(i)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
              <div className="edit-form-site">
                <TextField
                  id="outlined-required"
                  label="Site Title"
                  type="search"
                  variant="outlined"
                  value={this.state.new_site.url_title}
                  onChange={this.handleNewSiteChange('url_title')}
                  margin="normal"
                />
                <TextField
                  id="outlined-required"
                  label="Site URL"
                  type="search"
                  variant="outlined"
                  placeholder="https://www.facebook.com/"
                  value={this.state.new_site.url}
                  fullWidth
                  onChange={this.handleNewSiteChange('url')}
                  margin="normal"
                />
                <Button variant="outlined" color="primary" onClick={this.AddSite} className="edit-form-site-post">
                  ADD
                </Button>
              </div>
            </div>
            <TextField
              required
              id="outlined-required"
              label="Period(開発期間)"
              type="search"
              value={this.state.todo.period}
              onChange={this.handleChange('period')}
              className="edit-form-todo-card-text-field"
              margin="normal"
              variant="outlined"
            />
            <TextField
              required
              id="outlined-required"
              label="Member(開発メンバー・人数)"
              type="search"
              value={this.state.todo.member}
              onChange={this.handleChange('member')}
              className="edit-form-todo-card-text-field"
              margin="normal"
              variant="outlined"
            />
          </CardContent>
          <CardContent className="edit-form-todo-card-img">
            <h3 className="edit-form-icon-title">Image</h3>
            <GridList cellHeight={180} className="edit-form-todo-card-grid">
              {this.state.todo.images.map((image, j) => (
                <GridListTile style={{height: 180, width: 282}} key={j}>
                  <img src={image} alt={j} style={{height: 180, width: 282, objectFit: 'cover'}}/>
                  <IconButton aria-label="Delete" color="secondary" className="edit-form-todo-card-grid-delete" onClick={this.deleteState(j)} >
                    <DeleteIcon />
                  </IconButton>
                  <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">本当に削除していいですか？</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        一度削除すると二度と復元することはできません。
                      </DialogContentText>
                    </DialogContent>
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
              <GridListTile style={{height: 180, width: 282}}>
                <Button variant="contained" className="edit-form-todo-card-grid-new" color="default" onChange={this.handleChangeFile} >
                  <input type="file" className="edit-form-icon-input edit-form-todo-card-grid-new" />
                  Upload
                  <CloudUploadIcon />
                </Button>
              </GridListTile>
            </GridList>
            <div className="edit-form-post-button">
              <Button variant="outlined" color="primary" onClick={this.handleMessageSubmit}>
                POST
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }
}

class DeleteTodo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }
  handleClickOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  deleteTodo = () => {
    const path = window.location.pathname
    const paths = path.split("/")
    console.log(this.props.id)
    axios
      .delete("http://localhost:8000/api/users/"+paths[1]+"/"+paths[2]+"/edits/todos?id="+this.props.id)
      .then(results => {
        this.setState({ open: false })
        this.props.deleteTodo()
      })
  }

  render() {
    return (
      <div className="edit-form-todo-card edit-form-todo-delete">
        <Button variant="contained" color="secondary" onClick={this.handleClickOpen} className="todo-card-delete">
          Delete
          <DeleteIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">本当に削除していいですか？</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              一度削除すると二度と復元することはできません。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.deleteTodo} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

/*NewTodo追加フォーム*/
class NewTodoEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      new_todo: {
        title: '',
        sites: [],
        comment: '',
        motivation: '',
        liked: '',
        technologies: [],
        images: [],
        period: '',
        member: '',
      },
      new_site: {
        url_title: '',
        url: '',
      },
      open: false,
      delete_i: '', 
      tech: '',
    }
  }
  handleChange = (name) => event => {
    let new_todo = this.state.new_todo
    new_todo[name] = event.target.value
    this.setState({new_todo: new_todo})
  }
  handleTechChange = event => {
    this.setState({tech: event.target.value})
  }
  handleSitesChange = (name) => event => {
    let new_site = this.state.new_site
    new_site[name] = event.target.value
    this.setState({new_site: new_site})
  }
  onKeyPress = event => {
    if (event.charCode === 13) {
      event.preventDefault()
      let new_todo = this.state.new_todo
      new_todo.technologies.push(event.target.value)
      this.setState({new_todo: new_todo})
      this.setState({tech: ''})
    }
  }
  onSiteKeyPress = event => {
    if (event.charCode === 13) {
      event.preventDefault()
      let new_todo = this.state.new_todo
      new_todo.sites.push(this.state.new_site)
      this.setState({new_todo: new_todo})
      this.setState({new_site: {url_title: '', url: ''}})
    }
  }
  handleChangeFile = event => {
    let createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL
    // ①イベントからfileの配列を受け取る
    let files = event.target.files

    // ②createObjectURLで、files[0]を読み込む
    if(files[0] != null) {
      let image_url = createObjectURL(files[0])
      let new_todo = this.state.new_todo
      new_todo.images.push(image_url)
      // ③setStateする！
      this.setState({new_todo: new_todo})
    }
  }
  deleteItem = (name, j) => event => {
    let new_todo = this.state.new_todo
    new_todo[name].splice(j, 1)
    this.setState({new_todo: new_todo})
  }
  deleteImages = event => {
    let new_todo = this.state.new_todo
    new_todo.images.splice(this.state.delete_i, 1)
    this.setState({new_todo: new_todo})
    this.setState({ open: false})
  }
  deleteState = (j) => event => {
    this.setState({delete_i: j})
    this.setState({ open: true })
  }
  handleClickOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  handleMessageSubmit = () => {
    this.props.handleNewMessageSubmit(this.state.new_todo)
    this.setState({new_todo: {
                                title: '', 
                                sites: [],
                                comment: '',
                                motivation: '',
                                liked: '',
                                technologies: [],
                                images: [],
                                period: '',
                                member: '',
                              }
    })
  }
  render() {
    return (
      <Card className="edit-form-todo-card">
        <div className="edit-form-todo-card-item">
          <CardContent className="edit-form-todo-card-content">
            <TextField
              required
              id="outlined-required"
              label="Title(タイトル)"
              type="search"
              value={this.state.new_todo.title}
              onChange={this.handleChange('title')}
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
              value={this.state.new_todo.comment}
              onChange={this.handleChange('comment')}
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
              value={this.state.new_todo.motivation}
              onChange={this.handleChange('motivation')}
              className="edit-form-todo-card-text-field"
              margin="normal"
              variant="outlined"
            />
              <ExpansionPanel className="edit-form-todo-card-tech">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <h3 className="edit-form-icon-title">開発技術一覧</h3>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <List className="edit-form-todo-card-tech-items">
                    {this.state.new_todo.technologies.map((tech, j) => {
                      return (
                        <ListItem className="edit-form-todo-card-tech-item" key={j}>
                          <ListItemText primary={tech} />
                          <IconButton aria-label="Delete" onClick={this.deleteItem('technologies', j)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItem>
                      )
                    })}
                  </List>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <TextField
                id="outlined-multiline-static"
                label="Add Technology(開発技術の追加)"
                value={this.state.tech}
                onChange={this.handleTechChange}
                className="edit-form-todo-card-text-field"
                margin="normal"
                variant="outlined"
                onKeyPress={this.onKeyPress}
              />
            <div className="edit-form-sites">
              {this.state.new_todo.sites.map((site, j) => (
                <div className="edit-form-todo-card-text-field edit-form-site" key={j}>
                  <TextField
                    id="outlined-required"
                    label="Site Title"
                    type="search"
                    value={site.url_title}
                    onChange={this.handleSitesChange('url_title')}
                    className="edit-form-todo-card-url-title"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-required"
                    label="Site URL"
                    type="search"
                    placeholder="https://www.facebook.com/"
                    value={site.url}
                    fullWidth
                    onChange={this.handleSitesChange('url')}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                  <IconButton className="edit-form-todo-card-delete" aria-label="Delete" onClick={this.deleteItem('sites', j)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
              <div className="edit-form-todo-card-text-field edit-form-site">
                <TextField
                  id="outlined-required"
                  label="New Site Title"
                  type="search"
                  value={this.state.new_site.url_title}
                  onChange={this.handleSitesChange('url_title')}
                  className="edit-form-todo-card-url-title"
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-required"
                  label="New Site URL"
                  type="search"
                  placeholder="https://www.facebook.com/"
                  value={this.state.new_site.url}
                  fullWidth
                  onChange={this.handleSitesChange('url')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onKeyPress={this.onSiteKeyPress}
                  variant="outlined"
                />
              </div>
            </div>
            <TextField
              required
              id="outlined-required"
              label="Period(開発期間)"
              type="search"
              value={this.state.new_todo.period}
              onChange={this.handleChange('period')}
              className="edit-form-todo-card-text-field"
              margin="normal"
              variant="outlined"
            />
            <TextField
              required
              id="outlined-required"
              label="Member(開発メンバー・人数)"
              type="search"
              value={this.state.new_todo.member}
              onChange={this.handleChange('member')}
              className="edit-form-todo-card-text-field"
              margin="normal"
              variant="outlined"
            />
          </CardContent>
          <CardContent className="edit-form-todo-card-img">
            <h3 className="edit-form-icon-title">Image</h3>
            <GridList cellHeight={180} className="edit-form-todo-card-grid">
              {this.state.new_todo.images.map((image, j) => (
                <GridListTile style={{height: 180, width: 282}} key={j}>
                  <img src={image} alt={j} style={{height: 180, width: 282, objectFit: 'cover'}}/>
                  <IconButton aria-label="Delete" color="secondary" className="edit-form-todo-card-grid-delete" onClick={this.deleteState(j)} >
                    <DeleteIcon />
                  </IconButton>
                  <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">本当に削除していいですか？</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        一度削除すると二度と復元することはできません。
                      </DialogContentText>
                    </DialogContent>
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
              <GridListTile style={{height: 180, width: 282}}>
                <Button variant="contained" className="edit-form-todo-card-grid-new" color="default" onChange={this.handleChangeFile} >
                  <input type="file" className="edit-form-icon-input edit-form-todo-card-grid-new" />
                  Upload
                  <CloudUploadIcon />
                </Button>
              </GridListTile>
            </GridList>
            <UploadButton handleClickOpen={this.handleMessageSubmit} />
          </CardContent>
        </div>
      </Card>
    )
  }
}

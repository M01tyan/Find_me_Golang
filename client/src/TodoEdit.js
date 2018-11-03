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
import './Edits.css'


/*Todo一覧編集フォーム*/
export default class TodoEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
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
    console.log(paths)
    axios
      .get("http://localhost:8000/api/users/"+paths[1]+"/"+paths[2]+"/edits/todos", {
        headers: {
          'Content-Type': 'application/json',
      }})
      .then(results => {
        const message = results.data
        console.log(message)
        this.setState({todos: message})
      })
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
      event.preventDefault()
      let todos = this.state.todos
      todos[id].technologies.push(event.target.value)
      this.setState({todos: todos})
      this.setState({tech: ''})
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
  deleteState = (i, j) => event => {
    let delete_ij = this.state.delete
    delete_ij.i = i
    delete_ij.j = j
    this.setState({delete: delete_ij})
    this.setState({ open: true })
  }
  deleteTodo = (i) => event => {
    let todos = this.state.todos
    todos.splice(i, 1)
    this.setState({todos: todos})
  }
  deleteImages = event => {
    let todos = this.state.todos
    todos[this.state.delete.i].images.splice(this.state.delete.j, 1)
    this.setState({ todos: todos })
    this.setState({ open: false })
  }
  handleClickOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  handleNewMessageSubmit = (new_todo) => {
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
              <Card key={i} className="edit-form-todo-card">
                <div className="edit-form-todo-card-item">
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
                      value={todo.detail}
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
                    />
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
                        <GridListTile style={{height: 180, width: 282}} key={j}>
                          <img src={image} alt={j} style={{height: 180, width: 282, objectFit: 'cover'}}/>
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
                      <GridListTile style={{height: 158, width: 256}}>
                        <Button variant="contained" className="edit-form-todo-card-grid-new" color="default" onChange={this.handleChangeFile(i)} >
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
                <Button variant="contained" color="secondary" onClick={this.deleteTodo(i)}>
                  Delete
                  <DeleteIcon />
                </Button>
              </Card>
            ))}
            <NewTodoEdit handleNewMessageSubmit={this.handleNewMessageSubmit} />
          </div>
        </div>
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

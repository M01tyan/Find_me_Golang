import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
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
        sites: [{url_title: "github", url: "https://github.com/M01tyan"},],
        graduate: '',
        todo_id: '',
        visitor_id: '',
      },
      new_site: {
        url_title: '',
        url: '',
      },
    };
  }
  handleChange = name => event => {
    let base = this.state.base
    base[name] = event.target.value
    this.setState({base: base})
  };
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
    console.log(id)
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
  onKeyPress = event => {
    if (event.charCode === 13) { // enter key pressed
      // do something here
      event.preventDefault();
      this.pushNewSite()
    } 
  }
  handleMessageSubmit = event => {
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
            <Button variant="outlined" color="primary" onClick={this.handleMessageSubmit}>
              POST
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

class TodoEdit extends Component {
  render() {
    return (
      <h1>Hello!</h1>
    )
  }
}

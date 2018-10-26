import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import './Edits.css'

const ranges = [
  {
    value: '男性',
    label: 'Male  (男性)',
  },
  {
    value: '女性',
    label: 'Female   (女性)',
  },
  {
    value: 'その他',
    label: 'Other   (その他)',
  },
];

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
          <Tabs value={value} onChange={this.handleChange}>
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
        name: "",
        furigana: "",
        university: "",
        department: "",
        subject: "",
        liked: '',
        sites: [],
        graduate: '',
        todo_id: '',
        visitor_id: '',
      },
    };
  }
  handleChange = name => event => {
    this.setState({...this.state.base, [name]: event.target.value});
  };
  
  handleSubmit = event => {
    //event.preventDefalut();
    console.log("form ok")
    this.handleMessageSubmit({name: this.state.name, furigana: this.state.furigana, university: this.state.university, department: this.state.department, subject: this.state.subject, graduate_year: this.state.graduate_year, email: this.state.email, tel: this.state.tel, github: this.state.github, facebook: this.state.facebook, twitter: this.state.twitter})
    console.log("form success")
  }
  handleMessageSubmit(message) {
    console.log(message)
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
    axios
      .get("http://localhost:8000/api/users", {
        headers: {
          'Content-Type': 'application/json',
      }})
      .then(results => {
        const message = results.data
        this.setState({ base: message })
        //console.log(typeof this.state.base.name)
      })
      
      /*
      $.ajax({
        url: "http://localhost:5000/api/users",
        dataType: 'json',
        cache: false,
        success: function(message) {
          console.log(message)
          //this.setState({ name: message.name, furigana: message.furigana, university: message.university, department: message.department, subject: message.subject, graduate_year: message.graduate_year, email: message.email, tel: message.tel, github: message.github, facebook: message.facebook, twitter: message.twitter })
          console.log("success")
        }.bind(this),
        error: function(_xhr, status, err) {
          console.error(this.props.url, status, err.toString())
        }.bind(this)
      })
      */
  }
  
  render() {
    return (
      <div className="edit">
        <form className="edit-form" noValidate autoComplete="off" onSubmit={this.handleMessageSubmit}>
          <TextField
            required
            id="standard-required"
            label="Name"
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
            label="University"
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
          {this.state.base.sites.map((site, i) => (
            <div>
              <TextField
                id="standard-required"
                label="Site Title"
                type="search"
                value={site.url_title}
                onChange={this.handleChange('url_title')}
                className="edit-form-text-field"
                margin="normal"
              />
              <TextField
                id="standard-required"
                label="Facebook Link"
                type="search"
                placeholder="https://www.facebook.com/"
                value={site.url}
                onChange={this.handleChange('facebook')}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          ))}
          {/*
          <TextField
            select
            className="edit-form-text-field"
            variant="outlined"
            label="Gender(性別)"
            value={this.state.image}
            onChange={this.handleChange('gender')}
          >
            {ranges.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="standard-full-width"
            label="Facebook Link"
            type="search"
            style={{ margin: 8 }}
            placeholder="https://www.facebook.com/"
            fullWidth
            value={this.state.base.facebook}
            onChange={this.handleChange('facebook')}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="standard-full-width"
            label="Github Link"
            type="search"
            style={{ margin: 8 }}
            placeholder="https://github.com/"
            fullWidth
            value={this.state.base.github}
            onChange={this.handleChange('github')}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="standard-full-width"
            label="Twitter Link"
            type="search"
            style={{ margin: 8 }}
            placeholder="https://twitter.com/"
            fullWidth
            value={this.state.base.twitter}
            onChange={this.handleChange('twitter')}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="standard-textarea"
            label="With placeholder multiline"
            placeholder="Placeholder"
            multiline
            className="edit-form-text-field"
            margin="normal"
          />
        */}
          <TextField
            id="standard-bare"
            className="edit-form-text-field"
            defaultValue="Bare"
            margin="normal"
          />
          <input type="submit" value="Update Post" onClick={this.handleSubmit} />
        </form>
      </div>
    )
  }
}

class TodoEdit extends Component {
  componentDidMount() {
    console.log("Hello")
  }
  render() {
    return (
      <h1>Hello!</h1>
    )
  }
}

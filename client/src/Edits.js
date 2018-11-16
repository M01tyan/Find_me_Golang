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
import CircularProgress from '@material-ui/core/CircularProgress'
import CheckIcon from '@material-ui/icons/Check'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Sample from './images/sample_icon.png'
import TodoEdit from './TodoEdit'
import SkillEdit from './SkillEdit'
import HistoryEdit from './HistoryEdit'
import CareerEdit from './CareerEdit'
import SelfPREdit from './SelfPREdit'
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
    const { value } = this.state
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
        { value === 0 && <BaseEdit /> }
        { value === 1 && <TodoEdit /> }
        { value === 2 && <SkillEdit /> }
        { value === 3 && <HistoryEdit /> }
        { value === 4 && <CareerEdit /> }
        { value === 5 && <SelfPREdit /> }
      </div>
    )
  }
}


/*基本情報編集フォーム*/
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
        liked: 0,
        sites: [],
        graduate: '',
      },
      new_site: {
        url_title: '',
        url: '',
      },
      base64icon: '',
      icon: '',
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
  changeIcon(img) {
    let image = img.split(',')
    this.setState({base64icon: image[1]})
  }
  handleChangeFile = event => {
    let createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL
    // ①イベントからfileの配列を受け取る
    let files = event.target.files
    // ②createObjectURLで、files[0]を読み込む
    let image_url = createObjectURL(files[0])
    this.setState({icon: image_url})
    let reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = e => {
      this.changeIcon(e.target.result)
    }
    // ③setStateする！
  }
  onKeyPress = event => {
    if (event.charCode === 13) { // enter key pressed
      // do something here
      event.preventDefault();
      this.pushNewSite()
    } 
  }
  handleMessageSubmit = () => {
    const path = window.location.pathname
    const paths = path.split("/")
    axios
      .post("http://localhost:8000/api/users/"+paths[1]+"/"+paths[2]+"/edits/base", {
        name: this.state.base.name,
        furigana: this.state.base.furigana,
        university: this.state.base.university,
        department: this.state.base.department,
        subject: this.state.base.subject,
        graduate: this.state.base.graduate,
        liked: this.state.base.liked,
        sites: this.state.base.sites
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(results => {
        const message = results.data
        if(message === true) {
          axios
            .post("http://localhost:8000/api/users/"+paths[1]+"/"+paths[2]+"/edits/icon", {
              image: this.state.base64icon
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(results => {
            })
        } else {
          console.log("error")
        }
      })
  }
  componentDidMount() {
    const path = window.location.pathname
    let paths = path.split("/")
    axios
      .get("http://localhost:8000/api/users/"+paths[1]+"/"+paths[2]+"/edits/base", {
        headers: {
          'Content-Type': 'application/json',
      }})
      .then(results => {
        const message = results.data
        if(message.sites === null) message.sites = []
        this.setState({ base: message })
        axios
          .get("http://localhost:8000/api/users/"+paths[1]+"/"+paths[2]+"/edits/icon", {
            headers: {
              'Content-Type': 'application/json',
          }})
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
  
  render() {
    const { icon } = this.state.base
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
            <div className="edit-form-graduate">
              <InputLabel style={{fontSize: 12}}>Graduate(卒業年度)</InputLabel>
              <Select
                value={this.state.base.graduate}
                onChange={this.handleChange('graduate')}
                className="edit-form-text-field"
                style={{marginTop: 0}}
              >
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
              </Select>
            </div>
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
            <Avatar src={this.state.icon} className="edit-form-icon-img" />
            <UploadButton handleClickOpen={this.handleMessageSubmit} />
          </div>
        </div>
      </div>
    )
  }
}

export class UploadButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      success: false,
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleButtonClick = () => {
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true,
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
              success: true,
            })
          }, 2000)
        },
      )
      this.props.handleClickOpen()
    }
  }

  render() {
    const { loading, success } = this.state
  
    return (
      <div className="upload-button">
        <div className="upload-button-wrapper">
          <Button
            variant="outlined"
            disabled={loading}
            color="primary"
            onClick={this.handleButtonClick}
          >
            {success ? <CheckIcon /> : "POST"}
          </Button>
          {loading && <CircularProgress size={24} className="upload-button-progress" />}
        </div>
      </div>
    );
  }
}

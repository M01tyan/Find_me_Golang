import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Findme from './images/Find_me_logo_header.png'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import './App.css'
import About from './About'
import Edits from './Edits'
import BaseInfo from './BaseInfo'
import TodoCard from './TodoCard'
import Skill from './Skill'
import History from './History'
import Career from './Career'
import SelfPR from './SelfPR'
import SignIn from './SignIn'
import SignUp from './SignUp'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route path='/:userType/:userId/:furigana' component={Home} />
          <Route exact path='/' component={SignIn} />
          <Route path='/signUp' component={SignUp} />
          <Route path='/:userType/:userId/edits/new' component={Edits} />
          <Route path='/:userType/:userId/:furigana/edits' component={Edits} />
          <Route path='/about' component={About} />
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

class Home extends Component {
  render() {
    return (
      <div className="container">
        <BaseInfo />
        <TodoCard />
        <Skill />
        <History />
        <Career />
        <SelfPR />
      </div>
    )
  }
}

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      top: false,
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  render() {
    const path = window.location.pathname
    const paths = path.split("/")
    return (
      <div className="header">
        <div className="header-button">
          <Button onClick={this.toggleDrawer('top', true)}><ExpandMoreIcon /></Button>
          <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('top', false)}
              onKeyDown={this.toggleDrawer('top', false)}
            >
              <div>
                <List><Link to={"/"+paths[1]+"/"+paths[2]+"/"+paths[3]} className="link">Home</Link></List>
                <List><Link to={"/"+paths[1]+"/"+paths[2]+"/"+paths[3]+"/edits"} className="link">編集</Link></List>
                <List><Link to="/about" className="link">このサイトについて</Link></List>
                <Divider />
              </div>
            </div>
          </Drawer>
        </div>
        <a href="/"><img src={Findme} alt="Find_me_logo" className="header-logo" /></a>
        <div className="header-links">
          <Link to={"/"+paths[1]+"/"+paths[2]+"/"+paths[3]} className="link">Home</Link>
          <Link to={"/"+paths[1]+"/"+paths[2]+"/"+paths[3]+"/edits"} className="link">編集</Link>
          <Link to="/about" className="link">このサイトについて</Link>
        </div>
        <div className="header-blank">&nbsp;</div>
      </div>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <h3 className="footer-logo">Find me</h3>
        <a href="#skill" className="footer-link">基本情報</a>
        <a href="#skill" className="footer-link">これまでの制作物</a>
        <a href="#skill" className="footer-link">プログラミングレベル</a>
        <a href="#skill" className="footer-link">これまでの経歴</a>
        <a href="#skill" className="footer-link">将来のキャリア像</a>
        <a href="#test" className="footer-link">自己PR</a>
      </div>
    )
  }
}

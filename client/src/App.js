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
import BaseInfo from './BaseInfo'
import TodoCard from './TodoCard'
import Skill from './Skill'
import History from './History'
import Career from './Career'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path='/' component={Home} />
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
        <BaseInfo name="前田 幹太" furigana="Kanta Maeda" university="会津大学" department="コンピュータ理工学部" subject="コンピュータ理工学科" age="20" graduate_year="2020" email="s1240236@u-aizu.ac.jp" tel="080-2725-8866" key="baseInfo" />
        <TodoCard key="todoCards" />
        <Skill />
        <History />
        <Career />
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
                <List><Link to="/" className="link">Home</Link></List>
                <List><Link to="/" className="link">編集</Link></List>
                <List><Link to="/about" className="link">このサイトについて</Link></List>
                <Divider />
              </div>
            </div>
          </Drawer>
        </div>
        <a href="/"><img src={Findme} alt="Find_me_logo" className="header-logo" /></a>
        <div className="header-links">
          <Link to="/" className="link">Home</Link>
          <Link to="/" className="link">編集</Link>
          <Link to="/about/show" className="link">このサイトについて</Link>
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

import React, { Component } from 'react'
import sr from './ScrollReveal'
import Icon from './images/about_card.png'
import AppealImage1 from './images/about_appeal1.png'
import AppealImage2 from './images/about_appeal2.png'
import AppealImage3 from './images/about_appeal3.png'
import AppealImage4 from './images/about_appeal4.png'
import Concept from './images/about_concept.png'
import Develop from './images/about_develop.png'
import Brows from './images/about_brows.png'
import DevelopMobile from './images/develop_mobile.png'
import ConceptMobile from './images/concept_mobile.png'
import BrowsMobile from './images/brows_mobile.png'
import './About.css'

export default class About extends Component {
  componentDidMount() {
    const config = {
      origin: 'left',
      duration: 1000,
      delay: 150,
      distance: '50px',
      scale: 1,
      easing: 'ease',
    }
    sr.reveal(this.refs.about, config)
  }
  render() {
  	return (
  	  <div className="container">
  	    <div className="about-top" ref="about">
    		  <h1 className="catch-copy">学生のための<br/>Web名刺</h1>
    		  <div className="about-logo">
    		    <img src={Icon} alt="icon" className="about-card" />
    		  </div>
    		</div>
        <div className="appeal" ref="about">
          <h1 className="appeal-catch-copy">自分を最大限に表現する場を提供したい！</h1>
          <p className="catch-copy-about">
          企業の方とお会いしてもなかなか自分を表現することができない、もしくは地方学生がなかなか会うことのできない人に短い時間で最大限にアピールしたい方に向けた自己紹介サイトです。</p>
          <div className="appeal-items">
            <div className="appeal-items-flex">
              <AppealItem title="&nbsp;<br/>これまでの制作物" key="0" image={AppealImage1} />
              <AppealItem title="プログラミング<br/>レベル" key="1" image={AppealImage2} />
            </div>
            <div className="appeal-items-flex">
              <AppealItem title="&nbsp;<br/>これまでの経歴" key="2" image={AppealImage3} />
              <AppealItem title="&nbsp;<br/>自己PR" key="3" image={AppealImage4} />
            </div>
          </div>
        </div>
        <AboutTemplate title="サイト利用のコンセプト" about="企業の方とお会いしてもなかなか自分を表現することができない、もしくは地方学生がなかなか会うことのできない人に短い時間で最大限にアピールしたい方に向けた自己紹介サイトです。" image_pc={Concept} image_sp={ConceptMobile} color="red" />
        <AboutTemplate title="開発環境" about="Ruby on RailsでのWebアプリケーション<br/>サーバーサイドはRuby on Rails<br/>フロントエンドにはReact.jsを使用<br/>サーバーはHeroku、DBはPostgreSQL<br/>アクセス解析にはGoogle Analytics使用" image_pc={Develop} image_sp={DevelopMobile} color="white" />
        <AboutTemplate title="対応ブラウザ" about="Google Chrome バージョン69.0<br/>Firefox バージョン62.0<br/>Safari バージョン12.0<br/>Microsoft Edge バージョン42.1" image_pc={Brows} image_sp={BrowsMobile} color="red" />
  	  </div>
  	)
  }
}

class AppealItem extends Component {
  render() {
  var lines = this.props.title.split("<br/>").map(function(line) {
            return (<h1 className="appeal-item-title">{line}</h1>);
        });
    return (
      <div className="appeal-item">
        {lines}
        <img src={this.props.image} alt="appeal-img" className="appeal-item-image" />
      </div>
    )
  }
}

class AboutTemplate extends Component {
  componentDidMount() {
    const config = {
      origin: 'left',
      duration: 1000,
      delay: 150,
      distance: '50px',
      scale: 1,
      easing: 'ease',
    }
    sr.reveal(this.refs.template, config)
  }
  render() {
    let white_background = {
      backgroundColor: "#fff"
    }
    let white_fontColor = {
      color: "#808080"
    }
    if (this.props.color === "red") {
      white_background = {
        backgroundColor: null,
        color: "#fff"
      }
      white_fontColor = {
        color: "#fff"
      }
    }
    var lines = this.props.about.split("<br/>").map(function(line) {
            return (<p className="template-about" style={white_fontColor}>{line}</p>);
        });
    return (
      <div className="template" style={white_background} ref="template">
        <h1 className="template-title">
          {this.props.title}
        </h1>
        {lines}
        <img src={this.props.image_pc} alt="pc" className="template-image-pc"/>
        <img src={this.props.image_sp} alt="sp" className="template-image-sp" />
      </div>
    )
  }
}

import React, { Component } from 'react'
//import sr from './ScrollReveal'
import './SelfPR.css'
import axios from 'axios'

export default class SelfPR extends Component {
  constructor(props) {
    super(props)
    this.state = {
      self_pr: "私の強みは物事に進んで取り組む姿勢です。私は興味関心を持ったものをとりあえず始めてみようと思う積極性があります。<br/><br/>大学１年生の夏に独学でHTML5を学び、大学生活をもっと便利にできないかと思い、大学の施設状況を直感的に知ることができるMonacaを使ったアプリケーション開発を行いました。さまざまな人に自分が作ったアプリを見てもらい、便利でいいモノだと褒めてもらったことがきっかけでものづくりの楽しさを知ることができました。現在もより便利なモノができないかと改良を行っています。<br/><br/>他にも、複数の人と協力してより大きな開発を行いたいと思い、企業と連携したPepperの受付ロボットの開発を行っています。私はIoTに非常に興味があり、この活動はロボットとインターネットの繋がりを深める活動で、IoTと非常に密接になっているので良い経験ができると思い始めました。実際の現場の雰囲気を知ることができ、自身のスキルアップもできてとても良い経験になっています。<br/><br/>また、自分が開発していく上で困ったことを共有し、他のエンジニアの助けになればよいなと思い、最近Qiitaの投稿を始めました。記事を書くことで物事の整理になったり、ほかのエンジニアからのコメントで改善ができるようになりました。<br/><br/>開発以外ではサークル活動でボランティアを行っています。仮設住宅に住む子供たちに元気になってもらおうと交流を深めたり、地域の祭りに参加して地域活性化を行おうと活動しています。<br/><br/>"
    }
  }
  render() {
    var lines = this.state.self_pr.split("<br/><br/>").map(function(line, i) {
            return (<p className="self-pr-context" key={i}>{line}</p>);
        });
    return(
      <div className="self-pr">
        <h2 className="title">自己PR</h2>
        <div className="self-pr-flex">
          <div className="blank"></div>
          <div className="self-pr-context">
            {lines}
          </div>
          <div className="blank"></div>
        </div>
      </div>
    )
  }
}
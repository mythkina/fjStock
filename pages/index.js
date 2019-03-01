import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { Component } from 'react';
import axios from 'axios'

export default class Index extends React.Component {

  componentDidMount() {
    console.log('enter componentDidMount ',this.props.param);
    
  }

  render() {
    return (
      <Layout>
        <h1>基金</h1> 
        <ul>
          {this.props.shows.map((show) => (
            <li key={show.id} >
              <div className="flex-container">
                <div className="flex-item">{show.id}</div>
                <div className="flex-item">{show.name}</div>
                <div className="flex-item">{show.yesterdayPrice}</div>
                <div className="flex-item">{show.yesterdayPrice}</div>
              </div>
            </li>
          ))}
        </ul>
        <style jsx>{`
          h1 {
            font-family: "Arial";
          }

          ul {
            padding: 0;
          }

          li {
            list-style: none;
            margin: 5px 0;
            
          }

          .flex-container {
            width:100%;
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content:space-between;
          } 
     
          .flex-item {
            flex:1
          }

        `}</style>
      </Layout>)
  }
}

const { httpsOverHttp } = require('tunnel');

const instance = axios.create({
    baseURL: 'http://fund.eastmoney.com/',
    // httpsAgent: agent,
    // proxy: {
    //   host: '192.168.3.65',
    //   port: 8888,
    //   secure:false
    // },
});


async function getList() {
  let ret = await axios.get('http://fund.eastmoney.com/Data/Fund_JJJZ_Data.aspx?t=1&lx=9&letter=&gsid=0&text=&sort=zdf,desc&page=1,10000000&dt=1425897162484&atfc=')
  return ret;
}

async function getUser() {
  const res = await instance.get('/Data/Fund_JJJZ_Data.aspx?t=1&lx=9&letter=&gsid=0&text=&sort=zdf,desc&page=1,10000000&dt=1425897162484&atfc=');
  return res.data;
}

Index.getInitialProps = async function() {
  // const res = await fetch('http://fund.eastmoney.com/Data/Fund_JJJZ_Data.aspx?t=1&lx=9&letter=&gsid=0&text=&sort=zdf,desc&page=1,10000000&dt=1425897162484&atfc=')
  // const data = await res.text()
  const data = await getUser();

  const d = data.replace("var db=", "")

  let realStock = [];

  function strToJson(str){ 
    var json = (new Function("return " + str))(); 
    return json; 
  } 
  
  const c = strToJson(d);
  const ret = []
  ret.push({id:"代码", name:"名称", yesterdayPrice:"昨天净值"})
  c['datas'].map((show) => {
    const dic = {};
    dic.id = show[0];   
    dic.name = show[1];
    dic.yesterdayPrice = show[3];
    ret.push(dic);  
  });
  const group = new Map();
  const stocks = new Map();
  ret.map((item) => {
    let eachgroup = [];
    let key = "";
    let target = item.name.substring(0,item.name.length);

    ret.map((item)=> {
      stocks.set(item.id, item);
      let matched = true;
      target.split("").map((char) => {
        if (item.name.indexOf(char) === -1) {
          matched = false;
        }
      });
      if (matched) {
        eachgroup.push(item.id);
        eachgroup = eachgroup.sort((x,y) => x > y)
        key = eachgroup[0];
      }
    })
    if (eachgroup.length > 1) {
      group.set(key, {group:eachgroup, item: stocks.get(key)})
      eachgroup.map((each) => {
        realStock.push("sz" + each);
        realStock.push("sh" + each);
      })
    }
  })


  function _strMapToObj(strMap){
    let obj= Object.create(null);
    for (let[k,v] of strMap) {
      obj[k] = v;
    }
    return obj;
  }

  const stockPrice = await fetch("http://hq.sinajs.cn/list=" + realStock.join(","))
  const priceRes = await stockPrice.text();


  console.log("-----", priceRes)
  // group.keys().map( (key) => {
  //   var myRegexp = /(?:^|\s)`key`(.*?)(?:\s|$)/g;
  //   var match = myRegexp.exec(priceRes);
  //   console.log(match[1]);
  // })

  return {
    shows: ret,
    group:_strMapToObj(group),
    realStock:realStock,
    param:priceRes
  }
}

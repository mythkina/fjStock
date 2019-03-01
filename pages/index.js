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
const match = { '162412' : 'sz399989',
                '502056' : 'sz399989',
                '160420' : 'sz399673',
                '160219' : 'sz399913',
                '161726' : 'sz399441',
                "163118" : "sz399441",
                "160127" : "sz399932",
                "165519" : "sh000841",
                "161022" : "sz399006",
                "161725" : "sz399997",
                "163209" : "sz399958",
                "160636" : "sz399675",
                "160637" : "sz399006",
                "161025" : "sz399675",
                "168001" : "sz399812",
                "161223" : "sz399006",
                "160634" : "sh000827",
                "164819" : "sh000827",
                "162413" : "sh000852",
                "162216" : "sz399905",
                "" : ""}

// const codes = [ [ '150261', '150262', '162412' ] ,
//           [ '502056', '502057', '502058' ] ,
//           [ '150257', '150258', '161122' ] ,
//           [ '150130', '150131', '160219' ] ,
//           [ '150271', '150272', '161726' ] ,
//           [ '150283', '150284', '163118' ] ,
//           [ '150148', '150149', '165519' ] ,
//           [ '150303', '150304', '160420' ] ,
//           [ '150269', '150270', '161725' ] ,
//           [ '150152', '150153', '161022' ] ,
//           [ '150213', '150214', '161223' ] ,
//           [ '150016', '150017', '163406' ] ,
//           [ '150243', '150244', '160637' ] ,
//           [ '150245', '150246', '160636' ] ,
//           [ '150194', '150195', '161025' ] ,
//           [ '150229', '150230', '160632' ] ,
//           [ '150028', '150029', '165511' ] ,
//           [ '150184', '150185', '163114' ] ,
//           [ '150237', '150238', '160634' ] ,
//           [ '150323', '150324', '164819' ] ,
//           [ '150263', '150264', '162413' ] ,
//           [ '150190', '150191', '164304' ] ,
//           [ '502000', '502001', '502002' ] ,
//           [ '150022', '150023', '163109' ] ,
//           [ '150092', '150093', '165707' ] ,
//           [ '150083', '150084', '162714' ] ,
//           [ '150207', '150208', '161721' ] ,
//           [ '150215', '150216', '160224' ] ,
//           [ '150311', '150312', '165524' ] ,
//           [ '150307', '150308', '161030' ] ,
//           [ '150279', '150280', '160640' ] ,
//           [ '150259', '150260', '161123' ] ,
//           [ '150231', '150232', '163116' ] ,
//           [ '150055', '150056', '164809' ] ,
//           [ '150106', '150107', '161118' ] ,
//           [ '150327', '150328', '164821' ] ,
//           [ '502023', '502024', '502025' ] ,
//           [ '150123', '150124', '165312' ] ,
//           [ '150164', '150165', '165809' ] ,
//           [ '150287', '150288', '168203' ] ,
//           [ '150143', '150144', '161826' ] ,
//           [ '150032', '150033', '160718' ] ,
//           [ '000428', '000429', '000430' ] ,
//           [ '000674', '000675', '000676' ] ,
//           [ '150066', '150067', '160217' ] ,
//           [ '150273', '150274', '160638' ] ,
//           [ '150275', '150276', '167503' ] ,
//           [ '150179', '150180', '160626' ] ,
//           [ '150177', '150178', '160625' ] ,
//           [ '150217', '150218', '164905' ] ,
//           [ '150100', '150101', '160620' ] ,
//           [ '150265', '150266', '168201' ] ,
//           [ '000091', '000092', '000093' ] ,
//           [ '150188', '150189', '161719' ] ,
//           [ '000316', '000317', '000318' ] ,
//           [ '150315', '150316', '161031' ] ,
//           [ '150203', '150204', '160629' ] ,
//           [ '150167', '150168', '161811' ] ,
//           [ '150247', '150248', '164818' ] ,
//           [ '150297', '150298', '160137' ] ,
//           [ '502040', '502041', '502042' ] ,
//           [ '502003', '502004', '502005' ] ,
//           [ '150211', '150212', '161028' ] ,
//           [ '150135', '150136', '164508' ] ,
//           [ '150186', '150187', '163115' ] ,
//           [ '502020', '502021', '502022' ] ,
//           [ '502006', '502007', '502008' ] ,
//           [ '502048', '502049', '502050' ] ,
//           [ '150104', '150105', '160417' ] ,
//           [ '150150', '150151', '165520' ] ,
//           [ '150012', '150013', '162509' ] ,
//           [ '150064', '150065', '160808' ] ,
//           [ '150335', '150336', '161628' ] ,
//           [ '150051', '150052', '165515' ] ,
//           [ '150219', '150220', '164401' ] ,
//           [ '150209', '150210', '161026' ] ,
//           [ '150309', '150310', '165523' ] ,
//           [ '150192', '150193', '160628' ] ,
//           [ '150169', '150170', '164705' ] ,
//           [ '150291', '150292', '168205' ] ,
//           [ '502013', '502014', '502015' ] ,
//           [ '150293', '150294', '160135' ] ,
//           [ '150325', '150326', '164820' ] ,
//           [ '150117', '150118', '160218' ] ,
//           [ '150241', '150242', '161029' ] ,
//           [ '150205', '150206', '160630' ] ,
//           [ '150255', '150256', '161121' ] ,
//           [ '150267', '150268', '160517' ] ,
//           [ '150299', '150300', '160418' ] ,
//           [ '150249', '150250', '161723' ] ,
//           [ '150227', '150228', '160631' ] ,
//           [ '150321', '150322', '161032' ] ,
//           [ '150277', '150278', '160639' ] ,
//           [ '150181', '150182', '161024' ] ,
//           [ '150221', '150222', '164402' ] ,
//           [ '150251', '150252', '161724' ] ,
//           [ '150173', '150174', '165522' ] ,
//           [ '150175', '150176', '161831' ] ,
//           [ '150289', '150290', '168204' ] ,
//           [ '502036', '502037', '502038' ] ,
//           [ '150317', '150318', '164907' ] ,
//           [ '150281', '150282', '160814' ] ,
//           [ '150157', '150158', '165521' ] ,
//           [ '150329', '150330', '167301' ] ,
//           [ '150225', '150226', '160516' ] ,
//           [ '150343', '150344', '161629' ] ,
//           [ '502053', '502054', '502055' ] ,
//           [ '150171', '150172', '163113' ] ,
//           [ '502010', '502011', '502012' ] ,
//           [ '150235', '150236', '160633' ] ,
//           [ '150159', '166021', '166022' ] ,];
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
        eachgroup = eachgroup.sort((x,y) => x-y)
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

  for (let key of group.keys()) {

    let codes = group.get(key).group;
    let item = group.get(key).item;
    
    if (codes.length === 3) {
      codes.map(code => {
        let regex = new RegExp(key + "=\"(.*?)\";");
        let match = regex.exec(priceRes);
        let stockInfoArray = match[1].split(",")
        item.todayPrice = stockInfoArray[3]
        if(!item.todayPrice) {
          console.log("母鸡或债基",code,group.get(code))
        }

      })

      
    }
  }



  return {
    shows: ret,
    group:_strMapToObj(group),
    realStock:realStock,
    param:priceRes
  }
}

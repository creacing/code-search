var express = require('express')
var router = express.Router()
//连接数据库
// const mongoose = require('mongoose')
// mongoose.connect('mongodb://127.0.0.1:27017/lucene',
//   {useNewUrlParser: true, useUnifiedTopology: true})
//   .then(() => console.log('MongoDB connected success'))
//   .catch(err => {
//     console.log('MongoDB Connection Error:' + err.message)
//   })
//连接elasticsearch
const elasticsearch = require('elasticsearch')
const fs = require('fs')
const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error'
})
//批量向elasticsearch导入数据并且建立索引
const bulkIndex = function (index, type, data) {
  //生成索引
  let bulkBody = []
  data.forEach(item => {
    bulkBody.push({
      index: {
        _index: index,
        _type: type,
        _id: item.id
      }
    })
    bulkBody.push(item)
  })
  //编制索引
  esClient.bulk({body: bulkBody})
    .then(response => {
      // console.log(response)
      let errorCount = 0
      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error)
        }
      })
      // console.log(`Successfully indexed ${data.length - errorCount}out of ${data.length} items`)
      console.log(`已成功编制 ${data.length - errorCount} 条索引，从 ${data.length} 条项目中`)

    })
    .catch(console.error)
}

//自动将data数据传入bulkIndex
function getData () {
  const articlesRaw = fs.readFileSync(__dirname + '/data.json')
  let articles = JSON.parse(articlesRaw)
  //JSON.parse() 方法用于将一个 JSON 字符串转换为对象。
  bulkIndex('library', 'article', articles)
}

getData()

//search-match搜索匹配
const search = function (index, body) {
  return esClient.search({index: index, body: body})
}

router.get('/search', function (req, res, next) {
  let param = req.query.searchInput
  // console.log(param)
  const searchMatch = function () {
    //查询条件
    let body = {
      size: 20,
      from: 0,
      query: {
        match: {
          title: {
            query: param,
            minimum_should_match: 3,
            fuzziness: 2
          }
        }
      }
    }

    console.log(`检索匹配的项目'${body.query.match.title.query}' (一次显示 ${body.size} 条)...`)
    search('library', body)
      .then(results => {
        // console.log(results);
        console.log(`发现 ${results.hits.total.value} 条项目在 ${results.took}ms内`)
        // if (results.hits.total.value > 0) {
        //   console.log(`returned article titles:`)
        // }
        let totalNumber = results.hits.total.value
        let result=[]
        results.hits.hits.forEach((hit, index) =>{
          // console.log(`\t${body.from + ++index} - ${hit._source.title} (score: ${hit._score})`)
          result.push({
            id: hit._source.id,
            authors:hit._source.authors,
            title: hit._source.title,
            journal: hit._source.journal,
            volume: hit._source.volume,
            number: hit._source.number,
            pages: hit._source.pages,
            year: hit._source.year,
            abstract: hit._source.abstract,
            link: hit._source.link,
            keywords: hit._source.keywords,
            body:hit._source.body
          })
        })

        res.json({
          status:'0',
          msg:'success',
          result:{
            totalNumber,
            result
          }
        })

      })
      .catch(console.error)
  }
  searchMatch()
})

module.exports = router

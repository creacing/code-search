var express = require('express');
var router = express.Router();
console.log('服务器启动成功');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

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
      let errorCount = 0
      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error)
        }
      })
      console.log(`已成功编制 ${data.length - errorCount} 条索引，从 ${data.length} 条项目中`)
    })
    .catch(console.error)
}

//自动将data数据传入bulkIndex
function getData() {
  //同步读取文件
  const articlesRaw = fs.readFileSync(__dirname + '/data.json')
  //JSON.parse() 方法用于将一个 JSON 字符串转换为对象。
  let articles = JSON.parse(articlesRaw)
  //建立索引
  bulkIndex('library', 'article', articles)
}

//在多个字段中搜索
function search_multi_match() {
}

//匹配完整的词组
function search_match_phrase() {
}

//组合多个查询
function search_bool() {
}

//基本过滤器功能
function filter() {
}

//演示聚合如何工作
function aggregations() {
}

//生成有关搜索字词的建议
function suggest_term() {
}


getData()

//search-match搜索匹配
const search = function (index, body) {
  return esClient.search({index: index, body: body})
}

router.get('/search', function (req, res, next) {
  let param = req.query.input
  const searchMatch = function () {
    //查询条件 size为大小 from 为出处，
    // size(大小)属性表明响应中包含的文档的数量，
    // 如果不设置该属性值，默认返回10个文档。
    //from(出处)属性表明待返回文档的起始索引的位置，用于分页场景。
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
        console.log(`发现 ${results.hits.total.value} 条项目在 ${results.took}ms内`)
        let totalNumber = results.hits.total.value
        let result = []
        results.hits.hits.forEach((hit, index) => {
          result.push({
            id: hit._source.id,
            authors: hit._source.authors,
            title: hit._source.title,
            journal: hit._source.journal,
            volume: hit._source.volume,
            number: hit._source.number,
            pages: hit._source.pages,
            year: hit._source.year,
            abstract: hit._source.abstract,
            link: hit._source.link,
            keywords: hit._source.keywords,
            body: hit._source.body
          })
        })

        res.json({
          status: '0',
          msg: 'success',
          result: {
            totalNumber,
            result
          }
        })

      })
      .catch(console.error)
  }
  searchMatch()
})


module.exports = router;

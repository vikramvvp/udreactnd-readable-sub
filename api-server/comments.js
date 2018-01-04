const clone = require('clone')
const posts = require('./posts')

let db = {}

const defaultData = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  "8tu4bsun805n8un48ve89": {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  },
  "f7971a6c-e615-4d5b-a8bb-85b753a01102": {
    id: 'f7971a6c-e615-4d5b-a8bb-85b753a01102',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1468166872534,
    body: 'This post really rocked',
    author: 'thingthree',
    voteScore: 5,
    deleted: false,
    parentDeleted: false
  },
  "c351efad-90d8-4794-8771-215b27be7961": {
    id: 'c351efad-90d8-4794-8771-215b27be7961',
    parentId: "4lm8jk3ym7mf1p33lnez",
    timestamp: 1468166872332,
    body: 'You made my day man!',
    author: 'thingtwo',
    voteScore: 1,
    deleted: false,
    parentDeleted: false
  },
  "2e7306a0-399e-4462-a44d-b3576e064c64": {
    id: '2e7306a0-399e-4462-a44d-b3576e064c64',
    parentId: "4lm8jk3ym7mf1p33lnez",
    timestamp: 1468166872133,
    body: 'I am not sure if this is the right solution',
    author: 'thingone',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  "421130e7-9760-406f-9f9b-bc32f932dac1": {
    id: '421130e7-9760-406f-9f9b-bc32f932dac1',
    parentId: "4lm8jk3ym7mf1p33lnez",
    timestamp: 1468166872634,
    body: 'Who cares what you have written. I am just happy that you showed up.',
    author: 'thingthree',
    voteScore: 2,
    deleted: false,
    parentDeleted: false
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByParent (token, parentId) {
  return new Promise((res) => {
    let comments = getData(token)
    let keys = Object.keys(comments)
    filtered_keys = keys.filter(key => comments[key].parentId === parentId && !comments[key].deleted)
    res(filtered_keys.map(key => comments[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const comments = getData(token)
    res(
      comments[id].deleted || comments[id].parentDeleted
        ? {}
        : comments[id]
      )
  })
}

function add (token, comment) {
  return new Promise((res) => {
    let comments = getData(token)

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }

    posts.incrementCommentCounter(token, comment.parentId, 1)
    res(comments[comment.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let comments = getData(token)
    comment = comments[id]
    switch(option) {
        case "upVote":
            comment.voteScore = comment.voteScore + 1
            break
        case "downVote":
            comment.voteScore = comment.voteScore - 1
            break
        default:
            console.log(`comments.vote received incorrect parameter: ${option}`)
    }
    res(comment)
  })
}

function disableByParent (token, post) {
    return new Promise((res) => {
        let comments = getData(token)
        keys = Object.keys(comments)
        filtered_keys = keys.filter(key => comments[key].parentId === post.id)
        filtered_keys.forEach(key => comments[key].parentDeleted = true)
        res(post)
    })
}

function disable (token, id) {
    return new Promise((res) => {
      let comments = getData(token)
      comments[id].deleted = true
      posts.incrementCommentCounter(token, comments[id].parentId, -1)
      res(comments[id])
    })
}

function edit (token, id, comment) {
    return new Promise((res) => {
        let comments = getData(token)
        for (prop in comment) {
            comments[id][prop] = comment[prop]
        }
        res(comments[id])
    })
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
}

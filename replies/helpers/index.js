function changeQuery(string) {
  let str = string.split('')
  let queryStr = str.map(e => {
    if(e.match(/[a-z]/gi)) {
      return e
    } else {
      return '%' + Buffer.from(e, 'utf8').toString('hex')
    }
  })
  return queryStr.join('')
}

module.exports = {
  changeQuery
}
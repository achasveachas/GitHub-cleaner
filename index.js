function getIssues() {
  const repo = 'achasveachas/javascript-fetch-lab'
  fetch(`https://api.github.com/repos/${repo}/issues`).then(console.log('Got Issues')).then(res => res.json()).then(json => showIssues(json))
}

function showIssues(json) {
  var template = Handlebars.compile(document.getElementById('issues-template').innerHTML)
  var issues = template(json)
  document.getElementById('results').innerHTML = issues
}

function createIssue() {
  const repo = 'achasveachas/javascript-fetch-lab'
  const title = document.getElementById('title').value
  const body = document.getElementById('body').value
  const postData = {
    title: title,
    body: body
  }
  fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: 'post',
    body: JSON.stringify(postData),
    headers: {
      Authorization: `Token ${getToken()}`
    }
  }).then(console.log('Issue Created')).then(getIssues())
}

function showResults(json) {
  var template = Handlebars.compile(document.getElementById('repo-template').innerHTML)
  var result = template(json)
  document.getElementById('results').innerHTML = result
}

function forkRepo() {
  const repo = 'learn-co-curriculum/javascript-fetch-lab'
  //use fetch to fork it!
  fetch(`https://api.github.com/repos/${repo}/forks`, {
    method: 'post',
    headers: {
      Authorization: `Token ${getToken()}`
    }
  }).then(res => res.json()).then(json => showResults(json))
}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return ''
}

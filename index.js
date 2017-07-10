function markRepos() {
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


function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return ''
}

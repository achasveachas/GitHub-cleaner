let repoList = []

function handleGetLabs() {
  getRepoList(1)
  addStatus("Getting Repos")
}

function getRepoList(page) {

  fetch(`https://api.github.com/user/repos?page=${page}&per_page=100`, {
    method: 'get',
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
  .then(res => res.json())
  .then((json) => {
    if (json.length < 1) {
      filterRepoList()
    } else {
      repoList = repoList.concat(json)
      getRepoList(page + 1)
    }
  })
}

function filterRepoList() {
  addStatus("Filtering Repos")

  repoList = repoList.filter(repo => repo.name.includes("-v-000"))
  addStatus(`${repoList.length} Flatiron labs found`)
}

function addStatus(status) {
  var li = document.createElement("li")
  li.innerHTML = status
  document.getElementById('progress').append(li)
}

function getUsername() {
  // Return your GitHub username below
  return 'achasveachas'
}

function getToken() {
  // Go to https://github.com/settings/tokens and get a token, make sure to delete it before commiting
  return ''
}

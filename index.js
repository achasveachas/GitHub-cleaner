let repoList = []

function handleMarkRepos() {
  if (confirm("Are you sure you want to mark your repos private?\nThis step can not be undone easily.")) {

    getRepoList(1)
  }
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
  console.log(repoList.length);
}

function getUsername() {
  // Return your GitHub username below
  return 'achasveachas'
}

function getToken() {
  // Go to https://github.com/settings/tokens and get a token, make sure to delete it before commiting
  return ''
}

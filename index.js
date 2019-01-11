let repoList = []

function handleGetLabs() {
  if (getToken() && getUsername()) {
    getRepoList(1)
    addStatus("Getting Repos")
  } else {
    console.log("Please provide your GitHub token and username.\nSee https://github.com/achasveachas/GitHub-cleaner/blob/master/README.md for details.")
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
      console.log("Retrieved " + repoList.length + "repos.")
      getRepoList(page + 1)
    }
  })
}

function filterRepoList() {
  addStatus("Filtering Repos")

  repoList = repoList.filter(repo => repo.name.includes("-v-000") && repo.owner.login === getUsername())
  addStatus(`${repoList.length} Flatiron labs found`)
  document.getElementById("make_private").disabled = false
}

function handlePrivatizeRepos() {
  if (confirm(`Are you sure you want to mark these ${repoList.length} repos private?`)) {
    privatize()
  }
}

function privatize() {
  for (var i = 0; i < repoList.length; i++) {
    var repo = repoList[i]
    var url = repo.url
    var name = repo.name
    var requestBody = {
      name: name,
      private: true
    }
    fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `token ${getToken()}`
      },
      body: JSON.stringify(requestBody)
    })
    .then(res => document.getElementById("progress").innerHTML = `Lab ${i + 1}/${repoList.length} has been marked private.`)
    .catch(er => console.log(er))
  }
  addStatus("All labs have been marked private!")
}

function addStatus(status) {
  var li = document.createElement("li")
  li.innerHTML = status
  document.getElementById('progress').append(li)
}

function getUsername() {
  // Paste your GitHub username below
  return ''
}

function getToken() {
  // Go to https://github.com/settings/tokens and get a token. Paste the token below. Make sure to delete it before commiting
  return ''
}

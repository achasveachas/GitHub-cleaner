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

  repoList = repoList.filter(repo => repo.name.includes("-v-000") && repo.owner.login === getUsername())
  addStatus(`${repoList.length} Flatiron labs found`)
  document.getElementById("archive").disabled = false
}

function handleArchiveRepos() {
  if (confirm(`Are you sure you want to archive these ${repoList.length} repos?\nThis action can not be undone easily!`)) {
    archive()
  }
}

function archive() {
  for (var i = 0; i < repoList.length; i++) {
    var repo = repoList[i]
    var url = repo.url
    var name = repo.name
    var requestBody = {
      name: name,
      archived: true
    }
    fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `token ${getToken()}`
      },
      body: JSON.stringify(requestBody)
    })
    .then(res => document.getElementById("progress").innerHTML = `Lab ${i + 1}/${repoList.length} has been archived.`)
    .catch(er => console.log(er))
  }
  addStatus("All labs have been archived!")
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

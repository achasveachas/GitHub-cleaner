let repoList = [];
const SEARCH_TERM = "-web-";

function handleGetLabs() {
  if (getToken() && getUsername()) {
    getRepoList(1);
    addStatus("Getting Repos");
  } else {
    console.log(
      "Please provide your GitHub token and username.\nSee https://github.com/achasveachas/GitHub-cleaner/blob/master/README.md for details."
    );
  }
}

function getRepoList(page) {
  fetch(`https://api.github.com/user/repos?page=${page}&per_page=100`, {
    method: "get",
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
    .then(res => res.json())
    .then(json => {
      if (json.length < 1) {
        filterRepoList();
      } else {
        repoList = repoList.concat(json);
        console.log("Retrieved " + repoList.length + "repos.");
        getRepoList(page + 1);
      }
    });
}

function filterRepoList() {
  addStatus("Filtering Repos");

  repoList = repoList.filter(
    repo =>
      repo.name.includes(SEARCH_TERM) && repo.owner.login === getUsername()
  );
  addStatus(`${repoList.length} Flatiron labs found`);
  document.getElementById("make_private").disabled = false;
  document.getElementById("transfer_repos").disabled = false;
}

function handlePrivatizeRepos() {
  if (
    confirm(
      `Are you sure you want to mark these ${repoList.length} repos private?`
    )
  ) {
    privatize();
  }
}

function privatize() {
  for (var i = 0; i < repoList.length; i++) {
    var repo = repoList[i];
    var url = repo.url;
    var name = repo.name;
    var requestBody = {
      name: name,
      private: true
    };
    fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `token ${getToken()}`
      },
      body: JSON.stringify(requestBody)
    })
      .then(
        res =>
          (document.getElementById("progress").innerHTML = `Lab ${i + 1}/${
            repoList.length
          } has been marked private.`)
      )
      .catch(er => console.log(er));
  }
  addStatus("All labs have been marked private!");
}

function handleTransferRepos() {
  if (
    confirm(
      `Are you sure you want to transfer these ${
        repoList.length
      } repos to "${ORG_ID}"?`
    )
  ) {
    transferRepos();
  }
}

function transferRepos() {
  for (var i = 0; i < repoList.length; i++) {
    var repo = repoList[i];
    var url = repo.url + "/transfer";
    var name = repo.name;
    var requestBody = { new_owner: ORG_ID };
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github.nightshade-preview+json",
        "Content-Type": "application/vnd.github.nightshade-preview+json",
        Authorization: `token ${getToken()}`
      },
      body: JSON.stringify(requestBody)
    })
      .then(
        res =>
          (document.getElementById("progress").innerHTML = `Lab ${i + 1}/${
            repoList.length
          } has been transfered to ${ORG_ID}.`)
      )
      .catch(er => console.log(er));
  }
  addStatus("All labs have been transfered!");
}

function addStatus(status) {
  var li = document.createElement("li");
  li.innerHTML = status;
  document.getElementById("progress").append(li);
}

function getUsername() {
  // Create config.js and add const USER_ID = "Paste your username here".
  return USER_ID;
}

function getToken() {
  // Go to https://github.com/settings/tokens and get a token.
  // Create config.js and add const TOKEN_ID = "Paste your token here".
  return TOKEN_ID;
}

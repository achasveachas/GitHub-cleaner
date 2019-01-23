let repoList = [];

function handleGetLabs() {
  if (getToken() && getUsername()) {
    getRepoList(1);
    addStatus("Getting Repos");
  } else {
    reportErrors(
      `Please provide your GitHub token and username.<br /> See <a href="https://github.com/achasveachas/GitHub-cleaner/blob/master/README.md">HERE</a> for details.`
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
  const SEARCH_TERM = document.getElementById("search").value;
  addStatus("Filtering Repos");

  repoList = repoList.filter(
    repo =>
      repo.name.includes(SEARCH_TERM) && repo.owner.login === getUsername()
  );
  addStatus(`${repoList.length} Repos found`);
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
      .catch(er => reportErrors(er));
  }
  addStatus("All labs have been marked private!");
}

function handleTransferRepos() {
  const ORG_ID = document.getElementById("organization").value;
  if (
    confirm(
      `Are you sure you want to transfer these ${
        repoList.length
      } repos to "${ORG_ID}"?`
    )
  ) {
    transferRepos(ORG_ID);
  }
}

function transferRepos(ORG_ID) {
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
          (document.getElementById("progress").innerHTML = `Repo(s) ${i}/${
            repoList.length
          } has been transfered to ${ORG_ID}.`)
      )
      .catch(er => reportErrors(er));
  }
  addStatus("All labs have been transfered!");
}

function addStatus(status) {
  var li = document.createElement("li");
  li.innerHTML = status;
  document.getElementById("progress").append(li);
}

function reportErrors(error) {
  document.getElementById("errors").innerHTML = error;
}

function getUsername() {
  return document.getElementById("username").value;
}

function getToken() {
  // Go to https://github.com/settings/tokens and get a token.
  return document.getElementById("token").value;
}

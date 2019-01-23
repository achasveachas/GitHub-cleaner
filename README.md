# GitHub-cleaner

- Note: this was originally supposed to make the labs private, until I realized you can't mark forked repos as private. Oh well. Was fun writing it.
- Thankfully, GitHub came out with the ability to archive repos, which is not as good, but better than nothing I guess...
- **[Update Jan 2019]**: GitHub has now added private repos to free accounts as well! The script has been updated accordingly. If you used the previous version of the script to archive your repos see the note below.
- **[Transfer Repos API]**: GitHub add preview API - transfer repos to new owner/organization [here](https://developer.github.com/v3/repos/#transfer-a-repository). The script has been added with this new feature.

## Overview

This is a small script for Flatiron students who want to clean up their GitHub accounts by marking the Repos (e.g. Flatiron labs) as private (fork repos have to dublicate) or transfer repos to other oganization.

### Before you start

This script works by filtering your repos and looking for the `SEARCH_TERM` flag from "Search input field", it will not privatize/transfer repos not containing the flag. If there are any repos you want to keep public/not transfer (for example, I know I wanted to keep my TTT with AI in my GitHub), you will have to manually go in to your GitHub account and change it.

Before you start you will have to obtain a personal token from GitHub, you can get it by going [here](https://github.com/settings/tokens) and clicking on the "Generate New Token" button, make sure to enable the "Repo" scope.

### Usage

- Clone or download this repo
- Open up index.js
- Put your GitHub username in the getUsername function
- Put your GitHub Personal Token in the getToken function
- Open up index.html in your browser
- Click on the "Get List Of Repos" button
- Once the progress bar indicates you have all the repos. This may take a few minutes, you can open the browser console to get progress updates. Once all of the repos were retrieved and filtered click the "Make Private" or "Transfer Repos" button.
- Wait until you get the notification that all repos have been marked private or transfer.
- You also can go [here](https://sparkbold.github.io/GitHub-cleaner/) to run the script.

### Note

If you used the previous version of this script to archive your repos, your repos are now read-only and there is no way to change that through GitHubs API (see the [documentation](https://developer.github.com/v3/repos/#edit) under the `archived` field).

### Contributing

Bug reports and pull requests are welcome in the [GitHub repo](https://github.com/achasveachas/GitHub-cleaner) or by email to contact@yechiel.me This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

### License

The script is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

# GitHub-cleaner

+ Note: this was originally supposed to make the abs private, until I realized you can't mark forked repos as private. Oh well. Was fun writing it.
+ Thankfully, GitHub came out with the ability to archive repos, which is not as good, but better than nothing I guess...

### Overview

This is a small script for Flatiron students who want to clean up their GitHub accounts by archiving the Flatiron labs.

### Before you start:

This script works by filtering your repos and looking for the `-v-000` flag, it will not archive repos not containing the flag. If there are any labs you want to keep unarchived (for example, I know I wanted to keep my TTT with AI in my GitHub), you will have to manually go in to your GitHub account and unarchive it.

Before you start you will have to obtain a personal token from GitHub, you can get it [here](https://github.com/settings/tokens) and clicking on the 'Generate New Token' button, make sure to enable the "Repo" scope.

### Usage:

+ Clone or download this repo
+ Open up index.js
+ Put your GitHub username in the getUsername function
+ Put your GitHub Personal Token in the getToken function
+ Open up index.html in your browser
+ Click on the "Get List Of Labs" button
+ Once the progress bar indicates you have all the labs (may take a few minutes), click the "Archive" button.
+ Wait until you get the notification that all labs have been archived.


### Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/achasveachas/GitHub-cleaner or by email to contact@yechiel.me This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

### License

The script is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

# GW2 Reddit Dev Tracker
Tracks reddit accounts of various ArenaNet developers for comments and posts they make.

## How to contribute
The source code is generated using `create-react-app` and all corresponding commands work. To start developing, clone and edit files to your liking and run `npm start` to launch a development server.

The code is currently formatted using [prettier](https://github.com/prettier/prettier). There is an [extension](https://github.com/prettier/prettier-vscode) available for Visual Studio Code that automatically uses prettier when formatting code.

## Missing developers
The list of developers is extracted from the (custom) css of /r/Guildwars2 and manually converted into a JSON file in `public/devs.json`. If a developer is missing, just add the dev to that JSON file and submit a pull request!

## Repurposing for a different subreddit
If you wish to use this code to track developers in a different subreddit, you can simply fork this repository and edit a few files to reference your new sub.

1) Fork the repository and rename it for your purpose. The name of the repository determines where on GitHub pages the app lives.
2) Put your newly chosen name in `package.json`.
3) Put your newly chosen name in the navbar in `src/App.js`.
4) Put a list of subreddits you wish to track in `"allowed_subs"` of the initial state in `src/reducers/main-reducer.js`.

To deploy to github pages, you can simply run `npm run deploy`.

## License
MIT
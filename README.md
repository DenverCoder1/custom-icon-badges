# Custom Icon Badges

Allows users to more easily use their own icons and logos to [shields.io badges](https://github.com/badges/shields).

This is still a work in progress. I plan to create a demo site to simplify the process.

- [How to use](#how-to-use)
- [Adding a new logo](#adding-a-new-logo)
	- [Parameters](#parameters)
	- [Example request body](#example-request-body)
- [📤 Deploying it on your own](#-deploying-it-on-your-own)
	- [Deploy to Heroku](#deploy-to-heroku)

## How to use

1. Get a badge URL from [shields.io](https://shields.io/).

2. Replace `img.shields.io` with `custom-icon-badges.herokuapp.com`

3. Use any available slug as the logo query parameter.

```md
https://custom-icon-badges.herokuapp.com/badge/play-station-blue.svg?logo=controller&logoColor=white
```

Preview:

![preview](https://user-images.githubusercontent.com/20955511/126047615-7f47d37f-30af-4feb-b29c-9498422d9c93.png)

## Adding a new logo

Send a POST request to <https://custom-icon-badges.herokuapp.com/> with a JSON body including `slug`, `type`, and `data`.

You can preview how the icon will look by following the [custom logo example](https://github.com/badges/shields/blob/master/doc/logos.md#custom-logos) in the shields.io docs.

### Parameters

- `slug`: The unique name for the logo.
- `type`: The type of the logo, either `svg+xml` or `png`.
- `data`: The base64 encoded data of the logo.

### Example request body

```json
{
    "slug": "controller",
    "type": "svg+xml",
    "data": "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEiIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIj48cGF0aCBkPSJNMTI5IDExMWMtNTUgNC05MyA2Ni05MyA3OEwwIDM5OGMtMiA3MCAzNiA5MiA2OSA5MWgxYzc5IDAgODctNTcgMTMwLTEyOGgyMDFjNDMgNzEgNTAgMTI4IDEyOSAxMjhoMWMzMyAxIDcxLTIxIDY5LTkxbC0zNi0yMDljMC0xMi00MC03OC05OC03OGgtMTBjLTYzIDAtOTIgMzUtOTIgNDJIMjM2YzAtNy0yOS00Mi05Mi00MmgtMTV6IiBmaWxsPSIjZmZmIi8+PC9zdmc+"
}
```

## 📤 Deploying it on your own

If you can, it is preferable to host the files on your own server.

Doing this can lead to better uptime and more control over customization (you can modify the code for your usage).

### Deploy to Heroku

  1. Sign in to **Heroku** or create a new account at <https://heroku.com>
  2. Click the Deploy button below

  <p align="center">
    <a href="https://heroku.com/deploy?template=https://github.com/DenverCoder1/custom-icon-badges/tree/main">
      <img src="https://www.herokucdn.com/deploy/button.svg" title="Deploy to Heroku" alt="Deploy"/></a>
  </p>

  3. On the page that comes up, click **"Deploy App"** at the end of the form
  4. Once the app is deployed, click **"Manage App"** to go to the dashboard
  5. Visit the **"Settings"** tab and click **"Reveal Config Vars"**
  6. Add the url of a Mongo database as the `DB_URL` config var. The database should have a collection called `icons`. See [getting started](https://docs.atlas.mongodb.com/getting-started/) for more info on setting up a free Mongo Atlas database.

![image](https://user-images.githubusercontent.com/20955511/126048656-6525abba-20e0-441c-ad8d-f9bec8eb73d6.png)

  7. Scroll down to the **Domains** section to find the URL you will use in place of `custom-icon-badges.herokuapp.com`
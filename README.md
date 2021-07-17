# Custom Icon Badges

Allows users to more easily use their own icons and logos to [shields.io badges](https://github.com/badges/shields).

This is still a work in progress. A demo site will be available soon.

# How to use

Replace `img.shields.io` with `<base url>`

Use any available slug as the logo parameter.

```md
https://<base url>/badge/play-station-blue.svg?logo=controller&logoColor=white
```

Preview:

![preview](https://user-images.githubusercontent.com/20955511/126047615-7f47d37f-30af-4feb-b29c-9498422d9c93.png)

# Adding a new logo

Send a POST request to `<base url>` with a JSON body including `slug`, `type`, and `data`:

## Parameters

- `slug`: The slug of the logo.
- `type`: The type of the logo, either `svg+xml` or `png`.
- `data`: The base64 encoded data of the logo.

## Example request body

```json
{
    "slug": "controller",
    "type": "svg+xml",
    "data": "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEiIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIj48cGF0aCBkPSJNMTI5IDExMWMtNTUgNC05MyA2Ni05MyA3OEwwIDM5OGMtMiA3MCAzNiA5MiA2OSA5MWgxYzc5IDAgODctNTcgMTMwLTEyOGgyMDFjNDMgNzEgNTAgMTI4IDEyOSAxMjhoMWMzMyAxIDcxLTIxIDY5LTkxbC0zNi0yMDljMC0xMi00MC03OC05OC03OGgtMTBjLTYzIDAtOTIgMzUtOTIgNDJIMjM2YzAtNy0yOS00Mi05Mi00MmgtMTV6IiBmaWxsPSIjZmZmIi8+PC9zdmc+"
}
```
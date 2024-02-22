
# Swathe - Image Viewer

Swathe is an open-source app which allows applying cool overlay effects to images. The applied effects on the image can be downloaded for personal use and/or the enshittification of memes across your slack, discord, or social media channels.

## Features

- mutiple image presentation views (gallery, preview, comparison)
- 20+ applicable effects including emboss, nigt-vision, mosaic, airbrush, etc
- keyboard shortcuts for entire ui
- cross-platform: runs on windows, macos, & linux

## Preview

* app demo video here (soon)

## ⌨️ Shortcut Keys

All shortcurt commands begin with the `shift` key + any of the following
- switch effect (⬆️ and ⬇️)
- clear image (`X` to clear image and upload new one)
- switch views (`P` for **Preview**, `G` for **Gallery**, `C` for **Comparison**)
- reposition comparison slider dragger (⬅️ and ➡️)
- fit to screen size (`M` to fit image. Dependent on screen constraints. Repress to exit fit-to-screen view).
- full screen (`F` for full-screen image view. Dependent on window size. Repress to exit full-screen view).


## Installation 

"Latest" refers to non release-candidate, pre, beta, or alpha builds.

- linux: [latest](https://github.com/cdrani/swathe/releases/latest/download/swath.dmp)
- macos: [latest](https://github.com/cdrani/swathe/releases/latest/download/swathe.dmg)
- windows: [latest](https://github.com/cdrani/swathe/releases/latest/download/swath.exe)

Additionally, one can just build from [source](https://github.com/cdrani/swathe/releases/latest)

## Releases

Releases are automated based on semantic releases and tagged as such in the [Releases](https://github.com/cdrani/swathe/releases) page. Releases have the newest features and bugs, fixes, etc, as they include pre, beta, and alpha builds before a public build is cut.

## Build

1. Clone the repository: `git clone https://github.com/cdrani/swathe.git`
2. Install the dependencies: `pnpm install`
3. Build the application: `pnpm run tauri build`
4. Get the executable  (*.ext, .dmg, etc) from the `src-tauri/target` folder

## Contributing

Contributions are welcome!

## License

Swathe is released under the [MIT License](./LICENSE).

import { invoke } from '@tauri-apps/api/tauri'
import { appWindow } from '@tauri-apps/api/window'
import { join, downloadDir } from '@tauri-apps/api/path'

import { shortName } from './name'
import type { Effect } from '$lib/stores/effect'

type DownloadParms = { visible: boolean; effect: Effect }

function parseNum(num: number) {
    return parseInt(`${num}`, 10)
}

function getBGImage({ visible, effect }: DownloadParms) {
    const idPrefix = visible ? 'effect-modal' : 'effect'
    return document.getElementById(`${idPrefix}-${effect}`)
}

async function getCoords(params: DownloadParms) {
    const bgImage = getBGImage(params)
    if (!bgImage) return

    const offsets = bgImage?.getBoundingClientRect()
    if (!offsets) return

    const factor = await appWindow.scaleFactor()
    const { left, top, width, height } = offsets

    return {
        top: parseNum(top) * factor,
        left: parseNum(left) * factor,
        width: parseNum(width) * factor,
        height: parseNum(height) * factor
    }
}

export async function downloadImage(params: DownloadParms) {
    const dimensions = await getCoords(params)
    if (!dimensions) return

    const folder = await downloadDir()
    const fileName = `${shortName()}.png`
    const file_path = await join(folder, fileName)

    await invoke('flickr', { file_path, dims: dimensions })
}

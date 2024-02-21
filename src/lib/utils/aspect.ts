export function updateAspectRatio(aspect: number = 1) {
    const container = document.getElementById('modal')

    if (!container) return

    let { innerWidth: containerWidth, innerHeight: containerHeight } = window

    if (containerWidth / containerHeight > aspect) {
        containerWidth = containerHeight * aspect
    } else {
        containerHeight = containerWidth / aspect
    }

    container.style.width = containerWidth + 'px'
    container.style.height = containerHeight + 'px'
}

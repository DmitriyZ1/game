const CACHE = 'tank-v1';
const arrFiles = [
    "index.html", 
    "style.css",
    "game.css" ,
    "menu.css",
    "script.js",
    "tanks.js",
    "game-info.js",
    "game.js",
    "menu.js",
    "pic/armor.png",
    "pic/boom.png",
    "pic/boom1.png",
    "pic/t1down.png",
    "pic/t1left.png",
    "pic/t1right.png",
    "pic/t1up.png",
    "pic/t2down.png",
    "pic/t2left.png",
    "pic/t2right.png",
    "pic/t2up.png",
    "pic/t3down.png",
    "pic/t3left.png",
    "pic/t3right.png",
    "pic/t3up.png",
]


self.addEventListener('install', async (event) => {
    const cache = await caches.open(CACHE)
    await cache.addAll(arrFiles)
})

self.addEventListener('fetch', (event) =>
    event.respondWith(cacheFirst(event.request))
)

async function cacheFirst(request) {
    const storeC = await caches.open(CACHE)
    const c = await storeC.match(request)
    console.log(request.url + ' --- ' + c)
    return c || await fetch(request)
}

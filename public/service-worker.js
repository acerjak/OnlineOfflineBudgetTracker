self.addEventListener('install', event => {
    event.waitUntil(caches.open('budget-cache-v1')
      .then(cache => cache.addAll([
        '/',
        '/db.js',
        'index.js',
        '/styles.css',
        '/manifest.json'
      ])))
  })
//listen for fetch requests
  self.addEventListener('fetch', event => {
    event.respondWith(fetch(event.request)
      .catch(err => {
          console.log(err)
        return caches.match(event.request)
          .then(match => {
            if (match) {
              return match
            } else if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/')
            }
          })
      }))
  })
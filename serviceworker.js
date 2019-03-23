self.addEventListener("install",function(event){
  event.waitUntil(
    caches.open("version1").then(function(cache){
      return cache.addAll([]);
    })
  );
});
self.addEventListener("fetch",function(event){
event.respondWith(
caches.match(event.request).then(function(resp){
return resp || fetch(event.request).then(
function (response){
caches.open("version1").then(function(cache){
  return cache.put(event.request,response.clone());
})
});
}));
});

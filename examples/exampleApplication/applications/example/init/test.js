setInterval(function() {
  console.dir({
    //cache: Object.keys(application.cache),
    templates: Object.keys(application.cache.templates),
    files: Object.keys(application.cache.files),
    folders: Object.keys(application.cache.folders),
    scripts: Object.keys(application.cache.scripts),
    //watchers: Object.keys(application.cache.watchers),
    //timer: Object.keys(application.cache.timer),
    //updates: Object.keys(application.cache.updates),
    static: Object.keys(application.cache.static),
    //pages: Object.keys(application.cache.pages),
    //size: Object.keys(application.cache.size)
  });
}, 5000);

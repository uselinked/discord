const fs = require("fs");

class CacheManager {
     constructor(val) {
          this.cache = String(val).split(/[\n\r]/);
          this.cache = this.cache.filter((url) => url.length > 0);
          this.cache = new Map(this.cache.map((url) => [url, true]));
     }
     has(val) {
          return this.cache.has(val);
     }
}

const cache = new CacheManager(fs.readFileSync("data/scam-urls.txt"));

module.exports = {
     name: "messageCreate",
     once: false,
     execute(msg) {
          if (cache.has(msg.content)) {
               msg.delete();
          }
     },
};

const fs = require("fs");

class CacheManager {
     constructor(val) {
          this.cache = String(val).split(/[\n\r]/);
          this.cache = this.cache.filter((url) => url.length > 0);
     }
     hasNot(val) {
          for (const url of this.cache)
               if (new RegExp(url).test(val)) return false;
          return true;
     }
}

let cache;

module.exports = {
     name: "messageCreate",
     once: false,
     execute(msg) {
          if (typeof cache === "undefined")
               cache = new CacheManager(fs.readFileSync("data/scam-urls.txt"));
          if (!cache.hasNot(msg.content)) msg.delete();
     },
};

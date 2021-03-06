Module.register("marvel_roleplay",{
  getScripts: function() {
    return['https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js']
  },
  start: function() {
    console.log("Starting new marvel_roleplay");
    this.hero = "";
    this.description = "";
    var self = this;
    setTimeout(function() {
      console.log("inside marvel timeout");
      this.updateMarvelRoleplay();
    }, 5000);
  },
  getDom: function() {
    console.log("inside of custom marvel getDom");
    console.log("Hero: " + this.hero);
    console.log("description: " + this.description);
    var wrapper = document.createElement("div");
    var h = document.createTextNode("Character: " + this.hero);
    var br = document.createElement("br");
    var d = document.createTextNode("Roleplay description: " + this.description);
    /***************************************************************
    ** REMOVE THE REST OF THE LOGS IN THIS FUNCTION IF THEY ERROR **
    ****************************************************************/
    console.log("Character element: " + h.toString());
    console.log("Description element: " + d.toString());

    wrapper.appendChild(h);
    wrapper.appendChild(br);
    wrapper.appendChild(d);

    console.log("Entire wrapper for marvel_roleplay: " + wrapper.toString());
    return wrapper;
  },
  getTranslations: function() {
		return false;
	},
  updateMarvelRoleplay: function() {
    console.log("Updating marvel roleplay");
    var characterIds = [1009718, 1009351, 1009610, 1009220, 1009368, 1009664, 1009629];
    var ts = new Date().getTime().toString();
    var hash = CryptoJS.MD5(ts + this.config.privateKey + this.config.publicKey).toString();

    console.log("Hash: " + hash);
    var self = this;
    var url = "https://gateway.marvel.com/v1/public/characters/" + characterIds[Math.floor(Math.random()*characterIds.length)] + "?ts=" + ts + "&apikey=" + this.config.publicKey + "&hash=" + hash;
    console.log("URL: " + url);
    var marvelRequest = new XMLHttpRequest();
    marvelRequest.open("GET", url, true);
    marvelRequest.onreadystatechange = function() {
      if (this.readState === 4) {
        if (this.status === 200) {
          self.processMarvelRoleplay(JSON.parse(this.response));
        } else {
          console.log("Error sending request");
        }
      }
    };
    marvelRequest.send();
  },
  processMarvelRoleplay: function(data) {
    console.log("inside process roleplay");
    if (!data || !data.data.results[0].name || typeof data.data.results[0].name === "undefined") {
      //data is unusable, leave function
      console.log("no usable data");
      return;
    }
    var self = this;
    self.hero = data.data.results[0].name;
    self.description = data.data.results[0].description;

    console.log("hero from json: " + data.data.results[0].name);
    console.log("descr from json: " + data.data.results[0].description);
    console.log("hero from self: " + self.hero);
    console.log("descr from self" + self.description);
    self.updateDom();
  }
});

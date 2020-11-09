const request = require("sync-request");

Connect = function(url){
    this.url = url;
}
Connect.prototype.get = function(){
    let res = this.options==null? request("GET", this.url):request("GET", this.url,this.options);
    return new Response(res);
}
Connect.prototype.post = function(){
    let res = this.options==null? request("POST", this.url):request("POST", this.url,this.options);
    return new Response(res);
}
Connect.prototype.data = function(key, value){
    if(this.options==null) this.options = {};
    if(this.options.json==null) this.options.json = {};
    this.options.json[key] = value;
    return this;
}
Connect.prototype.header = function(key, value){
    if(this.options==null) this.options = {};
    if(this.options.headers==null) this.options.headers = {};
    this.options.headers[key] = value;
    return this;
}

Response = function(res){
    this.body = res.getBody("utf-8");
    this.statusCode = res.statusCode;
    this.headers = res.headers;
    this.url = res.url;
    
}
Response.prototype.html = function(){
    return this.body.toString();
}

Response.prototype.text = function() {
    return String(this.body).replace(/(<([^>]+)>)/g, "").trim();
}

Response.prototype.select = function(classname) {
    if(this.trimBody==null) this.trimBody = this.body.replace(/\"/g,"").split("\n").map(a=>a.trim()).join("\n");
    let tag = classname;
    if(classname.includes("[")&&classname.includes("]")) {
        let clasz = classname.match(/\[(.*)\]/).pop().trim();
      tag = classname.match(/(.*)\[/).pop().trim();
        classname = tag + " "+clasz;
    } else if(classname.split(" ").length>1)  {
        tag = classname.split(" ")[0];
    } else if(classname.split(".").length==2) {
        tag = classname.split(".")[0];
        classname = tag + " class="+ classname.split(".")[1]
    }
    let result = [];
    let text = this.trimBody;
    for(var n=0;n<text.split("<"+classname).length-1;n++){
        result.push("<"+classname+text.split("<"+classname)[n+1].split("</"+tag+">")[0]+"</"+tag+">");
    }
    this.body = result.join("\n");
    return this;
}
  
Response.prototype.get = function(index){
    let line = this.body.split("\n");
    if(line.length<(index-2)) {
        throw new Error("The index is larger than the total size.");
    } else if(index<0) {
        throw new Error("Index cannot be negative.");
    } else if(index==null) {
        return this;
    } else {
        this.body = line[index]
        return this;
    }
}
Response.prototype.size = function(){
    return this.body.split("\n").length;
}
Response.prototype.attr = function(tag) {
    if(this.trimBody==null) this.trimBody = this.body.replace(/\"/g,"").split("\n").map(a=>a.trim()).join("\n");
    let text = this.trimBody;
    this.body = (typeof this.body == "string"? text.split(tag)[1].split("=")[1].split(" ")[0]:text[0].split(tag)[1].split("=")[1].split(" ")[0]);
    return this;
}

module.exports.connect = function(url){
    return new Connect(url);
}




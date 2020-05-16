function easyHTTP() {
  this.http = new XMLHttpRequest();
}

// Make an HTTP GET Request
easyHTTP.prototype.get = function(url, callback) {
  this.http.open("GET", url, true);

  this.http.onload = () => {
    //또다른 function안에서 this는 그 안의 함수에 종속한다. arrow function 으로 바꿔준다.
    if (this.http.status === 200) {
      callback(null, this.http.responseText);
    } else {
      callback("Error: " + this.http.status);
    }
  };

  this.http.send();
};

// Make an HTTP post Request
easyHTTP.prototype.post = function(url, data, callback) {
  this.http.open("POST", url, true);
  this.http.setRequestHeader("Content-type", "application/json");
  this.http.onload = () => {
    callback(null, this.http.responseText);
  };

  this.http.send(JSON.stringify(data));
};

// Make an HTTP put Request
easyHTTP.prototype.put = function(url, data, callback) {
  this.http.open("PUT", url, true);
  this.http.setRequestHeader("Content-type", "application/json");
  this.http.onload = () => {
    callback(null, this.http.responseText);
  };

  this.http.send(JSON.stringify(data));
};

// Make an HTTP delete Request
easyHTTP.prototype.delete = function(url, callback) {
  this.http.open("DELETE", url, true);

  this.http.onload = () => {
    //또다른 function안에서 this는 그 안의 함수에 종속한다. arrow function 으로 바꿔준다.
    if (this.http.status === 200) {
      callback(null, "Post deleted");
    } else {
      callback("Error: " + this.http.status);
    }
  };

  this.http.send();
};

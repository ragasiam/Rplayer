var sources = [
  "http://109.74.196.48:8251/stream", // ragasiam 64 kbps
  "http://109.74.196.48:8251/ragasiam", // ragasiam 128 kbp
];

var labels = [
  [ "Now Play 64 Kbps", "http://stream.ragasiam.com" ],
  [ "Now Play 128 Kbps", "http://109.74.196.48:8251/ragasiam" ],
];

var playingIndex = 0; // current radio
var playing = true; // stream status
var music = null;

setTimeout(function(){
    loadStream(playingIndex);
}, 1);

function loadStream(index){
  if(playing && music !== null)
    destroyStream();

  music = new Audio();
  music.src = sources[index];
  music.load();
  music.play();
  setLabel(index);
  pauseIcon();
  playingIndex = index;
  playing = true;
}

function destroyStream(){
  music.pause();
  music.src = "";
  playIcon();
  playing = false;
}

function changePlayback(){
  if(playing){ destroyStream();  }else{  loadStream(playingIndex);  }
}

function setLabel(index){
  document.getElementById("label").innerHTML = '<h6> <a target="_blank" href="' + labels[index][1] + '">' + labels[index][0] + '</a></h6>';
}

document.onkeydown = function(e) {
  e = e || window.event;
  switch(e.which || e.keyCode) {
    case 32:
      changePlayback();
    break;
  }
};

// icons
function pauseIcon(){
  document.getElementById('playbackButton').className = 'icon fa-pause';
}
function playIcon(){
  document.getElementById('playbackButton').className = 'icon fa-play';
}

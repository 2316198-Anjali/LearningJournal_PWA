let player;
let done = false;
let playerReady = false;

function onYouTubeIframeAPIReady() {
    try {
        player = new YT.Player('youtube-player', {
            height: '315',
            width: '560',
            videoId: 'M7lc1UVf-VE',
            playerVars: getPlayerVars(),
            events: getPlayerEvents()
        });
    } catch (error) {
        console.error('Error creating YouTube player:', error);
    }
}

 function getPlayerVars() {
  return {
    playsinline: 1,
    autoplay: 1,
    mute: 1
  };
 }
 
 function getPlayerEvents() {
  return {
    onReady: onPlayerReady,
    onStateChange: onPlayerStateChange
  };
 }

 function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
 }

 function stopVideo() {
  player.stopVideo();
 }

 function onPlayerReady(event) {
  event.target.playVideo();
 }

 function playVideo() {
    if (player && typeof player.playVideo === "function") {
        player.playVideo();
    }
}

function pauseVideo() {
    if (player && typeof player.pauseVideo === "function") {
        player.pauseVideo();
    }
}
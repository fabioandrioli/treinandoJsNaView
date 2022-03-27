function song(action){
  let music;
  if(action == "start"){
   music = new Audio('../songs/start.wav');
  }
  else if(action == "finish"){
   music = new Audio('../songs/finish.wav');
  }
  music.play();
  music.loop =false;
  setTimeout(() => {
    music.pause();
  },1000)
}
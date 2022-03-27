const Timer = {
  time: 0,
  timeToMinutes: time => { return Math.floor(time / 60)  == 60 ?  0 : Math.floor(time / 60)},
	timeToSeconds: time => time % 60,
	timeToHours: time => Math.floor(time / (60 * 60)),
	formatTime: time => String(time).padStart(2,'0'),

  init(){
    interval = setInterval(Timer.setTimer,1000 )
  },

  setTimer(){
    Timer.time++;
    const minutes = Timer.formatTime(Timer.timeToMinutes(Timer.time)); 
    const seconds = Timer.formatTime(Timer.timeToSeconds(Timer.time));
    const hours = Timer.formatTime(Timer.timeToHours(Timer.time));
    Timer.showTimer({minutes,seconds,hours});
  },

  showTimer(time) {
    let cronometro = document.getElementById('timer');
    cronometro.innerHTML = `
      ${time.hours}:${time.minutes}:${time.seconds}
    `
  },

  timerStop(){
    clearInterval(interval)
  },


}
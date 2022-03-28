const App = {
  formatTime: time => String(time).padStart(2,'0'),
  btnStart: document.getElementById('start'),
  btnPause: document.getElementById('pause'),
  btnFinish: document.getElementById('finish'),
  timer:0,
  tasks:[
    {
      title:"Criar um cronometro para saber quanto tempo gasto em cada tarefa",
      time:"01:28:35",
      date:"25/03/2022",
    },
    {
      title:"Criar um cronometro para saber quanto tempo gasto em cada tarefa",
      time:"01:28:35",
      date:"25/03/2022",
    },
    {
      title:"Criar um cronometro para saber quanto tempo gasto em cada tarefa",
      time:"01:28:35",
      date:"25/03/2022",
    }
  ],

  init(){
    App.btnStart.addEventListener('click',App.buttons.initTimer);
    App.btnPause.addEventListener('click',App.buttons.pauseTimer);
    App.btnFinish.addEventListener('click',App.buttons.finishTimer);
  },

  currentTimer(){
    App.timer += 1;
    App.view.show(App.calculateAndTransformTimeForHoursMinutesSeconds());
  },

  calculateAndTransformTimeForHoursMinutesSeconds(){
    const seconds = App.formatTime(this.timer % 60);
    const minutes = App.calculateMinutesAndHours(60)
    const hours = App.calculateMinutesAndHours(3600)
    return {seconds,minutes,hours};
  },

  calculateMinutesAndHours(valor){
   return Math.floor(this.timer / valor) < 60 ? App.formatTime(Math.floor(this.timer / valor )) : App.formatTime(Math.floor(this.timer / valor) % 10)
  },

  resetTimer(){
    App.timer = 0;
  },

  view:{
    show(time){
      let cronometro = document.getElementById('timer');
      cronometro.innerHTML = `
        ${time.hours}:${time.minutes}:${time.seconds}
      `
    },
  },
 
  buttons:{
    initTimer(){
      interval = setInterval(App.currentTimer,1000)
      App.buttons.activityButton([App.btnPause,App.btnFinish]);
      App.buttons.disabledButton([App.btnStart])
    },

    pauseTimer(){
      App.buttons.activityButton([App.btnStart]);
      App.buttons.disabledButton([App.btnPause]);
      clearInterval(interval)
    },

    finishTimer(){
      clearInterval(interval)
      App.buttons.activityButton([App.btnStart]);
      App.buttons.disabledButton([App.btnPause,App.btnFinish]);
      App.resetTimer();
      App.view.show(App.calculateAndTransformTimeForHoursMinutesSeconds());
    },

    disabledButton(buttons){
      buttons.forEach(button => button.setAttribute("disabled","disabled"));
    },
  
    activityButton(buttons){
      buttons.forEach(button => button.removeAttribute("disabled"));
    },
  }
}

App.init();


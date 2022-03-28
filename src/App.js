const App = {
  formatTime: time => String(time).padStart(2,'0'),
  btnStart: document.getElementById('start'),
  btnPause: document.getElementById('pause'),
  btnFinish: document.getElementById('finish'),
  inputTextTask: document.querySelector('input[name="task"]'),
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

  validateInitTask(){
    return App.inputTextTask.value === "" ? false : true;
  },

  currentTimer(){
    App.timer += 1;
    App.view.showTimer(App.calculateAndTransformTimeForHoursMinutesSeconds());
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
    showTimer(time){
      let cronometro = document.getElementById('timer');
      cronometro.innerHTML = `
        ${time.hours}:${time.minutes}:${time.seconds}
      `
    },

    showWarningInputTask(){
      let body = document.getElementsByTagName('body')[0]
      warning = document.createElement('div');
      warning.innerHTML = ` <div id="warning" class="box-warning box-warning-show">Por favor, insira uma tarefa!</div>`;
      body.insertBefore(warning, body.firstChild);
      setTimeout(() => {
        warning = document.querySelector('.box-warning-show');
        warning.classList.add('box-warning-hidden');
        document.getElementById('warning').remove();
      }, 2000);
    
    }
  },
 
  buttons:{
    initTimer(){
      if(App.validateInitTask()){
        interval = setInterval(App.currentTimer,1000)
        App.buttons.activityButton([App.btnPause,App.btnFinish]);
        App.buttons.disabledButton([App.btnStart])
      }else{
        App.view.showWarningInputTask();
      }
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
      App.view.showTimer(App.calculateAndTransformTimeForHoursMinutesSeconds());
    },

    disabledButton(buttons){
      buttons.forEach(button => button.setAttribute("disabled","disabled"));
    },
  
    activityButton(buttons){
      buttons.forEach(button => button.removeAttribute("disabled"));
    },
  },

  song:{
    play(){
      music = new Audio('../songs/start.wav');
      music.play();
      music.loop =false;
      setTimeout(() => {
        music.pause();
      },1000)
    },   
  },
}

App.init();


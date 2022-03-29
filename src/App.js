const App = {
  formatTime: time => String(time).padStart(2,'0'),
  btnStart: document.getElementById('start'),
  btnPause: document.getElementById('pause'),
  btnFinish: document.getElementById('finish'),
  inputTextTask: document.querySelector('input[name="task"]'),
  timer:0,
  tasks:[
    {
      id: 1,
      title:"Criar um cronometro para saber quanto tempo gasto em cada tarefa",
      time:{
        minutes:0,
        seconds:0,
        hours:0,
      },
      date:"25/03/2022",
    },
    {
      id: 2,
      title:"Criar um cronometro para saber quanto tempo gasto em cada tarefa",
      time:{
        minutes:0,
        seconds:0,
        hours:0,
      },
      date:"25/03/2022",
    },
    {
      id: 3,
      title:"Criar um cronometro para saber quanto tempo gasto em cada tarefa",
      time:{
        minutes:0,
        seconds:0,
        hours:0,
      },
      date:"25/03/2022",
    }
  ],

  newTask(){
    timer = App.calculateAndTransformTimeForHoursMinutesSeconds();
    let task = {
      id: this.tasks.length + 1,
      title: this.inputTextTask.value,
      time:{
        minutes:timer.minutes,
        seconds:timer.seconds,
        hours:timer.hours,
      },
      date: new Date().toLocaleDateString(),
    }
    this.tasks.push(task);
  },

  init(){
    console.log(App.tasks)
    App.view.addTaskInTable(App.tasks);
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
      warning = document.querySelector('.box-warning-show');
      setTimeout(() => {
        warning.classList.remove('box-warning-show');
        warning.classList.add('box-warning-hidden');
        document.getElementById('warning').remove();
      }, 1000);
    
    },

    createButtonDelete(task){
      let button = document.createElement('button');
      button.classList.add('btn','btn-danger');
      button.classList.add('delete');
      button.style.margin = '5px 0'
      button.innerHTML = 'deletar';
      button.dataset.id = `${task.id}`;
      return button;
    },

    addTaskInTable(){
      let table = document.querySelector('#table_tasks tbody');
      table.innerHTML = '';
      App.tasks.forEach(task => {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        tr.innerHTML = `
        <th scope="row">${task.id}</th>
        <td>${task.title}</td>
        <td>${App.formatTime(task.time.hours)}:${App.formatTime(task.time.minutes)}:${App.formatTime(task.time.seconds)}</td>
        <td>${task.date}</td>
        `;
        td.appendChild(App.view.createButtonDelete(task));
        tr.appendChild(td);
        table.insertBefore(tr,table.firstChild);
      });
      App.buttons.buttonDelete();
    },

    resetIpunts(){
      App.inputTextTask.value = '';
    }
  },
 
  buttons:{
    initTimer(){
      if(App.validateInitTask()){
        App.song.play();
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
      App.newTask();
      App.buttons.activityButton([App.btnStart]);
      App.buttons.disabledButton([App.btnPause,App.btnFinish]);
      App.resetTimer();
      App.view.showTimer(App.calculateAndTransformTimeForHoursMinutesSeconds());
      App.view.addTaskInTable();
      App.view.resetIpunts();
    },

    disabledButton(buttons){
      buttons.forEach(button => button.setAttribute("disabled","disabled"));
    },
  
    activityButton(buttons){
      buttons.forEach(button => button.removeAttribute("disabled"));
    },

    buttonDelete(){
      let buttons = document.querySelectorAll('.delete');
      buttons.forEach(button => button.addEventListener('click',() => {App.deleteTask(button.dataset.id)}));
     
    },
  },

  deleteTask(task){
    console.log(task)
    App.tasks = App.tasks.filter(t => t.id != task);
    console.log(App.tasks)
    App.view.addTaskInTable();
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


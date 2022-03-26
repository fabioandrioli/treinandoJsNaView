
const btnIniciar = document.getElementById("init")
const btnPause = document.getElementById("pause")
const btnFinish = document.getElementById("finish");

function resetStates(){
  Timer.timerStop();
  Timer.time = 0;
  const seconds = "00";
  const minutes = "00";
  const hours = "00";
  Timer.showTimer({seconds,minutes,hours});
  btnFinish.setAttribute("disabled","disabled");
  btnPause.setAttribute("disabled","disabled");
  btnIniciar.removeAttribute("disabled");
  document.querySelector("input[name='task']").removeAttribute("disabled","disabled");
  document.querySelector("input[name='task']").value = "";
}

function buttonInit(){
  btnIniciar.addEventListener('click',() => { 
    if(document.querySelector("input[name='task']").value !== "" && document.querySelector("input[name='task']").value.trim()){
      Timer.init();
      document.querySelector("input[name='task']").setAttribute("disabled","disabled");
      song("start");
      btnIniciar.setAttribute("disabled","disabled");
      btnFinish.removeAttribute("disabled");
      btnPause.removeAttribute("disabled");
    }
  })
}

function buttonPause(){
  btnPause.addEventListener('click',() => {
    Timer.timerStop();
    btnIniciar.removeAttribute("disabled")
    btnFinish.removeAttribute("disabled");
    btnPause.setAttribute("disabled","disabled");
  })  
}

function buttonFinish(){
 btnFinish.addEventListener('click',() => {
    addTaskInTable()
    resetStates();
    song("finish");
  })
}

function addTaskInTable(){
  let tr = document.createElement("tr");
  const table = document.querySelector("#table_tasks tbody")
  const minutes = Timer.formatTime(Timer.timeToMinutes(Timer.time)); 
  const seconds = Timer.formatTime(Timer.timeToSeconds(Timer.time));
  const hours = Timer.formatTime(Timer.timeToHours(Timer.time));
  tr.innerHTML = `
  <th scope="row">2</th>
  <td>${document.querySelector("input[name='task']").value}</td>
  <td>${hours}:${minutes}:${seconds}</td>
  <td>26/03/2022</td>`;
  table.appendChild(tr)
}


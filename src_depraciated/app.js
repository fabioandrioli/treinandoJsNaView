const App = {
  table: document.querySelector("#table_tasks tbody"),
  init(){

    tasks.forEach(task => {
      tr = document.createElement("tr"),
      tr.innerHTML = `
      <th scope="row">${task.id}</th>
      <td>${task.title}</td>
      <td>${task.tempo}</td>
      <td>${task.date}</td>
      <td><button id="delete" class="btn btn-danger">deletar</button></td>
      `;
      App.table.appendChild(tr);
    })
  }
}

App.init();


buttonInit()

buttonPause()

buttonFinish()
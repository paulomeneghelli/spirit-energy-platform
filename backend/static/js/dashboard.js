async function carregar(){

let status = await fetch("/api/status");
status = await status.json();

document.getElementById("status").innerHTML = status.online ? "Online" : "Offline";

let consumo = await fetch("/api/consumo");
consumo = await consumo.json();

document.getElementById("consumo").innerHTML = consumo.mwh + " MWh";

let pld = await fetch("/api/pld");
pld = await pld.json();

document.getElementById("pld").innerHTML = "R$ " + pld.valor;

}

carregar();
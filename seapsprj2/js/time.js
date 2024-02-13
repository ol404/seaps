function getCurrentDT(){
    const dtDisplayElement = document.getElementById("currentDT"); 
    const currentDateTime = new Date();
    const date = currentDateTime.toDateString();
    const time = currentDateTime.toLocaleTimeString();
    dtDisplayElement.textContent = `Date: ${date} | Time: ${time}`;
}
// date and time update
getCurrentDT();
setInterval(getCurrentDT, 1000);
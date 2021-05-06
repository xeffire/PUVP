
class Alert{

    constructor() {
        let box = document.querySelector('.position-fixed.top-0.start-0.end-0')
        if (box == null) {
            box = document.createElement("div");
            box.style = "z-index: 1200";
            box.className = "position-fixed top-0 start-0 end-0 align-items-center d-flex flex-column";
            document.body.appendChild(box);
        }
        this.box = box;
        this.timeouts = [];
        this.alerts = [];
    }
    
    new(msg, color, key) {
    if (msg == undefined) {
      return;
    }
    let existingAlert = this.alerts[key];
    if (existingAlert != null) {
      existingAlert.remove();
      clearTimeout(this.timeouts[key]);
    }
    let alert = document.createElement("p");
    alert.className = `alert alert-${color} msg-${key}`;
    alert.style = "text-align: center; margin: 0; z-index: 1101; width: min(100%, 500px)";
    alert.append(document.createTextNode(msg));
    this.box.append(alert);
    const timeout = setTimeout(() => {
      document.querySelector(`.msg-${key}`).remove();
    }, 3000);
    this.timeouts[key] = timeout;
    this.alerts[key] = alert;
  }
}
  export {Alert};
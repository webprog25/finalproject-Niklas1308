import Shot from "./shot.js";
import Evaluation from "./evaluation.js";


export default class App {
  constructor() {
    this.mover = new Evaluation();
    this.addForm = document.getElementById("addShot");
    this.board = document.getElementById("board");
    this.handleAdd = this.handleAdd.bind(this);

    this.addForm.addEventListener("submit", this.handleAdd);

    this.addShot("Christmas, (Indian Blend) Kaffeeothek", 18, 36, 28, "neu");
    this.addShot("Ethiopia, 220 Grad", 16, 50, 36, "lecker");
  }

  addShot(bean, input, output, time, notes = "") {
    const ratio = output/ input;
    let category = "ok";
    if (ratio >= 1.8 && ratio <= 2.2 && time >= 25 && time <= 35) {
      category = "good";
    } else if (ratio < 1.5 || ratio > 2.5 || time < 20 || time > 40) {
      category = "bad";
    }

    const shot = new Shot(bean, input, output, time, this.mover, category, notes);
    this.board.appendChild(shot.element);
    shot.setupChart();
  }

  handleAdd(event) {
    event.preventDefault();

    const bean = this.addForm.bean.value;
    const input = parseFloat(this.addForm.input.value);
    const output = parseFloat(this.addForm.output.value);
    const time = parseInt(this.addForm.time.value);
    const notes = this.addForm.notes.value;

    this.addShot(bean, input, output, time, notes);
    this.addForm.reset();
  }
}

new App();

import RaChart from "./chart.js";

export default class Shot {
  constructor(bean, input, output, time, mover, category = "ok", notes = "") {
    this.bean = bean;
    this.input = input;
    this.output = output;
    this.time = time;
    this.category = category;
    this.notes = notes;
    this.isEditing = false;
    this.mover = mover;

    this.ratings = {
      acidity: 5,
      sweetness: 5,
      bitterness: 5,
      body: 5,
      aroma: 5,
      aftertaste: 5
    };
 
    const template = document.getElementById("shotTemplate");
    this.element = template.content.cloneNode(true).querySelector(".shot-card");
    this.element.classList.add(this.category);

    this.getElements();
    this.setupEventListeners();
    this.updateDisplay();
  }

  getElements() {
    this.beanElem = this.element.querySelector(".bean");
    this.detailsElem = this.element.querySelector(".details");
    this.ratioElem = this.element.querySelector(".ratio");
    this.notesDisplay = this.element.querySelector(".notes-display");

    this.editForm = this.element.querySelector(".edit-form");
    this.editBean = this.element.querySelector(".edit-bean");
    this.editInput = this.element.querySelector(".edit-input");
    this.editOutput = this.element.querySelector(".edit-output");
    this.editTime = this.element.querySelector(".edit-time");
    this.editNotes = this.element.querySelector(".edit-notes");

    this.ratingInputs = {
      acidity: this.element.querySelector(".edit-acidity"),
      sweetness: this.element.querySelector(".edit-sweetness"),
      bitterness: this.element.querySelector(".edit-bitterness"),
      body: this.element.querySelector(".edit-body"),
      aroma: this.element.querySelector(".edit-aroma"),
      aftertaste: this.element.querySelector(".edit-aftertaste")
    };

    this.deleteBtn = this.element.querySelector(".delete");
    this.editBtn = this.element.querySelector(".edit");
    this.moveBtn = this.element.querySelector(".move");
    this.saveBtn = this.element.querySelector(".save-btn");
    this.cancelBtn = this.element.querySelector(".cancel-btn");

    this.chartCanvas = this.element.querySelector(".radar-chart");
  }

  setupChart() {
    this.chart = new RaChart(this.chartCanvas, this.ratings);
  }

  setupEventListeners() {
    this.deleteBtn.addEventListener("click", () => this.handleDelete());
    this.moveBtn.addEventListener("click", () => this.handleMove());
    this.editBtn.addEventListener("click", () => this.handleEdit());
    this.saveBtn.addEventListener("click", () => this.handleSave());
    this.cancelBtn.addEventListener("click", () => this.handleCancel());
  }

  updateDisplay() {
    const ratio = this.output / this.input;
    let type = "Espresso";
    if (ratio <= 1.3) type = "Ristretto";
    if(ratio >=3.5) type = "Lungo";
    if(ratio >= 5) type = "Allonge";

    this.beanElem.textContent = this.bean;
    this.detailsElem.textContent = "Input: " + this.input + "g | Output: " + this.output + "g | Time: " + this.time + "s";
    this.ratioElem.textContent = "Ratio: 1:" + ratio.toFixed(1) + " (" + type + ")";
    this.notesDisplay.value = this.notes;
  }

  handleEdit() {
   // if (this.isEditing) return;

    this.toggleElements(false);

    this.editBean.value = this.bean;
    this.editInput.value = this.input;
    this.editOutput.value = this.output;
    this.editTime.value = this.time;
    this.editNotes.value = this.notes;



    this.editForm.style.display = "block";
    //this.isEditing = true;
  }

  handleSave() {
    this.bean = this.editBean.value;
    this.input = this.editInput.valueAsNumber;
    this.output = this.editOutput.valueAsNumber;
    this.time = this.editTime.valueAsNumber;
    this.notes = this.editNotes.value;

    for (let key in this.ratingInputs) {
     this.ratings[key] = this.ratingInputs[key].valueAsNumber;
    }

    this.chart.updateRatings(this.ratings);

    this.toggleElements(true);
    this.updateDisplay();
    this.isEditing = false;
  }

  toggleElements(show) {
    let display = show ? "" : "none";

    this.beanElem.style.display = display;
    this.detailsElem.style.display = display;
    this.ratioElem.style.display = display;
    this.notesDisplay.style.display = display;
    this.deleteBtn.style.display = display;
    this.editBtn.style.display = display;
    this.moveBtn.style.display = display;
    this.chartCanvas.style.display = display;
    this.editForm.style.display = show ? "none" : "";
  }

  handleCancel() {
    this.toggleElements(true);
    this.isEditing = false;
  }

  handleDelete() {
    this.mover.stopMoving();
    this.element.remove();
  }

  handleMove() {
    this.mover.startMoving(this);
  }

  updateCategory(newCategory) {
    this.element.classList.remove(this.category);
    this.category = newCategory;
    this.element.classList.add(this.category);
    this.updateChartColors();
  }

  updateChartColors() {
    const colors = {
      good: "rgba(76, 175, 80, 0.2)",
      ok: "rgba(255, 152, 0, 0.2)",
      bad: "rgba(244, 67, 54, 0.2)"
    };
    const borderColors = {
      good: "green",
      ok: "orange",
      bad: "red"
    };

    this.chart.chart.data.datasets[0].backgroundColor = colors[this.category];
    this.chart.chart.data.datasets[0].borderColor = borderColors[this.category];
    this.chart.chart.update();
  }
}

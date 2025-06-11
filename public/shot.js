export default class Shot {
  constructor(bean, input, output, time, mover, category = "ok", notes) {
    this.bean = bean;
    this.input = input;
    this.output = output;
    this.time = time;
    this.mover = mover;
    this.category = category;
    this.notes = notes;

    const template = document.getElementById("shotTemplate");
    this.element = template.content.cloneNode(true).querySelector(".shot-card");
    this.element.classList.add(this.category);
    this.element.setAttribute("data-category", this.category);

    this.beanElem = this.element.querySelector(".bean");
    this.detailsElem = this.element.querySelector(".details");
    this.ratioElem = this.element.querySelector(".ratio");
    this.deleteBtn = this.element.querySelector(".delete");
    this.moveBtn = this.element.querySelector(".move");
    this.editBtn = this.element.querySelector(".edit");
    this.notesElem = this.element.querySelector(".notes");

    this.updateDisplay();

    this.handleDelete = this.handleDelete.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.deleteBtn.addEventListener("click", this.handleDelete);
    this.moveBtn.addEventListener("click", this.handleMove);
    this.editBtn.addEventListener("click", this.handleEdit);
  }

  updateDisplay() {
    const ratio = this.output / this.input;

    let type = "Espresso";
    if (ratio <= 1.5) type = "Ristretto";
    else if(ratio >= 3) type = "Lungo";
    
    this.beanElem.textContent = this.bean;
    this.detailsElem.textContent = "Input: " + this.input + "g | Output: " + this.output + "g | Time: " + this.time + "s";
    this.ratioElem.textContent = "Ratio: 1:" + (this.output / this.input).toFixed(1) + "  (" + type + ")";
    this.notesElem.textContent = this.notes || "No notes";


    const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 150;
  canvas.style.marginTop = "10px";
  this.element.appendChild(canvas);


  }

  updateCategory(newCategory) {
    this.element.classList.remove(this.category);
  
    this.category = newCategory;
    this.element.classList.add(this.category);
    this.element.setAttribute("data-category", this.category);
  }

  handleDelete() {
    this.mover.stopMoving();
    this.element.remove();
  }

  handleMove() {
    this.mover.startMoving(this);
  }

  handleEdit() {
    const form = document.createElement("form");
    form.className = "edit-form";
    
    const beanInput = document.createElement("input");
    beanInput.type = "text";
    beanInput.value = this.bean;
    beanInput.placeholder = "Bohnensorte";
    beanInput.required = true;
    
    const inputInput = document.createElement("input");
    inputInput.type = "number";
    inputInput.value = this.input;
    inputInput.placeholder = "Input (g)";
    inputInput.required = true;
    inputInput.min = 0;
    inputInput.step = 1;
    
    const outputInput = document.createElement("input");
    outputInput.type = "number";
    outputInput.value = this.output;
    outputInput.placeholder = "Output (g)";
    outputInput.required = true;
    outputInput.min = 0;
    outputInput.step = 1;
    
    const timeInput = document.createElement("input");
    timeInput.type = "number";
    timeInput.value = this.time;
    timeInput.placeholder = "Time (s)";
    timeInput.required = true;
    timeInput.min = 0;

    const notesInput = document.createElement("textarea");
    notesInput.value = this.notes;
    notesInput.placeholder = "Notes";
    notesInput.rows = 3;
    
    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.textContent = "Save";
    
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";
    cancelButton.style.backgroundColor = "#6c757d";
    
    form.append(beanInput, inputInput, outputInput, timeInput,notesInput, saveButton, cancelButton);
    
    //save
    const originalContent = this.element.innerHTML;
    this.element.replaceChildren(form);
    

    const handleSubmit = (e) => {
      e.preventDefault();
      this.bean = beanInput.value;
      this.input = parseFloat(inputInput.value);
      this.output = parseFloat(outputInput.value);
      this.time = parseInt(timeInput.value);
      this.notes = notesInput.value;
      
      // 
      const ratio = this.output / this.input;
      let newCategory = "ok";
      if (ratio >= 1.8 && ratio <= 2.2 && this.time >= 25 && this.time <= 35) newCategory = "good";
      else if (ratio < 1.5 || ratio > 2.5 || this.time < 20 || this.time > 40) newCategory = "bad";
      
      this.updateCategory(newCategory);
      
      
      this.element.innerHTML = originalContent;
      
      // rebind
      this.beanElem = this.element.querySelector(".bean");
      this.detailsElem = this.element.querySelector(".details");
      this.ratioElem = this.element.querySelector(".ratio");
      this.deleteBtn = this.element.querySelector(".delete");
      this.notesElem = this.element.querySelector(".notes");
      this.moveBtn = this.element.querySelector(".move");
      this.editBtn = this.element.querySelector(".edit");
      
     
      this.updateDisplay();
      


    
      this.deleteBtn.addEventListener("click", this.handleDelete);
      this.moveBtn.addEventListener("click", this.handleMove);
      this.editBtn.addEventListener("click", this.handleEdit);
    };
    
    const handleCancel = () => {
      this.element.innerHTML = originalContent;
      
  
      this.beanElem = this.element.querySelector(".bean");
      this.detailsElem = this.element.querySelector(".details");
      this.ratioElem = this.element.querySelector(".ratio");
      this.deleteBtn = this.element.querySelector(".delete");
      this.moveBtn = this.element.querySelector(".move");
      this.editBtn = this.element.querySelector(".edit");
      this.notesElem = this.element.querySelector(".notes");
      
      this.deleteBtn.addEventListener("click", this.handleDelete);
      this.moveBtn.addEventListener("click", this.handleMove);
      this.editBtn.addEventListener("click", this.handleEdit);
    };
    
    form.addEventListener("submit", handleSubmit);
    cancelButton.addEventListener("click", handleCancel);
  }
  
}
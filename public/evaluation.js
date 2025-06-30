export default class Evaluation {
  constructor() {
    this.movingCard = null;
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  startMoving(card) {
    this.stopMoving();
    this.movingCard = card;
    this.movingCard.element.classList.add("moving");
    
    
    const categoryOptions = [
      { key: "good", label: "Good Shot", color: "green" },
      { key: "ok", label: "OK Shot", color: "orange" },
      { key: "bad", label: "Needs Work", color: "red" }
    ];
    
    categoryOptions.forEach(option => {
      if (option.key !== this.movingCard.category) {
        const btn = document.createElement("button");
        btn.textContent = "Move to " +  option.label;
        btn.classList.add("moveHere");
        btn.style.borderColor = option.color;
        btn.style.color = option.color;
        btn.dataset.category = option.key;
        btn.addEventListener("click", this.handleCategoryChange);
        
        this.movingCard.element.insertAdjacentElement("afterend", btn);
      }
    });
  }

  stopMoving() {
    if (this.movingCard) {
      this.movingCard.element.classList.remove("moving");
      this.movingCard = null;
    }
    
    document.querySelectorAll(".moveHere").forEach(btn => btn.remove());
  }

  handleCategoryChange(event) {
    const newCategory = event.currentTarget.dataset.category;
    this.movingCard.updateCategory(newCategory);
    this.stopMoving();
  }
}
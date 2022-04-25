class Ham {

    constructor() {
        this.totalCalories = +document.querySelector(".ham-size:checked")
            .dataset.calor;
        this.setHandlers();
    }

    calorieCalc() {
        document.querySelector(".colories-result")
            .innerHTML = `Всего калорий: ${this.totalCalories}`;
    }

    addCalories(value) {
        this.totalCalories += Number.parseInt(value);
    }

    removeCalories(value) {
        if (this.totalCalories > Number.parseInt(value)) {
            this.totalCalories -= Number.parseInt(value);
        } else {
            this.totalCalories = 0.00;
        }
    }

    setHandlers() {
        document.querySelector(".calc-ham")
            .addEventListener("click", () => {
                this.calorieCalc();
            });

        document.querySelectorAll(".ham-topping")
            .forEach((el) => {
                el.addEventListener("change", event => {
                    if (event.target.checked) {
                        this.addCalories(event.target.dataset.calor);
                    } else {
                        this.removeCalories(event.target.dataset.calor);
                    }
                });
            });

        let prevOption = document.querySelector(".ham-size:checked");
        document.querySelector(".ham-select-size")
            .addEventListener("change", event => {
                if (event.target.selectedOptions[0] !== prevOption) {
                    this.removeCalories(prevOption.dataset.calor);
                    prevOption = event.target.selectedOptions[0];
                    this.addCalories(event.target.selectedOptions[0].dataset.calor);
                }
            });
    }
}

new Ham();








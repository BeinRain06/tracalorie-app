//Calories-tracker

/* caloriesLimit, caloriesConsumed, caloriesBurned, totalRhytmCalories */
class CaloriesTracker {
  constructor() {
    this._caloriesLimit = 1800;
    this._totalRhytmCalories = 0;
    this._meals = [];
    this._workouts = [];
    this._displayTotalRhytmCalories();
    this._displayCaloriesLimit();
    this._displayCaloriesBurned();
    this._displayCaloriesConsumed();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }

  // public method
  addMeal(meal) {
    this._totalRhytmCalories += meal.calories;
    this._meals.push(meal);
    this._render();
    console.log(this._meals);
  }
  addWorkout(workout) {
    this._totalRhytmCalories -= workout.calories;
    this._workouts.push(workout);
    this._render();
  }

  removeMeal(id) {
    const mealToThrow = this._meals.find((element) => element.id === id);

    if (mealToThrow !== undefined) {
      this._totalRhytmCalories -= mealToThrow.calories;
    }

    const itemId = this._meals.findIndex((element) => element.id === id);

    if (itemId !== -1) {
      this._meals.splice(itemId, 1);
    }

    this._render();
  }

  removeWorkout(id) {
    const workoutToThrow = this._workouts.find((element) => element.id === id);

    if (workoutToThrow !== undefined) {
      this._totalRhytmCalories += workoutToThrow.calories;
    }

    const itemId = this._workouts.findIndex((element) => element.id === id);

    if (itemId !== -1) {
      this._workouts.splice(itemId, 1);
    }

    this._render();
  }

  setLimit(caloriesLimit) {
    this._caloriesLimit = caloriesLimit;
    this._displayCaloriesLimit();
    this._render();
  }

  reset() {
    //reset stats
    this._meals = [];
    this._workouts = [];
    this._totalRhytmCalories = 0;

    this._render();
  }

  //private method
  _displayCaloriesLimit() {
    const caloriesLimit = document.getElementById("calories-limit");

    caloriesLimit.innerHTML = this._caloriesLimit;
  }

  _displayTotalRhytmCalories() {
    const totalRhytmCalories = document.getElementById("calories-total");

    totalRhytmCalories.innerHTML = this._totalRhytmCalories;
  }

  _displayCaloriesBurned() {
    let caloriesBurned = document.getElementById("calories-burned");
    caloriesBurned.innerHTML = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
  }

  _displayCaloriesConsumed() {
    let caloriesConsumed = document.getElementById("calories-consumed");
    caloriesConsumed.innerHTML = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
  }

  _displayCaloriesRemaining() {
    const caloriesRemaining = document.getElementById("calories-remaining");

    const caloriesProgress = document.getElementById("calorie-progress");

    const remaining = this._caloriesLimit - this._totalRhytmCalories;
    caloriesRemaining.innerHTML = remaining;
    if (remaining <= 0) {
      caloriesRemaining.parentElement.parentElement.classList.remove(
        "bg-light"
      );
      caloriesProgress.classList.remove("bg-success");

      caloriesRemaining.parentElement.parentElement.classList.add("bg-danger");
      caloriesProgress.classList.add("bg-danger");
    } else {
      caloriesRemaining.parentElement.parentElement.classList.remove(
        "bg-danger"
      );
      caloriesProgress.classList.remove("bg-danger");

      caloriesRemaining.parentElement.parentElement.classList.add("bg-light");
      caloriesProgress.classList.add("bg-success");
    }
  }

  _displayCaloriesProgress() {
    const caloriesProgress = document.getElementById("calorie-progress");

    const percentage = (this._totalRhytmCalories / this._caloriesLimit) * 100;

    const width = Math.min(percentage, 100);

    caloriesProgress.style.width = `${width}%`;
  }

  _render() {
    /*  this.__displayCaloriesLimit(); */
    this._displayTotalRhytmCalories();
    this._displayCaloriesBurned();
    this._displayCaloriesConsumed();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

// initialize Meal Infos
class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

// initialize Workout Infos
class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class App {
  constructor() {
    this._tracker = new CaloriesTracker();

    // add Events Listeners
    document
      .getElementById("meal-form")
      .addEventListener("submit", this._newAddItem.bind(this, "meal"));

    document
      .getElementById("workout-form")
      .addEventListener("submit", this._newAddItem.bind(this, "workout"));

    document
      .getElementById("filter-meals")
      .addEventListener("keyup", this._filterItem.bind(this, "meals"));

    document
      .getElementById("filter-workouts")
      .addEventListener("keyup", this._filterItem.bind(this, "workouts"));

    document
      .getElementById("reset")
      .addEventListener("click", this._reset.bind(this));

    document
      .getElementById("meal-items")
      .addEventListener("click", this._removeItem.bind(this, "meal"));

    document
      .getElementById("workout-items")
      .addEventListener("click", this._removeItem.bind(this, "workout"));

    document
      .getElementById("limit-form")
      .addEventListener("submit", this._setLimit.bind(this));
  }

  _newAddItem(type, e) {
    e.preventDefault();

    const typeEl = type === "meal" ? "meal" : "workout";

    const newItems = document.getElementById(`${typeEl}-items`);

    const name = document.getElementById(`${typeEl}-name`);

    const calories = document.getElementById(`${typeEl}-calories`);

    if (name.value === "" || calories.value === "") {
      alert("None effective. Fill all fields");
      return;
    }

    const item =
      typeEl === "meal"
        ? new Meal(name.value, +calories.value)
        : new Workout(name.value, +calories.value);

    let bgColor = "";

    if (typeEl === "meal") {
      this._tracker.addMeal(item);
      bgColor = "bg-primary";
    }
    if (typeEl === "workout") {
      this._tracker.addWorkout(item);
      bgColor = "bg-secondary";
    }

    const card = document.createElement("div");

    card.classList.add("card", "my-2");
    card.setAttribute("data-id", `${item.id}`);

    card.innerHTML = `
    <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${item.name}</h4>
                  <div
                    class="fs-1 ${bgColor} text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${item.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>`;

    newItems.appendChild(card);

    // reset empty input
    name.value = "";
    calories.value = "";

    // close our form with collapse bootstrap

    const collapseItem = document.getElementById(`collapse-${typeEl}`);

    const bsCollapse = new bootstrap.Collapse(collapseItem, { toggle: true });

    bsCollapse.hide();
  }

  _removeItem(type, e) {
    e.preventDefault();
    let typeEl = type === "meal" ? "meal" : "workout";
    console.log(e.target);
    console.log(this._tracker._meals);
    if (
      e.target.classList.contains("delete") ||
      e.target.classList.contains("fa-xmark")
    ) {
      const id = e.target.closest(".card", ".my-2").getAttribute("data-id");

      console.log(id);

      typeEl = "meal"
        ? this._tracker.removeMeal(id)
        : this._tracker.removeWorkout(id);

      e.target.closest(".card", ".my-2").remove();
    }
  }

  _filterItem(type, e) {
    const typeEl = type === "meals" ? "meal" : "workout";
    const items = document.querySelectorAll(`#${typeEl}-items .card`);
    let text = e.target.value.trim().toLowerCase();
    console.log(e.target.value);
    console.log(items);
    if (text.innerHTML === "") {
      items.forEach((element) => element);
    } else {
      items.forEach((element) => {
        const name = element.firstElementChild.firstElementChild.innerText;
        if (name.toLowerCase().indexOf(text) !== -1) {
          return element.classList.remove("hidden");
        } else {
          return element.classList.add("hidden");
        }
      });
    }
  }

  _setLimit(e) {
    e.preventDefault();
    const limit = document.getElementById("limit");

    if (limit.value === "" || typeof +limit.value !== "number") {
      alert("please add a limit");
      return;
    }

    this._tracker.setLimit(+limit.value);
    limit.value = "";

    //hide Modal form
    const modalEl = document.getElementById("limit-modal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }

  _reset(e) {
    e.preventDefault();

    // reset stats
    this._tracker.reset();

    //reset progress bar
    const caloriesProgress = document.getElementById("calorie-progress");
    caloriesProgress.style.width = `0%`;

    //reset filter
    document.getElementById("filter-meals").value = "";
    document.getElementById("filter-workouts").value = "";
    document.getElementById("meal-items").innerHTML = "";
    document.getElementById("workout-items").innerHTML = "";
  }
}

const app = new App();

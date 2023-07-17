//Calories-tracker

/* caloriesLimit, caloriesConsumed, caloriesBurned, totalRhytmCalories */
class CaloriesTracker {
  constructor() {
    this._caloriesLimit = Storage.getCaloriesLimit();
    this._totalRhytmCalories = Storage.getTotalRhytmCalories();
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();
    this._displayTotalRhytmCalories();
    this._displayCaloriesLimit();
    this._displayCaloriesBurned();
    this._displayCaloriesConsumed();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();

    document.getElementById("limit").value = this._caloriesLimit;

    this.loaderItems();
  }

  // public method
  addMeal(meal) {
    this._totalRhytmCalories += meal.calories;
    this._meals.push(meal);
    this._displayNewMeal(meal);
    this._render();

    Storage.setTotalRhytmCalories(this._totalRhytmCalories);
    Storage.saveMeal(meal);
  }
  addWorkout(workout) {
    this._totalRhytmCalories -= workout.calories;
    this._workouts.push(workout);
    this._displayNewWorkout(workout);
    this._render();

    Storage.setTotalRhytmCalories(this._totalRhytmCalories);
    Storage.saveWorkout(workout);
  }

  removeMeal(id) {
    const mealToThrow = this._meals.find((element) => element.id === id);

    if (mealToThrow !== undefined) {
      this._totalRhytmCalories -= mealToThrow.calories;
      Storage.setTotalRhytmCalories(this._totalRhytmCalories);
    }

    const itemId = this._meals.findIndex((element) => element.id === id);

    if (itemId !== -1) {
      this._meals.splice(itemId, 1);
      Storage.removeMeal(itemId);
    }

    this._render();
  }

  removeWorkout(id) {
    const workoutToThrow = this._workouts.find((element) => element.id === id);
    console.log(workoutToThrow);
    if (workoutToThrow !== undefined) {
      this._totalRhytmCalories += workoutToThrow.calories;
      Storage.setTotalRhytmCalories(this._totalRhytmCalories);
    }

    const itemId = this._workouts.findIndex((element) => element.id === id);

    if (itemId !== -1) {
      this._workouts.splice(itemId, 1);
      Storage.removeWorkout(itemId);
    }

    this._render();
  }

  setLimit(caloriesLimit) {
    this._caloriesLimit = caloriesLimit;
    Storage.setCaloriesLimit(this._caloriesLimit);
    this._displayCaloriesLimit();
    this._render();
  }

  loaderItems() {
    this._meals.forEach((meal) => this._displayNewMeal(meal));
    this._workouts.forEach((workout) => this._displayNewWorkout(workout));
  }

  reset() {
    //reset
    Storage.clearAll();
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

  _displayNewMeal(meal) {
    const mealItems = document.getElementById("meal-items");

    const card = document.createElement("div");

    card.classList.add("card", "my-2");
    card.setAttribute("data-id", `${meal.id}`);

    card.innerHTML = `
    <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>`;

    mealItems.appendChild(card);
  }

  _displayNewWorkout(workout) {
    const workoutItems = document.getElementById("workout-items");

    const card = document.createElement("div");

    card.classList.add("card", "my-2");
    card.setAttribute("data-id", `${workout.id}`);

    card.innerHTML = `
    <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>`;

    workoutItems.appendChild(card);
  }

  _render() {
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
class Storage {
  static getCaloriesLimit(defaulltLimit = 2000) {
    let caloriesLimit;
    if (localStorage.getItem("caloriesLimit") === null) {
      caloriesLimit = defaulltLimit;
    } else {
      caloriesLimit = +localStorage.getItem("caloriesLimit");
    }
    return caloriesLimit;
  }

  static setCaloriesLimit(caloriesLimit) {
    localStorage.setItem("caloriesLimit", caloriesLimit);
  }

  static getTotalRhytmCalories(defaultTotal = 0) {
    let caloriesTotal;
    if (localStorage.getItem("totalRhytmCalories") === null) {
      caloriesTotal = defaultTotal;
    } else {
      caloriesTotal = +localStorage.getItem("totalRhytmCalories");
    }
    return caloriesTotal;
  }

  static setTotalRhytmCalories(caloriesTotal) {
    localStorage.setItem("totalRhytmCalories", caloriesTotal);
  }

  static getMeals() {
    let meals;
    if (localStorage.getItem("mealItems") === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem("mealItems"));
    }

    return meals;
  }

  static saveMeal(meal) {
    const meals = Storage.getMeals();
    console.log(meals);
    meals.push(meal);
    localStorage.setItem("mealItems", JSON.stringify(meals));
  }

  static getWorkouts() {
    let workouts;
    if (localStorage.getItem("workoutItems") === null) {
      workouts = [];
    } else {
      workouts = JSON.parse(localStorage.getItem("workoutItems"));
    }
    return workouts;
  }

  static saveWorkout(workout) {
    const workouts = Storage.getWorkouts();
    workouts.push(workout);
    localStorage.setItem("workoutItems", JSON.stringify(workouts));
  }

  static removeMeal(id) {
    const meals = Storage.getMeals();
    const idIndex = meals.findIndex((meal) => meal.id === id);
    meals.splice(idIndex, 1);
    localStorage.setItem("mealItems", JSON.stringify(meals));
  }

  static removeWorkout(id) {
    const workouts = Storage.getWorkouts();
    const idIndex = workouts.findIndex((workout) => workout.id === id);
    workouts.splice(idIndex, 1);
    localStorage.setItem("workoutItems", JSON.stringify(workouts));
  }

  static clearAll() {
    localStorage.removeItem("totalRhytmCalories");
    localStorage.removeItem("mealItems");
    localStorage.removeItem("workoutItems");
  }
}

//App UI Class
class App {
  constructor() {
    this._tracker = new CaloriesTracker();

    // add Events Listeners
    this._loaderEvent();
  }

  _loaderEvent() {
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

    /*  let bgColor = ""; */

    if (typeEl === "meal") {
      const meal = item;
      this._tracker.addMeal(item);
    }
    if (typeEl === "workout") {
      const workout = item;
      this._tracker.addWorkout(item);
    }

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

      typeEl === "meal"
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

    /* localStorage.clear(); */
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

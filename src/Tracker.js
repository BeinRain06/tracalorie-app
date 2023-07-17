import Storage from "./Storage";

//Calories-tracker

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

export default CaloriesTracker;

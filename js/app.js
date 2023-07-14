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
  }
  addWorkout(workout) {
    this._totalRhytmCalories -= workout.calories;
    this._workouts.push(workout);
    this._render();
  }

  //private method
  _displayCaloriesLimit() {
    const caloriesLimit = document.getElementById("calories-limit");

    caloriesLimit.innerHTML = this._caloriesLimit;
    console.log(caloriesLimit);
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
    const remaining = this._caloriesLimit - this._totalRhytmCalories;
    caloriesRemaining.innerHTML = remaining;
    if (remaining > 0) {
      caloriesRemaining.parentElement.parentElement.style.className =
        "card bg-light";
    } else {
      caloriesRemaining.parentElement.parentElement.style.className =
        "card bg-danger";
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

const calories_Tracker = new CaloriesTracker();

const meal = new Meal("breakfast", 1500);
const run = new Workout("running", 350);

const morningEat = calories_Tracker.addMeal(meal);
const runningRoutine = calories_Tracker.addWorkout(run);

morningEat;
runningRoutine;

console.log(calories_Tracker);

class App {
  constructor() {
    this._tracker = new CaloriesTracker();
  }

  eventHandler() {
    // add Events Listeners
    document
      .getElemenById("meal-form")
      .addEventListener("submit", this.newAddItem.bind(this, type));
  }

  _newAddItem(type, e) {
    e.preventDefault();
  }
}

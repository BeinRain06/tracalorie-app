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

export default Storage;

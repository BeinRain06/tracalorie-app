import "@fortawesome/fontawesome-free/js/all";
import { Modal, Collapse } from "bootstrap";
import CaloriesTracker from "./Tracker";
import { Meal, Workout } from "./Item";

import "./css/bootstrap.css";
import "./css/style.css";

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

    const bsCollapse = new Collapse(collapseItem, { toggle: true });

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
    const modal = Modal.getInstance(modalEl);
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

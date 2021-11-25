// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "controllers"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------
import { Application } from "stimulus"
import Chart from "stimulus-chartjs"
import { openCity } from '../components/tab';

const application = Application.start()
application.register("chart", Chart)

document.addEventListener('turbolinks:load', () => {
  // Call your JS functions here
  openCity();
});

// External imports
import "bootstrap";

import "controllers"
// Internal imports, e.g:
import { initMeetingCable } from '../channels/meeting_channel';

document.addEventListener('turbolinks:load', () => {
  // Call your functions here, e.g:
  // initSelect2();
  initMeetingCable();
});

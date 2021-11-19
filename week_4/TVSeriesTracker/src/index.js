import { series } from "./data.js";
import { fancyLogSeriesReport } from "./utils.js";

export function SeriesTracker(series) {
  this.numberOfWatched = 0;
  this.numberOfUnWatched = 0;
  this.series = [];
  this.lastSerie = undefined;
  this.currentSerie = undefined;
  this.nextSerie = undefined;

  this.add = function (serie) {
    // Add serie to the series list with updating [
    // lastSerie, currentSerie, nextSerie, numberOfWatched, numberOfUnWatched
    // ] props.
    this.series.push(serie);
    if (serie.isWatched) {
      // Set the last serie
      if (!this.lastSerie) {
        this.lastSerie = serie;
      } else {
        // Convert date strings to yyyy.mm.dd format to handle date comparison with
        // a simple string comparison.
        let lastSerieFD = this.lastSerie.finishedDate.split(".").reverse().join(".");
        let serieFD = serie.finishedDate.split(".").reverse().join(".");
        if (lastSerieFD < serieFD) {
          this.lastSerie = serie;
        }
      }
      // Update number of whatched
      this.numberOfWatched = this.numberOfWatched + 1;
    } else {
      // Set current serie and next serie
      if (serie.isCurrent) {
        this.currentSerie = serie;
      } else if (!this.nextSerie) {
        this.nextSerie = serie;
      }
    }
    // Update number of unwhatched
    this.numberOfUnWatched = this.series.length - this.numberOfWatched;
  };

  // Check to see if we have series to process
  if (series.length > 0) {
    // Loop through all of the series in the "series" argument
    // Push them to add function
    series.forEach((serie) => this.add(serie));
  }

  this.finishSerie = function () {
    // Get date in dd.mm.yyyy format
    let date = new Date();
    let formattedDate = date.toISOString().substring(0, 10).split("-").reverse().join(".");
    // Update current serie props before assigning it to lastSerie
    this.currentSerie = {
      ...this.currentSerie,
      isWatched: true,
      isCurrent: false,
      finishedDate: formattedDate
    };
    // Set new last serie
    this.lastSerie = this.currentSerie;

    // Update next serie props before assigning it to currentSerie
    this.nextSerie.isCurrent = true;
    // Set new current serie
    this.currentSerie = this.nextSerie;
    // Set new next serie
    this.series.forEach((serie) => {
      if (
        this.nextSerie === this.currentSerie &&
        !serie.isCurrent &&
        !serie.isWatched
      ) {
        this.nextSerie = serie;
      }
    });
    // Update the statistics
    this.numberOfWatched = this.numberOfWatched + 1;
    this.numberOfUnWatched = this.series.length - this.numberOfWatched;
  };
  this.printSeriesReport = function () {
    fancyLogSeriesReport(this);
  };
}

// Case 1
// -------------------------------------------------

/* const mySeriesTracker = new SeriesTracker(series);
mySeriesTracker.printSeriesReport(); */

// Case 2
// -------------------------------------------------

/* const mySeriesTracker = new SeriesTracker(series);
mySeriesTracker.finishSerie();
mySeriesTracker.printSeriesReport(); */

// Case 3
// -------------------------------------------------

/* const mySeriesTracker = new SeriesTracker(series);
const newSerie = {
  id: "9",
  name: "Lost",
  genre: "Adventure",
  directorId: "4"
};
mySeriesTracker.add(newSerie);
mySeriesTracker.printSeriesReport();*/

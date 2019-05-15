/*
 * CCSA Final Class Grade Calculator
 * Coded by Matthew J, https://mattajones.com
 * This document and all linked documents licensed under the MIT License, https://opensource.org/licenses/MIT
 */

//Sliders
const mp1Slider = document.getElementById("mp1");
const mp2Slider = document.getElementById("mp2");
const mp3Slider = document.getElementById("mp3");
const mp4Slider = document.getElementById("mp4");
const midTermSlider = document.getElementById("midTerm");
const finalSlider = document.getElementById("final");

//Final End of Year Grade and Point Value Labels
const finalEndOfYearGrade = document.getElementById("finalEndOfYearGrade");
const finalPointValue = document.getElementById("finalPointValue");

//Grade Labels
var mp1Grade = document.getElementById("mp1Current");
var mp2Grade = document.getElementById("mp2Current");
var mp3Grade = document.getElementById("mp3Current");
var mp4Grade = document.getElementById("mp4Current");
var midTermGrade = document.getElementById("midTermCurrent");
var finalGrade = document.getElementById("finalCurrent");

//Final End of Year Point Value
var calculatedGrade = recalc();

//MP1 Event Listener
mp1Slider.addEventListener("input", function () {
    //Change value of label to selected grade
    mp1Grade.value = changeGrade(mp1Slider.value);
    //Recalculate final calculated grade
    calculatedGrade = recalc();
});

//MP2 Event Listener
mp2Slider.addEventListener("input", function () {
    //Change value of label to selected grade
    mp2Grade.value = changeGrade(mp2Slider.value);
    //Recalculate final calculated grade
    calculatedGrade = recalc();
});

//MP3 Event Listener
mp3Slider.addEventListener("input", function () {
    //Change value of label to selected grade
    mp3Grade.value = changeGrade(mp3Slider.value);
    //Recalculate final calculated grade
    calculatedGrade = recalc();
});

//MP4 Event Listener
mp4Slider.addEventListener("input", function () {
    //Change value of label to selected grade
    mp4Grade.value = changeGrade(mp4Slider.value);
    //Recalculate final calculated grade
    calculatedGrade = recalc();
});

//Mid Term Event Listener
midTermSlider.addEventListener("input", function () {
    //Change value of label to selected grade
    midTermGrade.value = changeGrade(midTermSlider.value);
    //Recalculate final calculated grade
    calculatedGrade = recalc();
});

//Final Event Listener
finalSlider.addEventListener("input", function () {
    //Change value of label to selected grade
    finalGrade.value = changeGrade(finalSlider.value);
    //Recalculate final calculated grade
    calculatedGrade = recalc();
});

//Change Grade
function changeGrade(val) {
    switch (val) {
        case "4":
            return "A";
        case "3":
            return "B";
        case "2":
            return "C";
        case "1":
            return "D";
        case "0":
            return "F";
        case "-1":
            return "N/A";
        default:
            return "Error";
    }
}

//Recalculate the final grade
function recalc() {
    //Parse all values as ints
    var mp1Int = parseInt(mp1Slider.value);
    var mp2Int = parseInt(mp2Slider.value);
    var mp3Int = parseInt(mp3Slider.value);
    var mp4Int = parseInt(mp4Slider.value);
    var midTermInt = parseInt(midTermSlider.value);
    var finalInt = parseInt(finalSlider.value);

    //Final point value
    var endOfYearGrade;

    //Determine Denominator and Midterm/Final Calculator
    var denom = 10;
    var midTermCalc;
    var finalCalc;
    if (midTermInt === -1) {
        denom--;
        midTermCalc = 0;
    } else {
        midTermCalc = midTermInt;
    }
    if (finalInt === -1) {
        denom--;
        finalCalc = 0;
    } else {
        finalCalc = finalInt;
    }

    //Count MP failures
    var failures = 0;
    if (mp1Int === 0) {
        failures++;
    }
    if (mp2Int === 0) {
        failures++;
    }
    if (mp3Int === 0) {
        failures++;
    }
    if (mp4Int === 0) {
        failures++;
    }

    //If there are 3 MP Failures, fail the class
    if (failures >= 3) {
        endOfYearGrade = 0;
    } else {
        endOfYearGrade = (((mp1Int * 2) + (mp2Int * 2) + (mp3Int * 2) + (mp4Int * 2) + midTermCalc + finalCalc) / denom);
    }

    //Update the End of Year Grades
    displayEndOfYearGrade(endOfYearGrade);

    //Return the point value
    return endOfYearGrade;
}

//Display the end of year grades
function displayEndOfYearGrade(point) {
    //Letter Grade Calculation
    var EOYGrade;
    if (point >= 3.5) {
        EOYGrade = 'A';
    } else if (point >= 2.5) {
        EOYGrade = 'B';
    } else if (point >= 1.5) {
        EOYGrade = 'C';
    } else if (point >= 0.6) {
        EOYGrade = 'D';
    } else {
        EOYGrade = 'F';
    }

    //Display values (points rounded to the nearest two decimal places)
    finalPointValue.value = round(point, 2);
    finalEndOfYearGrade.value = EOYGrade;
}

//Round the given value to the given percision
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

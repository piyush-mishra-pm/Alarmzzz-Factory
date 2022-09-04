# Alarmz Factory:

A place where users create and manage a list of alarms. Coding Ninja's Frontend project assignment. Uses HTML, CSS and JS.

> Video Walkthrough below:
> [![Video Walkthrough](https://img.youtube.com/vi/UFlUNc_c8JI/maxresdefault.jpg)](https://youtu.be/UFlUNc_c8JI)

## Features:

-   Current time display (updated every sec).
-   Ability to create, update and delete alarms and even disaable alarms.
    -   Updation or creation of alarm checks for validation (allows only alarm date times in future only).
    -   Evey alarm displays name, date, and time remaining to finish (if alarm is active).
-   Persistence of alarms created, in browser's local storage.

## Tech Features:

-   **HTML**:
    -   Template usage of a common Alarm List item, used in the three alarms sections (active, disabled and finished alarms).
-   **CSS**:
    -   Responsive design using Grid Template Areas.
    -   Composition over inheritence. Classes are created for a single responsibility and then their composition is achieved in HTML markup by mentioning/composing those multiple classes there. See `grid-view`, `disable`,`hoverable`.
    -   CSS variables to reuse same CSS code, and but still flexible to offer variety of variable values. See usage of CSS variables of `bg-color-radius-shadow` in `.div-remainingTime` or `.time--div` in `styles/shared.css`.
-   **JS**:
    -   Modularized 'Reactish' kind of JS, where code is separated into separate modules. And a common alarmList is used as a context for these different modules to act upon.
    -   JS OOP priciples used for an AlarmList and Alarm object, whose data and helper functions are also encapsulated within them.
    -   Easily extendable with more properties per alarm. Like adding colors, description to data model.
    -   Event handlers are only attached to the list containers, and not attached on every alarm item. This EventDelegation to parent list, increases performance since very less event listeners there. See `ul` with `id="ul--alarm-disabled"` which is event listener for edit, delete and disabling alarms, through use of class names `listener-edit` `listener-delete` `listener-disable` in `index.html`.

## **Todo**:

-   Choose Time Zone: Allow alarms to be created for different timezones.
-   Create Alarms, with: alarm time, tz inherited from tz chosen above, alarm name, color coding (default too).
-   Create Tags for alarms.
-   Graph view of alarms.
-   Show ads for revenue.

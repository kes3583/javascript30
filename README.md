# javascript30

#day5 - find out an bug
-- transitionend detects panel closing as double clicking a panel.
-- remove the transitionend function, then add delay property on css.
-- https://medium.com/@vikash20186/creating-accordion-with-javascript-a33743655474



stylesheets/
|
|-- modules/              # Common modules
|   |-- _all.scss         # Include to get all modules
|   |-- _utility.scss     # Module name
|   |-- _colors.scss      # Etc...
|   ...
|
|-- partials/             # Partials
|   |-- _base.sass        # imports for all mixins + global project variables
|   |-- _buttons.scss     # buttons
|   |-- _figures.scss     # figures
|   |-- _grids.scss       # grids
|   |-- _typography.scss  # typography
|   |-- _reset.scss       # reset
|   ...
|
|-- vendor/               # CSS or Sass from other projects
|   |-- _colorpicker.scss
|   |-- _jquery.ui.core.scss
|   ...
|
-- main.scss            # primary Sass file


js/
|
|-- js
    |-- index.js


files/
|
|-- about
|   |-- about.html
|    
|-- index.html

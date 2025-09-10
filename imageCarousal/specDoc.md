# What we need to create 🏁
- We need to create a reusable code for creating Image Carousel, allowing
button, keyboard and touch, scroll navigation, allow vertiacl as well as 
horizantal direction. Not just for images but also for cards if user want to.

## What we technically Need 🛠️
1. We need a div for `Image Carousel` that holds buttons, left and right, holds
a `cards container` that hold all cards or images and their `clickable dots`.
2. A `card creator` that takes arguments and return a `card element`
3. A `functionality` that `causes the movement` of images or cards by taking one of two args.
4. UI and `Event listeners` at buttons at dots at image carousel itself for scrolling and touch.
5. A `way to export` this funcionality to be used by a devloper to easily create carousels.

### 5. Use Class
- We are going to use a class ImageCarousel that will take arguments and will create a 
new instance of an Image carousel with additional methods for addingCards or removing
them by ID, and a method for controlling automatic movements timings.
- This class constructor will take these arguments
    - A dom element that will hold this image carousel, 
    - A nav object with two properties keyboardNavigation and scrolling true or false
    - An array of objects that holds all the items needed to add in cards section
    - An object that holds these properties, width with a css value, 
    height with a css value, direction either vertical or horizantal value
    - Lastly an object for scrolling behaviour with properties of boolean autoScrolling, 
    if auto is true time in number miliseconds, loop with two possilbe string values finite or infinte
    - 
### 3. Use an object and a function
-  We are going to use an object for keeping track of current card which have methods
to control the movements of cards so do the dots.
- This object holds an array for holding all cards and an array for holding all dots
- A seprate function will be used that will interact with this object and eventlisteners.
- This function will take arguments from left right buttons and scrolling and keyboardNav, 
in the form of one of two arguments left or right

### 4. Using alongside 3.
- We are going to create a file that will handle UI and event listeners and will interact
with 3. object and function, will display card view according to the state provided
by that object and will call function as events of movements takes place.
### 2. A function that returns a card element
- We are going to create two functions that returns a created card and object element respectively with the following args.
1. A function that takes and object with `title`, `img`,`details`, `id` and call to action (as it is a clickable card)
2. A function that takes only url attrubute's value of image  to use in carousel and `ID`
### 1. DOM element
- We are going to create an element div.image-carousel with these childs
- left and right sides with an `arrow button` and a `linear-gradient` between a 
highly transparent and a less transparent  colors to show case dimming to cards.
- A central cards holder with one card completely showing and two card's 30 % is shown, 
- A dots holder within the central cards view that have max dots of 5 otherwise equal to the number of cards


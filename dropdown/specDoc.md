# A Dropdown menu npm package

## What we need to create
- A Simple npm package that allows developers to use and create dropdown menues instantly.

## What we technically need
- A class that will take these arguments and create a new drop down.
    - An `action button` arg that will bring menu in DOM or make it disappear.
    - An `eventType` argument that will be the action that makes menu appear. 
    - A `parent` node that will hold the newly created dropdown default will be `button`
    - An `items` array of objects, each `item` of `items` will have `2 to 3` properties.
    1st one will be `label` to use as `textContent` and second will be `value` as `dataset.value` 
    optional value of `disabled` a boolean only needed if want it to be `true`
    - A `navigation` object argument that will have `keyBoardNavigation` boolean value for now
    - An `onSelect` function that will be invoked with itmeDom as argument on clicking the item
- Class will provide these mothods to work dynamically with Dropdowns.
    - `addItem(item)` method for adding a new option in dropdown `item` is the similar object to array of `items`
    - `removeItem(item.dataset.value)` method for removing an option
    - `open` method for showing menue in case of events other that button click
    - `close` method for closing menu
    - `destroy` for removing dropdown completely  
    - `replace(item.dataset.value, item)` for replacing an item
    
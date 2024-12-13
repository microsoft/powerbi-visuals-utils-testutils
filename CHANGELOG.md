## 6.1.2
* Fix 'select' method in MockISelectionManager to allow deselecting selection
* Check if 'callback' is defined in MockISelectionManager
* Add tests for MockISelectionManager

## 6.1.1
* powerbi-visuals-api update to 5.9.0
* Add createOpaqueUtils to IVisualHost mock

## 6.1.0
* Now `createVisualHost` method has only **one parameter** with interface `CreateVisualHostOptions` (includes all previous parameters)
* Added mock service for `IVisualLocalStorageV2Service`
* Added mock service for `IVisualSubSelectionService`

## 6.0.2
* Added missing mock functions

## 6.0.2
* Packages update
* Vulnerabilities patched
* add mock `IAcquireAADTokenService` to `MockIVisualHost`
* add mock method `canDrill` to `MockIVisualHost`

## 6.0.1
* Packages update
* Removed coveralls

## 6.0.0
* Packages update
* Vulnerabilities patched

## 3.2.0
* migrated to `coverage-istanbul-loader` from `istanbul-instrumenter-loader`

## 3.1.0
* updated `powerbi-visual-api` to 5.1.0
* accordingly to PowerBI API v5.1.0, removed `enumerateObjectInstances` method support. Details are available here: [DOC article](https://learn.microsoft.com/en-us/power-bi/developer/visuals/format-pane); 

## 3.0.0
* added `pointerEvent` method to test pointer events
* moved to `eslint` from `tslint`
* updated dependencies to fix vulnerabilities

## 2.6.0
* fix for `uuid`
## 2.5.0
* powerbi-visual-api updated to 4.2.0
* uuid package functionality replaced with crypto method

## 2.4.4
* updated dependencies to fix vulnerabilities

## 2.4.1
* fixed issue with SVGElement failure

## 2.4.0
* added support for matrix dataview

## 2.3.4
* fixed Jquery "each" method usage

## 2.3.3
* d3 dependencies updated

## 2.3.2
* jQuery object usage removed

## 2.3.1
* JQuery.each bugfix

## 2.3.0
* JQuery and Jasmine-Jquery removed.
* JQuery3dClicks interface is not supported any more.

## 2.2.1
* Packages update

## 2.2.0
* Update packages to fix vulnerabilities.
* Update powerbi-visual-api to 2.6.0
* Update MockSelectionBuilder (add withTable, withMatrixNode methods)

## 2.1.7
* Fix select method of MockISelectionManager.
Selection manager should select all passed selections if multiselect is false

## 2.1.6
* Added EventService mock
* Updated SelectionManager mock

## 2.1.5
* Added StorageService mock 

## 2.1.4
* Update packages to fix vulnerabilities

## 2.0.0
 * Moved to webpack 3, commonjs style.

## 1.0.2
 * Added multiple colors logic to mock palette. Only red color was available.

# NgVisibility

Directives that allow you to get information about the visibility of an element on the screen.

## Description
### ngVisibility
`ngVisibility` allows you to know about every change in element visibility.

You can also pass `threshold` input to set the visibility threshold:

`0` - the element is visible if at least part of it is on the screen

`1` - the element is visible if it is completely on the screen (note that elements that are larger than the screen will never become visible)

Default value is `0`.

### ngBecameVisible
`ngBecameVisible` allows you to know when an element became visible. The event is triggered only once and the element visibility tracking stops.

`threshold` input is the same as `ngVisibility`.
## Install

```bash
npm install @stackapp/ng-visibility
```

## Usage
### ngVisibility

Add a directive to your component template and handle the `(visibleChange)` event:
```html
<img ngVisibility (visibleChange)="imageVisibleChange($event)" [threshold]="0">
```
and add a method to your component typescript:
```typescript
imageVisibleChange(event: {isVisible: boolean}): void {
  // some logic
}
```
you also need to add `NgVisibilityModule` to your module imports:
```typescript
imports: [
  ...,
  NgVisibilityModule,
]
```
### ngBecameVisible
Add a directive to your component template and handle the `(becameVisible)` event:
```html
<img ngBecameVisible (becameVisible)="imageBecameVisible()" [threshold]="1">
```
and add a method to your component typescript:
```typescript
imageBecameVisible(): void {
  // some logic
}
```

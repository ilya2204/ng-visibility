import {NgModule} from '@angular/core';
import {NgVisibilityDirective} from './ng-visibility.directive';
import {NgBecameVisibleDirective} from './ng-became-visible.directive';


@NgModule({
  declarations: [
    NgVisibilityDirective,
    NgBecameVisibleDirective
  ],
  imports: [
  ],
  exports: [
    NgVisibilityDirective,
    NgBecameVisibleDirective
  ]
})
export class NgVisibilityModule { }

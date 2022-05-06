import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {VisibilityObserverService} from "./ng-visibility.service";

@Directive({
  selector: '[ngVisibility]'
})
export class NgVisibilityDirective implements AfterViewInit, OnDestroy {

  @Input() threshold: 1 | 0 = 0;
  @Output() visibleChange = new EventEmitter<{ isVisible: boolean }>();

  private onDestroy$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef,
    private visibilityObserverService: VisibilityObserverService
  ) {
  }

  ngAfterViewInit(): void {
    this.visibilityObserverService.observe(this.elementRef.nativeElement, this.threshold).pipe(
      takeUntil(this.onDestroy$),
    ).subscribe(isVisible => this.visibleChange.next({isVisible}));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.visibilityObserverService.unobserve(this.elementRef.nativeElement);
  }
}

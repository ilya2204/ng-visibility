import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {VisibilityObserverService} from "./ng-visibility.service";
import {filter, finalize, take} from "rxjs";

@Directive({
  selector: '[ngBecameVisible]'
})
export class NgBecameVisibleDirective implements AfterViewInit, OnDestroy {

  @Input() threshold: 1 | 0 = 0;
  @Output() becameVisible = new EventEmitter<void>();

  constructor(
    private elementRef: ElementRef,
    private visibilityObserverService: VisibilityObserverService
  ) {
  }

  ngAfterViewInit(): void {
    this.visibilityObserverService.observe(this.elementRef.nativeElement, this.threshold).pipe(
      filter(isVisible => isVisible),
      take(1),
      finalize(() => this.visibilityObserverService.unobserve(this.elementRef.nativeElement))
    ).subscribe(_ => this.becameVisible.next());
  }

  ngOnDestroy() {
    this.visibilityObserverService.unobserve(this.elementRef.nativeElement);
  }
}

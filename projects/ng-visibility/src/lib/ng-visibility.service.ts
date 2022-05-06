import {Observable, Subject} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {Injectable} from "@angular/core";

enum InnerThreshold {
  any = 0,
  full = 0.99
}

type ExternalThreshold = 0 | 1;

@Injectable({providedIn: 'root'})
export class VisibilityObserverService {

  private observer: IntersectionObserver;
  private items: WeakMap<Element, Subject<boolean>> = new WeakMap();
  private itemsThreshold: WeakMap<Element, InnerThreshold> = new WeakMap();

  constructor() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const target = entry.target;
        const subject = this.items.get(target);
        const threshold = this.itemsThreshold.get(target);
        if (subject === undefined || threshold === undefined) {
          this.unobserve(target);
          return
        }
        const intersectionRatio = entry.intersectionRatio;
        let isVisible: boolean;
        if (threshold == 0) {
          isVisible = intersectionRatio !== 0;
        } else {
          isVisible = intersectionRatio >= threshold!;
        }
        subject.next(isVisible);
      })
    }, {threshold: [InnerThreshold.any, InnerThreshold.full]});
  }

  observe(target: Element, threshold: ExternalThreshold = 0): Observable<boolean> {
    const subject = new Subject<boolean>();
    const innerThreshold = VisibilityObserverService.transformThreshold(threshold);
    this.items.set(target, subject);
    this.itemsThreshold.set(target, innerThreshold);
    this.observer.observe(target);
    return subject.pipe(
      distinctUntilChanged(),
    );
  }

  unobserve(target: Element): void {
    this.items.get(target)?.complete();
    this.items.delete(target);
    this.itemsThreshold.delete(target);
    this.observer.unobserve(target);
  }

  // threshold=1 may cause unexpected behavior,
  // so you need to translate it into 0.99
  private static transformThreshold(threshold: ExternalThreshold): InnerThreshold {
    if (threshold == 0) {
      return InnerThreshold.any;
    }
    return InnerThreshold.full;
  }
}

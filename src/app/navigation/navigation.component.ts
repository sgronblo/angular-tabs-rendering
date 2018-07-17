import {
  Component,
  OnInit,
  ContentChild,
  ViewContainerRef,
  ViewRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ContentChildren,
  QueryList,
  TemplateRef
} from '@angular/core';

@Component({
  selector: 'app-navigation-page',
  template: '<ng-content></ng-content>',
})
export class NavigationPageComponent implements AfterViewInit {
  @ContentChild(TemplateRef)
  template: TemplateRef<{}>;

  ngAfterViewInit(): void {
  }
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, AfterViewInit {
  @ContentChildren(NavigationPageComponent)
  pageComponents: QueryList<NavigationPageComponent>;

  index = 0;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  prevPage() {
    if (this.prevOk) {
      this.index -= 1;
    }
  }

  nextPage() {
    if (this.nextOk) {
      this.index += 1;
    }
  }

  get pages() {
    return this.pageComponents.toArray();
  }

  get maxPageIndex() {
    return this.pageComponents.length - 1;
  }

  get currentPage() {
    return this.pages[this.index];
  }

  get currentPageTemplate() {
    return this.currentPage.template;
  }

  get pageIndices() {
    return Array.from({ length: this.pages.length }, (v, k) => k + 1)
  }

  get prevOk() {
    return this.index > 0;
  }

  get nextOk() {
    return this.index < this.maxPageIndex;
  }
}

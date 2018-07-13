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
  QueryList
} from '@angular/core';

@Component({
  selector: 'app-navigation-page',
  template: '<ng-content></ng-content>',
})
export class NavigationPageComponent implements AfterViewInit {
  @ContentChild('content', { read: ViewRef })
  contentViewRef: ViewRef;
  @ContentChild('content', { read: ViewContainerRef })
  contentViewContainerRef: ViewContainerRef;
  @ContentChild('content')
  contentComponent: any;

  ngAfterViewInit(): void {
    console.log('contentViewRef', this.contentViewRef);
    console.log('contentViewContainerRef', this.contentViewContainerRef);
    console.log('contentComponent', this.contentComponent);
  }
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, AfterViewInit {
  @ContentChildren(NavigationPageComponent)
  pages: QueryList<NavigationPageComponent>;
  @ViewChild('display')
  displayElementRef: ElementRef;
  @ViewChild('display', { read: ViewContainerRef })
  displayViewContainerRef: ViewContainerRef;

  index = 0;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log('displayElementRef', this.displayElementRef);
    console.log('displayViewContainerRef', this.displayViewContainerRef);
    this.updatePage();
  }

  prevPage() {
    this.index -= 1;
  }

  nextPage() {
    this.index += 1;
  }

  updatePage() {
    this.displayViewContainerRef.insert(this.pages.toArray()[this.index].contentComponent);
  }
}

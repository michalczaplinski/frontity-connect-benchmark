import { ɵdetectChanges as detectChanges, AfterViewChecked, Component, NgModule, VERSION, ViewContainerRef, TemplateRef } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';

interface Data {
  id: number;
  label: string;
}

// Debugging performance not supported yet
let startTime: number;
let lastMeasure: string;
let startMeasure = function (name: string) {
  startTime = performance.now();
  lastMeasure = name;
};
let stopMeasure = function () {
  var last = lastMeasure;
  if (lastMeasure) {
    window.setTimeout(function () {
      lastMeasure = null;
      var stop = performance.now();
      var duration = 0;
      console.log(last + ' took ' + (stop - startTime));
    }, 0);
  }
};

@Component({
  selector: 'my-app',
  template: `
    <div class="container">
      <div class="jumbotron">
        <div class="row">
          <div class="col-md-6">
            <h1>Angular keyed (ivy renderer)</h1>
          </div>
          <div class="col-md-6">
            <div class="col-sm-6 smallpad">
              <button type="button" class="btn btn-primary btn-block" id="run" (click)="run()" ref="text">
                Create 1,000 rows
              </button>
            </div>
            <div class="col-sm-6 smallpad">
              <button type="button" class="btn btn-primary btn-block" id="runlots" (click)="runLots()">
                Create 10,000 rows
              </button>
            </div>
            <div class="col-sm-6 smallpad">
              <button type="button" class="btn btn-primary btn-block" id="add" (click)="add()" ref="text">
                Append 1,000 rows
              </button>
            </div>
            <div class="col-sm-6 smallpad">
              <button type="button" class="btn btn-primary btn-block" id="update" (click)="update()">
                Update every 10th row
              </button>
            </div>
            <div class="col-sm-6 smallpad">
              <button type="button" class="btn btn-primary btn-block" id="clear" (click)="clear()">
                Clear
              </button>
            </div>
            <div class="col-sm-6 smallpad">
              <button type="button" class="btn btn-primary btn-block" id="swaprows" (click)="swapRows()">
                Swap Rows
              </button>
            </div>
          </div>
        </div>
      </div>
      <table class="table table-hover table-striped test-data">
        <tbody>
        <tr [class.danger]="item.id === selected" *ngFor="let item of data; trackBy: itemById">
          <td class="col-md-1">{{item.id}}</td>
          <td class="col-md-4">
            <a href="#" (click)="select(item, $event)">{{item.label}}</a>
          </td>
          <td class="col-md-1">
            <a href="#" (click)="delete(item, $event)">
              <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </a>
          </td>
          <td class="col-md-6"></td>
        </tr>
        </tbody>
      </table>
      <span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
    </div>
  `
})
export class AppComponent implements AfterViewChecked {
  data: Array<Data> = [];
  selected: number = undefined;
  id: number = 1;
  backup: Array<Data> = undefined;

  constructor() {
    console.info(VERSION.full);
  }

  buildData(count: number = 1000): Array<Data> {
    var adjectives = ['pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain', 'quaint', 'clean', 'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd', 'unsightly', 'adorable', 'important', 'inexpensive', 'cheap', 'expensive', 'fancy'];
    var colours = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'];
    var nouns = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse', 'keyboard'];
    var data: Array<Data> = [];
    for (var i = 0; i < count; i++) {
      data.push({
        id: this.id,
        label: adjectives[this._random(adjectives.length)] + ' ' + colours[this._random(colours.length)] + ' ' + nouns[this._random(nouns.length)]
      });
      this.id++;
    }
    return data;
  }

  _random(max: number) {
    return Math.round(Math.random() * 1000) % max;
  }

  itemById(index: number, item: Data) {
    return item.id;
  }

  select(item: Data, event: Event) {
    startMeasure('select');
    event.preventDefault();
    this.selected = item.id;
    detectChanges(this);
  }

  delete(item: Data, event: Event) {
    event.preventDefault();
    startMeasure('delete');
    for (let i = 0, l = this.data.length; i < l; i++) {
      if (this.data[i].id === item.id) {
        this.data.splice(i, 1);
        break;
      }
    }
    detectChanges(this);
  }

  run() {
    startMeasure('run');
    this.data = this.buildData();
    detectChanges(this);
  }

  add() {
    startMeasure('add');
    this.data = this.data.concat(this.buildData(1000));
    detectChanges(this);
  }

  update() {
    startMeasure('update');
    for (let i = 0; i < this.data.length; i += 10) {
      this.data[i].label += ' !!!';
    }
    detectChanges(this);
  }

  runLots() {
    startMeasure('runLots');
    this.data = this.buildData(10000);
    this.selected = undefined;
    detectChanges(this);
  }

  clear() {
    startMeasure('clear');
    this.data = [];
    this.selected = undefined;
    detectChanges(this);
  }

  swapRows() {
    startMeasure('swapRows');
    if (this.data.length > 998) {
      var a = this.data[1];
      this.data[1] = this.data[998];
      this.data[998] = a;
    }
    detectChanges(this);
  }

  ngAfterViewChecked() {
    stopMeasure();
  }
}

// TODO: The properties would currently be dropped by closure compiler, figure it out
Object.assign(ViewContainerRef, { __NG_ELEMENT_ID__: (ViewContainerRef as any).__NG_ELEMENT_ID__ });
Object.assign(TemplateRef, { __NG_ELEMENT_ID__: (TemplateRef as any).__NG_ELEMENT_ID__ });
Object.assign(NgForOf, { ngDirectiveDef: (NgForOf as any).ngDirectiveDef });
Object.assign(AppComponent, { ngComponentDef: (AppComponent as any).ngComponentDef });

@NgModule({
  imports: [CommonModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}

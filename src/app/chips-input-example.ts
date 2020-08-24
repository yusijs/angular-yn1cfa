import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';

/**
 * @title Chips with input
 */
@Component({
  selector: 'chips-input-example',
  templateUrl: 'chips-input-example.html',
  styleUrls: ['chips-input-example.css'],
})
export class ChipsInputExample {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: string[] = [
    'inod@equinor.com',
    'rhenri@equinor.com',
  ];

  add(event: MatChipInputEvent): void {
    const re = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
    const input = event.input;
    const value = event.value;
    const groups = value.match(re);

    // Validate?
    if (!groups) {
      return;
    }

    // /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gim.exec(value);
    
    groups
      .filter(m => !this.fruits.includes(m))
      .forEach(m => {
      this.fruits.push(m.trim());
    })

    // Add our fruit


    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
}


/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
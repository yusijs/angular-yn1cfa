import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, ViewChild } from "@angular/core";
import { MatChipInputEvent, MatChipList } from "@angular/material/chips";
import { FormControl, Validators } from "@angular/forms";

const patternValidator = pattern => (ctrl: AbstractControl) => {
  const invalid = ctrl.value.filter(v => !pattern.exec(v));
  return invalid.length === 0 ? null : { pattern: invalid };
};

/**
 * @title Chips with input
 */
@Component({
  selector: "chips-input-example",
  templateUrl: "chips-input-example.html",
  styleUrls: ["chips-input-example.css"]
})
export class ChipsInputExample {
  @ViewChild(MatChipList)
  chipList: MatChipList;
  readonly separatorKeysCodes: number[] = [ENTER];
  ctrl = new FormControl(
    ["inod@equinor.com", "rhenri@equinor.com"],
    patternValidator(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/)
  );

  ngOnInit() {
    this.ctrl.statusChanges.subscribe(console.error);
    this.ctrl.valueChanges.subscribe(console.log);
  }

  add(event: MatChipInputEvent): void {
    const re = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
    const input = event.input;
    const value = event.value;
    const groups = value.match(re);

    // Validate?
    // Split by ; & , & validate each line
    if (!groups) {
      return;
    }

    // there are some valid emails at least..
    const split = value.split(/[,;]/);
    const emails = split
      .map(s => {
        return s.match(re) ? s.match(re) : s;
      })
      .flat()
      .filter(m => !(this.ctrl.value || []).includes(m));
    this.ctrl.setValue([...this.ctrl.value, ...emails]);
    console.log(emails);

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(fruit: string): void {
    const index = this.ctrl.value.indexOf(fruit);
    if (index >= 0) {
      const list = [...this.ctrl.value];
      list.splice(index, 1);
      this.ctrl.setValue(list);
    }
  }
}

/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */

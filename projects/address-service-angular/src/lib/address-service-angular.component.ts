import axios from 'axios';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

const appendStarToWords = (str: string) => {
  var words = str.split(/\s+/);
  var modifiedSentence = '';
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    if (i > 0) {
      modifiedSentence += ' ';
    }
    if (word.startsWith('*') || word.startsWith('?')) {
      word = word.substring(1);
    }
    modifiedSentence += word + "*";
  }
  return modifiedSentence;
}

@Component({
  selector: 'lib-address-service-angular',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule,
    MatIconModule,
    MatDividerModule,
  ],
  template: `<div class="container">
    <mat-card>
      <mat-card-content>
        <form class="example-form">
          <h4 class="lable">Address</h4>
          <mat-form-field class="example-full-width" appearance="outline">
            <input
              type="text"
              aria-label="Address"
              matInput
              [formControl]="myControl"
              [matAutocomplete]="auto"
              #searchInput
              (input)="handleSearchAddress($event, searchInput.value)"
            />
            <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
              <ng-container *ngFor="let option of list">
                <mat-option
                  [value]="option.number + ' ' + option.street"
                  (click)="selectObject($event, option)"
                >
                  <div [style.fontWeight]="'500'" [style.font-size]="'16px'">
                    {{ option.number }} {{ option.street }}
                  </div>
                  <div [style.color]="'grey'" [style.font-size]="'13px'">
                    {{ option.city }}, {{ option.region }},
                    {{ option.postcode }}
                  </div>
                </mat-option>
                <mat-divider></mat-divider>
              </ng-container>
            </mat-autocomplete>
            <mat-icon matSuffix>
              <div *ngIf="isLoading">
                <div class="loader"></div>
              </div>
            </mat-icon>
          </mat-form-field>

          <div class="textField">
            <div>
              <h4 class="lable">City</h4>
              <mat-form-field appearance="outline" class="example-half-width">
                <input
                  class="textField"
                  matInput
                  name="city"
                  [(ngModel)]="selectedObject.city"
                />
              </mat-form-field>
            </div>
            <div>
              <h4 class="lable">State</h4>
              <mat-form-field appearance="outline" class="example-half-width">
                <input
                  class="textField"
                  matInput
                  name="region"
                  [(ngModel)]="selectedObject.region"
                />
              </mat-form-field>
            </div>
          </div>
          <div class="secondDiv">
            <h4 class="lable">Zip Code</h4>
            <mat-form-field appearance="outline" class="example-half-width">
              <input
                class="textField"
                matInput
                name="postcode"
                [(ngModel)]="selectedObject.postcode"
              />
            </mat-form-field>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  </div> `,
  styles: [
    `
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin: 20px;
      }
      mat-card {
        width: 80%;
        max-width: 800px;
      }
      .example-full-width {
        width: 100%;
      }
      .example-half-width {
        width: 100%;
      }
      .mat-autocomplete-panel {
        width: 100%;
      }

      .textField {
        display: flex;
        margin-top: -5px;
      }

      .textField > div {
        flex: 1;
        margin-right: 9px; /* Adjust margin as needed */
      }
      .secondDiv {
        margin-top: -5px;
      }
      .lable {
        margin-bottom: 1%;
      }
      .loader {
        margin: auto;
        margin-right: 10px;
        border: 3px solid #f3f3f3;
        border-radius: 50%;
        border-top: 3px solid rgb(65, 161, 213);
        width: 20px;
        height: 20px;
        -webkit-animation: spin 0.9s linear infinite;
        animation: spin 0.9s linear infinite;
      }

      /* Safari */
      @-webkit-keyframes spin {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class AddressServiceAngularComponent implements OnInit {
  @Output() onAddressChange: EventEmitter<any> = new EventEmitter<any>();

  myControl = new FormControl('');
  list: any[] = [];
  selectedObject: any = {};
  isLoading: boolean = false;
  filteredOptions!: Observable<any[]>;
  indexId: string = '1e2tq2';
  apiKey: string = 'hs_2u37ib6w8wz4137f';

  async handleSearchAddress(event: Event, text: any) {
    event.preventDefault();
    this.isLoading = true;
    if (!text) {
      this.list = [];
      this.isLoading = false;
      this.selectedObject = {};
      return;
    }
    
    const [trimmedString, firstWord, secondWord] = (text.trim().match(/^(\S+)(?:\s(.+))?$/) || []).map((str: any) => str || '');
    let luceneQuery = ""
    if (!isNaN(firstWord)) {
      const modifiedStreetQuery = appendStarToWords(secondWord)
      luceneQuery = secondWord ? `number: ${firstWord} AND street: ${modifiedStreetQuery}` : `number: ${firstWord}`
    } else {
      const modifiedStreetQuery = appendStarToWords(trimmedString)
      luceneQuery = `street: ${modifiedStreetQuery}`
    }

    axios
      .post(
        `https://${this.indexId}.hoppysearch.com/v1/search`,
        {
          luceneQuery: luceneQuery,
        },
        {
          headers: {
            Authorization: this.apiKey,
          },
        }
      )
      .then((response) => {
        this.list = response?.data?.documents;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
        this.isLoading = false;
      });
  }

  selectObject(event: Event, selectObject: any) {
    this.selectedObject = selectObject;
    let number = selectObject?.number;
    let street = selectObject?.street;
    const text = number + ' ' + street;
    this.handleSearchAddress(event, text);
    
    
    this.onAddressChange.emit({
      StreetNumber: this.selectedObject?.number,
      Street: this.selectedObject?.street,
      City: this.selectedObject?.city,
      State: this.selectedObject?.region,
      ZipCode: this.selectedObject?.postcode
    });
  }
  ngOnInit(): void {}
}

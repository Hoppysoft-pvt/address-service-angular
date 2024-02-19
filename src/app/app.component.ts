import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddressServiceAngularComponent } from 'address-service-angular';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AddressServiceAngularComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'address-service';
  props = {
    indexId: 'Enter your indexId',
    apiKey: 'Enter your apiKey',
  };
}

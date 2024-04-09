import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddressServiceAngularComponent } from '../../projects/address-service-angular/src/lib/address-service-angular.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AddressServiceAngularComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'address-service';
  handleAddressChange(data: any) {
    console.log('Received data from child:', data);
  }
}

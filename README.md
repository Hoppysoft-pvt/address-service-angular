# Address Service

hoppysearch - AngularJS client for AddressService

## Installation

This project was generated with [Angular CLI](https://angular.io/cli) version 17.2.0
### For [Angular.js](https://angular.io/cli)

### What You Get:

1. Simplify your integration process with this user-friendly Angular component.
2. Automatic suggestions for the Address input field.
3. Address fields auto-populate upon users selection.
4. Editable data fields allowing users to easily update their information, including the option to input addresses effortlessly.

#### To preview the future appearance of the Angular Component, visit the following website:[Address Service Angular Demo](http://address-service-react.s3-website.ap-south-1.amazonaws.com/)

#### npm    
Proceed with the installation by following these steps:

```shell    
npm install address-service-angular --save
```

## Getting Started

Please follow the [installation](#installation) instructions and execute the following AngularJS code:

#### Begin with the initial setup process:

1. Add Angular Material to your project:

#### cmd 

```javascript
ng add @angular/material
```

2. Install the required Axios library:

#### cmd 

```javascript
npm i axios
```

3. Install the address-service-angular package in your Angular project:

#### cmd 

```javascript
npm i address-service-angular
```

4. Import the AddressServiceAngularComponent in your Angular component:

#### typescript

```javascript
import { AddressServiceAngularComponent } from 'address-service-angular';
```

5. Add the component to your Angular module imports:

#### typescript

```javascript
@Component({
        imports: [RouterOutlet, AddressServiceAngularComponent],
})
```

6. Add the component tag in your HTML file:

#### HTML

```javascript
<lib-address-service-angular></lib-address-service-angular>
```

7. If you want to access/modify the selected adderess, then create a function and bind that function to component tag in HTML file like below.

#### typescript

```javascript
<!-- Full Code -->
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
        handleAddressChange(data: any) {
                console.log('Received data from child:', data);
        }
}
```

#### HTML

```html
<lib-address-service-angular (onAddressChange)="handleAddressChange($event)"></lib-address-service-angular>
```

8. And Run ng serve for a dev server. Navigate to http://localhost:3000/. The application will automatically reload if you change any of the source files.

#### cmd

```javascript
ng serve
```

#### If you need video help to install Address Service Angular package then watch this video:[Address Service Angular Demo](https://youtu.be/ZqnBCrX9UQE)

#### You will get such a result:

1. You can type the address you want to search here.
![alt text](https://raw.githubusercontent.com/Hoppysoft-pvt/address-service-angular/main/Capture1.PNG)
2. Now click on the address you want.
![alt text](https://raw.githubusercontent.com/Hoppysoft-pvt/address-service-angular/main/Capture2.PNG)
# Ecommerce using Angular & Tailwind

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.1.


**Modern E-Commerce Platform**

A full-featured online store built with cutting-edge Angular architecture and stylish UI
components.

## **Core Features**

#### **1. Product Display & Discovery**
    - **Interactive Product Cards**
       o High-res images with loading/error states
       o Dynamic star ratings (full/half/empty)
       o Price formatting with currency pipes
       o Category badges with custom styling

    - **Smart Filtering**
       o Category-based navigation (Men/Women/Electronics etc.)
       o Search functionality (can be easily added)

#### **2. Shopping Experience**
    - **Cart System**
       o Add/remove items with quantity management
       o LocalStorage persistence
       o Visual indicators for cart items

    - **Wishlist/Favorites**
       o Heart icon toggles with color feedback
       o Persisted across sessions

#### **3. UI/UX Highlights**
    - **Theming Engine**
       o DaisyUI + Tailwind integration
       o Dark/light mode with OS preference detection
       o Custom theme colors (primary/secondary)

    - **Responsive Design**
       o Mobile-optimized product cards
       o Adaptive navbar (collapsible on mobile)
       o Hover effects and smooth transitions

    -  **Accessibility**
       - Semantic HTML structure
       - Keyboard-navigable components
       - ARIA labels for interactive elements
  
#### **4. Technical Innovations**
    -  **Angular 20 Architecture**
       - Standalone components
       - Signals for reactive state
       - Custom inject() services
  
    -  **Performance Optimizations**
       - Lazy-loading ready
       - Image error handling
       - Efficient change detection

    - **State Management**
       - Shopping cart service
       - Favorites service
       - Theme service with BehaviorSubject

## **Potential Extensions**

1. **User Accounts**
    - Login/auth with Firebase
    - Purchase history
2. **Checkout Flow**
    - Stripe/PayPal integration
    - Address management
3. **Admin Dashboard**
    - Product management
    - Order tracking
4. **Advanced Features**
    - Product reviews
    - Recommendation engine
    - Inventory alerts

## **Tech Stack**

#### **Frontend Styling Tools**
```
  o Angular 19 
  o Tailwind CSS 4 
  o RxJS
  o TypeScript 
  o DaisyUI 
  o LocalStorage
  o Signals 
  o CSS3 
  o Animations 
  o Standalone APIs
```
**This project demonstrates professional-grade Angular development with attention to:**

✔ **Clean Code** (Services, Signals, Typing)

✔ **UI Polish** (Themes, Micro-interactions)

✔ **Scalability** (Modular architecture)


## **Screen Shots**

### Home Page
![Image](/public/images/Screenshot%202025-07-28%20024750.png)
![Image](/public/images/Screenshot%202025-07-28%20024824.png)

### Cart Page
![Image](/public/images/Screenshot%202025-07-28%20025039.png)

### Display Page
![Image](/public/images/Screenshot%202025-07-28%20025019.png)

### Favorites
![Image](/public/images/Screenshot%202025-07-28%20025057.png)

### Search & Sort
![Image](/public/images/Screenshot%202025-07-28%20025125.png)

### Mobile View
![Image](/public/images/Screenshot%202025-07-28%20024857.png)
![Image](/public/images/Screenshot%202025-07-28%20024927.png)
![Image](/public/images/Screenshot%202025-07-28%20025134.png)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# **SPEC-001**\_: Hex Security Access Control System

Choose your prefered language for the README:

- [ <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png" alt="US Flag" width="20" height="15"> ] [English ](README.md)

- [ <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/2560px-Flag_of_Mexico.svg.png" alt="Mexico Flag" width="20" height="15"> ] [Spanish (México)](README.es.md)

## _**Background**_

The Hex web application is designed to enhance security and operational efficiency for residential complexes through robust access control management. It enables various user roles such as Administrators, Guards, and Residents to interact with the system according to their permissions, facilitating the management of access for visitors and residents alike. This system is crucial for modernizing the administrative operations of these complexes, integrating them into digital ecosystems to streamline processes.

## _**Requirements**_

#### **Must Have (MoSCoW)**

- Secure registration and authentication for Administrators, Guards, Residents, and Developers using FirebaseAuth.
- Role-based access control managed through Nest.js middleware to ensure that users can only access features and data appropriate to their role.
- AES-256 encryption for sensitive data to comply with best practices in data security.
- A PostgreSQL database to handle structured data storage needs effectively.
- User-friendly dashboards for each role type, providing tailored data and actionable insights relevant to each user’s responsibilities.
- Real-time updates for access management. Possible technologies include:
  - **Socket.io** - Ideal for real-time bi-directional event-based communication.
- **Firebase Realtime Database** - Integrates well with FirebaseAuth, providing real-time capabilities natively.
- Implementation as Docker images managed within a Docker Compose setup for ease of development and deployment.

#### **Should Have**

- Comprehensive logging and audit trails to facilitate monitoring and compliance with security policies.

#### **Could Have**

- A user-friendly dashboard for each role type, providing tailored data and actionable insights relevant to each user’s responsibilities.
- Advanced analytics features for predictive modeling of access patterns or security breaches.

#### **Won't Have Initially**

- Integration of external IoT devices for physical access control.

## Method

This section outlines the technical methodologies used to meet the requirements specified in the previous sections, including architecture design, database schemas, and the detailed API endpoint design.

### Architecture Overview

The system utilizes a microservices architecture pattern with the following components:

- **API Gateway**: Handles all client requests and routes them to appropriate services.
- **User Service**: Manages user authentication and role-based access control.
- **Access Control Service**: Handles logic for access management, such as granting and validating entries.
- **Notification Service**: Manages real-time updates using Socket.io.

### Database Schema

_Admins, Guards, Residents, and Developers are stored in a 'users' table with role-based differentiation. Access logs, user profiles, and house information are managed in separate tables to facilitate quick queries and updates._

### API Design

The system will expose several RESTful endpoints structured around key resources such as houses, users, and access logs, defined as follows:

- **/api/user** : User management (CRUD operations)
- **/api/house** : House data management
- **/api/access** : Access log entries management
- **/api/complex** : Compplex data management

### Real-Time Communication

Utilizing Socket.io, the system will provide:

- **Event-based updates**: When access logs are updated (entry/exit), an event is broadcasted to relevant users (guards or residents of the house).
- **Live dashboard updates**: Real-time updates on user dashboards for new entries or changes.

## Website Structure

Given the detailed nature of your project, the website can have the following structure:
1. **Home Page**
    - Introduction to Hex Security Access Control System
    - Key features like secure registration, role-based access, and real-time updates
    - Call to Action (CTA) for different users to login or learn more

2. **About Page**
    - Detailed explanation of the system’s purpose, the technology stack, and the benefits
    - Diagram or infographic of the architecture overview

3. **Features Page**
    - Breakdown of features categorized by user roles (Administrators, Guards, Residents, Developers)
    - Highlight of security features like AES-256 encryption and real-time capabilities

4. **Documentation/Help Page**
    - Guides on how to use the system for each type of user
    - FAQs addressing common queries and operational guidance

5. **Contact Page**
    - Form to request more information or technical support
    - Contact details for emergency support or sales inquiries

### **Admin Views**

1. **Admin Dashboard**  
    - **Purpose**: Provides a quick visual overview of the entire complex's data.
    - **Features**:
      - Graphical representations of access logs and security breaches.
      - Quick stats about the number of residents, active issues, and recent activities.
    - **Visual Elements**: Customizable widgets displaying real-time data such as recent access logs, security alerts, and operational status of the complex systems.
    - **Layout**:
      - **Overview Panel**: The dashboard starts with an overview panel that displays key metrics such as total residents, active issues, and recent activities. This panel uses gauges and minimalist stat blocks for a quick visual snapshot.
      - **Graphical Data Representations**: Include several widgets with:
        - A line graph tracking access events over time.
        - A pie chart showing resident demographics or distribution by building.
        - A bar chart for comparing incident reports month-over-month.
      - **Alerts and Notifications Area**: A dedicated section for urgent alerts, which highlights issues that need immediate attention. Each alert includes a brief description and a quick action button to resolve or view more details. 
    - **Interactivity**:
      - Clickable charts to drill down into specific data points, like time-specific access trends or identification of frequent visitors.
      - Alerts panel that highlights issues needing immediate attention, with one-click resolution options.
    - **Interactivity**:
      - **Drill-Down Capability**: Users can click on any graphical representation to get a detailed view of the data, allowing for in-depth analysis right from the dashboard.
      - **Customizable Widgets**: Admins can customize which widgets to display or hide, depending on their priorities or management focus.
      - **Responsive Design**: The dashboard should be fully responsive, ensuring that it is accessible and functional across devices, from desktops to tablets.
     
    - **Design approach**:
      - **Theme and Color Palette**: Use a professional and clean color scheme with shades of blue, gray, and white to convey security and trust. Accent colors like green or red can highlight key metrics or alerts.
      - **Widgets Layout**:
        - **Grid System**: Arrange the widgets in a grid layout for easy navigation and scalability.
        - **Card Design**: Each widget should be encapsulated within card-like containers that include a header, chart or statistic, and a minimal border.
      - **Interactive Elements**:
        - **Hover Effects**: Implement hover effects on widgets for a preview of more detailed data.
        - **Clickable Charts**: Ensure charts are interactive, allowing admins to click through for deeper data exploration.
      - **Responsive Design**: Ensure the dashboard adapts to various screen sizes, with a mobile-first approach for on-the-go management. 

2. **Complex Data Management**
    - **Purpose**: Allows admins to manage and update details about the complex they oversee.
    - **Features**:
      - Forms to update complex information like address, security settings, and contact details.
      - Option to add or remove buildings or facilities within the complex.
    - **Layout**: Tabbed interface for different data sections like General Info, Security Settings, Facilities, and Resident Management.
      - **Tabs for Each Management Area**: Separate tabs for General Info, Security Settings, Facilities, and Resident Management, making navigation straightforward and minimizing information overload.
      - **Editable Fields**: Each section has forms with editable fields that allow admins to update complex details directly. These fields include text inputs, dropdowns, date selectors, and switch toggles for enabling/disabling features.
    - **Functionalities**:
      - Editable fields with auto-save features to modify complex details.
      - **Bulk actions**: Bulk actions to manage facilities, like adding a new gym or parking area with templated security settings.
        - **Manage Facilities**: Options to add new facilities or amenities with a template that includes checkboxes for available features (e.g., security cameras, access controls).
        - **Bulk Resident Updates**: Ability to send notifications to residents or update resident data en masse, such as resetting access permissions or updating contact information.
    - **Design approach**:
      - **Tabbed Navigation**:
        - **Clearly Labeled Tabs**: Each tab should be clearly labeled with an icon and text to indicate its content, such as "General Info", "Security Settings", etc.
        - **Responsive Tabs**: Tabs should be responsive, turning into dropdown menus on smaller screens.
      - **Form Design**:
        - **Consistent Field Design**: Use consistent styling for input fields, dropdowns, and toggles to maintain a cohesive look.
        - **Inline Editing**: Where possible, use inline editing with immediate feedback for changes to simplify the user experience. 

3. **Houses List within the Complex**
    - **Purpose**: Displays a list of all houses in the complex.
    - **Features**:
      - Links to detailed house data management views.
      - Bulk actions for sending notifications or updates to multiple houses simultaneously.
      - **Interactive List**:
        - **Search and Filter Options**: A dynamic search bar with filters for block, number of residents, or recent activity, helping admins find information quickly.
        - **Actionable List Items**: Each list item has hover-over effects that display quick stats and actions like edit, notify, or delete.
    - **Design approach**:
      - **List Layout**:
        - **Table Format**: Display the houses in a table format with columns for house details, which can be sorted and filtered.
        - **Quick Action Buttons**: Include quick action buttons for common tasks like editing or sending notifications directly from the list.
      - **Dynamic Filtering**:
        - **Filter Sidebar**: Implement a sidebar with dynamic filters that update the list in real-time.

4. **House Data Management** 
    - **Purpose**: Individual house management interface.
    - **Features**:
      - Manage resident accounts and roles.
      - **Detailed Management Forms**: Update house-specific security settings and access permissions.
        - **Resident and House Settings**: Forms for managing resident accounts, with role assignments and access level controls. Also, settings for house-specific security measures.
        - **Access Log Integration**: Integration with historical access logs specific to each house, offering options to review and audit entries.
    - **Design approach**:
      - **Form Sections**:
        - **Accordion Layout**: Use an accordion layout to organize different sections of the house data, allowing admins to expand each section without leaving the page.
        - **Contextual Tooltips**: Include tooltips and help icons with brief explanations for each section and field.
      - **Access Logs**:
        - **Embedded Logs View**: Embed a mini-view of access logs within the house data form, with filters for date and event type.

### **Guard Views**

1. **Guard Dashboard** 
    - **Purpose**: Quick access dashboard with essential functionalities for guards.
    - **Features**:
      - **Quick Action Buttons**: Large, easily clickable buttons for actions like "Search Plate", "Access Requests", and "Emergency Contacts". Each button should feature an intuitive icon and label.
      - **Real-Time Alerts**: Dynamic alert notifications that can be expanded to view details and taken action upon directly from the dashboard.
    - **Design**:
      - Quick action buttons are prominently displayed for ease of access.
      - Live feed of entry gates or main doors within the complex.
      - **Main Panel**: The dashboard should prioritize quick access to the most frequently used features, such as search functions and the real-time feed of entry points.
      - **Theme and Color Palette**: A practical and clear color scheme is essential, using contrast effectively to highlight important functions and alerts. Neutral backgrounds with accents in blue or green can help maintain visibility under various lighting conditions.
    - **Functional Widgets**:
      - **Live Entry Feed**: A section of the dashboard dedicated to showing live feeds from cameras at entry points, allowing guards to visually verify and manage entries without switching screens.
      - **Recent Activity Log**: A scrollable list displaying recent activities, such as access approvals or alerts, with timestamps and quick links to related actions.
    - **Notifications**:
      - Real-time alerts for any unauthorized attempts or overrides needed, with direct action buttons included in notifications.

2. **Search for Car Plate or House Direction**
    - **Purpose**: To quickly process access for incoming visitors or residents.
    - **Features**:
      - Search interface to input car plates or house directions.
      - Results display with the option to open the access request form directly.
    - **Layout**:
      - **Search Bar**: Prominently placed at the top with an auto-complete feature that suggests results as the guard types, enhancing speed and accuracy.
      - **Result List**: Displays search results below the search bar, each result with an actionable button to quickly generate or access the request form.
    - **Design Elements**:
      - **High Visibility**: Ensure that the search interface is highly visible and easy to read, using larger fonts and clear spacing.
      - **Interactive Feedback**: Provide immediate feedback on search status, such as loading indicators or messages when no results are found.
    - **User Experience**:
      - Autocomplete suggestions as the guard types for faster processing.
      - Recent search history to quickly revisit frequent queries or issues.

3.  **Generate Access Request Form**
    - **Purpose**: To create access permissions for visitors or new residents.
    - **Features**:
      - **Form Design**: Form to enter details of the visit like time, date, and purpose.
        - **Step-by-Step Layout**: Organize the form into clear, sequential steps to simplify the entry process. Each step should be clearly labeled, and the guard should be able to navigate back and forth between steps easily.
        - **Pre-filled Options**: Include pre-filled fields based on previous entries or common choices to speed up the process.
      - Options to register new vehicles or visitors if they are not already in the system.
      - **Dynamic Form Fields**: Introduce dynamic fields that appear based on previous selections, such as additional vehicle details if a new car is registered.
      - **Instant Validation**: Implement instant field validation to help guards correct errors in real-time, ensuring data accuracy before submission.
    - **Functionalities**:
      - Pre-filled fields based on previous entries or resident preferences.
      - Dynamic form adjustments based on the visitor type (e.g., adding fields for vehicle details if a visitor is expected to drive).

### **Resident Views**

1. **Resident Dashboard** 
    - **Purpose**: Provides residents with a user-friendly interface to manage their home and access settings.
    - **Features**:
      - Icon buttons for quick access to house data management, access requests, and settings.
      - Brief list of upcoming access requests and status updates.
    - **Highlights**:
      - Upcoming access schedules with a countdown timer for the next visitor.
      - Quick link to “Add Visitor” as a prominent feature for frequent use.
    - **Customization**:
      - Widgets to view or disable recent device integrations or smart home features linked to the security system.

2.  **House Data Management**
    - **Purpose**: Allows residents to manage their house data and accounts for other members.
    - **Features**:
      - Form to add or remove residents and manage their access levels.
      - Update house settings like emergency contacts and preferred security settings.
    - **Security Settings**:
      - Options to set temporary access codes or permissions for specific dates/times, useful for allowing entry to service personnel or temporary guests.
    - **Management Tools**:
      - Graphs showing access frequency and timing patterns to optimize personal security measures.  

3.  **Generate Access Request Form**
    - **Purpose**: Similar to the guard’s view but tailored for residents.
    - **Features**:
      - Form to request access for visitors, with additional personal notes or instructions.
      - Modal to quickly add new vehicles or visitors during the request process.
    - **Complexity**:
      - Ability for residents to set recurring access for regular visitors, with the system automatically adjusting permissions based on resident feedback.
      - Notifications to both resident and guard upon form submission and approval.  

## Implementation

The implementation of the Hex Security Access Control System will follow these steps:

1. **Setup Development Environment**: Configure the development environment using Docker and Docker Compose. This includes setting up PostgreSQL, Node.js with Nest.js, and Socket.io environments.

2. **Database Setup and Schema Migration**: Implement the database schema as defined in the Method section. Utilize migration scripts to manage database versions and updates.

3. **Backend Development**:

   - Develop the authentication and user management modules using Nest.js and integrate FirebaseAuth.
   - Implement the access control logic, including the management of entries and exits.
   - Set up the real-time notification system using Socket.io.

4. **Frontend Development**: Develop the user interfaces for each role, ensuring that the dashboard and other interactive elements are responsive and user-friendly.

5. **Testing**:

   - Perform unit testing for individual components.
   - Conduct integration testing to ensure that components work together as expected.
   - Execute end-to-end testing to validate the complete flow of the application.

6. **Deployment**: Deploy the application using Docker containers, ensuring that all components are properly configured and interconnected.

7. **Monitoring and Maintenance**: Set up logging and monitoring to track the system’s performance and to quickly identify and resolve issues.

## Milestones

1. **M1 - Environment Setup Complete**: Target Date - 2024-05-08
2. **M2 - Database and Backend Functional**: Target Date - 2024-05-17
3. **M3 - Frontend Functional and Integrated with Backend**: Target Date - 2024-06-14
4. **M4 - Initial Testing Phase Complete**: Target Date - 2024-06-19
5. **M5 - Deployment Complete**: Target Date - 2024-06-21
6. **M6 - Operational and Monitoring Phase Begins**: Target Date - 2024-06-24

These milestones will help in tracking the progress of the project and ensure timely delivery of each phase.

## Installation

In order to properly install this project you must clone this repo into your local machine. After successfully having cloned the repo we need to install all the external package dependencies the project has. In order to do this, first go to your local terminal and then run the following command

```bash
$ yarn install
```

## Running the app

We have 3 main modes on how to run this applicaion. Each one of them will behave differently and will load different environmental variables.

- **Development** : This mode will load the `.env.local` data onto the `.env` file and run with this configuration. This operation runs the command `nest start` under the hood which basically builds and run the app.

- **Watch mode**: Here the app will load the same `.env.local` into the `.env` file as the development mode does, the main difference is that whenever a change on the source code occurs, the watcher will rebuild the code and update the running instance so there is no need to run `yarn run start` each time you want to see your changes.

- **Production** : This will copy the `.env.prod` data into `.env` and then will run the built from the entry file at the `dist/main.js` so the server is running on the production version.

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Christopher Ortega](https://github.com/lchrios)
- Associate - [Jose Ceron](https://someurl.com)
- Dev - [Axel Heredia](https://someurl.com)

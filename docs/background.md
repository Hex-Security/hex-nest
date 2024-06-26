# **SPEC-001**\_: Hex Security Access Control System

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

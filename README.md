<div align="center">

# FamChat - Real-Time Family Chat Application

![FamChat Logo](FamChatApp/assets/icon-text.png)

### A Full-Stack Mobile Chat Application Demonstrating Advanced Development Skills

</div>

## Project Overview

FamChat is a production-ready, real-time messaging application that showcases my expertise in **full-stack mobile development**. This project demonstrates my ability to architect and implement complex systems from the ground up, integrating modern mobile technologies with robust backend infrastructure.

Built entirely from scratch, this application handles real-time communication, user authentication, state management, and database operations—all while maintaining clean code architecture and industry best practices.

## Skills Demonstrated

### Full-Stack Development Expertise

This project highlights my proficiency across the entire development stack:

- **Frontend Mobile Development**: React Native with Expo framework
- **Backend Development**: Java enterprise application using Servlets and Hibernate ORM
- **Database Design**: Relational database architecture with MySQL
- **API Design**: RESTful API architecture with JSON-based communication
- **Real-time Systems**: Live data synchronization and instant messaging capabilities

### Technical Competencies Showcased

**Mobile Application Development**

- Developed a cross-platform mobile app using **React Native 0.74.5** and **Expo** framework
- Implemented advanced **Expo Router** for seamless navigation architecture
- Integrated **AsyncStorage** for persistent local data management
- Utilized **FlashList** for optimized rendering of large chat lists
- Created custom UI components with **Linear Gradients** and custom typography
- Handled real-time updates with efficient polling mechanisms (1-second intervals)
- Implemented image handling with **Expo Image** for profile pictures and media sharing

**Backend Architecture & Development**

- Architected a scalable **RESTful API** using Java Servlets
- Implemented **Hibernate ORM** for elegant database abstraction and management
- Designed normalized database schema with proper entity relationships
- Utilized **Gson** for efficient JSON serialization/deserialization
- Implemented **C3P0 connection pooling** for optimal database performance
- Created secure session management and authentication systems
- Built file upload functionality for user avatars and chat images

**Database Design & Management**

- Designed a comprehensive relational database schema with multiple interconnected entities
- Implemented proper foreign key relationships and constraints
- Created efficient queries using Hibernate Criteria API
- Managed user states, message status, and chat relationships through normalized tables

**Software Engineering Practices**

- Clean code architecture with separation of concerns (MVC pattern)
- Entity-based design following JPA specifications
- Modular code structure for maintainability and scalability
- Build automation using Apache Ant
- Environment-based configuration management

## Key Features Implemented

### Real-Time Messaging System

Engineered a sophisticated real-time messaging platform with:

- **Instant message delivery** with live status updates
- **Read receipts** and delivery confirmations
- **Online/offline status indicators** showing user availability in real-time
- **Auto-refresh mechanism** polling server every second for new messages
- **Message persistence** ensuring no data loss

### Authentication & User Management

Developed a secure authentication system featuring:

- **Mobile number-based authentication** with validation
- **Password security** with visibility toggle for better UX
- **Dynamic name fetching** as users type their mobile number
- **Session persistence** using AsyncStorage for seamless app experience
- **User status tracking** (online/offline) with automatic updates

### Profile & Media Management

Built comprehensive profile management with:

- **Custom avatar upload** and storage system
- **Profile picture display** with fallback to generated initials
- **Image caching** with timestamp-based invalidation
- **Media file organization** on server-side
- **Responsive avatar rendering** across all screen sizes

### Advanced UI/UX Design

Crafted an intuitive and visually appealing interface:

- **Custom gradient backgrounds** using Expo Linear Gradient
- **Typography system** with multiple custom fonts (Bebas Neue, Rowdies, Cormorant Garamond)
- **Smooth animations** and transitions
- **Responsive layouts** optimized for different screen sizes
- **Status-based visual feedback** (border colors indicating online/offline status)

## Technical Architecture

### Frontend Structure (FamChatApp)

```
Technologies: React Native 0.74.5, Expo ~51.0.28
├── Navigation: Expo Router (file-based routing)
├── State Management: React Hooks (useState, useEffect)
├── Data Persistence: AsyncStorage
├── UI Components: Custom components with LinearGradient
├── Performance: FlashList for optimized list rendering
└── Media: Expo Image with advanced caching
```

**Key Implementation Decisions:**

- Chose **Expo** for rapid development and easy deployment
- Implemented **file-based routing** for intuitive navigation structure
- Used **AsyncStorage** for offline-first user session management
- Leveraged **FlashList** instead of FlatList for better performance with large chat lists

### Backend Architecture (FamChatBackEnd)

```
Technologies: Java, Servlets, Hibernate 4.3.1, MySQL 8.0.24
├── Controller Layer: Servlets handling HTTP requests
├── Entity Layer: JPA entities with Hibernate annotations
├── Model Layer: HibernateUtil and validation logic
├── Data Layer: MySQL with connection pooling (C3P0)
└── Serialization: Gson for JSON communication
```

**Architectural Highlights:**

- **MVC Pattern**: Clear separation between controllers, entities, and models
- **ORM Implementation**: Hibernate for database abstraction and type-safe queries
- **RESTful Design**: JSON-based API endpoints following REST principles
- **Connection Pooling**: C3P0 for efficient database connection management
- **Build Automation**: Apache Ant for deployment and dependency management

## Database Design & Schema

Designed a normalized relational database schema demonstrating understanding of:

- Entity relationships (One-to-Many, Many-to-One)
- Foreign key constraints
- Data integrity and normalization
- Efficient query design

### Entity Relationship Design

**User Entity**

```java
- id (Primary Key, Auto-increment)
- mobile (Unique, 10 digits)
- fname, lname (User names)
- password (Hashed storage)
- datetime (Registration timestamp)
- user_status_id (Foreign Key to UserStatus)
```

**Chat Entity**

```java
- id (Primary Key, Auto-increment)
- message (Text content)
- datetime (Message timestamp)
- from_user (Foreign Key to User)
- to_user (Foreign Key to User)
- chat_status_id (Foreign Key to ChatStatus - read/unread)
- message_type_id (Foreign Key to MessageType - text/image)
```

**Supporting Entities**

- **UserStatus**: Online/Offline state management
- **ChatStatus**: Message delivery status (sent/delivered/read)
- **MessageType**: Content type classification

This schema demonstrates my understanding of:

- Database normalization principles
- Efficient indexing strategies
- Referential integrity maintenance
- Scalable data modeling

## API Development & Implementation

Designed and implemented a comprehensive RESTful API showcasing my backend development skills:

### Authentication Endpoints

```java
POST /SignIn
- Validates user credentials
- Implements secure password verification
- Returns user object with session data
- Error handling with descriptive messages

POST /SignUp
- User registration with validation
- Mobile number uniqueness checking
- Password strength enforcement
- Automatic user status initialization
```

### Data Retrieval Endpoints

```java
GET /GetName?mobile={mobile}
- Dynamic user lookup by mobile number
- Real-time name display during login
- Efficient single-field query optimization

GET /LoadHomeData?id={userId}
- Aggregates all user conversations
- Includes last message, timestamp, and status
- Implements complex joins across multiple tables
- Returns formatted data optimized for mobile display

GET /LoadChat
- Retrieves complete conversation history
- Sorts messages chronologically
- Handles pagination for large conversations
- Updates message read status automatically
```

### Message Management Endpoints

```java
POST /SendChat
- Creates new chat messages
- Handles both text and image messages
- Updates conversation timestamps
- Implements real-time notification triggers

POST /DeleteMessage
- Soft/hard delete message functionality
- Maintains data integrity
- Updates conversation states

POST /UpdateProfile
- User profile modification
- Avatar upload handling
- Validates and sanitizes input data
```

### Status Management

```java
POST /SetOffline
- Updates user online/offline status
- Implements automatic logout
- Session cleanup and management
```

**API Design Principles Applied:**

- RESTful conventions and HTTP methods
- JSON request/response format
- Proper error handling and status codes
- Input validation and sanitization
- Efficient database queries using Hibernate Criteria API

## Code Quality & Best Practices

### Object-Oriented Design

- **Entity classes** following JPA specifications with proper annotations
- **Encapsulation** with private fields and public getters/setters
- **Serializable** entities for session management
- **Validation classes** for input sanitization

### Error Handling

- Comprehensive validation on both frontend and backend
- User-friendly error messages
- Graceful degradation for network failures
- Try-catch blocks preventing application crashes

### Performance Optimization

- **Connection pooling** (C3P0) reducing database overhead
- **FlashList** on mobile for efficient list rendering
- **Image caching** with timestamp-based invalidation
- **Optimized queries** using Hibernate Criteria
- **Lazy loading** for related entities

### Security Considerations

- Password validation and secure storage practices
- Mobile number format verification
- Input sanitization preventing injection attacks
- Session-based authentication
- CORS and API endpoint protection

## Project Structure & Organization

### Frontend Architecture (FamChatApp)

```
FamChatApp/
├── app/                    # Application screens (file-based routing)
│   ├── index.js           # Login screen with authentication
│   ├── signup.js          # User registration
│   ├── home.js            # Chat list with real-time updates
│   ├── chat.js            # Individual conversation view
│   └── profile.js         # User profile management
├── assets/                # Static resources
│   ├── fonts/             # Custom typography files
│   └── images/            # App icons and branding
├── .env                   # Environment configuration
├── app.json               # Expo configuration
└── package.json           # Dependencies and scripts
```

### Backend Architecture (FamChatBackEnd)

```
FamChatBackEnd/
├── src/java/
│   ├── controller/        # Servlet controllers (API endpoints)
│   │   ├── SignIn.java
│   │   ├── SignUp.java
│   │   ├── LoadChat.java
│   │   ├── SendChat.java
│   │   └── ...
│   ├── entity/            # JPA entity classes
│   │   ├── User.java
│   │   ├── Chat.java
│   │   ├── UserStatus.java
│   │   └── ChatStatus.java
│   ├── model/             # Business logic and utilities
│   │   ├── HibernateUtil.java
│   │   └── Validations.java
│   └── hibernate.cfg.xml  # Hibernate ORM configuration
├── web/                   # Web resources
│   ├── AvatarImages/      # User profile pictures
│   └── ChatImages/        # Shared media files
├── lib/                   # External JAR dependencies
└── build.xml              # Ant build configuration
```

This structure demonstrates:

- **Modular design** with clear separation of concerns
- **Scalable architecture** easy to extend with new features
- **Industry-standard patterns** (MVC for backend, component-based for frontend)

## Development Approach & Problem Solving

### Challenges Overcome

**1. Real-Time Data Synchronization**

- **Challenge**: Implementing real-time chat without WebSockets
- **Solution**: Developed efficient polling mechanism with 1-second intervals using `setInterval` in React
- **Result**: Smooth real-time experience with minimal server load

**2. Cross-Platform Image Handling**

- **Challenge**: Managing user avatars across web server and mobile devices
- **Solution**: Implemented server-side image storage with timestamp-based cache busting
- **Result**: Instant avatar updates across all devices

**3. Session Persistence**

- **Challenge**: Maintaining user sessions across app restarts
- **Solution**: Utilized AsyncStorage for persistent session management
- **Result**: Seamless user experience without repeated logins

**4. Efficient List Rendering**

- **Challenge**: Smooth scrolling with large conversation lists
- **Solution**: Migrated from FlatList to FlashList for optimized rendering
- **Result**: 60 FPS scrolling even with hundreds of conversations

**5. Database Query Optimization**

- **Challenge**: Complex queries joining multiple tables for chat overview
- **Solution**: Leveraged Hibernate Criteria API for type-safe, efficient queries
- **Result**: Fast data retrieval with proper ORM abstraction

## Technology Choices & Rationale

**Why React Native + Expo?**

- Cross-platform development (iOS, Android, Web) with single codebase
- Rapid prototyping and iteration
- Rich ecosystem of libraries and tools
- Easy deployment and over-the-air updates

**Why Java + Hibernate?**

- Enterprise-grade reliability and performance
- Strong typing and compile-time error checking
- Mature ORM with excellent documentation
- Wide industry adoption and deployment options

**Why MySQL?**

- Robust relational database with ACID compliance
- Excellent performance for read-heavy applications
- Strong community support and tooling
- Easy integration with Hibernate ORM

## What This Project Demonstrates

This application serves as a comprehensive demonstration of my capabilities as a full-stack developer:

### Technical Skills

- **Mobile Development**: Building production-ready cross-platform applications
- **Backend Development**: Creating scalable server-side applications with Java
- **Database Design**: Architecting normalized relational databases
- **API Design**: Developing RESTful APIs with proper conventions
- **State Management**: Managing complex application state
- **Performance Optimization**: Implementing efficient data handling and rendering
- **UI/UX Design**: Creating intuitive and visually appealing interfaces

### Software Engineering Competencies

- **Architecture Design**: Planning and implementing scalable system architecture
- **Problem Solving**: Overcoming technical challenges with creative solutions
- **Code Quality**: Writing clean, maintainable, and well-documented code
- **Best Practices**: Following industry standards and design patterns
- **Full Development Cycle**: From concept to deployment

### Professional Qualities

- **Self-Learning**: Mastered multiple technologies independently
- **Attention to Detail**: Implementing features with polish and care
- **End-to-End Development**: Handling both frontend and backend development
- **Project Completion**: Delivering a fully functional application

## Running the Project

If you'd like to explore the codebase:

### Prerequisites

- Node.js (v16+), JDK 8+, MySQL Server, Expo CLI

### Quick Start

```bash
# Clone repository
git clone https://github.com/gitxar7/FamChat.git

# Frontend setup
cd FamChatApp
npm install
npm start

# Backend setup
cd ../FamChatBackEnd
# Configure hibernate.cfg.xml with your database
ant clean build
# Deploy to application server (Tomcat/GlassFish)
```

## Future Development Roadmap

Potential enhancements demonstrating scalability thinking:

- **Group Chat**: Multi-user conversations with admin controls
- **End-to-End Encryption**: Security-first messaging
- **Push Notifications**: Real-time alerts using Firebase Cloud Messaging
- **Voice/Video Calls**: WebRTC integration for multimedia communication
- **Message Search**: Full-text search with ElasticSearch
- **Media Gallery**: Organized view of shared photos and files
- **Dark Mode**: Theme switching for better UX
- **Microservices Architecture**: Splitting backend into specialized services
- **Redis Caching**: Improved performance with in-memory data store
- **Docker Deployment**: Containerized application for easy deployment

## About the Developer

**Abdur Rahman Hanas** - Full-Stack Developer

I'm a passionate software developer with expertise in building end-to-end applications. This project represents my commitment to writing quality code and creating meaningful user experiences. I thrive on solving complex problems and continuously learning new technologies.

### Technical Proficiencies Demonstrated in This Project

- **Frontend**: React Native, Expo, JavaScript (ES6+)
- **Backend**: Java, Servlets, Hibernate ORM
- **Database**: MySQL, SQL, Database Design
- **Tools**: Git, Apache Ant, npm, Android Studio
- **Concepts**: REST APIs, OOP, MVC Pattern, Asynchronous Programming

### Let's Connect

I'm always interested in discussing technology, software development, and potential opportunities.

**Email**: nxt.genar7@gmail.com  
**GitHub**: [@gitxar7](https://github.com/gitxar7)  
**Project Repository**: [FamChat](https://github.com/gitxar7/FamChat)

---

<div align="center">

**If you're impressed by this work, consider starring the repository!**

_This project showcases my journey from concept to deployment, demonstrating both technical expertise and software engineering maturity._

</div>

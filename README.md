# FamChat - Real-Time Family Chat Application

![FamChat Logo](FamChatApp/assets/icon-text.png)

A modern, feature-rich real-time chat application built with React Native (Expo) and Java backend, designed to bring families closer together through seamless communication.

## 🌟 Features

### 📱 Mobile App (React Native + Expo)

- **Real-time Messaging**: Instant message delivery with live status updates
- **User Authentication**: Secure login/signup with mobile number verification
- **Profile Management**: Customizable user profiles with avatar support
- **Online Status**: Real-time online/offline status indicators
- **Message Status**: Read receipts and delivery confirmations
- **Custom Typography**: Beautiful custom fonts for enhanced UI
- **Gradient UI**: Modern gradient-based design system
- **Image Support**: Profile pictures and image sharing capabilities
- **Auto-refresh**: Real-time chat updates every second
- **Responsive Design**: Optimized for both Android and iOS

### 🖥️ Backend (Java + Hibernate)

- **RESTful API**: Clean REST endpoints for all operations
- **Hibernate ORM**: Robust database management with JPA
- **MySQL Database**: Reliable data persistence
- **Servlet Architecture**: Scalable Java servlet-based backend
- **JSON Communication**: Efficient data exchange with Gson
- **Session Management**: Secure user session handling
- **Image Upload**: Profile picture storage and retrieval
- **Real-time Updates**: Live data synchronization

## 🛠️ Tech Stack

### Frontend (FamChatApp)

- **React Native** 0.74.5 - Cross-platform mobile development
- **Expo** ~51.0.28 - Development platform and tools
- **Expo Router** - File-based navigation system
- **AsyncStorage** - Local data persistence
- **Expo Linear Gradient** - Beautiful gradient backgrounds
- **FlashList** - High-performance list rendering
- **Expo Image** - Optimized image handling
- **Vector Icons** - Rich icon library

### Backend (FamChatBackEnd)

- **Java** - Core backend language
- **Servlet API** - Web application framework
- **Hibernate** 4.3.1 - Object-relational mapping
- **MySQL** 8.0.24 - Database management
- **Gson** 2.11.0 - JSON serialization/deserialization
- **C3P0** - Connection pooling
- **Apache Ant** - Build automation

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Java Development Kit (JDK 8 or higher)
- MySQL Server
- Android Studio / Xcode (for device testing)
- Expo CLI

### 📱 Frontend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/gitxar7/FamChat.git
   cd FamChat/FamChatApp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   - Update `.env` file with your backend URL:

   ```properties
   EXPO_PUBLIC_URL = http://your-backend-url:8080/FamChat/
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Run on device/emulator**

   ```bash
   # Android
   npm run android

   # iOS
   npm run ios

   # Web
   npm run web
   ```

### 🖥️ Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd FamChat/FamChatBackEnd
   ```

2. **Database Setup**

   - Create MySQL database named `famchat`
   - Update `hibernate.cfg.xml` with your database credentials

3. **Configure libraries**

   - Ensure all JAR files in `/lib` directory are in classpath
   - MySQL Connector, Hibernate, and Gson libraries included

4. **Deploy to server**
   - Use Apache Ant to build: `ant clean build`
   - Deploy to Java application server (Tomcat, GlassFish, etc.)

## 📱 App Screenshots & Features

### 🔐 Authentication Flow

- Secure mobile-based login system
- Name auto-fetch on mobile number entry
- Password visibility toggle
- Account creation with validation

### 💬 Chat Interface

- Real-time message synchronization
- Online/offline status indicators
- Message read receipts
- Smooth scrolling chat history
- Image message support

### 👤 Profile Management

- Custom avatar upload
- Profile information editing
- Status management
- Settings configuration

## 🏗️ Architecture

### Database Schema

```sql
-- Core entities
User (id, mobile, fname, lname, password, datetime, user_status_id)
Chat (id, message, datetime, from_user, to_user, chat_status_id, message_type_id)
UserStatus (id, status)
ChatStatus (id, status)
MessageType (id, type)
```

### API Endpoints

- `POST /SignIn` - User authentication
- `POST /SignUp` - User registration
- `GET /GetName?mobile=` - Fetch user name by mobile
- `GET /LoadHomeData?id=` - Load chat overview
- `GET /LoadChat` - Load conversation history
- `POST /SendChat` - Send new message
- `POST /UpdateProfile` - Update user profile
- `POST /DeleteMessage` - Delete message
- `POST /SetOffline` - Update user status

## 🔧 Configuration

### Environment Variables

- `EXPO_PUBLIC_URL`: Backend API base URL
- Database connection settings in `hibernate.cfg.xml`

### Build Configuration

- `app.json`: Expo app configuration
- `babel.config.js`: Babel transpilation settings
- `build.xml`: Ant build configuration

## 🚀 Deployment

### Mobile App

1. **Build for production**

   ```bash
   expo build:android
   expo build:ios
   ```

2. **Publish to app stores**
   - Follow Expo's deployment guide
   - Configure app signing and metadata

### Backend

1. **Build WAR file**

   ```bash
   ant clean build
   ```

2. **Deploy to server**
   - Deploy to production Java application server
   - Configure database connection
   - Set up SSL certificates

## 🔮 Future Enhancements

- [ ] Group chat functionality
- [ ] Voice messages
- [ ] Video calling integration
- [ ] Push notifications
- [ ] Message encryption
- [ ] File sharing capabilities
- [ ] Emoji reactions
- [ ] Message search
- [ ] Dark mode theme
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Developer**: gitxar7 - Abdur Rahman Hanas
**Email**: nxt.genar7@gmail.com
**Project Link**: [https://github.com/gitxar7/FamChat](https://github.com/gitxar7/FamChat)

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ for bringing families together through technology.

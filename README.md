# Task Manager Web App - Backend  

## 🌟 Overview  
This is the **backend** of the Task Manager Web App, built using **Node.js and Express.js**. It provides a secure **REST API** for managing user authentication and task-related operations. The backend connects to a **MongoDB database** to persist user and task data.  

## 🚀 Features  
- **User Authentication:** JWT-based authentication for secure login & signup.  
- **Task Management:** Users can create, update, delete, and fetch their tasks.  
- **Protected API Routes:** Only authenticated users can manage tasks.  
- **Database Integration:** Uses MongoDB to store user details and tasks.  
- **Error Handling & Validation:** Ensures API reliability with proper validation.  

## 🛠️ Tech Stack  
- **Node.js** - Backend runtime  
- **Express.js** - Web framework for API development  
- **MongoDB + Mongoose** - Database and ODM  
- **JWT (JSON Web Token)** - Authentication & authorization  
- **bcryptjs** - Password hashing for security  
- **dotenv** - Environment variable management  
- **CORS** - Cross-Origin Resource Sharing support  

## 📦 Installation & Setup  
1. Clone the repository:  
   ```bash
   git clone https://github.com/SHIVUKUMARA/TaskManager-server.git
   cd TaskManager-server
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Create a `.env` file and configure the environment variables:  
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the server:  
   ```bash
   npm start
   ```
   
## 🔌 API Endpoints  
| Method | Endpoint             | Description                      | Auth Required |
|--------|----------------------|----------------------------------|--------------|
| **POST**   | `/api/auth/register` | Register a new user             | ❌ No |
| **POST**   | `/api/auth/login`    | Log in and receive a JWT token  | ❌ No |
| **GET**    | `/api/tasks`         | Fetch all tasks for a user      | ✅ Yes |
| **POST**   | `/api/tasks`         | Create a new task               | ✅ Yes |
| **GET**    | `/api/tasks/:id`     | Fetch a specific task by ID     | ✅ Yes |
| **PUT**    | `/api/tasks/:id`     | Update an existing task         | ✅ Yes |
| **DELETE** | `/api/tasks/:id`     | Delete a task                   | ✅ Yes |
| **GET**    | `/api/tasks/stats`   | Fetch dashboard statistics      | ✅ Yes |

This matches your actual backend implementation. Let me know if you need further updates! 🚀
## 📌 Folder Structure  
```
Task Manager/
├─ server/
│  ├─ controllers/
│  │  ├─ authController.js
│  │  ├─ taskController.js
│  ├─ models/
│  │  ├─ Task.js
│  │  ├─ User.js
│  ├─ routes/
│  │  ├─ authRoutes.js
│  │  ├─ taskRoutes.js
│  ├─ utils/
│  │  └─ authMiddleware.js
│  ├─ .env
│  ├─ .gitignore
│  ├─ package-lock.json
│  ├─ package.json
│  └─ server.js
```

## 🚀 Deployment  
The backend is deployed on **Render/Railway/EC2**. You can access it here:  
🔗 **Live API URL:** [https://your-backend-url.com](https://your-backend-url.com)  
🔗 **API Documentation:** : [https://documenter.getpostman.com/view/30794754/2sAYQanBcg](https://documenter.getpostman.com/view/30794754/2sAYQanBcg)


## 🤝 Contributing  
Feel free to fork this repository and improve the project! If you find any issues, open a pull request or report them.  

## 📜 License  
This project is open-source and free to use.  

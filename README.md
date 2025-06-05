# 📝 Simple Task Manager Backend

A clean, modular RESTful API for managing tasks, built with **Node.js**, **Express**, and **MongoDB**.  
Supports task creation, listing, updating, deleting, filtering, and robust error handling.

---

## 🚀 Features

- **View all tasks**
- **Add a new task**
- **Mark a task as completed**
- **Delete a task**
- **Filter tasks** by completion status (`completed=true` or `completed=false`)
- **Async error handling** with clear responses

---

## 🗂️ Project Structure

```
backend/
├── config/
│   └── db.js
├── controllers/
│   └── taskController.js
├── models/
│   └── Task.js
├── routes/
│   └── taskRoutes.js
├── app.js
├── package.json
└── README.md
```

---

## 🛠️ Getting Started

### 1. **Clone the repository**
```bash
git clone https://github.com/your-username/your-repo.git
cd backend
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Set up MongoDB**

- Make sure MongoDB is running locally, or update the `mongoURI` in `app.js` to your remote/cloud connection string.

### 4. **Run the server**
```bash
node app.js
```
The API will be available at [http://localhost:5000/](http://localhost:5000/)

---

## 📚 API Endpoints

### Get all tasks
```
GET /api/tasks
GET /api/tasks?completed=true
GET /api/tasks?completed=false
```

### Add a new task
```
POST /api/tasks
Content-Type: application/json

{
  "title": "Your task title"
}
```

### Mark a task as completed
```
PUT /api/tasks/:id
```

### Delete a task
```
DELETE /api/tasks/:id
```

---

## 🧪 cURL Requests

```bash
# Get all tasks
curl http://localhost:3000/api/tasks

# Get only completed tasks
curl http://localhost:3000/api/tasks?completed=true

# Add a new task
curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title": "Learn Express"}'

# Mark a task as completed
curl -X PUT http://localhost:3000/api/tasks/<task_id>

# Delete a task
curl -X DELETE http://localhost:3000/api/tasks/<task_id>
```

---

## 💡 Notes

- **Validation:** Task title must not be empty.
- **Filtering:** Use the `completed` query parameter to filter by status.
- **Error Handling:** All endpoints return appropriate status codes and error messages.

---


## 🖊️ License

MIT

---

*Built with ❤️ by [Eyasu Getaneh](https://github.com/EyasuGet/)*
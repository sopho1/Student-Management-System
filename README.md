# 🎓 Student Management System

A full-stack web application for managing student information, built with **React**, **.NET (ASP.NET Core)**, and **MongoDB**.

## 📌 Features

- Add, view, update, and delete student records
- Store details such as name, age, enrollment status, and more
- RESTful API integration

## 🛠 Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)
- Bootstrap 

### Backend
- [ASP.NET Core Web API](https://dotnet.microsoft.com/en-us/apps/aspnet)
- [MongoDB.Driver](https://www.nuget.org/packages/MongoDB.Driver/)
- RESTful API architecture

### Database
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB


## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- .NET 6 SDK or higher
- MongoDB (local or Atlas)

---

### Frontend Setup

```bash
cd aspcrud-frontend
npm install
npm start

### Backend Setup

🔧 Configuration

- Before running the backend, make sure to configure your appsettings.json file located in the StudnetManagement directory:

{
  "StudentStoreDatabaseSettings": {
    "StudentCoursesCollectionName": "YOUR_COLLECTION_NAME",
    "ConnectionString": "YOUR_CONNECTION_STRING",
    "DatabaseName": "YOUR_DATABASE_NAME"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}


```bash
cd StudnetManagement
cd StudnetManagement
dotnet restore
dotnet run

🙌 Acknowledgements
Inspired by student management systems used in real-world academic institutions.

📄 License
This project is licensed under the MIT License.
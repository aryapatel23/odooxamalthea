# 💰 Odoo Xamalthea - Expense Management System

**A full-stack expense management application** for tracking employee expenses, approvals, reimbursements, and financial reporting. This system provides separate dashboards for **Finance/Admin** and **Employees**, ensuring smooth expense tracking and reimbursement workflow.

[![License](https://img.shields.io/badge/license-LGPL--3-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?logo=mongodb)](https://www.mongodb.com/)

## 🔗 Quick Links

- 🌐 **Live Demo (Frontend):** [Deployment Link](https://expense-manager-ten-lovat.vercel.app/)
- 🖥️ **Backend API:** [Deployment Link](https://attendance-and-payroll-management.onrender.com)
- 📹 **Video Demo:** [Watch on YouTube](https://youtu.be/WPnxH9x_8gY)
- 📚 **API Documentation:** [Postman Collection](https://documenter.getpostman.com/view/39216723/2sB3QGuX9y)


---

## 🚀 Features

### 👨‍💼 Finance/Admin Dashboard
* ✅ Manage employee profiles and expense categories
* 📊 Review and approve/reject expense claims
* 💳 Process reimbursements and track payments
* 📈 Generate expense reports (daily/monthly/yearly)
* 🔍 Audit trail for all expense transactions
* 📑 Export reports in **PDF/Excel** format
* 💰 Budget tracking and expense analytics
* 🏷️ Manage expense categories and limits

### 👩‍💻 Employee Dashboard
* 📝 Submit expense claims with receipts
* 📸 Upload receipt images/documents
* 👁️ Track expense status (Pending/Approved/Rejected)
* 💵 View reimbursement history
* 📅 Filter expenses by date range
* 🔔 Notifications for expense approvals
* 📊 Personal expense analytics
* 🧾 Download expense reports

---

## 🛠️ Tech Stack

### **Frontend**
* **React 18.x (Vite)** - Fast and modern build tool
* **Tailwind CSS** - Utility-first styling
* **Redux Toolkit** - State management
* **React Router** - Navigation
* **Axios** - HTTP client
* **Framer Motion** - Animations
* **React Icons** - Icon library
* **Chart.js / Recharts** - Data visualization

### **Backend**
* **Node.js 18+** - Runtime environment
* **Express.js** - Web framework
* **MongoDB (Mongoose)** - Database
* **JWT** - Authentication
* **Bcrypt.js** - Password hashing
* **Multer** - File uploads
* **Nodemailer** - Email notifications
* **Express Validator** - Input validation

### **Others**
* **Cloudinary** - Image/file storage
* **PDFKit / jsPDF** - PDF generation
* **Postman** - API testing & documentation
* **Vercel/Netlify** - Frontend deployment
* **Render/Railway** - Backend deployment

---

## 📂 Project Structure

```
odooxamalthea/
│
├── backend/                       # Node.js Backend
│   ├── config/
│   │   ├── db.js                  # MongoDB connection
│   │   └── cloudinary.js          # Cloudinary config
│   │
│   ├── controllers/               # Request handlers
│   │   ├── authController.js
│   │   ├── expenseController.js
│   │   ├── employeeController.js
│   │   ├── categoryController.js
│   │   └── reimbursementController.js
│   │
│   ├── models/                    # Mongoose schemas
│   │   ├── User.js
│   │   ├── Expense.js
│   │   ├── Category.js
│   │   ├── Reimbursement.js
│   │   └── Employee.js
│   │
│   ├── routes/                    # API routes
│   │   ├── authRoutes.js
│   │   ├── expenseRoutes.js
│   │   ├── employeeRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── reimbursementRoutes.js
│   │
│   ├── middleware/                # Custom middleware
│   │   ├── auth.js                # JWT verification
│   │   ├── roleCheck.js           # Role-based access
│   │   ├── upload.js              # Multer config
│   │   └── errorHandler.js
│   │
│   ├── utils/                     # Utility functions
│   │   ├── emailService.js
│   │   ├── pdfGenerator.js
│   │   └── validators.js
│   │
│   ├── .env                       # Environment variables
│   ├── server.js                  # Entry point
│   └── package.json
│
├── frontend/                      # React Frontend
│   ├── src/
│   │   ├── assets/                # Images, icons, fonts
│   │   │
│   │   ├── components/            # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ExpenseCard.jsx
│   │   │   ├── Table.jsx
│   │   │   └── Modal.jsx
│   │   │
│   │   ├── pages/                 # Page components
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── ExpenseApproval.jsx
│   │   │   │   ├── Employees.jsx
│   │   │   │   ├── Categories.jsx
│   │   │   │   └── Reports.jsx
│   │   │   │
│   │   │   ├── employee/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── CreateExpense.jsx
│   │   │   │   ├── MyExpenses.jsx
│   │   │   │   └── Profile.jsx
│   │   │   │
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── redux/                 # State management
│   │   │   ├── store.js
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── expenseSlice.js
│   │   │   │   └── userSlice.js
│   │   │
│   │   ├── services/              # API calls
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── expenseService.js
│   │   │   └── employeeService.js
│   │   │
│   │   ├── utils/                 # Helper functions
│   │   │   ├── formatDate.js
│   │   │   ├── constants.js
│   │   │   └── validators.js
│   │   │
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Global styles
│   │
│   ├── public/
│   ├── .env                       # Environment variables
│   ├── vite.config.js             # Vite configuration
│   ├── tailwind.config.js         # Tailwind config
│   └── package.json
│
└── README.md                      # This file
```

---

## ⚙️ Installation & Setup

### **Prerequisites**
- Node.js 18+ installed
- MongoDB installed or MongoDB Atlas account
- Git
- Cloudinary account (optional, for image storage)

### **1️⃣ Clone the repository**

```bash
git clone https://github.com/VasaraSujal/odooxamalthea.git
cd odooxamalthea
```

### **2️⃣ Backend Setup**

```bash
cd backend
npm install
```

**Start the backend server:**
```bash
npm start
# OR for development with nodemon
npm run dev
```

Backend will run on `http://localhost:5000`

### **3️⃣ Frontend Setup**

```bash
cd frontend
npm install
```


**Start the frontend development server:**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 🖥️ Usage

### **For Finance/Admin:**
1. **Login** → Use admin credentials
2. **Dashboard** → View expense statistics and pending approvals
3. **Manage Categories** → Create/edit expense categories
4. **Review Claims** → Approve/reject employee expense claims
5. **Process Payments** → Manage reimbursements
6. **Generate Reports** → Export analytics and reports

### **For Employees:**
1. **Register/Login** → Create account or sign in
2. **Create Expense** → Submit new expense claim with receipts
3. **Upload Documents** → Attach bills/receipts (images/PDFs)
4. **Track Status** → Monitor approval status in real-time
5. **View History** → Check past expenses and reimbursements
6. **Download Reports** → Get personal expense reports

### **Default User Roles:**
- **Admin:** Full access to all features
- **Finance Manager:** Review and process expenses
- **Employee:** Submit and view own expenses

---

## 📡 API Documentation

Complete API documentation is available on Postman:

🔗 **[View API Documentation](https://documenter.getpostman.com/view/39216723/2sB3QGuX9y)**

### **Key API Endpoints:**

#### **Authentication**
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
GET    /api/auth/me                - Get current user
POST   /api/auth/forgot-password   - Forgot password
PUT    /api/auth/reset-password    - Reset password
```

#### **Expenses**
```
GET    /api/expenses               - Get all expenses
POST   /api/expenses               - Create expense
GET    /api/expenses/:id           - Get single expense
PUT    /api/expenses/:id           - Update expense
DELETE /api/expenses/:id           - Delete expense
PUT    /api/expenses/:id/approve   - Approve expense
PUT    /api/expenses/:id/reject    - Reject expense
```

#### **Categories**
```
GET    /api/categories             - Get all categories
POST   /api/categories             - Create category
PUT    /api/categories/:id         - Update category
DELETE /api/categories/:id         - Delete category
```

#### **Reimbursements**
```
GET    /api/reimbursements         - Get all reimbursements
POST   /api/reimbursements         - Create reimbursement
PUT    /api/reimbursements/:id     - Update reimbursement status
```

---

## 🚀 Deployment

### **Frontend Deployment (Vercel/Netlify)**

**Using Vercel:**
```bash
cd frontend
npm run build
vercel --prod
```

**Using Netlify:**
```bash
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

🔗 **Live Frontend:** [Expense Management Frontend](https://expense-manager-ten-lovat.vercel.app/)

### **Backend Deployment (Render/Railway)**

**Using Render:**
1. Create new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add environment variables from `.env`


🔗 **Live Backend:** [Expense Managment Backend](https://attendance-and-payroll-management.onrender.com)

---

## 📹 Demo Video

Watch a complete walkthrough of the application:

🎥 **[Watch Demo on YouTube](https://youtu.be/WPnxH9x_8gY)**

**Demo includes:**
- User registration and login
- Admin dashboard overview
- Creating and submitting expenses
- Approval workflow
- Report generation
- Mobile responsiveness

---

## 📊 Key Modules & Functionality

### **Expense Categories**
- 🚗 Transportation
- 🍽️ Meals & Entertainment
- 🏨 Accommodation
- 📎 Office Supplies
- ✈️ Travel
- 📱 Communication
- 💼 Others (Customizable)

### **Approval Workflow**
1. Employee submits expense with receipt
2. Manager reviews and approves
3. Finance verifies and processes
4. Payment/Reimbursement initiated
5. Employee receives notification

### **Reporting & Analytics**
- Monthly expense summaries
- Category-wise spending charts
- Employee-wise reports
- Budget vs. Actual analysis
- Export to PDF/Excel

---

## 🔐 Security & Access Control

| Role | Permissions |
|------|-------------|
| **Admin** | Full access to all features |
| **Finance Manager** | Review, approve, process reimbursements |
| **Manager** | Approve team expenses |
| **Employee** | Submit and view own expenses |

**Security Features:**
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- Protected API routes
- CORS configuration

---

## 📌 Roadmap

- ✅ User authentication & authorization
- ✅ Expense submission with receipts
- ✅ Multi-level approval workflow
- ✅ Reimbursement processing
- ✅ Report generation (PDF/Excel)
- ✅ Email notifications
- ✅ Real-time status updates
- ✅ Responsive design
- 🔄 Mobile app (React Native) - *In Progress*
- 🔄 OCR for receipt scanning - *Planned*
- 🔄 Credit card integration - *Planned*
- 🔄 Multi-currency support - *Planned*
- 🔄 AI-powered expense categorization - *Future*
- 🔄 Voice-based expense entry - *Future*

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### **Coding Standards**
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Add comments for complex logic
- Write unit tests for new features
- Update documentation

---

## 🧪 Testing

**Run backend tests:**
```bash
cd backend
npm test
```

**Run frontend tests:**
```bash
cd frontend
npm test
```

---

## 📄 License

This project is licensed under the **LGPL-3 License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Credits

### **Development Team**
- **Sujal Vasara** - *Full Stack Developer* - [@VasaraSujal](https://github.com/VasaraSujal)
- **Arya Patel** - *Full Stack Developer* - [@aryapatel23](https://github.com/aryapatel23)
- **Prem Kambaliya** - *Full Stack Developer* - [@Premkambaliya](https://github.com/Premkambaliya)
- **Jatin Rajvani** - *Full Stack Developer* - [@JatinRajvani](https://github.com/JatinRajvani)

### **Contributions**
Special thanks to all team members for their valuable contributions in developing this comprehensive expense management system! 🙏

---

## 📞 Support & Contact

For issues, questions, or contributions:

- **📫 Issues:** [GitHub Issues](https://github.com/VasaraSujal/odooxamalthea/issues)
- **💬 Discussions:** [GitHub Discussions](https://github.com/VasaraSujal/odooxamalthea/discussions)
- **📧 Email:** [Contact via GitHub]

---


## 🎯 Key Highlights

- 🚀 **Fast & Efficient** - Built with React + Vite for optimal performance
- 🔒 **Secure** - JWT authentication and role-based access control
- 📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile
- 📊 **Analytics** - Comprehensive reporting and insights
- 🔔 **Real-time Notifications** - Stay updated on expense status
- ☁️ **Cloud Storage** - Secure receipt storage with Cloudinary
- 📧 **Email Integration** - Automated notifications for approvals
- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS

---

**⭐ If you find this project useful, please consider giving it a star!**

**📺 Don't forget to check out the [YouTube Demo](https://youtu.be/WPnxH9x_8gY) for a complete walkthrough!**

*Last updated: October 2025*




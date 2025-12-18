# 🏙️ CityFix - Citizen Issue Reporting Platform

**CityFix** is a full-stack MERN application designed to bridge the gap between citizens and municipal authorities. It allows users to report city issues (like damaged roads, garbage, etc.), track their status, and enables authorities to manage and resolve them efficiently.

---

## 🔗 Live Links
- **Live Site URL:** [https://city-fix-316cb.web.app](https://city-fix-316cb.web.app) 
- **Server URL:** [https://city-fix-server-amber.vercel.app](https://city-fix-server-amber.vercel.app)

---

## 🔐 Admin Credentials (For Testing)
Use these credentials to access the Admin Dashboard and test all features.

- **Admin Email:** sukh@gmail.com
- **Password:** Sukh@766

---

## ✨ Key Features

Here are the top features of the CityFix platform:

1.  **🔐 Role-Based Authentication:** Secure login system using Firebase Auth with distinct roles for **Citizens (Users)**, **Staff**, and **Admins**.
2.  **📝 Issue Reporting System:** Citizens can report issues with titles, detailed descriptions, categories, and image uploads.
3.  **📊 Interactive Dashboards:**
    - **User:** View personal reports and track status via charts.
    - **Admin:** Overview of total stats, user management, and payment history.
    - **Staff:** Manage assigned tasks and update issue status.
4.  **📈 Visual Analytics:** Beautiful Bar & Pie charts (using Recharts) to visualize report statuses (Pending, In Progress, Resolved).
5.  **💳 Payment Integration (Stripe):**
    - Users can **Boost** an issue to "High Priority" by paying.
    - Users can buy **Membership Subscriptions** for verification badges.
6.  **📄 PDF Invoice Generation:** Users and Admins can download professional PDF invoices for every transaction (Powered by `@react-pdf/renderer`).
7.  **🔍 Advanced Search & Filter:** Sort and filter issues by status, category, or search by keywords on the "All Issues" page.
8.  **🛠️ Issue Management:**
    - Admins can assign specific staff members to an issue.
    - Staff can update the status (Pending → In Progress → Resolved).
9.  **🛡️ Secure API (JWT):** All private routes are protected using JSON Web Tokens (JWT) to prevent unauthorized access.
10. **📱 Fully Responsive Design:** The entire application is built with Tailwind CSS, ensuring a smooth experience on Mobile, Tablet, and Desktop.
11. **💬 Feedback System:** Real-time toast notifications for successful actions (reporting, payments, updates).
12. **⚡ Optimized Performance:** Fast loading speeds using Vite and optimized backend queries.

---

## 🛠️ Technology Stack

- **Frontend:** React.js, Tailwind CSS, DaisyUI, Recharts, Axios, React Query.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (CRUD operations, Aggregation).
- **Authentication:** Firebase Auth.
- **Payment:** Stripe Payment Gateway.
- **Tools:** Vite, Vercel (Backend), Firebase Hosting (Frontend).

---


Developed by **[Mehedi Hasan Shuvo]**
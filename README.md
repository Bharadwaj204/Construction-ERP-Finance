# Construction ERP & Finance System

## 🏗️ Overview

**Construction ERP & Finance** is a modern, responsive web application prototype designed for the construction industry. It streamlines project management, financial tracking, and risk assessment into a single unified interface.

This application demonstrates a full frontend implementation using **React**, **TypeScript**, and **Tailwind CSS**, featuring simulated "AI-driven" logic to predict project risks based on budget and timeline data.

## 🚀 Key Features

### 1. 📊 Executive Dashboard
- **Real-time KPIs**: Track Total Revenue, Active Projects, Pending Invoices, and High-Risk Projects at a glance.
- **Cash Flow Forecast**: Interactive charts visualization using `recharts` to monitor income vs. expenses over time.
- **AI Risk Analysis**: A logic-based engine that evaluates projects based on budget burn rate vs. progress to flag potential risks (Low, Medium, High, Critical).

### 2. 💰 Finance Module
- **Accounts Payable/Receivable**: Manage invoices with status tracking (Paid, Pending, Overdue).
- **Chart of Accounts**: View the General Ledger with categorized assets, liabilities, equity, revenue, and expenses.
- **Invoice Creation**: Functional modal interface to create and add new invoices to the system.

### 3. 🛠️ System Administration
- **User Management**: View system users and their roles.
- **Audit Logs**: Track recent system activities and security events.

### 4. 🔐 Authentication & Roles
- **Simulated Auth**: Secure-feeling login page with persistent session handling using `localStorage`.
- **Role Support**: Different user personas (Admin, Finance Manager, Project Manager).

---

## 💻 Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router DOM

---

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/construction-erp.git
   cd construction-erp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 🔑 Demo Credentials

Since this is a prototype using mock data, you can log in with any of the following usernames (no password required):

| Username | Role | Description |
|----------|------|-------------|
| **admin** | Admin | Full system access |
| **finance** | Finance Manager | Focus on financial modules |
| **pm** | Project Manager | Focus on project execution |

---

## 📂 Project Structure

```
/
├── components/         # Reusable UI components
│   └── Layout.tsx      # Main dashboard shell (Sidebar + Header)
├── pages/              # Main application screens
│   ├── Login.tsx       # Authentication entry point
│   ├── Dashboard.tsx   # Main overview with Charts & AI Insights
│   ├── Finance.tsx     # Invoices & General Ledger
│   └── Admin.tsx       # User & System management
├── services/           # API interaction layer
│   └── api.ts          # Simulated backend calls
├── types.ts            # TypeScript interfaces and types
├── mockData.ts         # Static data for simulation
├── App.tsx             # Main router configuration
└── index.tsx           # Entry point
```

## 🧠 AI Logic Implementation

The "AI" component in this prototype is implemented in `services/api.ts` via the `getRiskAnalysis` function. It calculates risk scores based on:
1. **Budget Overrun**: Checks if money spent > budget.
2. **Burn Rate vs. Progress**: Checks if spending velocity is significantly higher than physical progress.
3. **Timeline Delays**: Flags projects with low progress but high duration elapsed.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

```

### Running the App

**Full Application (Port 3000):**
```bash
npm run dev
```
Open http://localhost:3000

---

## 📦 Modular Development

The project is split into **3 independent modules** that can run on separate ports for isolated testing.

### Run Individual Modules

| Module | Command | Port | URL |
|--------|---------|------|-----|
| Onboarding | `npm run dev:onboarding` | 3001 | http://localhost:3001/onboarding.html |
| Dashboard | `npm run dev:dashboard` | 3002 | http://localhost:3002/dashboard.html |
| Settings | `npm run dev:settings` | 3003 | http://localhost:3003/settings.html |

### Run All Modules Simultaneously

```bash
npm run dev:all
```

This starts all 3 modules on ports 3001, 3002, and 3003.

---

## 📁 Project Structure

```
├── src/
│   ├── pages/
│   │   ├── onboarding/           # 🚀 Onboarding Module
│   │   │   ├── index.tsx
│   │   │   └── OnboardingPage.tsx
│   │   │
│   │   ├── dashboard/            # 📊 Dashboard Module
│   │   │   ├── index.tsx
│   │   │   └── DashboardPage.tsx
│   │   │
│   │   └── settings/             # ⚙️ Settings Module
│   │       ├── index.tsx
│   │       └── SettingsPage.tsx
│   │
│   ├── components/
│   │   ├── Onboarding.tsx        # Multi-step onboarding wizard
│   │   ├── MainDashboard.tsx     # Main dashboard view
│   │   ├── SettingsDashboard.tsx # Settings panel
│   │   ├── Chatbot.tsx           # AI support chatbot
│   │   ├── FeedbackPopup.tsx     # Feedback form
│   │   ├── Sidebar.tsx           # Settings sidebar
│   │   ├── UIComponents.tsx      # Reusable UI components
│   │   ├── ToastContext.tsx      # Toast notifications
│   │   ├── ErrorBoundary.tsx     # Error handling
│   │   └── sections/             # Settings sections
│   │       ├── ProfileSection.tsx
│   │       ├── CompanySection.tsx
│   │       ├── SecuritySection.tsx
│   │       ├── NotificationsAboutSection.tsx
│   │       ├── BillingPricingSection.tsx
│   │       ├── ReferralSection.tsx
│   │       └── AdminSection.tsx
│   │
│   ├── lib/
│   │   └── supabaseClient.ts     # Supabase configuration
│   │
│   ├── App.tsx                   # Main app with routing
│   ├── index.tsx                 # App entry point
│   └── types.ts                  # TypeScript types
│
├── onboarding.html               # Onboarding entry HTML
├── dashboard.html                # Dashboard entry HTML
├── settings.html                 # Settings entry HTML
├── index.html                    # Main app entry HTML
│
├── vite.config.ts                # Main Vite config (Port 3000)
├── vite.onboarding.config.ts     # Onboarding config (Port 3001)
├── vite.dashboard.config.ts      # Dashboard config (Port 3002)
├── vite.settings.config.ts       # Settings config (Port 3003)
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## ✨ Features

### 🚀 Onboarding Module
- Multi-step wizard (Welcome → Personal Info → Organization → Preferences → Complete)
- Form validation
- "Other" option with custom text input for Role & Industry
- Data saved to localStorage
- Universal use cases (not tech-specific)

### 📊 Dashboard Module
- Stats cards (Leads, Revenue, Tasks, Meetings)
- Activity feed
- Quick actions
- User data from localStorage

### ⚙️ Settings Module
- **Profile** - Personal information management
- **Company** - Organization details
- **Security** - Password & 2FA settings
- **Notifications** - Email & push preferences
- **Billing** - Plans & payment
- **Referral** - Referral program
- **Admin** - Admin controls
- **Chatbot** - AI-powered support (bottom-right)
- **Feedback** - User feedback popup

---

## 🛠️ Scripts

```bash
npm run dev              # Run full app (Port 3000)
npm run dev:onboarding   # Run onboarding module (Port 3001)
npm run dev:dashboard    # Run dashboard module (Port 3002)
npm run dev:settings     # Run settings module (Port 3003)
npm run dev:all          # Run all modules simultaneously

npm run build            # Build full app
npm run build:onboarding # Build onboarding module
npm run build:dashboard  # Build dashboard module
npm run build:settings   # Build settings module

npm run preview          # Preview production build
```

---

## 🔧 Environment Variables

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 📚 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **Lucide React** - Icons
- **React Icons** - Additional icons
- **Recharts** - Charts
- **Supabase** - Backend (optional)
- **Tailwind CSS** - Styling

---

## 📝 License

MIT

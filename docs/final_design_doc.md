# Travel Planner Application – Final System Design Documentation

- technical overview
- closed-loop user journeys
- modular architecture

---

## 1. Key Features:
- **User Input:** Collects destination, travel dates, and interests.
- **API Integration:** Aggregates data from public APIs to generate a structured TravelPlan.
- **Itinerary Generation:** Produces day-by-day travel plans.
- **User Engagement:** Supports saving plans (via “Favorite”), editing in a dedicated editor, and profile management.
- **Recommendations:** Provides preset itineraries that users can adopt and customize.

---

## 2. User Journey

The application is designed as a complete loop with multiple entry paths, ensuring a consistent experience regardless of the user's starting point.

### Primary Flow: Direct Travel Plan Creation
1. **Entry:** User lands on the Home page and clicks “Create Travel Plan”.
2. **Input Phase (/form):** User fills out travel preferences.
3. **Processing Phase:**
   - The system calls external APIs (weather, holidays, maps, images).
   - Aggregates responses to generate a structured TravelPlan.
4. **Outcome (/outcome):** Generated itinerary is displayed.
5. **Save/Edit Decision:**
   - If the user clicks “Save” or “Edit”:
     - **Not logged in:** Prompted to register/login.
     - **Logged in:** The plan is saved to their Profile and can be edited via /plan/:id/edit.
6. **Loop Closed:** The edited/saved plan appears in the Profile dashboard and feeds back into future recommendations.

### Alternative Flow 1: Recommendation-First Path
1. **Entry:** User lands on the /recommendations page.
2. **Browsing:** User reviews recommended itineraries.
3. **Favoriting Action:**
   - User clicks “Favorite” on a recommended plan.
   - **If not logged in:** Prompted to register/login.
   - **After authentication:** The recommendation is saved into Profile.savedPlans.
4. **Outcome:** User can later edit the saved plan via the Plan Editor.

### Alternative Flow 2: Registration-First Path
1. **Entry:** User clicks “Register” from Home or header CTA.
2. **Authentication:** Completes registration and logs in.
3. **Next Steps:**
   - User may navigate to /form to create a new plan or
   - Browse recommendations and favorite them.
4. **Outcome:** With an account established, all state-changing actions (save/edit) proceed without interruption.

### Summary of the Closed-Loop Workflow
- **Direct Creation:** Input → Outcome → (Save/Edit) → Profile.
- **Recommendation-First:** Browse → Favorite → Register/Login → Profile.
- **Registration-First:** Authenticated user immediately creates or favorites → Profile.

All paths ultimately converge into a unified Profile & Plan Editor interface, ensuring that feedback and edits update the user’s stored data for continuous improvement.

---

## 3. Modular Architecture Overview

The system is divided into independent modules which communicate through well-defined interfaces:

### Core Modules
1. **Authentication Module (Auth):**
   - Handles login, registration, and session management.
   - **Tech:** React components, localStorage (or future backend API).

2. **User Input Module (UserInputForm):**
   - Collects travel preferences (destination, dates, interests).
   - **Tech:** React with form libraries (Formik, Yup).

3. **API Integration Module (DataFetcher):**
   - Centralized module for fetching data (weather, holidays, maps, images).
   - **Tech:** Axios/Fetch with Promise.all; includes error fallback.

4. **Itinerary Generation Module (ItineraryGenerator):**
   - Transforms API data into a structured TravelPlan.
   - **Tech:** Pure TypeScript logic, functional programming style.

5. **Outcome Display Module (OutcomePage):**
   - Renders the day-by-day itinerary as cards/lists.
   - **Tech:** React UI components, responsive design.

6. **Plan Editing Module (PlanEditor):**
   - Provides editing features (reorder, delete, add notes) for itineraries.
   - **Tech:** React state management, drag-and-drop library (or button-based controls initially).

7. **User Profile Module (ProfileDashboard):**
   - Manages user’s saved and created TravelPlans.
   - **Tech:** Routing, persistent storage, modular UI components.

8. **Recommendation Module (RecommendationGallery):**
   - Displays preset itineraries for users to review and favorite.
   - **Tech:** Static JSON or dynamic API + React components.

---

## 4. Object Model 

```
// User.ts
export interface User {
  id: string;
  username: string;
  password: string;
  savedPlans: TravelPlan[];
  createdPlans: TravelPlan[];
}

// UserPreference.ts
export interface UserPreference {
  destination: string;
  startDate: string;
  endDate: string;
  interests: string[];
}

// TravelPlan.ts
export interface TravelPlan {
  id: string;
  title: string;
  preference: UserPreference;
  plan: DailyItinerary[];
  createdAt: string;
  isEditable: boolean;
  source: 'generated' | 'recommendation' | 'custom';
}

// DailyItinerary.ts
export interface DailyItinerary {
  date: string;
  weather?: string;
  activities: string[];
  notes?: string;
}

```


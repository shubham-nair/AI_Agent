# Travel Planner Application – Base Requirements

This document outlines the detailed design and development plan for the Travel Planner Application, fulfilling all base requirements as defined in the INFO 6150 final project rubric.

---

## 1. Project Description (5 Points)

- **Why are we creating it:**  
  Travel planning often involves sifting through multiple information sources, resulting in a fragmented and time-consuming process. This application streamlines the process by aggregating real-time information (weather, events, maps, images, holidays) to automatically generate personalized, day-by-day itineraries based on user preferences.

- **Who are the users:**  
  - Young independent travelers seeking efficient, data-driven trip planning solutions.  
  - Self-media content creators who need a solid base itinerary that they can further customize and edit to create engaging travel recommendation content for their audiences.

- **Expected Result:**  
  A fully functional web application that quickly generates detailed travel itineraries from user inputs, offers interactive recommendations, allows users to save and edit their plans, and provides a rich, engaging user experience with integrated external data.

---

## 2. Persona Analysis (20 Points)

- **Persona 1:**  
  **Name:** Alex  
  **Age:** 26  
  **Occupation:** Marketing Specialist  
  **Needs:** Quick planning for weekend getaways with reliable local information (weather, events).  
  **Frustrations:** Overwhelmed by the volume of online travel options and disjointed resources; desires a simplified, integrated tool.

- **Persona 2:**  
  **Name:** Taylor  
  **Age:** 32  
  **Occupation:** Self-Media Content Creator  
  **Needs:** To generate a base travel itinerary through AI for further editorial refinement so that they can create engaging, personalized travel recommendations for their audience.  
  **Frustrations:** Finds generic travel plans insufficient for their content; requires robust editing features to tailor itineraries to their unique style and audience preferences.

---

## 3. User Journeys (20 Points)

- **User Journey 1:**  
  *Scenario:* Alex uses the application to plan a short weekend trip.
  - **Opportunity 1:** Streamline the user interface to minimize clicks and simplify the itinerary generation process.
  - **Opportunity 2:** Implement an auto-fill feature that recalls previous preferences to expedite repeat planning sessions.

- **User Journey 2:**  
  *Scenario:* Taylor, the self-media content creator, uses the app to generate an initial travel itinerary via AI. Afterwards, Taylor accesses their profile to edit and refine the itinerary—reordering days, adding personalized recommendations, and incorporating custom notes—to create engaging travel content for their readers.
  - **Opportunity 1:** Provide an advanced editing interface in the Profile, allowing users to modify AI-generated itineraries.
  - **Opportunity 2:** Enable integration of custom editorial content such as personalized travel tips and narrative descriptions.

---

## 4. Sitemap (20 Points)

- **List of All Pages:**
  - `/` (Home)
  - `/form` (User Input Form)
  - `/loading` (Loading/Transition Page)
  - `/outcome` (Generated Itinerary/Outcome Page)
  - `/recommendations` (Recommendations Gallery)
  - `/login` (Login Page)
  - `/register` (Registration Page)
  - `/profile` (User Profile/Dashboard)
  - `/plan/:id/edit` (Plan Editing Interface)
  - `/404` (Not Found)

- **Information on Each Page:**
  - Clear descriptions provided above under the Sitemap section.

- **Process Explanations (Flowchart Overview):**

  ```text
  [User Input Form] → [Submit Preferences]
         ↓
  [API Integration Layer: Weather, Maps, Holidays, Images]
         ↓
  [Generate TravelPlan Object]
         ↓
  [Outcome Page: Display Itinerary]
         ↓
     → (If "Favorite" clicked & logged in) → Save Plan to Profile
     → (If not logged in) → Redirect to Login/Register
  ```

---

## 5. Low-Resolution Mockups (20 Points)

- **Mockup 1:** Input Page  
  Clean layout with fields for destination, travel dates, and preferences. Includes a CTA to generate the itinerary.

- **Mockup 2:** Outcome/Profile Editing Page  
  Card-based layout with day-by-day itinerary. Includes "Favorite" and "Edit" buttons. Editing interface includes reordering, deleting, and adding notes.

---

## 6. Typography & Color Palette (10 Points)

- **Typography:** Roboto or Inter for readability.
- **Primary Color:** Blue (trust, clarity)
- **Accent Color:** Orange (CTA highlights)
- **Background:** Light neutral (white/gray)
- **Design Focus:** High contrast (WCAG 2.1 AA), consistent visual identity, accessible fonts and sizes.

---

## 7. Code and Working Site (50 Points)

- **GitHub Repository URL:** https://github.com/hao7babe/AI_Agent
- **At Least 2 Pages Implemented:** Form Page, Outcome Page, Profile Page with Editing
- **Code Quality:** Modular TypeScript + React, semantic HTML, responsive CSS, strict linting
- **Known Issues:**  
  - Generated itineraries sometimes lack contextual accuracy (e.g., mismatched activities for season/weather).
  - Activity distribution across days may be unbalanced without post-processing.
  - No graceful fallback when API data is missing (e.g., holidays/events).

---

## 8. Future of the Project & Team Learnings (5 Points)

- **Future Plans:**
  - Real-time booking integrations (flights, hotels)
  - More editorial tools for content creators
  - Backend auth and database support

- **Team Learnings:**
  - ​

---
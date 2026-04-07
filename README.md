# Interactive Wall Calendar Widget 🗓️

A polished, responsive, and highly interactive React/Next.js calendar component built for the takeUforward Frontend Engineering Challenge.

## ✨ Features
* **Wall Calendar Aesthetic:** Clean UI with a prominent visual anchor, mimicking a physical wall calendar.
* **Day Range Selection:** Intuitive start and end date selection with clear visual highlighting for ranges.
* **Contextual Notes Engine:** Notes are dynamically bound to the state. Selecting a specific date opens notes for that exact day, while clearing the selection opens a general "Monthly Memo".
* **Data Persistence:** Utilizes Local Storage to ensure user notes and selected date ranges survive page refreshes.
* **Fully Responsive:** Side-by-side layout on desktop gracefully stacks on mobile devices.

## 🛠️ Tech Stack & Architectural Choices
* **Framework:** Next.js (App Router) / React
* **Styling:** Tailwind CSS (Chosen for rapid UI development and seamless responsive utility classes).
* **Date Logic:** `date-fns` (Chosen over standard JS Date objects to avoid cross-browser timezone bugs and keep calendar grid logic clean and readable).
* **Icons:** `lucide-react`
* **State Management:** React `useState` & `useEffect` paired with the browser's native `localStorage` API to meet the strict client-side-only requirements.

## 🚀 How to Run Locally

1. Clone the repository:
```bash
git clone [https://github.com/Manan-Joshi750/tufa-frontend-challenge.git](https://github.com/Manan-Joshi750/tufa-frontend-challenge.git)
```
2. Navigate to the directory:

```bash
cd tufa-frontend-challenge
```
3. Install dependencies:

```bash
npm install
```
4. Start the development server:

```bash
npm run dev
```
5. Open http://localhost:3000 in your browser.
# Jet2Holiday Reward Game

## Overview

Jet2Holiday Reward Game is an interactive, multi-stage React web app developed for the Jet2Holiday Hackathon. The app simulates an in-flight entertainment experience, challenging passengers to compete in three engaging rounds—reflex, quiz, and brainstorming—to earn points, climb a reward ladder, and win prizes ranging from eco-friendly gifts to flight upgrades. The game features a dynamic leaderboard, real-time feedback, and educational content focused on nature conservation.

## Features

- **Three Unique Game Rounds:**
  - **Reflex Challenge:** Test your reaction speed with an animated slider mini-game ("Slice It").
  - **Eco Quiz:** Answer multiple-choice questions on environmental topics—immediate feedback and live score updates.
  - **Brainstorm:** Submit creative ideas for protecting the planet; earn points for thoughtful, well-developed responses.

- **Dynamic Leaderboard:** Track your position and progress against other players in real time.

- **Tiered Reward System:**  
  Players accumulate points across all rounds, with escalating rewards:
  - **0–49 points:** Eco-friendly travel kit
  - **50–99 points:** Carbon offset certificate
  - **100–149 points:** Tree planting donation
  - **150+ points:** Wildlife conservation experience (or potential flight upgrade in a live integration)

- **Educational Content:**  
  Interesting nature facts are shown between rounds to promote awareness and learning.

- **Responsive, Accessible UI:**  
  Clean, modern design with animated elements, accessible controls, and thematic icons.

## How It Works

- **Start:** Begin from the lobby, review the rules and rewards, and click **Start**.
- **Play:** Progress through each round—reflex, quiz, brainstorm—earning points for quick reactions, correct answers, and creative ideas.
- **Feedback:** See immediate feedback on your performance, with wrong answers highlighted and the correct answer shown after submission.
- **Leaderboard:** Watch your score and position update in real time.
- **Results:** At the end, a winner is announced with their prize displayed.

## Technologies

- **React** with functional components and hooks
- **TypeScript** for type safety and maintainability
- **Tailwind CSS** for responsive, accessible styling
- **Lucide React** for thematic, customizable icons
- **Fisher-Yates shuffle** for randomizing questions and facts each game

## Installation

1. **Clone the repository:**
```
git clone https://github.com/yourusername/jet2holiday-reward-game.git
cd jet2holiday-reward-game
```
2. **Install dependencies:**
```
npm install
```
3. **Start the development server:**
```
npm run dev
```
4. **Open in your browser:**  
Visit `http://localhost:3000` to play!

## Usage

- **Lobby:** Review game info, then click **Start**.
- **Reflex Round:** Click to "slice" when the slider aligns with the center for maximum points.
- **Quiz Round:** Select your answer from clickable cards—get instant feedback and see your score update.
- **Brainstorm Round:** Type your best conservation ideas—longer, thoughtful answers earn more points.
- **Leaderboard:** Always visible, updates as you play.
- **Results:** Celebrate the winner and see the prize awarded.

## Project Structure

- **`NatureConservationGame.tsx`:** The main game component, containing all rounds, scoring, and UI logic.
- **`README.md`:** This documentation.

## Future Enhancements

- **Multiplayer Support:** Compete against other passengers in real time.
- **Adaptive Difficulty:** Adjust quiz challenge based on player performance.
- **AI Scoring:** Use natural language processing to evaluate brainstorming responses.
- **Seat Upgrade Integration:** Connect to live flight seat availability for automatic rewards.
- **Team Play:** Add collaborative brainstorming for shared rewards.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.  
Bug reports and feature suggestions can be submitted via GitHub Issues.

## Sources

This project leveraged multiple AI tools and resources during development:

- **[LlamaCoder](https://llamacoder.together.ai/)**: AI-powered code generation and initial project setup.
- **[Perplexity](https://www.perplexity.ai/)**: AI-assisted research, debugging, and UX refinement.

---
*Developed during the COMMSTEM x Canva Hackathon by Team Jet2Holiday with support from AI tools (LlamaCoder, Perplexity) and iterative user testing. No jets were harmed during the making of this program we swear.* <br />
*Team Members:* Aadesh Taneja, Anhad Singh Ratnu, Kanav Veer Singh

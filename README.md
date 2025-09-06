# Jet2Holiday-Hackathon

## Process So Far
1. Brainstorming Ideas - Came up with a few app ideas, fleshed them out further and landed on this idea in the end
2. Wrote out the generic idea of the whole app *(mentioned below)*
3. Used Perplexity (an AI Model) to refine this prompt further and more understandable *(mentioned below)*
4. Used [LlamaCoder](https://llamacoder.together.ai/) to create the basic React app with Typescript & Tailwind CSS
5. However, upon encountering some bugs with the layout and code, we switched over to using Perplexity and setting up the React project.
6. I kept reprompting Perplexity & testing my app to ensure that the UX was up to the level I wanted it to be.
7. Made minor tweaks such as - changing radio buttons to cards on the quiz app screen, updating the color schemes, fixing the quiz counter & dynamically updating the score card & the 
8. 
---
## Prompts
### Original Idea/Pitch:
"an airline which provides an opportunity to win big rewards. Jet2Holidays offers a game - in rounds (slicing or something, quiz/trivia and brainstorming) and whoevers win the ladder gets rewarded. frim economy to premijm economy and from that to business and from business to first class. and a first class guy gets something else as a reward (note that only given if free seats available). if not maybe they refund the whole ticket or 50% as a reward. and so this game will have mind opening games thatll compel them to think, analyse, acknowledge, and learn (in nature context) every round will give points. all of em can play all 3 rounds but the one who has most points is rewarded."

### Updated/Refined Prompt:
"Hackathon Project Prompt: Jet2Holidays Reward Game
Project Overview
Design and implement an interactive multistage in-flight reward game for Jet2Holidays where passengers can participate in fun, thought-provoking rounds during their journey. The game will offer tier-based rewards (seat upgrades or ticket discounts) depending on the players' performance. The program should engage passengers through challenges that encourage creativity, analysis, and awareness, while also promoting a rewarding experience linked to airline services.

Core Concept
Passengers compete in 3 different game rounds (e.g., slicing/fast reaction, quiz/trivia, and brainstorming) to earn points.
After all rounds, scores are tallied.
The highest-scoring passenger climbs the "Flight Ladder," moving from Economy → Premium Economy → Business → First Class.
Passengers already seated in First Class may win an alternative reward (free upgrade if free seats exist, or a partial/full ticket refund).
Rewards only apply if seat availability exists, otherwise fallback rewards (ticket refund percentage) are offered.

Features Breakdown
Game Rounds
Round 1 – Quick Reaction ("Slice It")
A reflex-based mini-game (like catching or slicing fast objects).
Designed to test speed and immediate decision-making.
Round 2 – Quiz/Trivia
Multiple-choice questions related to nature, travel, and general knowledge.
Encourages learning while engaging passengers in airline-relevant themes.
Round 3 – Brainstorm Challenge
Creative problem-solving questions (e.g., "How would you design an eco-friendly plane cabin?").
Passengers submit short answers; AI or a scoring system evaluates creativity and depth.
Scoring System
Each round has fixed points.
All passengers participate in every round.
At the end, the leaderboard shows cumulative scores.
The highest scorer receives the upgrade/reward.

Reward Ladder
Economy → Premium Economy
Premium Economy → Business
Business → First
First Class → Special Reward
Free upgrade if spare seats exist.
OR 50%–100% ticket refund if no seats are available.

Technical Requirements
Front-End:
Simple, clean UI suitable for inflight entertainment screens.
Interactive mini-games, quizzes, and brainstorming text input.
Back-End:
Handles scoring, leaderboard updating, and reward allocation.
Tracks seat availability dynamically with flight database integration.
Game Flow:
All passengers can join via the inflight entertainment system.
Progress through rounds in sequence → score accumulation.
Real-time leaderboard for transparency.
Final announcement of winner and automatic reward allocation logic.
Stretch Goals
Multiplayer competitiveness (see passenger rank in real time)
Collaborative team play option (team-based brainstorming for shared rewards).
AI-enhanced quiz difficulty adapting to passenger performance.
Rewards beyond seat upgrades (e.g., vouchers, bonus miles)"

## Third-Party Resources
1. [LlamaCoder](https://llamacoder.together.ai/)
2. [Perplexity](https://www.perplexity.ai/)
3. 
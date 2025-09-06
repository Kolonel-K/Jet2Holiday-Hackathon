"use client";
import { useState, useEffect, useRef } from "react";
import { Leaf, Trees, Waves, Mountain, Sun, Moon } from "lucide-react";

// ==================== Type Definitions ====================

type GameRound = "slice-it" | "quiz" | "brainstorm";

interface Player {
  id: string;
  name: string;
  score: number;
  quizCorrect: number;
  currentRound: GameRound;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface BrainstormChallenge {
  id: number;
  prompt: string;
  exampleAnswer: string;
}

interface NatureFact {
  id: number;
  fact: string;
  icon: string;
}

// ==================== Game Data ====================

const ROUND_TITLES: Record<GameRound, string> = {
  "slice-it": "Nature Reflex Challenge",
  quiz: "Eco Quiz",
  brainstorm: "Conservation Ideas",
};

const NATURE_FACTS: NatureFact[] = [
  { id: 1, fact: "A single tree can absorb up to 48 pounds of CO₂ per year!", icon: "Trees" },
  { id: 2, fact: "The Amazon rainforest produces 20% of the world's oxygen.", icon: "Leaf" },
  { id: 3, fact: "Coral reefs cover less than 1% of the ocean floor but support 25% of marine life.", icon: "Waves" },
  { id: 4, fact: "Bees pollinate one-third of the food we eat!", icon: "Sun" },
  { id: 5, fact: "A single lightning strike can trigger thousands of forest fires each year.", icon: "Mountain" },
];

const DEFAULT_QUESTIONS: Question[] = [
  { id: 1, question: "Which gas is primarily responsible for climate change?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correctAnswer: 2 },
  { id: 2, question: "What percentage of Earth's water is freshwater?", options: ["1%", "3%", "10%", "25%"], correctAnswer: 1 },
  { id: 3, question: "Which of these is the most biodiverse ecosystem?", options: ["Desert", "Tundra", "Rainforest", "Grassland"], correctAnswer: 2 },
  { id: 4, question: "How many species go extinct each day due to deforestation?", options: ["10", "50", "150", "1000"], correctAnswer: 2 },
  { id: 5, question: "What is the primary cause of ocean acidification?", options: ["Plastic pollution", "Oil spills", "CO₂ absorption", "Overfishing"], correctAnswer: 2 },
];

const BRAINSTORM_CHALLENGES: BrainstormChallenge[] = [
  { id: 1, prompt: "Name 3 ways you can help protect nature in your daily life", exampleAnswer: "1. Use reusable bags and bottles\n2. Plant native flowers for pollinators\n3. Reduce energy consumption" },
  { id: 2, prompt: "What nature conservation project would you start in your community?", exampleAnswer: "Community garden with native plants to support local wildlife and educate residents about sustainable practices" },
];

// Map icon names to actual components (type-safe)
const iconMap = {
  Trees,
  Leaf,
  Waves,
  Mountain,
  Sun,
  Moon,
} as const;

// ==================== Utility Functions ====================

/** Randomly shuffle an array using the Fisher-Yates algorithm */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Helper to display reward based on score */
function getRewardDescription(score: number): string {
  if (score >= 150) return "Wildlife conservation experience";
  if (score >= 100) return "Tree planting donation";
  if (score >= 50) return "Carbon offset certificate";
  return "Eco-friendly travel kit";
}

// ==================== Reusable UI Components ====================

/** Renders icons from string names, defaulting to Leaf */
function IconComponent({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name as keyof typeof iconMap] || Leaf;
  return <Icon className={className} />;
}

/** Shows icon based on round type */
function RoundIcon({ round }: { round: GameRound }) {
  switch (round) {
    case "slice-it": return <Leaf className="h-5 w-5" />;
    case "quiz": return <Trees className="h-5 w-5" />;
    case "brainstorm": return <Waves className="h-5 w-5" />;
    default: return <Leaf className="h-5 w-5" />;
  }
}

/** Simple, styled button */
function Button({ children, onClick, className = "", disabled = false }: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
    >
      {children}
    </button>
  );
}

/** Styled card container */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
}

/** Styled card header */
function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-4 border-b ${className}`}>
      {children}
    </div>
  );
}

/** Styled card title */
function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`text-lg font-semibold ${className}`}>
      {children}
    </h3>
  );
}

/** Styled card content */
function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
}

/** Styled badge */
function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}

/** Styled textarea */
function Textarea({ value, onChange, placeholder, rows = 3, id }: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  id?: string;
}) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
    />
  );
}

/** Styled label */
function Label({ children, htmlFor, className = "" }: { children: React.ReactNode; htmlFor?: string; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  );
}

// ==================== Main Game Component ====================

export default function NatureConservationGame() {
  // ========== Game State ==========
  const [gameState, setGameState] = useState<"lobby" | "playing" | "fact" | "results">("lobby");
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: "You", score: 0, quizCorrect: 0, currentRound: "slice-it" },
    { id: "2", name: "Alex", score: 0, quizCorrect: 0, currentRound: "slice-it" },
    { id: "3", name: "Taylor", score: 0, quizCorrect: 0, currentRound: "slice-it" },
  ]);
  const [currentRound, setCurrentRound] = useState<GameRound>("slice-it");
  const [slicePosition, setSlicePosition] = useState(50);
  const [sliceDirection, setSliceDirection] = useState<"left" | "right">("right");
  const [sliceSpeed, setSliceSpeed] = useState(5);
  // Quiz is randomized on each new game, and quizAnswers tracks user selections
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number | null>>({});
  // Facts are displayed in a new random order each game
  const [shuffledNatureFacts, setShuffledNatureFacts] = useState<NatureFact[]>([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [brainstormAnswer, setBrainstormAnswer] = useState("");
  const [brainstormPoints, setBrainstormPoints] = useState(0); // Points awarded for brainstorm response
  const [timeLeft, setTimeLeft] = useState(30);
  const [winner, setWinner] = useState<Player | null>(null);
  const [progress, setProgress] = useState(0);
  const sliceInterval = useRef<NodeJS.Timeout | null>(null);
  const currentPlayer = players.find(p => p.id === "1")!;

  // ========== Game Initialization ==========
  useEffect(() => {
    if (gameState === "lobby") {
      // Shuffle questions and facts for each new game
      setQuizQuestions(shuffleArray(DEFAULT_QUESTIONS));
      setShuffledNatureFacts(shuffleArray(NATURE_FACTS));
      // Initialize quiz answers state for the CURRENT shuffled questions
      const initialAnswers: Record<number, number | null> = {};
      DEFAULT_QUESTIONS.forEach(q => {
        initialAnswers[q.id] = null;
      });
      setQuizAnswers(initialAnswers);
      setCurrentQuizIndex(0);
      setCurrentFactIndex(0);
      setBrainstormPoints(0);
      setBrainstormAnswer("");
      // Reset player scores and progress for the new game
      setPlayers([
        { id: "1", name: "You", score: 0, quizCorrect: 0, currentRound: "slice-it" },
        { id: "2", name: "Alex", score: 0, quizCorrect: 0, currentRound: "slice-it" },
        { id: "3", name: "Taylor", score: 0, quizCorrect: 0, currentRound: "slice-it" },
      ]);
      setProgress(0);
    }
  }, [gameState]);

  // ========== Slice Animation ==========
  useEffect(() => {
    if (currentRound === "slice-it" && gameState === "playing") {
      sliceInterval.current = setInterval(() => {
        setSlicePosition(prev => {
          if (sliceDirection === "right") {
            if (prev >= 95) {
              setSliceDirection("left");
              return 94;
            }
            return prev + sliceSpeed;
          } else {
            if (prev <= 5) {
              setSliceDirection("right");
              return 6;
            }
            return prev - sliceSpeed;
          }
        });
      }, 100);
      return () => {
        if (sliceInterval.current) clearInterval(sliceInterval.current);
      };
    }
  }, [currentRound, gameState, sliceDirection, sliceSpeed]);

  // ========== Timer ==========
  useEffect(() => {
    if ((gameState === "playing" || gameState === "fact") && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      showFactScreen();
    } else if (timeLeft === 0 && gameState === "fact") {
      startNextRound();
    }
  }, [timeLeft, gameState]);

  // ========== Game Actions ==========
  const startGame = () => {
    setGameState("playing");
    setTimeLeft(30);
    setProgress(0);
  };

  const handleSlice = () => {
    if (currentRound !== "slice-it") return;
    // Calculate score based on position (center = 10 points, edges = 1 point)
    const distanceFromCenter = Math.abs(50 - slicePosition);
    const points = Math.max(1, 10 - Math.floor(distanceFromCenter / 5));
    updatePlayerScore("1", points);
    // Increase difficulty
    setSliceSpeed(prev => Math.min(prev + 0.5, 15));
  };

  const handleQuizAnswer = (questionId: number, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      submitQuizAnswers();
    }
  };

  const submitQuizAnswers = () => {
    let points = 0;
    let correct = 0;
    // Only check questions that are part of the current quiz
    quizQuestions.forEach(question => {
      const answer = quizAnswers[question.id];
      if (answer === question.correctAnswer) {
        points += 10;
        correct++;
      }
    });
    // Update player's score and correct answer count
    setPlayers(prev =>
      prev.map(player =>
        player.id === "1" ? { ...player, score: player.score + points, quizCorrect: correct } : player
      )
    );
    showFactScreen();
  };

  const handleBrainstormInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBrainstormAnswer(e.target.value);
    // Award points based on answer length (up to 30 points)
    const points = Math.min(30, Math.floor(e.target.value.length / 4)); // Adjusted for fairer scoring
    setBrainstormPoints(points);
  };

  const submitBrainstorm = () => {
    // Finalize brainstorm points before moving to the next round
    updatePlayerScore("1", brainstormPoints);
    showFactScreen();
  };

  const updatePlayerScore = (playerId: string, points: number) => {
    setPlayers(prev =>
      prev.map(player =>
        player.id === playerId ? { ...player, score: player.score + points } : player
      )
    );
  };

  const showFactScreen = () => {
    setGameState("fact");
    setTimeLeft(5); // Short pause between rounds
    // Cycle through facts (modulus handles overflow)
    setCurrentFactIndex(prev => (prev + 1) % shuffledNatureFacts.length);
    // Update progress based on round
    const roundIndex = Object.keys(ROUND_TITLES).indexOf(currentRound);
    setProgress(((roundIndex + 1) / 3) * 100);
  };

  const startNextRound = () => {
    if (currentRound === "slice-it") {
      setCurrentRound("quiz");
      setTimeLeft(60);
      setGameState("playing");
      setCurrentQuizIndex(0);
      setBrainstormAnswer("");
      setBrainstormPoints(0);
    } else if (currentRound === "quiz") {
      setCurrentRound("brainstorm");
      setTimeLeft(90);
      setGameState("playing");
      setCurrentQuizIndex(0); // Not used in brainstorm, but reset for consistency
      setBrainstormAnswer("");
      setBrainstormPoints(0);
    } else {
      setGameState("results");
      calculateWinner();
      setProgress(100);
    }
  };

  const calculateWinner = () => {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    setWinner(sortedPlayers[0]);
  };

  const resetGame = () => {
    setGameState("lobby");
    setCurrentRound("slice-it");
    setPlayers([
      { id: "1", name: "You", score: 0, quizCorrect: 0, currentRound: "slice-it" },
      { id: "2", name: "Alex", score: 0, quizCorrect: 0, currentRound: "slice-it" },
      { id: "3", name: "Taylor", score: 0, quizCorrect: 0, currentRound: "slice-it" },
    ]);
    setSlicePosition(50);
    setSliceDirection("right");
    setSliceSpeed(5);
    const initialAnswers: Record<number, number | null> = {};
    DEFAULT_QUESTIONS.forEach(q => {
      initialAnswers[q.id] = null;
    });
    setQuizAnswers(initialAnswers);
    setCurrentQuizIndex(0);
    setCurrentFactIndex(0);
    setBrainstormAnswer("");
    setBrainstormPoints(0);
    setTimeLeft(30);
    setWinner(null);
    setProgress(0);
  };

  // ========== UI Helpers ==========
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  // ========== Render ==========
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gradient-to-b from-emerald-50 to-teal-100 overflow-auto">
      <div className="w-full max-w-4xl h-full md:h-auto">
        {/* Game Header */}
        <header className="mb-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="text-green-600" />
            <h1 className="text-3xl font-bold text-green-800">Nature Conservation Challenge</h1>
          </div>
          <p className="text-green-600">Protect our planet while you fly!</p>
        </header>

        {/* Progress Bar */}
        {(gameState === "playing" || gameState === "fact") && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-green-700 mb-1">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-3 bg-green-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Lobby Screen */}
        {gameState === "lobby" && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-800">Welcome to the Conservation Challenge!</CardTitle>
              <p className="text-gray-600">Test your nature knowledge and earn rewards</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-700 flex items-center gap-2">
                    <Leaf className="h-4 w-4" /> Round 1: Reflex Challenge
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Test your reflexes with nature-themed actions
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-700 flex items-center gap-2">
                    <Trees className="h-4 w-4" /> Round 2: Eco Quiz
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Answer questions about environmental conservation
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-700 flex items-center gap-2">
                    <Waves className="h-4 w-4" /> Round 3: Conservation Ideas
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Share your ideas for protecting our planet
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Nature Rewards</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>0-49 points:</span>
                    <span>Eco-friendly travel kit</span>
                  </li>
                  <li className="flex justify-between">
                    <span>50-99 points:</span>
                    <span>Carbon offset certificate</span>
                  </li>
                  <li className="flex justify-between">
                    <span>100-149 points:</span>
                    <span>Tree planting donation</span>
                  </li>
                  <li className="flex justify-between font-bold">
                    <span>150+ points:</span>
                    <span>Wildlife conservation experience</span>
                  </li>
                </ul>
              </div>
              <Button
                onClick={startGame}
                className="w-full py-3 text-lg bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white"
              >
                Start Conservation Challenge
              </Button>
            </CardContent>
          </Card>
        )}

        {/* In-Game Screen */}
        {gameState === "playing" && (
          <div className="space-y-6">
            {/* Timer and Score */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Badge className="bg-gray-100 text-gray-800">
                  Time: {timeLeft}s
                </Badge>
                <Badge className="bg-green-100 text-green-800">
                  Score: {currentPlayer.score}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Round</p>
                <p className="font-bold text-green-700 flex items-center gap-1">
                  <RoundIcon round={currentRound} /> {ROUND_TITLES[currentRound]}
                </p>
              </div>
            </div>

            {/* Leaderboard */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Trees className="h-5 w-5" /> Conservation Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sortedPlayers.map((player, index) => (
                    <div
                      key={player.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        player.id === "1"
                          ? "bg-green-100 border border-green-300"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index === 0 ? "bg-yellow-400 text-gray-900"
                            : index === 1 ? "bg-gray-300 text-gray-900"
                            : index === 2 ? "bg-amber-700 text-white"
                            : "bg-gray-200 text-gray-900"
                          }`}
                        >
                          <span className="font-bold">{index + 1}</span>
                        </div>
                        <span className={player.id === "1" ? "font-bold text-green-800" : "text-gray-900"}>
                          {player.name}
                        </span>
                      </div>
                      <span className="font-mono text-gray-900">{player.score} pts</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Slice-It Round */}
            {currentRound === "slice-it" && (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Leaf className="h-5 w-5" /> Nature Reflex Challenge
                  </CardTitle>
                  <p className="text-gray-600">
                    Click when the bar aligns with the center to protect nature!
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full overflow-hidden border border-green-200">
                    <div
                      className="absolute top-0 bottom-0 w-4 bg-green-600 rounded-full shadow-lg"
                      style={{ left: `${slicePosition}%`, transform: 'translateX(-50%)' }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1 h-16 bg-red-400 opacity-50"></div>
                    </div>
                  </div>
                  <Button
                    onClick={handleSlice}
                    className="w-full py-3 text-lg bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white"
                  >
                    PROTECT NATURE!
                  </Button>
                  <p className="text-center text-sm text-gray-600">
                    Points: Center (10 pts) → Edges (1 pt)
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quiz Round (Clickable Cards, Always Green Text) */}
            {currentRound === "quiz" && quizQuestions.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Trees className="h-5 w-5" /> Eco Conservation Quiz
                  </CardTitle>
                  <p className="text-gray-600">
                    Test your knowledge about protecting our planet!
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between">
                    <Badge className="bg-green-100 text-green-800">
                      Question {currentQuizIndex + 1} / {quizQuestions.length}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800">
                      Correct: {currentPlayer.quizCorrect} / {quizQuestions.length}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">
                      {quizQuestions[currentQuizIndex].question}
                    </h3>
                    <div className="grid grid-cols-1 gap-3 mt-4">
                      {quizQuestions[currentQuizIndex].options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          onClick={() => handleQuizAnswer(quizQuestions[currentQuizIndex].id, optionIndex)}
                          className={`p-4 rounded-lg cursor-pointer transition-colors border-2 text-green-700
                            ${quizAnswers[quizQuestions[currentQuizIndex].id] === optionIndex
                              ? 'bg-green-100 border-green-500'
                              : 'bg-white border-gray-200 hover:bg-green-50 hover:border-green-300'
                            }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={handleNextQuizQuestion}
                      disabled={quizAnswers[quizQuestions[currentQuizIndex].id] === null}
                      className="w-full py-3 text-lg bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {currentQuizIndex < quizQuestions.length - 1 ? "Next Question" : "Submit Quiz"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Brainstorm Round (Awards points for thoughtful input) */}
            {currentRound === "brainstorm" && (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Waves className="h-5 w-5" /> Conservation Ideas
                  </CardTitle>
                  <p className="text-gray-600">
                    Share your ideas for protecting our planet!
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-medium mb-2">Prompt:</h3>
                    <p className="text-green-800">
                      {BRAINSTORM_CHALLENGES[0].prompt}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Example: {BRAINSTORM_CHALLENGES[0].exampleAnswer}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brainstorm">Your Conservation Ideas</Label>
                    <Textarea
                      id="brainstorm"
                      placeholder="Share your ideas for protecting nature..."
                      value={brainstormAnswer}
                      onChange={handleBrainstormInput}
                      rows={5}
                    />
                    <span className="text-sm text-gray-500">
                      You will earn up to 30 points for your ideas!
                    </span>
                    {brainstormPoints > 0 && (
                      <Badge className="bg-green-100 text-green-800 mt-2">
                        Potential Points: {brainstormPoints}
                      </Badge>
                    )}
                  </div>
                  <Button
                    onClick={submitBrainstorm}
                    className="w-full py-3 text-lg bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white"
                  >
                    Submit Ideas
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Fact Screen (Short, 5s Timer) */}
        {gameState === "fact" && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Leaf className="h-5 w-5" /> Nature Fact Break
              </CardTitle>
              <p className="text-gray-600">Did you know?</p>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-green-50 rounded-full">
                  <IconComponent
                    name={shuffledNatureFacts[currentFactIndex]?.icon}
                    className="h-8 w-8 text-green-600"
                  />
                </div>
                <p className="text-xl text-center text-green-800 max-w-md">
                  {shuffledNatureFacts[currentFactIndex]?.fact}
                </p>
              </div>
              <div className="text-center">
                <Badge className="bg-gray-100 text-gray-800">
                  Next round in: {timeLeft}s
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Screen */}
        {gameState === "results" && winner && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Leaf className="h-6 w-6 text-green-600" /> Conservation Challenge Results
              </CardTitle>
              <p className="text-gray-600">Congratulations to our nature champion!</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl text-white">
                <h2 className="text-3xl font-bold mb-2">🏆 {winner.name} Wins! 🏆</h2>
                <p className="text-xl">Final Score: {winner.score} points</p>
                <p className="mt-2 text-lg">
                  Reward: {getRewardDescription(winner.score)}
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-800">Conservation Leaderboard</h3>
                <div className="space-y-3">
                  {sortedPlayers.map((player, index) => (
                    <div
                      key={player.id}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        player.id === winner.id
                          ? "bg-green-100 border border-green-300"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index === 0 ? "bg-yellow-400 text-gray-900"
                            : index === 1 ? "bg-gray-300 text-gray-900"
                            : index === 2 ? "bg-amber-700 text-white"
                            : "bg-gray-200 text-gray-900"
                          }`}
                        >
                          <span className="font-bold">{index + 1}</span>
                        </div>
                        <span className={player.id === winner.id ? "font-bold text-green-800" : "text-gray-900"}>
                          {player.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-gray-900">{player.score} pts</p>
                        <p className="text-sm text-gray-600">
                          {getRewardDescription(player.score)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                onClick={resetGame}
                className="w-full py-3 text-lg bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white"
              >
                Play Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

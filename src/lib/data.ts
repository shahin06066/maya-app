export type Tab = "home" | "pay" | "cards" | "savings" | "profile";

export type TransactionCategory =
  | "food"
  | "transfer"
  | "bills"
  | "shopping"
  | "income"
  | "entertainment"
  | "topup"
  | "cashback"
  | "transport";

export type Tone = "mint" | "peach" | "sky" | "lilac" | "butter" | "rose";

export interface Transaction {
  id: string;
  title: string;
  meta: string;
  amount: number;
  direction: "in" | "out";
  category: TransactionCategory;
  dateLabel: string;
}

export interface Contact {
  id: string;
  name: string;
  handle: string;
  initials: string;
  tone: Tone;
}

export interface Goal {
  id: string;
  name: string;
  emoji: string;
  saved: number;
  target: number;
  deadline: string;
}

export interface Biller {
  id: string;
  name: string;
  category: string;
  icon: "electric" | "water" | "mobile" | "internet" | "streaming" | "government" | "loan" | "card";
  tone: Tone;
}

export type InfoTopic =
  | "personal"
  | "security"
  | "limits"
  | "statement"
  | "linked"
  | "help"
  | "credit"
  | "about";

export type SheetKind =
  | "send"
  | "add"
  | "pay"
  | "load"
  | "qr"
  | "notifications"
  | "activity"
  | "goal"
  | "info"
  | "transaction";

export interface SheetMeta {
  target?: "wallet" | "savings";
  goalId?: string;
  contactId?: string;
  billerId?: string;
  topic?: InfoTopic;
  transaction?: Transaction;
}

export interface SheetState {
  kind: SheetKind;
  meta?: SheetMeta;
}

export const initialTransactions: Transaction[] = [
  {
    id: "tx-1",
    title: "Jollibee",
    meta: "Food & drinks · Today",
    amount: 248,
    direction: "out",
    category: "food",
    dateLabel: "Today, 12:42 PM",
  },
  {
    id: "tx-2",
    title: "Angela Cruz",
    meta: "Money received · Today",
    amount: 1200,
    direction: "in",
    category: "income",
    dateLabel: "Today, 9:15 AM",
  },
  {
    id: "tx-3",
    title: "Maya Savings",
    meta: "Goal top-up · Yesterday",
    amount: 2000,
    direction: "out",
    category: "transfer",
    dateLabel: "Yesterday, 7:30 PM",
  },
  {
    id: "tx-4",
    title: "Netflix",
    meta: "Entertainment · Yesterday",
    amount: 549,
    direction: "out",
    category: "entertainment",
    dateLabel: "Yesterday, 11:02 AM",
  },
  {
    id: "tx-5",
    title: "Cash in via BPI",
    meta: "Wallet top-up · May 24",
    amount: 2000,
    direction: "in",
    category: "topup",
    dateLabel: "May 24, 4:18 PM",
  },
  {
    id: "tx-6",
    title: "Globe Telecom",
    meta: "Bills · May 23",
    amount: 799,
    direction: "out",
    category: "bills",
    dateLabel: "May 23, 10:05 AM",
  },
  {
    id: "tx-7",
    title: "Starbucks",
    meta: "Coffee · May 22",
    amount: 185,
    direction: "out",
    category: "food",
    dateLabel: "May 22, 8:36 AM",
  },
  {
    id: "tx-8",
    title: "Maya cashback",
    meta: "Reward · May 21",
    amount: 128.5,
    direction: "in",
    category: "cashback",
    dateLabel: "May 21, 6:40 PM",
  },
];

export const contacts: Contact[] = [
  { id: "c-1", name: "Angela", handle: "@angelacrz", initials: "AC", tone: "mint" },
  { id: "c-2", name: "Miguel", handle: "@miggy", initials: "MR", tone: "sky" },
  { id: "c-3", name: "Ana", handle: "@analim", initials: "AL", tone: "peach" },
  { id: "c-4", name: "Jose", handle: "@jgar", initials: "JG", tone: "lilac" },
  { id: "c-5", name: "Bea", handle: "@beasnts", initials: "BS", tone: "butter" },
  { id: "c-6", name: "Noah", handle: "@noahreyes", initials: "NR", tone: "rose" },
  { id: "c-7", name: "Kim", handle: "@kimtan", initials: "KT", tone: "mint" },
  { id: "c-8", name: "Lia", handle: "@liacruz", initials: "LC", tone: "peach" },
];

export const initialGoals: Goal[] = [
  { id: "g-1", name: "Japan trip", emoji: "🗼", saved: 18000, target: 30000, deadline: "Dec 2026" },
  { id: "g-2", name: "Emergency fund", emoji: "☂️", saved: 6200, target: 15000, deadline: "Jun 2027" },
  { id: "g-3", name: "New laptop", emoji: "💻", saved: 2400, target: 60000, deadline: "Mar 2027" },
];

export const billers: Biller[] = [
  { id: "b-1", name: "Meralco", category: "Electricity", icon: "electric", tone: "butter" },
  { id: "b-2", name: "Maynilad", category: "Water", icon: "water", tone: "sky" },
  { id: "b-3", name: "Globe", category: "Mobile", icon: "mobile", tone: "mint" },
  { id: "b-4", name: "PLDT", category: "Internet", icon: "internet", tone: "peach" },
  { id: "b-5", name: "Netflix", category: "Streaming", icon: "streaming", tone: "rose" },
  { id: "b-6", name: "SSS", category: "Government", icon: "government", tone: "lilac" },
  { id: "b-7", name: "Home Credit", category: "Loan", icon: "loan", tone: "sky" },
  { id: "b-8", name: "Maya Credit", category: "Card", icon: "card", tone: "mint" },
];

export const loadNetworks = [
  { id: "l-1", name: "Globe", handle: "All networks", tone: "mint" as Tone, initials: "G" },
  { id: "l-2", name: "TM", handle: "Globe network", tone: "sky" as Tone, initials: "TM" },
  { id: "l-3", name: "Smart", handle: "Smart network", tone: "butter" as Tone, initials: "S" },
  { id: "l-4", name: "TNT", handle: "Smart network", tone: "rose" as Tone, initials: "TNT" },
  { id: "l-5", name: "DITO", handle: "DITO network", tone: "peach" as Tone, initials: "D" },
  { id: "l-6", name: "GOMO", handle: "Data only", tone: "lilac" as Tone, initials: "GO" },
];

export const notificationsData = [
  {
    id: "n-1",
    title: "You earned ₱128.50 cashback",
    body: "Your Maya Card reward is now in your wallet.",
    time: "2h ago",
    unread: true,
    tone: "cashback" as TransactionCategory,
  },
  {
    id: "n-2",
    title: "Angela sent you ₱1,200",
    body: "“For the beach trip! See you Saturday.”",
    time: "5h ago",
    unread: true,
    tone: "income" as TransactionCategory,
  },
  {
    id: "n-3",
    title: "Your savings grew by ₱61.28",
    body: "Monthly interest was credited to your Maya Savings.",
    time: "Yesterday",
    unread: false,
    tone: "topup" as TransactionCategory,
  },
  {
    id: "n-4",
    title: "Protect your account",
    body: "Turn on Face Scan for faster, safer logins.",
    time: "May 23",
    unread: false,
    tone: "bills" as TransactionCategory,
  },
];

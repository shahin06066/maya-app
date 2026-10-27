import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  initialGoals,
  initialTransactions,
  type Goal,
  type SheetKind,
  type SheetMeta,
  type SheetState,
  type Tab,
  type Transaction,
} from "./data";
import { peso } from "./format";

interface ToastMessage {
  id: number;
  message: string;
}

interface MayaContextValue {
  tab: Tab;
  setTab: (tab: Tab) => void;
  walletBalance: number;
  savingsBalance: number;
  totalBalance: number;
  transactions: Transaction[];
  goals: Goal[];
  sheet: SheetState | null;
  openSheet: (kind: SheetKind, meta?: SheetMeta) => void;
  closeSheet: () => void;
  toast: ToastMessage | null;
  notify: (message: string) => void;
  balanceHidden: boolean;
  toggleBalance: () => void;
  frozen: boolean;
  toggleFrozen: () => void;
  cardRevealed: boolean;
  toggleCardDetails: () => void;
  onlinePayments: boolean;
  setOnlinePayments: (value: boolean) => void;
  contactless: boolean;
  setContactless: (value: boolean) => void;
  faceScan: boolean;
  setFaceScan: (value: boolean) => void;
  pushEnabled: boolean;
  setPushEnabled: (value: boolean) => void;
  unreadCount: number;
  markAllRead: () => void;
  sendMoney: (recipient: string, amount: number, note: string) => boolean;
  addMoney: (amount: number, method: string, target: "wallet" | "savings", goalId?: string) => void;
  payBiller: (biller: string, amount: number, account: string) => void;
  addGoal: (goal: Pick<Goal, "name" | "emoji" | "target" | "deadline">) => void;
  copy: (text: string, message?: string) => void;
}

const MayaContext = createContext<MayaContextValue | null>(null);

export function MayaProvider({ children }: { children: ReactNode }) {
  const [tab, setTabState] = useState<Tab>("home");
  const [walletBalance, setWalletBalance] = useState(8240.75);
  const [savingsBalance, setSavingsBalance] = useState(16340);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [sheet, setSheet] = useState<SheetState | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [balanceHidden, setBalanceHidden] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [onlinePayments, setOnlinePayments] = useState(true);
  const [contactless, setContactless] = useState(true);
  const [faceScan, setFaceScan] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [unreadCount, setUnreadCount] = useState(2);

  const notify = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (!sheet) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSheet(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sheet]);

  const setTab = useCallback((next: Tab) => {
    setTabState(next);
    setSheet(null);
  }, []);

  const openSheet = useCallback((kind: SheetKind, meta?: SheetMeta) => {
    setSheet({ kind, meta });
    if (kind === "notifications") setUnreadCount(0);
  }, []);

  const closeSheet = useCallback(() => setSheet(null), []);

  const record = useCallback((tx: Omit<Transaction, "id">) => {
    setTransactions((current) => [
      { ...tx, id: `tx-${Date.now()}-${Math.round(Math.random() * 999)}` },
      ...current,
    ]);
  }, []);

  const sendMoney = useCallback(
    (recipient: string, amount: number, note: string) => {
      if (!Number.isFinite(amount) || amount <= 0 || amount > walletBalance) return false;
      setWalletBalance((current) => current - amount);
      record({
        title: recipient,
        meta: note.trim() || "Sent via Maya",
        amount,
        direction: "out",
        category: "transfer",
        dateLabel: "Just now",
      });
      return true;
    },
    [walletBalance, record],
  );

  const addMoney = useCallback(
    (amount: number, method: string, target: "wallet" | "savings", goalId?: string) => {
      if (!Number.isFinite(amount) || amount <= 0) return;
      if (target === "savings") setSavingsBalance((current) => current + amount);
      else setWalletBalance((current) => current + amount);
      if (target === "savings" && goalId) {
        setGoals((current) =>
          current.map((goal) =>
            goal.id === goalId ? { ...goal, saved: Math.min(goal.target, goal.saved + amount) } : goal,
          ),
        );
      }
      record({
        title: target === "savings" ? "Maya Savings" : `Cash in via ${method}`,
        meta: (target === "savings" ? "Savings top-up" : "Wallet top-up") + " · Just now",
        amount,
        direction: "in",
        category: "topup",
        dateLabel: "Just now",
      });
      notify(
        target === "savings"
          ? `${peso(amount)} added to Maya Savings`
          : `${peso(amount)} added to your Maya Wallet`,
      );
    },
    [notify, record],
  );

  const payBiller = useCallback(
    (biller: string, amount: number, account: string) => {
      if (!Number.isFinite(amount) || amount <= 0 || amount > walletBalance) return;
      setWalletBalance((current) => current - amount);
      record({
        title: biller,
        meta: `${account ? `Account ${account}` : "Bill payment"} · Just now`,
        amount,
        direction: "out",
        category: "bills",
        dateLabel: "Just now",
      });
    },
    [walletBalance, record],
  );

  const addGoal = useCallback(
    (goal: Pick<Goal, "name" | "emoji" | "target" | "deadline">) => {
      setGoals((current) => [
        ...current,
        {
          ...goal,
          id: `goal-${Date.now()}`,
          saved: 0,
        },
      ]);
    },
    [],
  );

  const copy = useCallback(
    (text: string, message = "Copied to clipboard") => {
      try {
        void navigator.clipboard?.writeText(text);
        notify(message);
      } catch {
        notify(message);
      }
    },
    [notify],
  );

  const totalBalance = walletBalance + savingsBalance;

  const value = useMemo<MayaContextValue>(
    () => ({
      tab,
      setTab,
      walletBalance,
      savingsBalance,
      totalBalance,
      transactions,
      goals,
      sheet,
      openSheet,
      closeSheet,
      toast,
      notify,
      balanceHidden,
      toggleBalance: () => setBalanceHidden((current) => !current),
      frozen,
      toggleFrozen: () => {
        setFrozen((current) => !current);
        notify(frozen ? "Card unfrozen and ready to use" : "Card frozen. No new payments allowed.");
      },
      cardRevealed,
      toggleCardDetails: () => setCardRevealed((current) => !current),
      onlinePayments,
      setOnlinePayments,
      contactless,
      setContactless,
      faceScan,
      setFaceScan,
      pushEnabled,
      setPushEnabled,
      unreadCount,
      markAllRead: () => {
        setUnreadCount(0);
        notify("All caught up");
      },
      sendMoney,
      addMoney,
      payBiller,
      addGoal,
      copy,
    }),
    [
      tab,
      setTab,
      walletBalance,
      savingsBalance,
      totalBalance,
      transactions,
      goals,
      sheet,
      openSheet,
      closeSheet,
      toast,
      notify,
      balanceHidden,
      frozen,
      cardRevealed,
      onlinePayments,
      contactless,
      faceScan,
      pushEnabled,
      unreadCount,
      sendMoney,
      addMoney,
      payBiller,
      addGoal,
      copy,
    ],
  );

  return <MayaContext.Provider value={value}>{children}</MayaContext.Provider>;
}

export function useMaya() {
  const context = useContext(MayaContext);
  if (!context) throw new Error("useMaya must be used within a MayaProvider");
  return context;
}

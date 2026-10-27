import { useEffect, useRef } from "react";
import { BottomNav } from "./BottomNav";
import { StatusBar, Toast } from "./ui";
import { HomeScreen } from "../features/Home";
import { PayScreen } from "../features/Pay";
import { CardsScreen } from "../features/Cards";
import { SavingsScreen } from "../features/Savings";
import { ProfileScreen } from "../features/Profile";
import { TransferSheet } from "./sheets/TransferSheet";
import { AddMoneySheet, PaySheet, QrSheet } from "./sheets/PaymentSheets";
import {
  ActivitySheet,
  GoalSheet,
  InfoSheet,
  NotificationsSheet,
  TransactionSheet,
} from "./sheets/UtilitySheets";
import { useMaya } from "../lib/store";

export function AppShell() {
  const { tab, sheet, closeSheet } = useMaya();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [tab]);

  const screens = {
    home: <HomeScreen />,
    pay: <PayScreen />,
    cards: <CardsScreen />,
    savings: <SavingsScreen />,
    profile: <ProfileScreen />,
  };

  return (
    <div className="relative flex h-[100dvh] w-full shrink-0 flex-col overflow-hidden bg-paper md:h-[min(888px,calc(100dvh-40px))] md:w-[414px] md:rounded-[46px] md:border-[8px] md:border-[#0A1711] md:shadow-[0_55px_100px_-22px_rgba(11,45,30,0.45),0_20px_45px_-20px_rgba(11,45,30,0.25),inset_0_0_0_1px_rgba(255,255,255,0.12)]">
      <div className="pointer-events-none absolute left-1/2 top-[13px] z-30 hidden h-[23px] w-[88px] -translate-x-1/2 rounded-full bg-[#08130D] md:block" />
      <StatusBar />
      <main ref={mainRef} className="no-scrollbar relative flex-1 overflow-y-auto overscroll-contain">
        <div key={tab} className="animate-screen-in min-h-full">
          {screens[tab]}
        </div>
      </main>
      <BottomNav />
      {sheet?.kind === "send" && <TransferSheet />}
      {sheet?.kind === "add" && <AddMoneySheet />}
      {sheet?.kind === "pay" && <PaySheet mode="bill" />}
      {sheet?.kind === "load" && <PaySheet mode="load" />}
      {sheet?.kind === "qr" && <QrSheet />}
      {sheet?.kind === "notifications" && <NotificationsSheet />}
      {sheet?.kind === "activity" && <ActivitySheet />}
      {sheet?.kind === "goal" && <GoalSheet />}
      {sheet?.kind === "info" && <InfoSheet topic={sheet.meta?.topic ?? "personal"} />}
      {sheet?.kind === "transaction" && sheet.meta?.transaction && (
        <TransactionSheet transaction={sheet.meta.transaction} />
      )}
      <Toast />
      {sheet && (
        <button
          type="button"
          aria-label="Dismiss overlay"
          onClick={closeSheet}
          className="sr-only"
        />
      )}
    </div>
  );
}

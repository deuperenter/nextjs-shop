"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

// https://redux.js.org/usage/nextjs
// Any component that interacts with the Redux store (creating it, providing it, reading from it, or writing to it) needs to be a client component. This is because accessing the store requires React context, and context is only available in client components.

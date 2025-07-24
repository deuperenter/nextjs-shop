"use client";
import { useState } from "react";
import InfoBox from "./InfoBox";
import Click from "./Click";

export default function Home() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div>
      <Click />
    </div>
  );
}

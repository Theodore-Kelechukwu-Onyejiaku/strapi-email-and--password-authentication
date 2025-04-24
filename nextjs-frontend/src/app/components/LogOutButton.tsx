"use client";

import React from "react";
import { logoutAction } from "../actions/auth";

export default function LogOut() {
  return (
    <button
      onClick={() => {
        logoutAction();
      }}
      className="cursor-pointer w-full sm:w-auto px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
    >
      Sign Out
    </button>
  );
}

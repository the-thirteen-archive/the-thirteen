"use client";

import { useState } from "react";
import { changePassword } from "@/actions/auth/change-password";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match.");
      return;
    }

    setIsSaving(true);
    try {
      await changePassword({ currentPassword, newPassword });
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="current-password" className="text-sm text-gs-500">
          Current Password
        </label>
        <input
          name="current-password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-sm text-off-white outline-none focus:border-gs-600"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="new-password" className="text-sm text-gs-500">
          New Password
        </label>
        <input
          name="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-sm text-off-white outline-none focus:border-gs-600"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="confirm-password" className="text-sm text-gs-500">
          Confirm Password
        </label>
        <input
          name="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          className="rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-sm text-off-white outline-none focus:border-gs-600"
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {success && (
        <p className="text-xs text-green-400">Password updated successfully.</p>
      )}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSaving || !currentPassword || !newPassword}
        className="w-fit rounded-full bg-off-white px-4 py-2 text-sm font-medium text-true-black hover:bg-gs-100 disabled:opacity-50 cursor-pointer disabled:cursor-no-drop"
      >
        {isSaving ? "Saving..." : "Update Password"}
      </button>
    </div>
  );
}

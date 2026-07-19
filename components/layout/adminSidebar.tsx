import { LogOutIcon } from "lucide-react";

import Navigation from "@/components/layout/Navigation";
import Logo from "@/components/ui/Logo";
import { adminNavigation } from "@/lib/navigation";
import { logout } from "@/actions/auth/logout";

export default function AdminSidebar() {
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col justify-between border-r border-gs-800 px-6 py-8">
      <div className="flex w-full flex-col gap-8">
        <Logo />
        <Navigation items={adminNavigation} />
      </div>

      <form action={logout} className="flex flex-col gap-2 items-center">
        <button
          type="submit"
          className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gs-500 transition-colors hover:text-off-white cursor-pointer bg-night-black rounded-full hover:bg-gs-900"
        >
          <span className="flex p-2 rounded-full bg-night-black">
            <LogOutIcon size={16} strokeWidth={1.5} className="rotate-180" />
          </span>
          Log out
        </button>
        <p className="text-gs-700 text-[12px] gap-1 w-full justify-center flex">
          2026 © <span className="font-medium">Artur Medeiros</span>
        </p>
      </form>
    </aside>
  );
}

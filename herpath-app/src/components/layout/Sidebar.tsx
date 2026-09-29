"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Users,
  TrendingUp,
  Shield,
  Briefcase,
  MessageSquare,
  Settings,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: "new";
}

interface NavGroup {
  label?: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { label: "Home", href: "/", icon: Home },
      { label: "Learn", href: "/learn", icon: BookOpen },
      { label: "Connect", href: "/connect", icon: Users },
      { label: "Growth", href: "/growth", icon: TrendingUp },
    ],
  },
  {
    label: "Safety",
    items: [
      {
        label: "Fraud & Legal Help",
        href: "/fraud-legal-help",
        icon: Shield,
        badge: "new",
      },
    ],
  },
  {
    label: "Workspace",
    items: [
      { label: "Portfolio", href: "/portfolio", icon: Briefcase },
      { label: "Messages", href: "/messages", icon: MessageSquare },
    ],
  },
  {
    label: "Account",
    items: [{ label: "Settings", href: "/settings", icon: Settings }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-[#E9E4FF] bg-white md:flex">
      {/* Brand */}
      <div className="px-5 pb-4 pt-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5B2EFF] to-[#7C3AED] text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(91,46,255,0.5)] transition group-hover:shadow-[0_10px_24px_-8px_rgba(91,46,255,0.65)]">
            SC
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-sm font-bold text-slate-900">
              SheConnect AI
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              Learn · Connect · Grow
            </span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "mt-6" : ""}>
            {group.label && (
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#5B2EFF]/40 focus-visible:ring-offset-1 ${
                        active
                          ? "bg-[#EEE7FF] text-[#5B2EFF] shadow-[inset_0_0_0_1px_rgba(91,46,255,0.08)]"
                          : "text-slate-600 hover:bg-[#FBF9FF] hover:text-[#5B2EFF]"
                      }`}
                    >
                      {/* Active accent bar */}
                      <span
                        aria-hidden
                        className={`absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-[#5B2EFF] transition-all duration-200 ${
                          active
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-40"
                        }`}
                      />

                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition ${
                          active
                            ? "bg-white text-[#5B2EFF]"
                            : "bg-transparent text-slate-400 group-hover:bg-white group-hover:text-[#5B2EFF]"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>

                      <span className="truncate">{item.label}</span>

                      {item.badge === "new" && (
                        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#5B2EFF] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                          <Sparkles className="h-2.5 w-2.5" />
                          New
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-[#F0ECFF] px-3 py-3">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-[#FBF9FF]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEE7FF] text-xs font-semibold text-[#5B2EFF]">
            R
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-800">
              Riya
            </p>
            <p className="truncate text-[10px] text-slate-400">
              Free plan · v1.0
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
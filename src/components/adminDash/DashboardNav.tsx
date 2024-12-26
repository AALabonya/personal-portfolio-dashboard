
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/user.interface";

import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

interface DashboardNavProps {
  navLinks: NavItem[];
}

export function DashboardNav({ navLinks }: DashboardNavProps) {
  const { pathname } = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  if (!navLinks?.length) {
    return null;
  }

  const toggleExpand = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    );
  };

  const renderNavItem = (item: NavItem, depth = 0) => {
    const isActive = pathname.startsWith(item.href); // Now uses pathname
    const isExpanded = expandedItems.includes(item.href);
    const hasChildren = Array.isArray(item.children) && item.children.length > 0;

    return (
      <div key={item.href}>
        <Link
          to={item.href}
          className={cn(
            "flex items-center gap-2 overflow-hidden rounded-md text-sm font-medium transition-colors",
            depth === 0
              ? "py-[12px] px-[12px] hover:bg-accent hover:text-accent-foreground"
              : "py-[8px] pl-[12px] w-[90%] hover:underline",
            isActive ? "bg-primary text-white" : ""
          )}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              toggleExpand(item.href);
            }
          }}
        >
          <item.Icon />
          <span>{item.title}</span>
          {hasChildren && (
            <span>
              {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          )}
        </Link>
        {hasChildren && isExpanded && (
          <div className="ml-4">
            {item.children?.map((child) => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return <nav className="grid items-start gap-2">{navLinks.map((item) => renderNavItem(item))}</nav>;
}

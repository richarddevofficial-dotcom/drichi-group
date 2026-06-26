"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderOpen,
  MessageSquare,
  TrendingUp,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

export default function AdminDashboard() {
  const [portfolioCount, setPortfolioCount] = useState(0);
  const [recentPortfolio, setRecentPortfolio] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      if (data.success) {
        setPortfolioCount(data.data.length);
        setRecentPortfolio(data.data.slice(-4).reverse());
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  const stats = [
    {
      label: "Portfolio Items",
      value: portfolioCount,
      icon: FolderOpen,
      href: "/admin/portfolio",
      color: "bg-brand-orange",
      textColor: "text-brand-orange",
    },
    {
      label: "Messages",
      value: "0",
      icon: MessageSquare,
      href: "/admin/messages",
      color: "bg-blue-500",
      textColor: "text-blue-500",
    },
    {
      label: "Projects Done",
      value: "50+",
      icon: TrendingUp,
      color: "bg-green-500",
      textColor: "text-green-500",
    },
    {
      label: "Happy Clients",
      value: "30+",
      icon: Users,
      color: "bg-purple-500",
      textColor: "text-purple-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-gray-600">Dashboard</h1>
        <p className="text-brand-gray-400 mt-1">
          Welcome back! Here's an overview of your website.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 shadow-sm border border-brand-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-opacity-10 ${stat.color}`}>
                  <IconComponent size={24} className={stat.textColor} />
                </div>
              </div>
              <p className="text-3xl font-bold text-brand-gray-600">
                {stat.value}
              </p>
              <p className="text-sm text-brand-gray-400 mt-1">{stat.label}</p>
              {stat.href && (
                <Link
                  href={stat.href}
                  className="mt-3 inline-block text-sm font-medium text-brand-orange hover:text-brand-orange-600"
                >
                  Manage →
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Recent Portfolio Items */}
      <div className="bg-white rounded-xl shadow-sm border border-brand-gray-100">
        <div className="flex items-center justify-between p-6 border-b border-brand-gray-100">
          <h2 className="text-lg font-bold text-brand-gray-600">
            Recent Portfolio Items
          </h2>
          <Link
            href="/admin/portfolio"
            className="flex items-center gap-2 text-sm font-medium text-brand-orange hover:text-brand-orange-600"
          >
            <Plus size={16} />
            Manage Portfolio
          </Link>
        </div>
        <div className="p-6">
          {recentPortfolio.length > 0 ? (
            <div className="space-y-4">
              {recentPortfolio.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-brand-gray-50 hover:bg-brand-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                      <FolderOpen size={20} className="text-brand-orange" />
                    </div>
                    <div>
                      <p className="font-medium text-brand-gray-600">
                        {item.title}
                      </p>
                      <p className="text-xs text-brand-gray-400">
                        {item.category} • {item.client}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/admin/portfolio`}
                    className="text-sm text-brand-orange hover:text-brand-orange-600"
                  >
                    <Eye size={18} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FolderOpen
                size={48}
                className="mx-auto text-brand-gray-300 mb-4"
              />
              <p className="text-brand-gray-400">No portfolio items yet</p>
              <Link
                href="/admin/portfolio"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-orange hover:text-brand-orange-600"
              >
                <Plus size={16} />
                Add Your First Project
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/portfolio"
          className="flex items-center gap-4 p-6 rounded-xl bg-white border border-brand-gray-100 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="p-3 rounded-lg bg-brand-orange/10 group-hover:bg-brand-orange transition-colors">
            <Plus
              size={24}
              className="text-brand-orange group-hover:text-white"
            />
          </div>
          <div>
            <p className="font-semibold text-brand-gray-600">
              Add Portfolio Item
            </p>
            <p className="text-sm text-brand-gray-400">Showcase your work</p>
          </div>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-4 p-6 rounded-xl bg-white border border-brand-gray-100 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="p-3 rounded-lg bg-green-100 group-hover:bg-green-500 transition-colors">
            <Eye size={24} className="text-green-600 group-hover:text-white" />
          </div>
          <div>
            <p className="font-semibold text-brand-gray-600">View Website</p>
            <p className="text-sm text-brand-gray-400">See your live site</p>
          </div>
        </Link>

        <Link
          href="/admin/portfolio"
          className="flex items-center gap-4 p-6 rounded-xl bg-white border border-brand-gray-100 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="p-3 rounded-lg bg-red-100 group-hover:bg-red-500 transition-colors">
            <Trash2 size={24} className="text-red-600 group-hover:text-white" />
          </div>
          <div>
            <p className="font-semibold text-brand-gray-600">Manage Content</p>
            <p className="text-sm text-brand-gray-400">Edit or delete items</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import AdminAnalyticsClient from "./AdminAnalyticsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "داشبورد مدیریت آمار بازدید | نوین وب",
  description: "پنل اختصاصی و محرمانه مشاهده آمار بازدیدکنندگان و رفتار کاربران نوین وب",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminAnalyticsPage() {
  return <AdminAnalyticsClient />;
}

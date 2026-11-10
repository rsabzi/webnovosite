import Image from "next/image";

/**
 * پس‌زمینه‌ی انیمیشنی هیرو — کاملاً CSS و بدون JavaScript:
 *
 *  ۱) بافت ملایم hero-bg (فقط به‌عنوان تکسچر زیرین)
 *  ۲) شفق‌های رنگی بزرگ (Aurora) با دریفت و مقیاس متحرک
 *  ۳) هاله‌ی نوری مخروطی که به‌آرامی می‌چرخد
 *  ۴) شبکه‌ی تکنولوژی متحرک + موج نور مورب
 *  ۵) ستاره‌های چشمک‌زن + ذرات نورانی شناور
 *
 * همه انیمیشن‌ها با prefers-reduced-motion می‌ایستند (بدون حذف زیبایی بصری).
 */

type Dot = {
  left: string;
  top: string;
  size: number;
  duration: string;
  delay: string;
};

/* ستاره‌های چشمک‌زن — پراکنده در آسمان هیرو */
const STARS: Dot[] = [
  { left: "5%", top: "18%", size: 3, duration: "4.5s", delay: "0s" },
  { left: "11%", top: "32%", size: 2, duration: "5.5s", delay: "-2s" },
  { left: "15%", top: "12%", size: 4, duration: "6s", delay: "-1s" },
  { left: "21%", top: "40%", size: 2, duration: "4s", delay: "-3s" },
  { left: "27%", top: "22%", size: 3, duration: "5s", delay: "-2.5s" },
  { left: "33%", top: "9%", size: 2, duration: "6.5s", delay: "-4s" },
  { left: "38%", top: "34%", size: 3, duration: "4.2s", delay: "-1.5s" },
  { left: "44%", top: "16%", size: 2, duration: "5.8s", delay: "-3.2s" },
  { left: "49%", top: "42%", size: 4, duration: "5s", delay: "-0.8s" },
  { left: "55%", top: "11%", size: 2, duration: "4.8s", delay: "-2.2s" },
  { left: "60%", top: "28%", size: 3, duration: "6.2s", delay: "-5s" },
  { left: "66%", top: "19%", size: 2, duration: "4.4s", delay: "-1.2s" },
  { left: "71%", top: "38%", size: 3, duration: "5.2s", delay: "-3.8s" },
  { left: "77%", top: "10%", size: 4, duration: "5.6s", delay: "-2.8s" },
  { left: "82%", top: "26%", size: 2, duration: "4.6s", delay: "-0.5s" },
  { left: "87%", top: "36%", size: 3, duration: "6.4s", delay: "-4.2s" },
  { left: "92%", top: "15%", size: 2, duration: "5.4s", delay: "-1.8s" },
  { left: "96%", top: "30%", size: 3, duration: "4.9s", delay: "-3.5s" },
  { left: "47%", top: "6%", size: 2, duration: "5.1s", delay: "-2.6s" },
  { left: "18%", top: "52%", size: 2, duration: "6s", delay: "-4.5s" },
  { left: "58%", top: "50%", size: 2, duration: "5.7s", delay: "-2.1s" },
  { left: "89%", top: "54%", size: 2, duration: "6.3s", delay: "-3.9s" },
];

/* ذرات نورانی شناور — نزدیک‌تر به خط افق هیرو */
const PARTICLES: Dot[] = [
  { left: "6%", top: "72%", size: 6, duration: "14s", delay: "-2s" },
  { left: "14%", top: "60%", size: 4, duration: "17s", delay: "-9s" },
  { left: "24%", top: "80%", size: 7, duration: "13s", delay: "-5s" },
  { left: "35%", top: "64%", size: 4, duration: "18s", delay: "-12s" },
  { left: "45%", top: "84%", size: 6, duration: "15s", delay: "-3s" },
  { left: "56%", top: "68%", size: 5, duration: "19s", delay: "-14s" },
  { left: "66%", top: "82%", size: 7, duration: "14s", delay: "-7s" },
  { left: "76%", top: "62%", size: 4, duration: "17s", delay: "-11s" },
  { left: "86%", top: "78%", size: 6, duration: "12s", delay: "-4s" },
  { left: "93%", top: "66%", size: 5, duration: "16s", delay: "-8s" },
];

export default function HeroBackdrop({
  imagePosition = "center",
}: {
  imagePosition?: "left" | "right" | "center";
}) {
  const positionClass =
    imagePosition === "left" ? "object-left" : imagePosition === "right" ? "object-right" : "object-center";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* لایه ۱ — تکسچر ملایم زیرین + اسکریم‌های محوکننده */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover opacity-30 ${positionClass}`}
      />
      <div className="absolute inset-0 bg-gradient-to-l from-[var(--bg-night)]/60 via-[var(--bg-night)]/80 to-[var(--bg-night)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-night)] via-transparent to-[var(--bg-night)]/50" />

      {/* لایه ۲ — شفق‌های رنگی بزرگ و متحرک */}
      <div className="hero-aurora">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-orb hero-orb-4" />
      </div>

      {/* لایه ۳ — هاله‌ی نوری چرخان */}
      <div className="hero-conic" />

      {/* لایه ۴ — شبکه‌ی تکنولوژی متحرک + موج نور */}
      <div className="tech-grid-pattern hero-grid-pan absolute inset-0" />
      <div className="hero-grid-sweep" />

      {/* لایه ۵ — ستاره‌های چشمک‌زن */}
      {STARS.map((s, i) => (
        <span
          key={`star-${i}`}
          className="hero-star"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
        />
      ))}

      {/* لایه ۶ — ذرات نورانی شناور */}
      {PARTICLES.map((p, i) => (
        <span
          key={`particle-${i}`}
          className="hero-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* وینیت نرم برای خوانایی متن‌ها */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-night)] via-transparent to-transparent" />
    </div>
  );
}

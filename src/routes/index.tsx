import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Check, RotateCcw, Share2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

type Phase = "welcome" | "loading" | "result";

type ZodiacProfile = {
  name: string;
  symbol: string;
  archetype: string;
  headline: string;
  sphere: string;
  directions: string[];
  avoid: string;
  message: string;
};

const zodiacProfiles: ZodiacProfile[] = [
  {
    name: "Овен",
    symbol: "♈",
    archetype: "Первопроходец",
    headline: "Твои деньги любят скорость",
    sphere: "Запуск новых проектов и лидерство",
    directions: ["свой быстрый сервис или продукт", "спорт, энергия и личное наставничество", "продажи, где важен первый шаг"],
    avoid: "Ждать идеального момента и отдавать инициативу другим.",
    message: "Звёзды подсказывают: твой импульс — уже капитал. Смело начинай первым, а детали подтянутся по дороге.",
  },
  {
    name: "Телец",
    symbol: "♉",
    archetype: "Создатель ценности",
    headline: "Твои деньги любят качество",
    sphere: "Красивые вещи, комфорт и накопительные проекты",
    directions: ["дизайн, бьюти и предметы для дома", "еда, гостеприимство и забота о клиентах", "долгие проекты с понятным результатом"],
    avoid: "Обесценивать свою работу и соглашаться на меньшее.",
    message: "Твоя суперсила — превращать простое в желанное. Когда ты добавляешь качество, люди готовы платить спокойнее и больше.",
  },
  {
    name: "Близнецы",
    symbol: "♊",
    archetype: "Связной",
    headline: "Твои деньги любят разговоры",
    sphere: "Коммуникации, контент и обмен идеями",
    directions: ["копирайтинг, медиа и короткие форматы", "обучение, консультации и интервью", "партнёрства, нетворкинг и поиск клиентов"],
    avoid: "Распылить внимание на десять идей и не показать ни одну.",
    message: "Вселенная явно дала тебе несколько каналов сразу. Выбери один главный голос — и он приведёт к нужным людям.",
  },
  {
    name: "Рак",
    symbol: "♋",
    archetype: "Хранитель",
    headline: "Твои деньги любят доверие",
    sphere: "Забота, комьюнити и личный сервис",
    directions: ["помогающие практики и психологический сервис", "клуб, сообщество или камерные события", "семейные продукты и уютный онлайн-магазин"],
    avoid: "Работать из чувства долга, забывая назвать свою цену.",
    message: "Твоё тёплое внимание считывают мгновенно. Строй вокруг него пространство, где людям хочется остаться надолго.",
  },
  {
    name: "Лев",
    symbol: "♌",
    archetype: "Солнце на сцене",
    headline: "Твои деньги любят внимание",
    sphere: "Личный бренд и публичность",
    directions: ["блог и социальные сети", "продажи и переговоры", "творчество и публичные проекты"],
    avoid: "Долго оставаться незаметным за чужой спиной.",
    message: "Звёзды намекают: чем больше ты проявляешь себя, тем больше возможностей замечают тебя.",
  },
  {
    name: "Дева",
    symbol: "♍",
    archetype: "Алхимик порядка",
    headline: "Твои деньги любят точность",
    sphere: "Системы, аналитика и улучшение процессов",
    directions: ["операционный менеджмент и автоматизация", "редактура, аналитика и исследования", "практичные гайды и полезные продукты"],
    avoid: "Доводить всё до идеала, прежде чем попросить оплату.",
    message: "Ты видишь то, что другие пропускают. Преврати эту зоркость в понятную систему — и хаос начнёт приносить доход.",
  },
  {
    name: "Весы",
    symbol: "♎",
    archetype: "Куратор гармонии",
    headline: "Твои деньги любят красоту",
    sphere: "Дизайн, партнёрства и эстетичный сервис",
    directions: ["визуал, стиль и упаковка брендов", "медиация, переговоры и продажи", "коллаборации с сильными людьми"],
    avoid: "Слишком долго выбирать между хорошими вариантами.",
    message: "Твоё чувство баланса — редкий магнит. Соединяй людей, идеи и формы так, чтобы всем хотелось быть рядом.",
  },
  {
    name: "Скорпион",
    symbol: "♏",
    archetype: "Трансформатор",
    headline: "Твои деньги любят глубину",
    sphere: "Стратегия, кризисные задачи и скрытые ресурсы",
    directions: ["исследования, аудит и финансовая грамотность", "психология, коучинг и трансформации", "нишевые проекты с сильной экспертизой"],
    avoid: "Прятать сильную экспертизу, пока кто-то менее глубокий занимает сцену.",
    message: "Ты умеешь находить ценное там, где другие видят только сложность. Твоя глубина особенно нужна в переменах.",
  },
  {
    name: "Стрелец",
    symbol: "♐",
    archetype: "Навигатор возможностей",
    headline: "Твои деньги любят горизонт",
    sphere: "Обучение, путешествия и международные связи",
    directions: ["курсы, лекции и авторские методики", "туризм, языки и культурные проекты", "международные продажи и удалённые команды"],
    avoid: "Считать, что следующий шанс обязательно будет лучше текущего.",
    message: "У тебя природный компас на большие возможности. Дай мечте маршрут, сроки и цену — тогда она станет проектом.",
  },
  {
    name: "Козерог",
    symbol: "♑",
    archetype: "Архитектор результата",
    headline: "Твои деньги любят высоту",
    sphere: "Карьера, управление и большие системы",
    directions: ["руководство и продюсирование команд", "B2B-сервисы и сложные решения", "личная стратегия и инвестиции в навыки"],
    avoid: "Считать отдых наградой, которую нужно заслужить.",
    message: "Твои планы умеют переживать тренды. Строй ступенями, но не забывай праздновать этаж, на который уже поднялся.",
  },
  {
    name: "Водолей",
    symbol: "♒",
    archetype: "Изобретатель будущего",
    headline: "Твои деньги любят новое",
    sphere: "Технологии, сообщества и нестандартные идеи",
    directions: ["цифровые продукты и AI-инструменты", "стартапы, продуктовый дизайн и инновации", "сообщества по интересам и новые медиа"],
    avoid: "Объяснять слишком сложную идею тем, кто ещё не успел загореться.",
    message: "Ты чувствуешь завтрашний день раньше остальных. Переведи идею на человеческий язык — и она найдёт первых поклонников.",
  },
  {
    name: "Рыбы",
    symbol: "♓",
    archetype: "Проводник вдохновения",
    headline: "Твои деньги любят смысл",
    sphere: "Искусство, эмпатия и проекты с атмосферой",
    directions: ["музыка, фото, видео и визуальные истории", "wellness, забота и мягкие практики", "креативные тексты и проекты о людях"],
    avoid: "Работать на вдохновении без чётких сроков и границ.",
    message: "Ты умеешь создавать ощущение, которое невозможно измерить линейкой. Добавь структуру — и вдохновение станет устойчивым потоком.",
  },
];

const zodiacForDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  const date = month * 100 + day;
  if (date >= 321 && date <= 419) return zodiacProfiles[0];
  if (date >= 420 && date <= 520) return zodiacProfiles[1];
  if (date >= 521 && date <= 620) return zodiacProfiles[2];
  if (date >= 621 && date <= 722) return zodiacProfiles[3];
  if (date >= 723 && date <= 822) return zodiacProfiles[4];
  if (date >= 823 && date <= 922) return zodiacProfiles[5];
  if (date >= 923 && date <= 1022) return zodiacProfiles[6];
  if (date >= 1023 && date <= 1121) return zodiacProfiles[7];
  if (date >= 1122 && date <= 1221) return zodiacProfiles[8];
  if (date >= 1222 || date <= 119) return zodiacProfiles[9];
  if (date >= 120 && date <= 218) return zodiacProfiles[10];
  return zodiacProfiles[11];
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Где тебе искать деньги? — денежный вектор" },
      { name: "description", content: "Развлекательный денежный гороскоп по дате рождения." },
      { property: "og:title", content: "Где тебе искать деньги? 💰" },
      { property: "og:description", content: "Узнай свой денежный вектор за 30 секунд." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MoneyVectorApp,
});

function MoneyVectorApp() {
  const [birthDate, setBirthDate] = useState("");
  const [phase, setPhase] = useState<Phase>("welcome");
  const [profile, setProfile] = useState<ZodiacProfile | null>(null);
  const [shareStatus, setShareStatus] = useState("");

  const maxBirthDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const revealResult = () => {
    const nextProfile = zodiacForDate(birthDate);
    if (!nextProfile) return;
    setProfile(nextProfile);
    setShareStatus("");
    setPhase("loading");
    window.setTimeout(() => setPhase("result"), 1700);
  };

  const startOver = () => {
    setBirthDate("");
    setProfile(null);
    setShareStatus("");
    setPhase("welcome");
  };

  const shareResult = async () => {
    if (!profile) return;
    const shareText = `Я узнал(а), где мне искать деньги 💰\nМой денежный вектор: ${profile.sphere}\nА у тебя какой? Проверь себя →`;
    const sharePayload = { title: "Мой денежный вектор", text: shareText, url: window.location.href };
    const gemSpace = (window as Window & { GemSpace?: { share?: (payload: typeof sharePayload) => Promise<void> } }).GemSpace;

    try {
      if (gemSpace?.share) {
        await gemSpace.share(sharePayload);
        setShareStatus("Результат отправлен в Gem Space ✨");
      } else if (navigator.share) {
        await navigator.share(sharePayload);
        setShareStatus("Результат готов к отправке ✨");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
        setShareStatus("Скопировано — отправь друзьям 💫");
      } else {
        setShareStatus("Скопируй ссылку из адресной строки и отправь друзьям 💫");
      }
    } catch {
      setShareStatus("Поделиться не получилось — попробуй ещё раз 💫");
    }
  };

  return (
    <main className="cosmic-backdrop relative min-h-[100dvh] overflow-hidden text-cosmic-ink selection:bg-cosmic-violet/30">
      <div aria-hidden="true" className="cosmic-stars pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-28 -top-28 size-72 rounded-full bg-cosmic-violet/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-32 size-96 rounded-full bg-cosmic-blue/15 blur-3xl" />

      <div className="relative mx-auto w-full max-w-[380px] px-5 pb-16 pt-10 sm:pt-12">
        <header className="cosmic-rise mb-8 flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cosmic-panel text-sm text-cosmic-gold ring-1 ring-cosmic-line">✦</span>
            <span className="truncate text-sm font-extrabold tracking-tight">Где искать деньги?</span>
          </div>
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-cosmic-ink/40">Gem Space</span>
        </header>

        {phase === "welcome" && <WelcomeScreen birthDate={birthDate} maxDate={maxBirthDate} onDateChange={setBirthDate} onSubmit={revealResult} />}
        {phase === "loading" && <LoadingScreen />}
        {phase === "result" && profile && <ResultScreen profile={profile} shareStatus={shareStatus} onShare={shareResult} onReset={startOver} />}
      </div>
    </main>
  );
}

function WelcomeScreen({ birthDate, maxDate, onDateChange, onSubmit }: { birthDate: string; maxDate: string; onDateChange: (value: string) => void; onSubmit: () => void }) {
  return (
    <section aria-labelledby="welcome-title">
      <div className="cosmic-rise relative h-36 mb-6">
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative size-32">
            <span className="cosmic-pulse absolute inset-0 m-auto size-2 rounded-full bg-cosmic-gold" />
            <span className="cosmic-orbit absolute inset-0 m-auto size-1 rounded-full bg-cosmic-violet" />
            <span className="cosmic-orbit absolute inset-0 m-auto size-1 rounded-full bg-cosmic-ink [animation-duration:14s]" />
            <span className="cosmic-orbit absolute inset-0 m-auto size-1 rounded-full bg-cosmic-gold/80 [animation-delay:-4s] [animation-duration:11s]" />
          </div>
        </div>
      </div>

      <h1 id="welcome-title" className="cosmic-rise font-display text-[34px] font-extrabold leading-[1.05] tracking-tight [animation-delay:60ms]">
        Где тебе искать деньги? <span className="text-cosmic-gold">💰</span>
      </h1>
      <p className="cosmic-rise mt-3 max-w-[32ch] text-[15px] leading-relaxed text-cosmic-ink/60 [animation-delay:120ms]">
        Узнай, в какой сфере тебя ждёт денежный потенциал
      </p>

      <form className="cosmic-rise mt-7 rounded-[26px] bg-cosmic-panel p-4 ring-1 ring-cosmic-line [animation-delay:180ms]" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-cosmic-ink/45" htmlFor="birth-date">Дата рождения</label>
        <div className="flex items-center gap-3 rounded-2xl bg-cosmic-panel px-4 py-3 ring-1 ring-cosmic-line">
          <CalendarDays aria-hidden="true" className="size-5 shrink-0 text-cosmic-violet" />
          <input id="birth-date" type="date" value={birthDate} max={maxDate} onChange={(event) => onDateChange(event.target.value)} required className="min-w-0 flex-1 bg-transparent text-[15px] font-semibold text-cosmic-ink outline-none [color-scheme:dark]" />
        </div>
        <Button type="submit" disabled={!birthDate} className="mt-5 h-auto w-full rounded-2xl bg-cosmic-gold py-4 text-[15px] font-extrabold text-cosmic-bg ring-1 ring-cosmic-gold/40 hover:bg-cosmic-gold/90" size="lg">
          Узнать свой денежный вектор
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-cosmic-ink/35">Займёт меньше 30 секунд</p>
    </section>
  );
}

function LoadingScreen() {
  return (
    <section aria-live="polite" className="cosmic-rise pt-20 text-center">
      <div className="relative mx-auto grid size-36 place-items-center">
        <div className="absolute inset-2 rounded-full border border-cosmic-violet/40 [animation:spin_8s_linear_infinite]" />
        <div className="absolute inset-6 rounded-full border border-cosmic-gold/30 [animation:spin_5s_linear_infinite_reverse]" />
        <span className="cosmic-pulse grid size-14 place-items-center rounded-full bg-cosmic-gold/15 text-3xl text-cosmic-gold">✦</span>
      </div>
      <h1 className="mt-8 text-[15px] font-bold text-cosmic-gold">Сверяемся со звёздами… ✨</h1>
      <p className="cosmic-shimmer mt-2 text-sm text-cosmic-ink/55">Ищем твою денежную энергию… 💫</p>
      <div className="mx-auto mt-7 h-1.5 w-52 overflow-hidden rounded-full bg-cosmic-panel">
        <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cosmic-violet to-cosmic-gold [animation:cosmic-shimmer_1.8s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}

function ResultScreen({ profile, shareStatus, onShare, onReset }: { profile: ZodiacProfile; shareStatus: string; onShare: () => void; onReset: () => void }) {
  return (
    <section aria-labelledby="result-title" className="cosmic-rise">
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-cosmic-gold/15 text-xl text-cosmic-gold ring-1 ring-cosmic-gold/30">{profile.symbol}</span>
        <div>
          <div className="text-sm font-extrabold text-cosmic-gold">{profile.name}</div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-cosmic-ink/45">Денежный вектор</div>
        </div>
      </div>

      <h1 id="result-title" className="mt-5 font-display text-[27px] font-extrabold leading-tight">{profile.headline}</h1>
      <p className="mt-2 text-[13px] text-cosmic-ink/55">Архетип: <span className="font-bold text-cosmic-violet">{profile.archetype}</span></p>
      <p className="mt-1 text-[13px] text-cosmic-ink/55">Главная сфера: <span className="font-bold text-cosmic-violet">{profile.sphere}</span></p>

      <div className="mt-5 rounded-2xl bg-cosmic-panel p-4 ring-1 ring-cosmic-line">
        <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-cosmic-ink/45">Тебе проще монетизировать</div>
        <ul className="space-y-3 text-[14px] leading-snug">
          {profile.directions.map((direction) => <li key={direction} className="flex gap-2"><span className="text-cosmic-gold">✦</span><span>{direction}</span></li>)}
        </ul>
      </div>

      <div className="mt-3 rounded-2xl bg-cosmic-panel p-4 text-[14px] leading-snug ring-1 ring-cosmic-line">
        <span className="font-bold text-cosmic-ink/45">Не твой путь:</span> {profile.avoid}
      </div>

      <p className="font-mystic mt-4 text-[15px] italic leading-relaxed text-cosmic-ink/80">«{profile.message}»</p>

      <div className="mt-6 rounded-[28px] bg-gradient-to-b from-cosmic-violet/20 to-cosmic-gold/10 p-6 text-center ring-1 ring-cosmic-line">
        <div className="text-[13px] font-semibold text-cosmic-ink/85">Я узнал(а), где мне искать деньги 💰</div>
        <div className="mt-1 text-[15px] font-extrabold text-cosmic-gold">Мой денежный вектор: {profile.sphere}</div>
        <div className="mt-3 text-[13px] text-cosmic-ink/60">А у тебя какой? <span className="font-bold text-cosmic-violet">Проверь себя →</span></div>
      </div>

      <Button type="button" onClick={onShare} className="mt-4 h-auto w-full rounded-2xl bg-cosmic-gold py-4 text-[15px] font-extrabold text-cosmic-bg ring-1 ring-cosmic-gold/40 hover:bg-cosmic-gold/90" size="lg">
        <Share2 aria-hidden="true" /> Поделиться своим результатом 🔥
      </Button>
      <Button type="button" onClick={onReset} variant="outline" className="mt-2 w-full rounded-2xl border-cosmic-line bg-cosmic-panel py-3.5 text-[14px] font-bold text-cosmic-ink/80 hover:bg-cosmic-panel/80 hover:text-cosmic-ink">
        <RotateCcw aria-hidden="true" /> Узнать про другой знак
      </Button>

      {shareStatus && <p role="status" className="mt-3 flex items-center justify-center gap-1 text-center text-xs text-cosmic-gold"><Check aria-hidden="true" className="size-3.5" /> {shareStatus}</p>}
      <p className="mt-6 text-center text-[11px] text-cosmic-ink/35">Развлекательный прогноз. Не является финансовой рекомендацией.</p>
      <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-cosmic-ink/25"><Sparkles aria-hidden="true" className="size-3" /> Gem Space</div>
    </section>
  );
}
# Money Stars

Create a simple, mobile-first mini-app for the Gem Space messenger called «Где искать деньги?».

Concept

An entertaining astrology/esotericism app that tells users which areas they should look for money and new income opportunities in based on their zodiac sign.

The experience must be extremely simple:

User opens the app.

Enters their date of birth.

App determines their zodiac sign.

User gets a personalized "money horoscope".

User can share the result with friends.

UX

The app should take less than 30 seconds to use.

Screen 1 — Welcome:

Large title: «Где тебе искать деньги? 💰»

Subtitle: «Узнай, в какой сфере тебя ждёт денежный потенциал»

Date of birth input.

Large CTA: «Узнать свой денежный вектор»

Screen 2 — Loading:

Show a short playful animation:

«Сверяемся со звёздами… ✨»

Then:

«Ищем твою денежную энергию… 💫»

Screen 3 — Result:

Show:

Zodiac sign

Short personalized headline

Main money area

3 recommended ways to earn

One thing the user should avoid

A short mystical explanation

Example:

«♌ Лев»

«Твои деньги любят внимание»

Главная сфера: личный бренд и публичность

Тебе проще монетизировать:

• блог и социальные сети

• продажи и переговоры

• творчество и публичные проекты

Не твой путь: долго оставаться незаметным за чужой спиной.

«Звёзды намекают: чем больше ты проявляешь себя, тем больше возможностей замечают тебя.»

Add a prominent button:

«Поделиться своим результатом 🔥»

And secondary button:

«Узнать про другой знак»

Content

Create unique content for all 12 zodiac signs:

Aries

Taurus

Gemini

Cancer

Leo

Virgo

Libra

Scorpio

Sagittarius

Capricorn

Aquarius

Pisces

Each sign must have:

unique money archetype

main income sphere

3 practical-but-entertaining earning directions

one "avoid" recommendation

short mystical explanation

The content should feel personalized, positive and intriguing rather than generic.

Visual style

Use a modern mystical aesthetic:

dark purple / deep blue background

stars, subtle gradients and cosmic particles

glowing zodiac symbols

large typography

rounded cards

smooth micro-animations

Do NOT make it look like an old-fashioned horoscope website. It should feel like a modern viral mobile app.

Viral mechanics

The result screen should be designed for sharing.

Create a visually attractive share card containing:

«Я узнал(а), где мне искать деньги 💰»

«Мой денежный вектор: [sphere]»

«А у тебя какой?»

Add:

«Проверь себя →»

The share button should use the Gem Space sharing capability if available. If the native sharing API is unavailable, implement a Web Share API fallback.

Technical requirements

Build as a lightweight mobile-first web mini-app.

Use React.

Keep the architecture extremely simple.

No authentication.

No database required.

Store only temporary/local user data if needed.

The app must work well inside a messenger WebView.

Responsive for mobile screens.

Fast initial load.

No unnecessary pages or complex navigation.

Important

This is an entertainment app, not a financial advisory service. Add a small unobtrusive disclaimer on the result screen:

«Развлекательный прогноз. Не является финансовой рекомендацией.»

Focus on one extremely polished core mechanic rather than adding extra features.

The final result should feel like a mini-app that users can open, get an answer in 20–30 seconds, screenshot it, and send to friends.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/aedd43f7-93c7-4f85-b92b-4e9dca76476a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

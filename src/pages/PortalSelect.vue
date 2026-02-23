<template>
    <main
      ref="root"
      class="relative min-h-screen overflow-hidden bg-[#050B1E]"
      @mousemove="onMouseMove"
    >
      <!-- PREMIUM BACKGROUND LAYERS -->
      <div class="fx" aria-hidden="true">
        <!-- gradient mesh base -->
        <div class="fx__mesh" />
  
        <!-- animated blue orbs -->
        <div class="fx__orb fx__orb--a" />
        <div class="fx__orb fx__orb--b" />
        <div class="fx__orb fx__orb--c" />
  
        <!-- moving sweep -->
        <div class="fx__sweep" />
  
        <!-- subtle grid -->
        <div class="fx__grid" />
  
        <!-- cursor spotlight -->
        <div class="fx__spotlight" />
  
        <!-- noise -->
        <div class="fx__noise" />
      </div>
  
      <div class="relative mx-auto w-full max-w-[1200px] px-6 py-10 sm:py-14">
        <!-- TOP BAR -->
        <header class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="brandMark">
              <img src="../assets/logo.png" alt="NCRMS" class="h-9 w-9 object-contain" />
            </div>
  
            <div class="text-left">
              <div class="text-[14px] font-semibold text-white">NCRMS</div>
              <div class="text-[12px] text-white/60">
                National Criminal Record Management System
              </div>
            </div>
          </div>
  
          <button
            type="button"
            class="chipBtn"
            @click="goSupport"
          >
            <HelpCircle class="h-4 w-4" />
            Support
            <span class="chipBtn__ring" aria-hidden="true" />
          </button>
        </header>
  
        <!-- HERO -->
        <section class="mt-10 sm:mt-12">
          <div class="hero">
            <div class="hero__kicker">
              <span class="hero__dot" aria-hidden="true" />
              Secure Access Gateway
            </div>
  
            <h1 class="hero__title">
              Choose your portal
              <span class="hero__titleGlow" aria-hidden="true" />
            </h1>
  
            <p class="hero__sub">
              Sign in through the appropriate domain. Access is monitored, audited, and protected with strict security controls.
            </p>
  
            <div class="hero__meta">
              <div class="heroPill">
                <ShieldCheck class="h-4 w-4" />
                Activity logging enabled
              </div>
  
              <div class="heroPill">
                <LockKeyhole class="h-4 w-4" />
                Controlled access
              </div>
  
              <div class="heroPill">
                <Sparkles class="h-4 w-4" />
                Consistent UI & workflows
              </div>
            </div>
          </div>
        </section>
  
        <!-- PORTALS -->
        <section class="mt-10 sm:mt-12">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <!-- Law Enforcement -->
            <article
              ref="lawCard"
              class="portalCard portalCard--primary"
              @mousemove="(e) => onCardMove(e, 'law')"
              @mouseleave="() => resetCard('law')"
            >
              <div class="portalCard__topline" aria-hidden="true" />
  
              <div class="portalCard__inner">
                <div class="portalCard__icon">
                  <BadgeCheck class="h-5 w-5 text-white" />
                </div>
  
                <div class="portalCard__content">
                  <div class="portalCard__headingRow">
                    <h2 class="portalCard__title">Law Enforcement NPF</h2>
                    <span class="tag tag--blue">Police • Oversight • Operations</span>
                  </div>
  
                  <p class="portalCard__desc">
                    Access police roles, incident records, criminal record workflows, approvals, and operational tooling — optimized for speed and accountability.
                  </p>
  
                  <div class="portalCard__actions">
                    <button
                      type="button"
                      class="btnPrimary"
                      @click="goRole"
                      @mouseenter="primeMagnet('law', true)"
                      @mouseleave="primeMagnet('law', false)"
                      @mousemove="(e) => onMagnetMove(e, 'law')"
                    >
                      <span class="btnPrimary__shine" aria-hidden="true" />
                      Continue
                      <ArrowRight class="h-4 w-4 text-white" />
                    </button>
  
                    <div class="micro">
                      <div class="micro__item">
                        <Timer class="h-4 w-4" />
                        Fast role access
                      </div>
                      <div class="micro__item">
                        <ScrollText class="h-4 w-4" />
                        Audit trails
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div class="portalCard__borderGlow" aria-hidden="true" />
            </article>
  
            <!-- Judiciary -->
            <article
              ref="judCard"
              class="portalCard portalCard--neutral"
              @mousemove="(e) => onCardMove(e, 'jud')"
              @mouseleave="() => resetCard('jud')"
            >
              <div class="portalCard__topline portalCard__topline--neutral" aria-hidden="true" />
  
              <div class="portalCard__inner">
                <div class="portalCard__icon portalCard__icon--neutral">
                  <Scale class="h-5 w-5 text-white" />
                </div>
  
                <div class="portalCard__content">
                  <div class="portalCard__headingRow">
                    <h2 class="portalCard__title">Judiciary</h2>
                    <span class="tag tag--slate">Courts • Case Flow • Proceedings</span>
                  </div>
  
                  <p class="portalCard__desc">
                    Manage case progression, filings, proceedings, judgments, and inter-agency coordination.
                    <span class="ml-1 font-semibold text-white/80">(Coming soon)</span>
                  </p>
  
                  <div class="portalCard__actions">
                    <button
                      type="button"
                      class="btnGhost"
                      @click="goJudiciary"
                    >
                      Continue
                      <ArrowRight class="h-4 w-4" />
                    </button>
  
                    <div class="micro">
                      <div class="micro__item">
                        <BadgeInfo class="h-4 w-4" />
                        Standards-aligned
                      </div>
                      <div class="micro__item">
                        <ShieldCheck class="h-4 w-4" />
                        Secure by design
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div class="portalCard__borderGlow portalCard__borderGlow--neutral" aria-hidden="true" />
            </article>
          </div>
        </section>
  
        <!-- SECURITY NOTICE -->
        <section class="mt-10 sm:mt-12">
          <div class="notice">
            <div class="notice__icon">
              <ShieldCheck class="h-5 w-5 text-white" />
            </div>
            <div>
              <div class="notice__title">Security Notice</div>
              <p class="notice__text">
                This system contains sensitive criminal record information. Unauthorized access is prohibited and monitored.
                All activities are logged and audited for security compliance.
              </p>
            </div>
          </div>
        </section>
  
        <!-- FOOTER -->
        <footer class="mt-10 flex flex-col items-center gap-2 text-center text-[12px] text-white/45">
          <div class="flex items-center gap-2">
            <span class="dot" aria-hidden="true" />
            NCRMS • Secure Gateway • v1
          </div>
          <div>© {{ new Date().getFullYear() }} National Criminal Record Management System</div>
        </footer>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import {
    ArrowRight,
    BadgeCheck,
    Scale,
    HelpCircle,
    ShieldCheck,
    LockKeyhole,
    Sparkles,
    Timer,
    ScrollText,
    BadgeInfo,
  } from "lucide-vue-next";
  
  const router = useRouter();
  const root = ref(null);
  const lawCard = ref(null);
  const judCard = ref(null);
  
  // ✅ Set this to your actual police role selection route
  const LAW_ROLE_SELECT_ROUTE = "/roles";
  
  function goRole() {
    router.push(LAW_ROLE_SELECT_ROUTE);
  }
  
  function goJudiciary() {
    // per your request: for now go back home
    router.push("/");
  }
  
  function goSupport() {
    router.push("/support");
  }
  
  /**
   * Cursor spotlight (page-level)
   */
  function onMouseMove(e) {
    const el = root.value;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  }
  
  /**
   * Card tilt + sheen (per-card)
   * safe + lightweight, no external libs
   */
  function onCardMove(e, which) {
    const el = which === "law" ? lawCard.value : judCard.value;
    if (!el) return;
  
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
  
    // normalize [-0.5..0.5]
    const nx = (x / r.width) - 0.5;
    const ny = (y / r.height) - 0.5;
  
    // small tilt
    const tiltX = (ny * -7).toFixed(2);
    const tiltY = (nx * 9).toFixed(2);
  
    el.style.setProperty("--tiltX", `${tiltX}deg`);
    el.style.setProperty("--tiltY", `${tiltY}deg`);
    el.style.setProperty("--sx", `${x}px`);
    el.style.setProperty("--sy", `${y}px`);
    el.classList.add("is-active");
  }
  
  function resetCard(which) {
    const el = which === "law" ? lawCard.value : judCard.value;
    if (!el) return;
    el.style.setProperty("--tiltX", `0deg`);
    el.style.setProperty("--tiltY", `0deg`);
    el.classList.remove("is-active");
  }
  
  /**
   * Magnetic-ish primary button (very subtle)
   */
  const magnetArmed = ref({ law: false });
  function primeMagnet(which, v) {
    if (which === "law") magnetArmed.value.law = v;
  }
  
  function onMagnetMove(e, which) {
    if (which !== "law") return;
    if (!magnetArmed.value.law) return;
  
    const btn = e.currentTarget;
    if (!btn) return;
  
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
  
    const nx = (x / r.width) - 0.5;
    const ny = (y / r.height) - 0.5;
  
    btn.style.setProperty("--bx", `${(nx * 10).toFixed(2)}px`);
    btn.style.setProperty("--by", `${(ny * 8).toFixed(2)}px`);
  }
  </script>
  
  <style scoped>
  /* =========================
     GLOBAL MOTION SAFETY
  ========================= */
  @media (prefers-reduced-motion: reduce) {
    .fx__orb,
    .fx__sweep,
    .portalCard,
    .btnPrimary__shine {
      animation: none !important;
      transition: none !important;
    }
  }
  
  /* =========================
     BACKGROUND FX
  ========================= */
  .fx {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  
  .fx__mesh {
    position: absolute;
    inset: -2px;
    background:
      radial-gradient(900px 700px at 20% 20%, rgba(32, 92, 255, 0.40), transparent 60%),
      radial-gradient(900px 700px at 80% 30%, rgba(10, 35, 149, 0.55), transparent 65%),
      radial-gradient(900px 700px at 60% 85%, rgba(3, 11, 47, 0.85), transparent 60%),
      linear-gradient(180deg, rgba(5, 11, 30, 1), rgba(5, 11, 30, 1));
  }
  
  .fx__orb {
    position: absolute;
    width: 520px;
    height: 520px;
    border-radius: 9999px;
    filter: blur(55px);
    opacity: 0.35;
    transform: translateZ(0);
    animation: orbFloat 10s ease-in-out infinite;
  }
  
  .fx__orb--a {
    top: -220px;
    left: -180px;
    background: rgba(32, 92, 255, 0.75);
  }
  
  .fx__orb--b {
    top: -200px;
    right: -240px;
    background: rgba(10, 35, 149, 0.95);
    animation-delay: -2.5s;
  }
  
  .fx__orb--c {
    bottom: -260px;
    left: 18%;
    background: rgba(4, 18, 62, 0.9);
    animation-delay: -5.2s;
  }
  
  @keyframes orbFloat {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(0, 22px, 0) scale(1.04); }
  }
  
  .fx__sweep {
    position: absolute;
    inset: -40%;
    background: linear-gradient(
      110deg,
      transparent 35%,
      rgba(52, 124, 255, 0.18) 45%,
      rgba(10, 35, 149, 0.10) 55%,
      transparent 65%
    );
    transform: rotate(10deg);
    animation: sweep 8.5s linear infinite;
    opacity: 0.8;
  }
  
  @keyframes sweep {
    0% { transform: translateX(-12%) rotate(10deg); }
    100% { transform: translateX(12%) rotate(10deg); }
  }
  
  .fx__grid {
    position: absolute;
    inset: 0;
    opacity: 0.16;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(circle at 50% 30%, rgba(0,0,0,1), rgba(0,0,0,0) 70%);
  }
  
  .fx__spotlight {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(520px 520px at var(--mx, 50%) var(--my, 20%),
        rgba(80, 160, 255, 0.18),
        transparent 60%);
    opacity: 1;
    transition: background 0.05s linear;
  }
  
  .fx__noise {
    position: absolute;
    inset: 0;
    opacity: 0.06;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
    mix-blend-mode: overlay;
  }
  
  /* =========================
     HEADER / HERO
  ========================= */
  .brandMark {
    display: grid;
    place-items: center;
    height: 44px;
    width: 44px;
    border-radius: 14px;
    background: linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03));
    border: 1px solid rgba(255,255,255,0.10);
    box-shadow: 0 16px 40px rgba(0,0,0,0.35);
  }
  
  .hero {
    border-radius: 24px;
    padding: 26px 22px;
    background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
    border: 1px solid rgba(255,255,255,0.10);
    box-shadow: 0 18px 55px rgba(0,0,0,0.35);
  }
  
  @media (min-width: 640px) {
    .hero { padding: 30px 26px; }
  }
  
  .hero__kicker {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: rgba(255,255,255,0.72);
  }
  
  .hero__dot {
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(80,160,255,0.85));
    box-shadow: 0 0 0 6px rgba(80,160,255,0.12);
  }
  
  .hero__title {
    position: relative;
    margin-top: 12px;
    font-size: 28px;
    line-height: 1.15;
    font-weight: 900;
    color: white;
    letter-spacing: -0.02em;
  }
  
  @media (min-width: 640px) {
    .hero__title { font-size: 34px; }
  }
  
  .hero__titleGlow {
    position: absolute;
    inset: -20px -10px;
    background: radial-gradient(520px 200px at 30% 20%, rgba(80,160,255,0.20), transparent 60%);
    filter: blur(8px);
    pointer-events: none;
  }
  
  .hero__sub {
    margin-top: 10px;
    font-size: 13px;
    line-height: 1.7;
    color: rgba(255,255,255,0.62);
    max-width: 780px;
  }
  
  .hero__meta {
    margin-top: 18px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .heroPill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 600;
    color: rgba(255,255,255,0.75);
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
  }
  
  /* =========================
     SUPPORT CHIP BUTTON
  ========================= */
  .chipBtn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 14px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 700;
    color: rgba(255,255,255,0.78);
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
    box-shadow: 0 14px 40px rgba(0,0,0,0.25);
    transition: transform .2s ease, background .2s ease, border-color .2s ease;
  }
  
  .chipBtn:hover {
    transform: translateY(-1px);
    background: rgba(255,255,255,0.09);
    border-color: rgba(80,160,255,0.35);
  }
  
  .chipBtn:active { transform: translateY(0px) scale(0.98); }
  
  .chipBtn__ring {
    position: absolute;
    inset: -2px;
    border-radius: 9999px;
    background: radial-gradient(circle at 20% 30%, rgba(80,160,255,0.30), transparent 55%);
    opacity: 0;
    transition: opacity .25s ease;
    pointer-events: none;
  }
  
  .chipBtn:hover .chipBtn__ring { opacity: 1; }
  
  /* =========================
     PORTAL CARDS
  ========================= */
  .portalCard {
    position: relative;
    border-radius: 24px;
    transform-style: preserve-3d;
    transform: perspective(900px) rotateX(var(--tiltX, 0deg)) rotateY(var(--tiltY, 0deg));
    transition: transform .18s ease, box-shadow .25s ease, border-color .25s ease;
    background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
    border: 1px solid rgba(255,255,255,0.10);
    box-shadow: 0 18px 55px rgba(0,0,0,0.35);
    overflow: hidden;
  }
  
  .portalCard:hover {
    border-color: rgba(80,160,255,0.35);
    box-shadow: 0 26px 80px rgba(0,0,0,0.45);
  }
  
  .portalCard__topline {
    height: 2px;
    width: 100%;
    background: linear-gradient(90deg, rgba(80,160,255,0), rgba(80,160,255,0.8), rgba(10,35,149,0.6), rgba(80,160,255,0));
    opacity: 0.9;
  }
  
  .portalCard__topline--neutral {
    background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.35), rgba(255,255,255,0));
    opacity: 0.6;
  }
  
  .portalCard__inner {
    padding: 22px;
    display: flex;
    gap: 14px;
  }
  
  @media (min-width: 640px) {
    .portalCard__inner { padding: 26px; }
  }
  
  .portalCard__icon {
    flex: 0 0 auto;
    width: 46px;
    height: 46px;
    border-radius: 16px;
    display: grid;
    place-items: center;
    background: linear-gradient(180deg, rgba(80,160,255,0.35), rgba(10,35,149,0.12));
    border: 1px solid rgba(80,160,255,0.35);
    box-shadow: 0 20px 45px rgba(0,0,0,0.35);
  }
  
  .portalCard__icon--neutral {
    background: linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06));
    border-color: rgba(255,255,255,0.16);
  }
  
  .portalCard__content { flex: 1; }
  
  .portalCard__headingRow {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }
  
  .portalCard__title {
    font-size: 16px;
    font-weight: 800;
    color: white;
    letter-spacing: -0.01em;
  }
  
  .portalCard__desc {
    margin-top: 10px;
    font-size: 13px;
    line-height: 1.7;
    color: rgba(255,255,255,0.62);
  }
  
  .portalCard__actions {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .tag {
    display: inline-flex;
    align-items: center;
    height: 26px;
    padding: 0 10px;
    border-radius: 9999px;
    font-size: 11px;
    font-weight: 700;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.75);
  }
  
  .tag--blue {
    border-color: rgba(80,160,255,0.35);
    background: rgba(80,160,255,0.12);
  }
  
  .tag--slate {
    border-color: rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.06);
  }
  
  /* Card sheen that follows cursor */
  .portalCard::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      520px 300px at var(--sx, 50%) var(--sy, 30%),
      rgba(80,160,255,0.18),
      transparent 55%
    );
    opacity: 0;
    transition: opacity .2s ease;
    pointer-events: none;
  }
  
  .portalCard.is-active::after { opacity: 1; }
  
  .portalCard__borderGlow {
    position: absolute;
    inset: -2px;
    border-radius: 26px;
    background: radial-gradient(260px 180px at var(--sx, 30%) var(--sy, 30%), rgba(80,160,255,0.25), transparent 60%);
    opacity: 0;
    transition: opacity .2s ease;
    pointer-events: none;
  }
  
  .portalCard.is-active .portalCard__borderGlow { opacity: 1; }
  
  .portalCard__borderGlow--neutral {
    background: radial-gradient(260px 180px at var(--sx, 30%) var(--sy, 30%), rgba(255,255,255,0.10), transparent 60%);
  }
  
  /* =========================
     BUTTONS
  ========================= */
  .btnPrimary {
    position: relative;
    width: fit-content;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    height: 42px;
    padding: 0 16px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 800;
    color: white;
    background: linear-gradient(90deg, #0A2395 0%, #2A66FF 45%, #030B2F 100%);
    border: 1px solid rgba(80,160,255,0.35);
    box-shadow: 0 18px 50px rgba(0,0,0,0.35);
    transform: translate3d(var(--bx, 0px), var(--by, 0px), 0);
    transition: transform .15s ease, filter .2s ease, opacity .2s ease;
    overflow: hidden;
  }
  
  .btnPrimary:hover { filter: brightness(1.06); }
  .btnPrimary:active { transform: translate3d(0,0,0) scale(0.98); }
  
  .btnPrimary__shine {
    content: "";
    position: absolute;
    inset: -40%;
    background: linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%);
    transform: rotate(10deg) translateX(-20%);
    animation: shine 2.7s ease-in-out infinite;
    opacity: 0.85;
    pointer-events: none;
  }
  
  @keyframes shine {
    0%, 100% { transform: rotate(10deg) translateX(-24%); }
    50% { transform: rotate(10deg) translateX(24%); }
  }
  
  .btnGhost {
    width: fit-content;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    height: 42px;
    padding: 0 16px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 800;
    color: rgba(255,255,255,0.86);
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.14);
    transition: transform .15s ease, background .2s ease, border-color .2s ease;
  }
  
  .btnGhost:hover {
    background: rgba(255,255,255,0.09);
    border-color: rgba(80,160,255,0.25);
    transform: translateY(-1px);
  }
  
  .btnGhost:active { transform: translateY(0px) scale(0.98); }
  
  /* =========================
     MICRO ROW
  ========================= */
  .micro {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .micro__item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 32px;
    padding: 0 10px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 700;
    color: rgba(255,255,255,0.66);
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.10);
  }
  
  /* =========================
     SECURITY NOTICE
  ========================= */
  .notice {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    border-radius: 20px;
    padding: 16px 16px;
    background: linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03));
    border: 1px solid rgba(255,255,255,0.10);
    box-shadow: 0 18px 55px rgba(0,0,0,0.35);
  }
  
  .notice__icon {
    width: 44px;
    height: 44px;
    border-radius: 16px;
    display: grid;
    place-items: center;
    background: linear-gradient(180deg, rgba(80,160,255,0.30), rgba(10,35,149,0.10));
    border: 1px solid rgba(80,160,255,0.30);
  }
  
  .notice__title {
    font-size: 13px;
    font-weight: 800;
    color: white;
  }
  
  .notice__text {
    margin-top: 4px;
    font-size: 12px;
    line-height: 1.65;
    color: rgba(255,255,255,0.62);
  }
  
  /* =========================
     FOOTER DOT
  ========================= */
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: rgba(80,160,255,0.8);
    box-shadow: 0 0 0 6px rgba(80,160,255,0.12);
  }
  </style>
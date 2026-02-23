<!-- src/pages/LandingPage.vue -->
<template>
  <div class="w-full bg-white">
    <!-- TOP NAV -->
    <header class="sticky top-0 z-40 w-full border-b border-black/10 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <!-- Brand -->
        <RouterLink to="/" class="flex items-center gap-3">
          <div class="grid h-[58px] w-[75px] place-items-center rounded-xl border border-black/10 bg-white shadow-sm">
            <!-- crest placeholder -->
            <img src="../assets/logo.png" alt="">
          </div>
          <div class="leading-tight">
            <div class="text-[18px] font-semibold text-black">NCRMS</div>
            <div class="text-[11px] text-black/50">National Criminal Records</div>
          </div>
        </RouterLink>

        <!-- Links -->
        <nav class="hidden items-center gap-7 md:flex">
          <RouterLink
            to="/"
            class="text-[24px] font-medium"
            :class="isActive('/') ? 'text-[#0A2395]' : 'text-black/60 hover:text-black'"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/roles"
            class="text-[24px] font-medium"
            :class="isActive('/records') ? 'text-[#0A2395]' : 'text-black/60 hover:text-black'"
          >
            View Records
          </RouterLink>
          <RouterLink
            to="/about"
            class="text-[24px] font-medium"
            :class="isActive('/about') ? 'text-[#0A2395]' : 'text-black/60 hover:text-black'"
          >
            About
          </RouterLink>
          <RouterLink
            to="/contact"
            class="text-[24px] font-medium"
            :class="isActive('/contact') ? 'text-[#0A2395]' : 'text-black/60 hover:text-black'"
          >
            Contact
          </RouterLink>
        </nav>

        <!-- Login -->
        <RouterLink
          to="/portal"
          class="inline-flex h-[64px] w-[151px] items-center justify-center gap-2 rounded-lg px-4 text-[24px] font-medium text-white
                 bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                 shadow-sm hover:opacity-95 active:opacity-90"
        >
          <span>Login</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            class="w-[24px] h-[24px] text-current"
          >
            <path d="M20 21a8 8 0 1 0-16 0" />
            <path d="M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
          </svg>

        </RouterLink>
      </div>
    </header>

    <!-- HERO -->
    <section class="relative flex h-[860px] overflow-hidden bg-[#1C283CCC]">
      <!-- background image -->
      <div
        class="absolute inset-0 bg-cover bg-center opacity-2000"
        :style="{ backgroundImage: `url(${heroImg})` }"
      />

      <!-- overlay -->
      <div
        class="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,11,47,0.75)_0%,rgba(3,11,47,0.92)_65%,rgba(3,11,47,1)_100%)]"
      />

      <!-- CENTERED CONTENT -->
      <div class="relative mx-auto flex w-full max-w-6xl items-center justify-center px-6">
        <div class="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <!-- Pill -->
          <RouterLink
            to="/roles"
            class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2
                  text-[12px] font-medium text-white/80 shadow-sm backdrop-blur
                  transition hover:bg-white/10 active:scale-[0.98]"
          >
            <LockIcon class="h-4 w-4 text-white/70" />
            <span>Authorized access only</span>
          </RouterLink>

          <!-- Title (84px) -->
          <h1
            class="mt-6 text-balance font-extrabold leading-[1.05] tracking-tight text-white
                  text-[52px] sm:text-[72px] lg:text-[78px]"
          >
            National Criminal Record<br class="hidden sm:block" />
            Management System
          </h1>

          <!-- Subtitle (24px) -->
          <p
            class="mt-5 max-w-3xl text-pretty leading-[1.55] text-white/70
                  text-[16px] sm:text-[20px] lg:text-[24px] font-light"
          >
            A centralized, secure and interoperable digital platform designed to collect, manage and
            share criminal records.
          </p>

          <!-- CTA (286x80, radius 10, padding 24/32, text 24px) -->
          <RouterLink to ="/roles"
            type="button"
            class="mt-10 inline-flex items-center justify-center gap-[10px]
                  rounded-[10px] text-white shadow-[0_10px_24px_rgba(3,11,47,0.35)]
                  transition hover:opacity-95 active:opacity-90
                  w-[286px] h-[80px] px-[32px] py-[24px] text-[24px] font-medium
                  bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]"
          >
            <SearchIcon class="h-6 w-6 text-white" />
            Request Access
          </RouterLink>
        </div>
      </div>
    </section>


    <section class="bg-white">
  <!-- section padding: top/bottom 80, left/right 100 -->
  <div class="mx-auto max-w-[1440px] px-[100px] py-[80px]">
    <!-- cards row centered, gap 69 -->
    <div class="flex w-full justify-center mb-[100px]">
      <div class="flex flex-wrap justify-center gap-[69px]">
        <!-- Card 1 -->
        <div
          class="h-[267px] w-[357px] rounded-[16px] border-2 border-[#51A2FF]/20 bg-white
                 px-[96px] py-[48px] shadow-sm transition hover:shadow-md
                 flex flex-col items-center"
        >
          <!-- Icon (72x72) -->
          <div class="mx-auto grid h-[60px] w-[54px] place-items-center rounded-2xl bg-none">
            <svg
            class="h-[60px] w-[54px] text-[#51A2FF]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M4 6c0-1.657 3.582-3 8-3s8 1.343 8 3-3.582 3-8 3-8-1.343-8-3Z" />
            <path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" />
            <path d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6" />
          </svg>

          </div>

          <!-- Big text (36px) -->
          <div class="mt-6 text-center text-[36px] font-extrabold leading-none text-black">15M+</div>

          <!-- Small text (20px) -->
          <div class="mt-3 text-center text-[19px] font-light leading-tight text-black/60">
            Records Available
          </div>
        </div>

        <!-- Card 2 -->
        <div
          class="h-[267px] w-[357px] rounded-[16px] border-2 border-[#51A2FF]/20 bg-white
                 px-[96px] py-[48px] shadow-sm transition hover:shadow-md
                 flex flex-col items-center"
        >
          <div class="mx-auto grid h-[72px] w-[72px] place-items-center rounded-2xl bg-none">
            <svg
            class="h-[60px] w-[54px] text-[#51A2FF]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4Z" />
            <path d="M9 12l2 2 4-5" stroke-linecap="round" />
          </svg>

          </div>

          <div class="mt-6 text-center text-[36px] font-extrabold leading-none text-black">24/7</div>

          <div class="mt-3 text-center text-[20px] font-light leading-tight text-black/60">
            Secure Access
          </div>
        </div>

        <!-- Card 3 -->
        <div
          class="h-[267px] w-[357px] rounded-[16px] border-2 border-[#51A2FF]/20 bg-white
                 px-[96px] py-[48px] shadow-sm transition hover:shadow-md
                 flex flex-col items-center"
        >
          <div class="mx-auto grid h-[72px] w-[72px] place-items-center rounded-2xl bg-none">
            <svg
              class="h-[36px] w-[36px] text-[#51A2FF]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" />
              <path d="M12 7v6l4 2" stroke-linecap="round" />
            </svg>

          </div>

          <div class="mt-6 text-center text-[32px] font-extrabold leading-none text-black">Real-time</div>

          <div class="mt-3 text-center text-[20px] font-light leading-tight text-black/60">
            Updates
          </div>
        </div>
      </div>
    </div>

    <!-- Chairman / Intro row (UPDATED HEIGHT + TYPOGRAPHY) -->
    <div class="mt-10 h-[835px] grid grid-cols-1 items-center gap-10 md:grid-cols-2">
      <!-- Image placeholder -->
      <div class="h-full w-full overflow-hidden rounded-2xl bg-[#EEF2FF]">
        <div class="grid h-full w-full place-items-center text-[14px] font-medium text-black/40">
          Image Placeholder
        </div>
      </div>

      <!-- Text -->
      <div class="max-w-xl">
        <!-- Big text (36px) -->
        <!-- <div class="text-[36px] font-extrabold leading-tight text-[#0A2395]">
          NCRMS
        </div> -->

        <!-- Small text (24px) -->
        <p class="mt-6 text-[24px] font-light leading-[1.6] text-black/60">
          NCRMS is a centralized, secure, and interoperable digital platform designed to collect, manage, and
          share criminal records across all relevant agencies in real-time. The project aims to develop a
          centralized and secure database system to store, manage, retrieve, and report organizational data.
          The system supports role-based access control, ensures data integrity, and provides forensic features
          to enhance reliability and security.
        </p>

        <div class="mt-10">
          <div class="text-[24px] font-semibold text-black">Gen. Muhammad Bada</div>
          <div class="mt-2 text-[24px] text-black/50 font-light">State Commissioner</div>
        </div>
      </div>
    </div>
  </div>
</section>


    <!-- EXISTING SECTIONS (kept, just wrapped cleanly) -->
    <section class="bg-white">
      <FeaturesSection />
    </section>

    <!-- ABOUT -->
    <section class="bg-[#F3F6FF]">
      <div class="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div class="text-center">
          <h2 class="text-[64px] font-extrabold tracking-tight text-[#200A95] sm:text-[28px]">
            About Our Agency
          </h2>
          <p class="mt-2 text-[24px] text-black/55 font-light  sm:text-[24px]">
            Leading the nation in criminal records information services since 1995
          </p>
        </div>

        <div class="mt-10 flex justify-center h-[618px] w-[1240px]">
          <div class="w-full max-w-4xl rounded-3xl bg-white px-[100px] py-[100px] shadow-sm sm:px-12">
            <div class="space-y-7 text-[24px] leading-6 text-black/60 font-light">
              <p>
                NCRMS is a centralized, secure, and interoperable digital platform designed to collect, manage, and
                share criminal records across all relevant agencies in real-time. The project aims to develop a
                centralized and secure database application system to store, manage, retrieve, and report
                organizational data. The system supports role-based access control, ensures data integrity, and
                provides forensic features to enhance reliability and security.
              </p>

              <p>
                NCRMS is a centralized, secure, and interoperable digital platform designed to collect, manage, and
                share criminal records across all relevant agencies in real-time. The project aims to develop a
                centralized and secure database application system to store, manage, retrieve, and report
                organizational data. The system supports role-based access control, ensures data integrity, and
                provides forensic features to enhance reliability and security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA STRIP -->
    <section class="bg-white">
      <div class="mx-auto max-w-6xl px-6 py-12 sm:py-16 flex justify-center">
        
        <div
          class="w-[1240px] h-[591px]
                rounded-2xl
                bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                text-white
                shadow-[0_18px_44px_rgba(3,11,47,0.25)]
                flex flex-col items-center justify-center
                text-center px-12"
        >
          
          <!-- Title -->
          <h3 class="text-[64px] font-extrabold leading-tight">
            Ready to Get Started?
          </h3>

          <!-- Subtitle -->
          <p class="mt-6 max-w-3xl text-[24px] leading-[1.6] font-light">
            Request access to our database or contact our team to learn more about our services.
          </p>

          <!-- Buttons -->
          <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-8">
            
            <button
              type="button"
              class="h-[115px] w-[374px]
                    rounded-[10px]
                    bg-white
                    text-[32px] font-light text-[#0A2395]
                    shadow-sm
                    transition hover:opacity-95 active:opacity-90"
            >
              Request Access
            </button>

            <button
              type="button"
              class="h-[115px] w-[374px]
                    rounded-[10px]
                    border-2 border-white
                    bg-transparent
                    text-[32px] font-light text-white
                    transition hover:bg-white/10 active:opacity-90"
            >
              Contact Us
            </button>

          </div>

        </div>

      </div>
    </section>


    <!-- FOOTER -->
    <footer class="bg-[#030B2F] text-white">
      <div class="mx-auto max-w-6xl px-6 py-12">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <div class="flex items-center gap-3">
              <div class="grid h-[59px] w-[75px] place-items-center rounded-xl bg-white/10">
                <img src="../assets/logo.png" alt="">
              </div>
              <div class="leading-tight">
                <div class="text-[18px] font-semibold">NCRMS</div>
                <div class="text-[18px] text-white/60 fon-light">National Criminal Records</div>
              </div>
            </div>

            <p class="mt-4 max-w-xs text-[18px] leading-5 font-light text-white/70">
              Trusted criminal records database serving law enforcement and authorized agencies nationwide.
            </p>
          </div>

          <div>
            <div class="text-[18px] font-semibold">Quick Links</div>
            <div class="mt-4 space-y-2 text-[18px] text-white/70 font-light">
              <RouterLink to="/" class="block hover:text-white">Home</RouterLink>
              <RouterLink to="/roles" class="block hover:text-white">View Records</RouterLink>
              <RouterLink to="/about" class="block hover:text-white">About</RouterLink>
              <RouterLink to="/contact" class="block hover:text-white">Contact</RouterLink>
            </div>
          </div>

          <div>
            <div class="text-[18px] font-semibold">Legal</div>
            <div class="mt-4 space-y-2 text-[18px] text-white/70 font-light">
              <RouterLink to="/privacy" class="block hover:text-white">Privacy Policy</RouterLink>
              <RouterLink to="/terms" class="block hover:text-white">Terms of Service</RouterLink>
              <RouterLink to="/security" class="block hover:text-white">Security</RouterLink>
            </div>
          </div>

          <div>
            <div class="text-[18px] font-semibold">Contact</div>
            <div class="mt-4 space-y-2 text-[18px] text-white/70 font-light">
              <div>CBN Road, Gwarimpa, Abuja</div>
              <div>+234-800-RECORDS</div>
              <div>support@ncrms.ng</div>
            </div>
          </div>
        </div>

        <div class="mt-10 border-t border-white pt-6 text-center text-[18px] text-white">
          © {{ new Date().getFullYear() }} National Criminal Records Database. All rights reserved.
          <span class="mx-12"></span>
          For authorized use only. Unauthorized access is prohibited.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import CharimanCard from "../components/CharimanCard.vue";
import FeaturesSection from "../components/FeaturesSection.vue";
import heroImg from "../assets/heroimg.jpg";


/**
 * Landing Page — NCRMS (Vue 3 + Tailwind)
 * - Matches the attached Figma screenshot layout closely
 * - No JSX, no runtime-only template strings that can break rendering
 * - Mobile responsive + clean interactions
 */

const route = useRoute();
const isActive = (path) => route.path === path;

const FeatureCard = defineComponent({
  name: "FeatureCard",
  props: {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    icon: { type: [Object, Function], required: true },
  },
  template: `
    <div class="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div class="grid h-10 w-10 place-items-center rounded-xl bg-[#0A2395]/10">
        <component :is="icon" class="h-5 w-5 text-[#0A2395]" />
      </div>
      <div class="mt-4 text-[13px] font-semibold text-black">{{ title }}</div>
      <div class="mt-2 text-[12px] leading-6 text-black/55">{{ desc }}</div>
    </div>
  `,
});

/** Inline SVG icon components (template-based, safe rendering) */
const SearchIcon = defineComponent({
  name: "SearchIcon",
  template: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21 21l-4.2-4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
});

const DatabaseIcon = defineComponent({
  name: "DatabaseIcon",
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linejoin="round"
      class="w-full h-full"
    >
      <path d="M4 6c0-1.657 3.582-3 8-3s8 1.343 8 3-3.582 3-8 3-8-1.343-8-3Z"/>
      <path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6"/>
      <path d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6"/>
    </svg>
  `,
});


const ClockIcon = defineComponent({
  name: "ClockIcon",
  inheritAttrs: false,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      v-bind="$attrs"
      stroke="currentColor"
    >
      <path
        d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M12 7v6l4 2"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
});

const FileIcon = defineComponent({
  name: "FileIcon",
  template: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M14 2v6h6" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>
  `,
});

const LockMiniIcon = defineComponent({
  name: "LockMiniIcon",
  template: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M17 11H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>
  `,
});

const LockIcon = defineComponent({
  name: "LockIcon",
  template: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.5 11h11A2.5 2.5 0 0 1 20 13.5v6A2.5 2.5 0 0 1 17.5 22h-11A2.5 2.5 0 0 1 4 19.5v-6A2.5 2.5 0 0 1 6.5 11Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>
  `,
});

const ShieldIcon = defineComponent({
  name: "ShieldIcon",
  inheritAttrs: false,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      v-bind="$attrs"
      stroke="currentColor"
    >
      <path
        d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4Z"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M9 12l2 2 4-5"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
});
const UserIcon = defineComponent({
  name: "UserIcon",
  template: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>
  `,
});
</script>

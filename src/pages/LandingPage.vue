<!-- src/pages/LandingPage.vue -->
<template>
  <div class="ncrms-page min-h-screen w-full overflow-x-hidden bg-[#F4F6FA] text-[#07111F]">
    <!-- TOP NAV -->
    <header class="fixed left-0 top-0 z-50 w-full border-b border-[#07111F]/10 bg-white/88 backdrop-blur-xl">
      <div class="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12">
        <RouterLink to="/" class="group flex items-center gap-4">
          <div
            class="grid h-[58px] w-[76px] place-items-center border border-[#07111F]/10 bg-white shadow-[0_16px_34px_rgba(3,11,47,0.08)] transition duration-300 group-hover:-translate-y-0.5"
          >
            <img src="../assets/logo.png" alt="NCRMS Logo" class="h-full w-full object-contain p-1.5" />
          </div>

          <div class="leading-tight">
            <div class="text-[20px] font-black tracking-[-0.03em] text-[#07111F]">NCRMS</div>
            <div class="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#07111F]/45">
              National Criminal Records
            </div>
          </div>
        </RouterLink>

        <nav class="hidden items-center gap-8 md:flex">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="relative py-2 text-[16px] font-semibold tracking-[-0.01em] transition duration-300"
            :class="isActive(item.active) ? 'text-[#0A2395]' : 'text-[#07111F]/56 hover:text-[#07111F]'"
          >
            {{ item.label }}
            <span
              class="absolute -bottom-1 left-0 h-[2px] bg-[#0A2395] transition-all duration-300"
              :class="isActive(item.active) ? 'w-full' : 'w-0 group-hover:w-full'"
            ></span>
          </RouterLink>
        </nav>

        <RouterLink
          to="/portal"
          class="group relative hidden h-[58px] min-w-[142px] items-center justify-center gap-2 overflow-hidden bg-[#07111F] px-6 text-[16px] font-bold text-white shadow-[0_18px_38px_rgba(3,11,47,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0A2395] md:inline-flex"
        >
          <span class="absolute inset-y-0 left-0 w-[3px] bg-[#51A2FF]"></span>
          <span>Login</span>
          <UserIcon class="h-5 w-5" />
        </RouterLink>
      </div>
    </header>

    <!-- HERO -->
    <section class="relative min-h-[920px] overflow-hidden bg-[#030B2F] pt-[90px]">
      <div
        class="absolute inset-0 bg-cover bg-center hero-kenburns"
        :style="{ backgroundImage: `url(${heroImg})` }"
      ></div>

      <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,11,47,0.97)_0%,rgba(3,11,47,0.88)_45%,rgba(3,11,47,0.48)_100%)]"></div>
      <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,11,47,0)_0%,rgba(3,11,47,0.32)_60%,#030B2F_100%)]"></div>

      <!-- precision panels -->
      <div class="absolute right-[7%] top-[22%] hidden w-[360px] border border-white/12 bg-white/[0.045] p-5 backdrop-blur-md lg:block panel-drift">
        <div class="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
          <span class="text-[11px] font-bold uppercase tracking-[0.22em] text-white/48">System Status</span>
          <span class="h-2 w-2 bg-[#51A2FF]"></span>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between text-[13px] text-white/70">
            <span>Integrity Layer</span>
            <span class="text-[#8CCBFF]">Active</span>
          </div>
          <div class="h-[3px] bg-white/10">
            <div class="h-full w-[88%] bg-[#51A2FF]"></div>
          </div>
          <div class="flex justify-between text-[13px] text-white/70">
            <span>Secure Access</span>
            <span class="text-[#8CCBFF]">24/7</span>
          </div>
        </div>
      </div>

      <div class="absolute bottom-[17%] right-[12%] hidden h-[160px] w-[160px] border border-white/10 bg-white/[0.035] backdrop-blur-md lg:block panel-drift-delay"></div>

      <div class="relative mx-auto flex min-h-[830px] max-w-[1440px] items-center px-5 sm:px-8 lg:px-12">
        <div class="max-w-[980px]">
          <RouterLink
            to="/roles"
            class="inline-flex items-center gap-3 border border-white/14 bg-white/[0.055] px-5 py-3 text-[12px] font-bold uppercase tracking-[0.24em] text-white/72 backdrop-blur-md transition duration-300 hover:border-[#51A2FF]/45 hover:bg-white/[0.08]"
          >
            <LockIcon class="h-4 w-4 text-[#8CCBFF]" />
            <span>Authorized access only</span>
          </RouterLink>

          <h1 class="mt-8 max-w-[1050px] text-[52px] font-black leading-[0.98] tracking-[-0.065em] text-white sm:text-[78px] lg:text-[104px]">
            National Criminal Record Management System
          </h1>

          <p class="mt-8 max-w-3xl text-[18px] font-light leading-[1.75] text-white/68 sm:text-[22px] lg:text-[24px]">
            A centralized, secure and interoperable digital platform designed to collect, manage and
            share criminal records.
          </p>

          <div class="mt-11 flex flex-col gap-4 sm:flex-row">
            <RouterLink
              to="/"
              class="group relative inline-flex h-[76px] w-full max-w-[286px] items-center justify-center gap-3 overflow-hidden bg-[#0A2395] text-[22px] font-bold text-white shadow-[0_26px_60px_rgba(10,35,149,0.34)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#07111F]"
            >
              <span class="absolute inset-y-0 left-0 w-[4px] bg-[#51A2FF]"></span>
              <SearchIcon class="h-6 w-6" />
              <span>Request Access</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="relative bg-[#F4F6FA]">
      <div class="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,#030B2F_0%,rgba(3,11,47,0)_100%)]"></div>

      <div class="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12">
        <div class="-mt-32 grid gap-5 md:grid-cols-3">
          <div
            v-for="card in statCards"
            :key="card.label"
            class="stat-card group relative min-h-[250px] overflow-hidden border border-[#07111F]/8 bg-white p-8 shadow-[0_30px_80px_rgba(3,11,47,0.09)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_38px_95px_rgba(3,11,47,0.13)]"
          >
            <div class="absolute left-0 top-0 h-full w-[4px] bg-[#0A2395] transition duration-300 group-hover:bg-[#51A2FF]"></div>
            <div class="absolute right-0 top-0 h-20 w-20 border-b border-l border-[#07111F]/8"></div>

            <div class="relative grid h-[70px] w-[70px] place-items-center border border-[#0A2395]/12 bg-[#F1F5FF] text-[#0A2395]">
              <component :is="card.icon" class="h-9 w-9" />
            </div>

            <div class="relative mt-9 text-[42px] font-black leading-none tracking-[-0.05em] text-[#07111F]">
              {{ card.value }}
            </div>

            <div class="relative mt-4 text-[20px] font-light text-[#07111F]/56">
              {{ card.label }}
            </div>
          </div>
        </div>

        <!-- CHAIRMAN / INTRO -->
        <div class="mt-28 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div class="group relative min-h-[650px] overflow-hidden bg-[#DDE6F6] shadow-[0_34px_90px_rgba(3,11,47,0.15)]">
            <img
              class="h-full min-h-[650px] w-full object-cover transition duration-[1000ms] group-hover:scale-[1.035]"
              src="../assets/MOI.jpg"
              alt="Gen. Muhammad Bada"
            />
            <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,11,47,0)_48%,rgba(3,11,47,0.82)_100%)]"></div>

            <div class="absolute bottom-0 left-0 right-0 border-t border-white/16 bg-[#030B2F]/75 px-7 py-6 text-white backdrop-blur-md">
              <div class="text-[23px] font-black">Gen. Muhammad Bada</div>
              <div class="mt-1 text-[18px] font-light text-white/65">State Commissioner</div>
            </div>
          </div>

          <div class="relative border-l border-[#07111F]/12 pl-8 lg:pl-12">
            <div class="mb-8 h-[3px] w-24 bg-[#0A2395]"></div>

            <p class="text-[22px] font-light leading-[1.85] text-[#07111F]/62 lg:text-[26px]">
              NCRMS is a centralized, secure, and interoperable digital platform designed to collect, manage, and
              share criminal records across all relevant agencies in real-time. The project aims to develop a
              centralized and secure database system to store, manage, retrieve, and report organizational data.
              The system supports role-based access control, ensures data integrity, and provides forensic features
              to enhance reliability and security.
            </p>

            <div class="mt-10">
              <div class="text-[25px] font-black text-[#07111F]">Gen. Muhammad Bada</div>
              <div class="mt-2 text-[22px] font-light text-[#07111F]/48">State Commissioner</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- EXISTING FEATURES -->
    <section class="bg-white">
      <FeaturesSection />
    </section>

    <!-- ABOUT -->
    <section class="relative overflow-hidden bg-[#EEF2F8]">
      <div class="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12">
        <div class="grid gap-10 lg:grid-cols-[0.55fr_1fr]">
          <div>
            <div class="mb-6 h-[3px] w-24 bg-[#0A2395]"></div>
            <h2 class="text-[44px] font-black leading-[1] tracking-[-0.055em] text-[#07111F] sm:text-[64px] lg:text-[76px]">
              About Our Agency
            </h2>
            <p class="mt-6 max-w-xl text-[21px] font-light leading-[1.65] text-[#07111F]/55">
              Leading the nation in criminal records information services since 1995
            </p>
          </div>

          <div class="border border-[#07111F]/8 bg-white p-8 shadow-[0_32px_85px_rgba(3,11,47,0.08)] sm:p-12 lg:p-16">
            <div class="space-y-8 text-[20px] font-light leading-[1.85] text-[#07111F]/62 sm:text-[24px]">
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
      <div class="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12">
        <div class="relative overflow-hidden bg-[#030B2F] px-7 py-20 text-center text-white shadow-[0_42px_110px_rgba(3,11,47,0.26)] sm:px-12 lg:px-20">
          <div class="absolute inset-0 bg-[linear-gradient(115deg,#0A2395_0%,#030B2F_46%,#020718_100%)]"></div>
          <div class="absolute left-0 top-0 h-full w-[6px] bg-[#51A2FF]"></div>
          <div class="absolute right-0 top-0 h-32 w-32 border-b border-l border-white/10"></div>
          <div class="absolute bottom-0 left-0 h-32 w-32 border-r border-t border-white/10"></div>

          <div class="relative mx-auto max-w-5xl">
            <h3 class="text-[44px] font-black leading-[1.04] tracking-[-0.055em] sm:text-[64px] lg:text-[82px]">
              Ready to Get Started?
            </h3>

            <p class="mx-auto mt-7 max-w-3xl text-[20px] font-light leading-[1.75] text-white/70 sm:text-[24px]">
              Request access to our database or contact our team to learn more about our services.
            </p>

            <div class="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <button
                type="button"
                class="h-[86px] w-full max-w-[340px] bg-white text-[25px] font-light text-[#0A2395] shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-0.5 active:scale-[0.99]"
              >
                Request Access
              </button>

              <button
                type="button"
                class="h-[86px] w-full max-w-[340px] border border-white/50 bg-transparent text-[25px] font-light text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/8 active:scale-[0.99]"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-[#030B2F] text-white">
      <div class="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <div class="flex items-center gap-3">
              <div class="grid h-[59px] w-[75px] place-items-center border border-white/10 bg-white/8">
                <img src="../assets/logo.png" alt="NCRMS Logo" class="h-full w-full object-contain p-1.5" />
              </div>
              <div class="leading-tight">
                <div class="text-[18px] font-semibold">NCRMS</div>
                <div class="text-[18px] text-white/60 font-light">National Criminal Records</div>
              </div>
            </div>

            <p class="mt-4 max-w-xs text-[18px] font-light leading-7 text-white/70">
              Trusted criminal records database serving law enforcement and authorized agencies nationwide.
            </p>
          </div>

          <div>
            <div class="text-[18px] font-semibold">Quick Links</div>
            <div class="mt-4 space-y-3 text-[18px] font-light text-white/70">
              <RouterLink to="/" class="block hover:text-white">Home</RouterLink>
              <RouterLink to="/roles" class="block hover:text-white">View Records</RouterLink>
              <RouterLink to="/about" class="block hover:text-white">About</RouterLink>
              <RouterLink to="/contact" class="block hover:text-white">Contact</RouterLink>
            </div>
          </div>

          <div>
            <div class="text-[18px] font-semibold">Legal</div>
            <div class="mt-4 space-y-3 text-[18px] font-light text-white/70">
              <RouterLink to="/privacy" class="block hover:text-white">Privacy Policy</RouterLink>
              <RouterLink to="/terms" class="block hover:text-white">Terms of Service</RouterLink>
              <RouterLink to="/security" class="block hover:text-white">Security</RouterLink>
            </div>
          </div>

          <div>
            <div class="text-[18px] font-semibold">Contact</div>
            <div class="mt-4 space-y-3 text-[18px] font-light text-white/70">
              <div>CBN Road, Gwarimpa, Abuja</div>
              <div>+234-800-RECORDS</div>
              <div>support@ncrms.ng</div>
            </div>
          </div>
        </div>

        <div class="mt-12 border-t border-white/12 pt-7 text-center text-[16px] leading-7 text-white/64">
          © {{ new Date().getFullYear() }} National Criminal Records Database. All rights reserved.
          <span class="mx-6 hidden sm:inline"></span>
          For authorized use only. Unauthorized access is prohibited.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { defineComponent, markRaw } from "vue";
import { useRoute } from "vue-router";
import FeaturesSection from "../components/FeaturesSection.vue";
import heroImg from "../assets/heroimg.jpg";

const route = useRoute();
const isActive = (path) => route.path === path;

const navItems = [
  { label: "Home", to: "/", active: "/" },
  { label: "View Records", to: "/roles", active: "/roles" },
  { label: "About", to: "/about", active: "/about" },
  { label: "Contact", to: "/contact", active: "/contact" },
];

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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 6c0-1.657 3.582-3 8-3s8 1.343 8 3-3.582 3-8 3-8-1.343-8-3Z" />
      <path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" />
      <path d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6" />
    </svg>
  `,
});

const ClockIcon = defineComponent({
  name: "ClockIcon",
  template: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor">
      <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke-width="2" stroke-linejoin="round" />
      <path d="M12 7v6l4 2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
});

const ShieldIcon = defineComponent({
  name: "ShieldIcon",
  template: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor">
      <path d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4Z" stroke-width="2" stroke-linejoin="round" />
      <path d="M9 12l2 2 4-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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

const UserIcon = defineComponent({
  name: "UserIcon",
  template: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>
  `,
});

const statCards = [
  {
    value: "15M+",
    label: "Records Available",
    icon: markRaw(DatabaseIcon),
  },
  {
    value: "24/7",
    label: "Secure Access",
    icon: markRaw(ShieldIcon),
  },
  {
    value: "Real-time",
    label: "Updates",
    icon: markRaw(ClockIcon),
  },
];
</script>

<style scoped>
.ncrms-page {
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}

.hero-kenburns {
  animation: heroKenburns 18s ease-in-out infinite alternate;
  transform-origin: center;
}

.panel-drift {
  animation: panelDrift 8s ease-in-out infinite;
}

.panel-drift-delay {
  animation: panelDrift 9s ease-in-out infinite;
  animation-delay: -3s;
}

.stat-card {
  transform-style: preserve-3d;
}

@keyframes heroKenburns {
  0% {
    transform: scale(1.04) translate3d(0, 0, 0);
  }

  100% {
    transform: scale(1.12) translate3d(-1.2%, -0.8%, 0);
  }
}

@keyframes panelDrift {
  0%,
  100% {
    transform: translate3d(0, 0, 0) perspective(900px) rotateY(-4deg);
  }

  50% {
    transform: translate3d(0, -14px, 0) perspective(900px) rotateY(4deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-kenburns,
  .panel-drift,
  .panel-drift-delay {
    animation: none;
  }

  * {
    scroll-behavior: auto !important;
  }
}
</style>
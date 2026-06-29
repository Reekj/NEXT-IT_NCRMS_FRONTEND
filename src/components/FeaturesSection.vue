<template>
  <section class="features-intel relative overflow-hidden bg-[#EEF2F8]">
    <div class="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#EEF2F8_100%)]"></div>

    <div class="absolute inset-0 opacity-[0.035] technical-grid"></div>

    <div class="relative mx-auto max-w-[1440px] px-5 py-28 sm:px-8 lg:px-12">
      <div class="grid items-end gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div class="mb-7 flex items-center gap-4">
            <span class="h-[3px] w-24 bg-[#0A2395]"></span>
            <span class="text-[12px] font-black uppercase tracking-[0.28em] text-[#0A2395]">
              Intelligence Infrastructure
            </span>
          </div>

          <h2 class="max-w-4xl text-[48px] font-black leading-[0.96] tracking-[-0.065em] text-[#07111F] sm:text-[72px] lg:text-[88px]">
            Powerful Features for Law Enforcement
          </h2>
        </div>

        <p class="max-w-2xl text-[20px] font-light leading-[1.8] text-[#07111F]/58 sm:text-[24px]">
          Our platform provides the tools and data you need to conduct thorough background
          checks and criminal record searches efficiently.
        </p>
      </div>

      <div class="mt-20 grid gap-5 lg:grid-cols-3">
        <div
          v-for="(item, index) in features"
          :key="item.title"
          class="feature-card group relative min-h-[390px] overflow-hidden border border-[#07111F]/10 bg-white shadow-[0_24px_70px_rgba(3,11,47,0.07)]"
        >
          <div class="absolute left-0 top-0 h-full w-[4px] bg-[#0A2395] transition-all duration-500 group-hover:w-[7px] group-hover:bg-[#51A2FF]"></div>

          <div class="absolute right-0 top-0 h-20 w-20 border-b border-l border-[#07111F]/10"></div>
          <div class="absolute bottom-0 left-0 h-20 w-20 border-r border-t border-[#07111F]/8"></div>

          <div class="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(81,162,255,0.18),transparent_38%)]"></div>
            <div class="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,transparent,#51A2FF,transparent)] scan-line"></div>
          </div>

          <div class="relative flex h-full flex-col p-8">
            <div class="flex items-center justify-between">
              <div class="grid h-[68px] w-[68px] place-items-center border border-[#0A2395]/14 bg-[#F4F7FF] text-[#0A2395] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                <component :is="item.icon" class="h-8 w-8" />
              </div>

              <div class="font-mono text-[13px] font-bold text-[#07111F]/24">
                0{{ index + 1 }}
              </div>
            </div>

            <div class="mt-auto pt-14">
              <h3 class="text-[31px] font-black leading-tight tracking-[-0.04em] text-[#07111F]">
                {{ item.title }}
              </h3>

              <p class="mt-5 text-[20px] font-light leading-[1.75] text-[#07111F]/58">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div class="relative overflow-hidden border border-[#07111F]/10 bg-[#030B2F] p-10 text-white shadow-[0_30px_90px_rgba(3,11,47,0.18)]">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(81,162,255,0.24),transparent_34%),linear-gradient(115deg,#0A2395_0%,#030B2F_48%,#020718_100%)]"></div>
          <div class="absolute right-0 top-0 h-32 w-32 border-b border-l border-white/12"></div>
          <div class="relative grid gap-8 md:grid-cols-[0.65fr_1fr] md:items-end">
            <div>
              <div class="text-[13px] font-black uppercase tracking-[0.28em] text-[#8CCBFF]">
                Verified Access
              </div>
              <div class="mt-5 text-[48px] font-black leading-none tracking-[-0.06em]">
                Secure by Design
              </div>
            </div>

            <p class="text-[20px] font-light leading-[1.75] text-white/68">
              Enterprise-grade security with multi-factor authentication and encrypted data transmission.
            </p>
          </div>
        </div>

        <div class="relative overflow-hidden border border-[#07111F]/10 bg-white p-10 shadow-[0_30px_80px_rgba(3,11,47,0.08)]">
          <div class="absolute right-0 top-0 h-24 w-24 border-b border-l border-[#07111F]/10"></div>
          <div class="text-[13px] font-black uppercase tracking-[0.28em] text-[#0A2395]">
            Operational Standard
          </div>
          <div class="mt-5 text-[44px] font-black leading-none tracking-[-0.06em] text-[#07111F]">
            Real-time
          </div>
          <p class="mt-6 text-[20px] font-light leading-[1.75] text-[#07111F]/58">
            Database is continuously updated to ensure you have access to the most current information available.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  Search,
  Database,
  Clock,
  ShieldCheck,
  FileText,
  Lock,
} from "lucide-vue-next";

const features = [
  {
    icon: Search,
    title: "Advanced Search",
    description:
      "Powerful search capabilities with multiple filters including name, location, case number and date ranges.",
  },
  {
    icon: Database,
    title: "Comprehensive Database",
    description:
      "Access to millions of criminal records from federal, state, and local jurisdictions nationwide.",
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description:
      "Database is continuously updated to ensure you have access to the most current information available.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Compliant",
    description:
      "NCRMS compliant platform with encryption and strict access controls to protect sensitive data.",
  },
  {
    icon: FileText,
    title: "Verified Records",
    description:
      "All records are verified and sourced directly from official government and law enforcement databases.",
  },
  {
    icon: Lock,
    title: "Data Security",
    description:
      "Enterprise-grade security with multi-factor authentication and encrypted data transmission.",
  },
];
</script>

<style scoped>
.features-intel {
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}

.technical-grid {
  background-image:
    linear-gradient(rgba(7, 17, 31, 0.35) 1px, transparent 1px),
    linear-gradient(90deg, rgba(7, 17, 31, 0.35) 1px, transparent 1px);
  background-size: 96px 96px;
  mask-image: linear-gradient(180deg, transparent 0%, black 18%, black 72%, transparent 100%);
}

.feature-card {
  transform-style: preserve-3d;
  transition:
    transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 0.45s ease,
    border-color 0.45s ease;
}

.feature-card:hover {
  transform: perspective(1300px) rotateX(2deg) rotateY(-2deg) translateY(-10px);
  border-color: rgba(10, 35, 149, 0.22);
  box-shadow: 0 42px 100px rgba(3, 11, 47, 0.14);
}

.scan-line {
  animation: scanLine 2.5s ease-in-out infinite;
}

@keyframes scanLine {
  0% {
    transform: translateY(0);
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  100% {
    transform: translateY(390px);
    opacity: 0;
  }
}

@media (max-width: 640px) {
  .feature-card {
    min-height: 340px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .feature-card,
  .scan-line {
    animation: none;
    transition: none;
  }

  .feature-card:hover {
    transform: none;
  }
}
</style>
<template>
  <main class="min-h-screen bg-[#F3F3F3]">
    <div class="mx-auto w-full max-w-[1200px] px-6 py-10">
      <!-- Header -->
      <header class="flex flex-col items-center text-center">
        <div class="flex items-center gap-3">
          <img src="../assets/logo.png" alt="NCRMS" class="h-10 w-10 object-contain" />

          <div class="text-left">
            <div class="text-[14px] font-semibold text-black">NCRMS</div>
            <div class="text-[12px] text-black/60">
              National Criminal Record Management System
            </div>
          </div>
        </div>

        <h1 class="mt-10 text-[24px] font-extrabold tracking-tight text-black">
          Select Your Role
        </h1>
      </header>

      <!-- Roles Grid -->
      <section class="mt-10">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            v-for="role in roles"
            :key="role.key"
            class="rounded-2xl border border-black/10 bg-white shadow-sm"
          >
            <div class="px-6 py-8">
              <div class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-black/5">
                <component :is="role.icon" class="h-5 w-5 text-black/70" />
              </div>

              <div class="mt-5 text-center">
                <div class="text-[14px] font-semibold text-black">
                  {{ role.title }}
                </div>

                <div v-if="role.subtitle" class="mt-1 text-[12px] text-black/60">
                  {{ role.subtitle }}
                </div>

                <p class="mx-auto mt-4 max-w-[240px] text-[12px] leading-5 text-black/60">
                  {{ role.description }}
                </p>
              </div>

              <div class="mt-6 flex justify-center">
                <button
                  type="button"
                  @click="handleAccess(role)"
                  :class="role.variant === 'neutral'
                    ? 'rounded-md border border-black/15 bg-white px-6 py-2 text-[12px] font-medium text-black/70 transition hover:bg-black/5'
                    : 'rounded-md bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)] px-6 py-2 text-[12px] font-semibold text-white shadow-sm transition hover:opacity-95 active:opacity-90'"
                >
                  {{ role.variant === 'neutral' ? 'Get Support' : 'Access Portal' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Security Notice -->
      <section class="mt-12">
        <div class="flex items-start gap-3 rounded-xl border border-black/10 bg-white px-5 py-4 shadow-sm">
          <div class="mt-[2px] grid h-9 w-9 place-items-center rounded-lg bg-black/5">
            <ShieldCheck class="h-5 w-5 text-black/70" />
          </div>

          <div>
            <div class="text-[13px] font-semibold text-black">Security Notice</div>
            <p class="mt-1 text-[12px] leading-5 text-black/60">
              This system contains sensitive criminal record information. Unauthorized access is
              prohibited and monitored. All activities are logged and audited for security compliance.
            </p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";
import {
  UserCog,
  Globe,
  BadgeCheck,
  Users,
  User,
  HelpCircle,
  ShieldCheck,
  Building2,
} from "lucide-vue-next";

const router = useRouter();

/**
 * IMPORTANT:
 * route is the single source of truth for where "Access Portal" goes.
 * Each role has its own login page (same design, different role title).
 */
const roles = [
  {
    key: "system_admin",
    icon: UserCog,
    title: "System Administrator",
    subtitle: "IT Audit",
    description:
      "Full system routes, user management, audit trails, and technical administration.",
    variant: "primary",
    route: "/login/system-admin",
  },
  {
    key: "headquarters",
    icon: Building2,
    title: "Headquarters",
    subtitle: "National Oversight",
    description:
      "National oversight, system management, and inter-agency coordination.",
    variant: "primary",
    route: "/login/headquarters",
  },
  {
    key: "zonal_coordinator",
    icon: Globe,
    title: "Zonal Coordinator",
    subtitle: "Inspector General",
    description:
      "Regional oversight, policy implementation, and multi state coordination.",
    variant: "primary",
    route: "/login/zonal-coordinator",
  },
  {
    key: "state_commissioner",
    icon: BadgeCheck,
    title: "State Command",
    subtitle: "State Level Authority",
    description:
      "State wide criminal record oversight, policy decisions, and strategic planning.",
    variant: "primary",
    route: "/login/state-commissioner",
  },
  {
    key: "supervisor",
    icon: Users,
    title: "Divisional Coordinator",
    subtitle: "Operational Management",
    description:
      "Team supervision, record validation, and operational oversight responsibilities.",
    variant: "primary",
    route: "/login/supervisor",
  },
  {
    key: "officer",
    icon: User,
    title: "Officer",
    subtitle: "Field Operations",
    description:
      "Record entry, data verification, and day to day operational activities.",
    variant: "primary",
    route: "/login/officer",
  },
  {
    key: "support",
    icon: HelpCircle,
    title: "Need Help?",
    subtitle: "",
    description: "Contact system administrator or refer to user documentation.",
    variant: "neutral",
    route: "/support",
  },
];

function handleAccess(role) {
  router.push(role.route);
}
</script>

<!-- src/pages/roles/headquarters/layout/Sidenav.vue -->
<template>
  <aside class="relative flex h-screen w-[260px] flex-col border-r border-[#0A2395]/10 bg-white">
    <!-- subtle brand glow -->
    <div
      class="pointer-events-none absolute inset-0 opacity-100"
      style="
        background:
          radial-gradient(circle at 10% 10%, rgba(10,35,149,0.10), transparent 45%),
          radial-gradient(circle at 90% 0%, rgba(3,11,47,0.06), transparent 55%);
      "
    />

    <!-- Brand -->
    <div class="relative flex items-start gap-3 px-6 py-6">
      <img :src="logo" alt="NCRMS" class="h-10 w-10 object-contain" />
      <div class="leading-tight">
        <div class="text-[14px] font-semibold text-black">NCRMS</div>
        <div class="text-[12px] text-black/40">Headquarters</div>
        <div class="text-[12px] text-black/40">Portal</div>
      </div>
    </div>

    <div class="relative mx-6 border-b border-[#0A2395]/10" />

    <!-- Nav -->
    <nav class="relative flex-1 px-4 py-5">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="group relative flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-medium transition"
        :class="isActive(item.to)
          ? 'bg-[#EEF2FF] text-black shadow-[0_10px_28px_rgba(3,11,47,0.06)]'
          : 'text-black/55 hover:bg-black/5 hover:text-black'"
        @click="emit('navigate')"
      >
        <!-- Left active indicator -->
        <span
          v-if="isActive(item.to)"
          class="absolute left-0 top-1/2 h-6 w-[4px] -translate-y-1/2 rounded-r-full
                 bg-[linear-gradient(180deg,#0A2395,#030B2F)]"
        />

        <component
          :is="item.icon"
          class="h-5 w-5"
          :class="isActive(item.to) ? 'text-[#0A2395]' : 'text-black/45 group-hover:text-black/70'"
        />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="h-6" />
  </aside>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import {
  LayoutGrid,
  User,
  Users,
  Globe,
  BadgeCheck,
  MapPin,
  Users2,
  FileText,
  Folder,
  AlertTriangle,
  BarChart3,
  Fingerprint,
} from "lucide-vue-next";

import logo from "../../../../assets/logo.png";

const emit = defineEmits(["navigate"]);

const route = useRoute();
const path = computed(() => route.path);

const navItems = [
  { label: "Dashboard", to: "/headquarters/dashboard", icon: LayoutGrid },
  { label: "Profile", to: "/headquarters/profile", icon: User },
  { label: "Zonal Coordinators", to: "/headquarters/zonal-coordinators", icon: Users },
  { label: "Zones", to: "/headquarters/zones", icon: Globe },
  { label: "HQ Officers", to: "/headquarters/hq-officers", icon: BadgeCheck },
  { label: "Divisions & Locations", to: "/headquarters/divisions-locations", icon: MapPin },
  { label: "Staff Directory", to: "/headquarters/staff-directory", icon: Users2 },
  { label: "Reports", to: "/headquarters/reports", icon: FileText },
  { label: "Criminal Records", to: "/headquarters/criminal-records", icon: Folder },
  { label: "Incident Reports", to: "/headquarters/incident-reports", icon: AlertTriangle },
  { label: "Crime Analytics", to: "/headquarters/crime-analytics", icon: BarChart3 },
  { label: "Forensic Evidence", to: "/headquarters/forensic-evidence", icon: Fingerprint },
];

function isActive(to) {
  return path.value === to || path.value.startsWith(to + "/");
}
</script>

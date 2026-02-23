<!-- src/pages/roles/zonalcoordinator/layout/Sidenav.vue -->
<template>
  <aside class="flex h-screen w-[260px] flex-col border-r border-black/10 bg-white">
    <!-- Brand -->
    <div class="flex items-start gap-3 px-6 py-6">
      <img :src="logo" alt="NCRMS" class="h-10 w-10 object-contain" />
      <div class="leading-tight">
        <div class="text-[14px] font-semibold text-black">NCRMS</div>
        <div class="text-[12px] text-black/40">Zonal Coordinator</div>
        <div class="text-[12px] text-black/40">Portal</div>
      </div>
    </div>

    <div class="mx-6 border-b border-black/10" />

    <!-- Nav -->
    <nav class="flex-1 px-4 py-5">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="group relative flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-medium transition"
        :class="isActive(item.to)
          ? 'bg-[#EAF0FF] text-black'
          : 'text-black/55 hover:bg-black/5 hover:text-black'"
        @click="emit('navigate')"
      >
        <!-- Left active indicator -->
        <span
          v-if="isActive(item.to)"
          class="absolute left-0 top-1/2 h-6 w-[4px] -translate-y-1/2 rounded-r-full bg-[#0A2395]"
        />

        <component
          :is="item.icon"
          class="h-5 w-5"
          :class="isActive(item.to) ? 'text-[#0A2395]' : 'text-black/45 group-hover:text-black/70'"
        />
        <span class="truncate">{{ item.label }}</span>
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
  Building2,
  Users,
  UsersRound,
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

/**
 * Matches the screenshot (Zonal Coordinator portal):
 * Dashboard, Profile, State Commands, Commissioners, Zonal Officers,
 * Divisions & Locations, Staff Directory, Reports, Criminal Records,
 * Incident Reports, Crime Analytics, Forensic Evidence
 */
const navItems = [
  { label: "Dashboard", to: "/zonal-coordinator/dashboard", icon: LayoutGrid },
  { label: "Profile", to: "/zonal-coordinator/profile", icon: User },
  { label: "State Commands", to: "/zonal-coordinator/state-commands", icon: Building2 },
  { label: "Commissioners", to: "/zonal-coordinator/commissioners", icon: Users },
  { label: "Zonal Officers", to: "/zonal-coordinator/zonal-officers", icon: UsersRound },
  { label: "Divisions & Locations", to: "/zonal-coordinator/divisions-locations", icon: MapPin },
  { label: "Staff Directory", to: "/zonal-coordinator/staff-directory", icon: Users2 },
  { label: "Reports", to: "/zonal-coordinator/reports", icon: FileText },
  { label: "Criminal Records", to: "/zonal-coordinator/criminal-records", icon: Folder },
  { label: "Incident Reports", to: "/zonal-coordinator/incident-reports", icon: AlertTriangle },
  { label: "Crime Analytics", to: "/zonal-coordinator/crime-analytics", icon: BarChart3 },
  { label: "Forensic Evidence", to: "/zonal-coordinator/forensic-evidence", icon: Fingerprint },
];

function isActive(to) {
  return path.value === to || path.value.startsWith(to + "/");
}
</script>

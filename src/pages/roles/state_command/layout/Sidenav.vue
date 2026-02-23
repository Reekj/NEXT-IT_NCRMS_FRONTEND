<template>
  <aside
    class="sticky top-0 h-screen w-[270px] shrink-0 border-r border-black/10 bg-white"
  >
    <!-- Brand -->
    <div class="px-6 pt-6">
      <div class="flex items-start gap-3">
        <!-- Replace with your real logo component/img if you have one -->
        <div class="h-10 w-10 overflow-hidden rounded-xl">
          <img
            src="../../../../assets/logo.png"
            alt="NCRMS"
            class="h-full w-full object-contain"
            @error="onImgError"
          />
        </div>

        <div class="leading-tight">
          <div class="text-[16px] font-semibold text-[#111827]">NCRMS</div>
          <div class="mt-0.5 text-[12px] text-[#667085]">State Command Portal</div>
        </div>
      </div>

      <div class="mt-5 border-b border-black/10"></div>
    </div>

    <!-- Nav -->
    <nav class="px-4 py-5">
      <RouterLink
        v-for="item in nav"
        :key="item.label"
        :to="item.to"
        class="group relative mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] font-medium text-[#667085]
               transition hover:bg-[#F2F6FF] hover:text-[#0A2395]"
        :class="isActive(item.to) ? 'bg-[#EDF3FF] text-[#0A2395]' : ''"
      >
        <!-- Left active indicator -->
        <span
          v-if="isActive(item.to)"
          class="absolute left-0 top-1/2 h-6 w-[5px] -translate-y-1/2 rounded-r-full bg-[#0A2395]"
        />

        <component
          :is="item.icon"
          class="h-[18px] w-[18px]"
          :class="isActive(item.to) ? 'text-[#0A2395]' : 'text-[#98A2B3] group-hover:text-[#0A2395]'"
        />
        <span class="truncate">{{ item.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import {
  LayoutGrid,
  User,
  Building2,
  Users2,
  MapPin,
  Contact,
  FileBarChart2,
  UserCog,
  FolderOpen,
  ClipboardList,
  LineChart,
  Fingerprint,
} from "lucide-vue-next"

const route = useRoute()

// Adjust paths if your state command URLs differ — keep the labels/order as screenshot.
const nav = computed(() => [
  { label: "Dashboard", to: "/state-command/dashboard", icon: LayoutGrid },
  { label: "Profile", to: "/state-command/profile", icon: User },
  { label: "Divisions", to: "/state-command/divisions", icon: Building2 },
  { label: "Divisional Coordinator", to: "/state-command/divisional-coordinators", icon: Users2 },
  { label: "Divisions & Locations", to: "/state-command/divisions-locations", icon: MapPin },
  { label: "Staff Directory", to: "/state-command/staff-directory", icon: Contact },
  { label: "Reports", to: "/state-command/reports", icon: FileBarChart2 },
  { label: "Officers", to: "/state-command/officers", icon: UserCog },
  { label: "Criminal Records", to: "/state-command/criminal-records", icon: FolderOpen },
  { label: "Incident Reports", to: "/state-command/incident-reports", icon: ClipboardList },
  { label: "Crime Analytics", to: "/state-command/crime-analytics", icon: LineChart },
  { label: "Forensic Evidence", to: "/state-command/forensic-evidence", icon: Fingerprint },
])

function isActive(path) {
  // exact match OR nested routes under that path
  return route.path === path || route.path.startsWith(path + "/")
}

function onImgError(e) {
  // avoid broken image icon — keeps layout stable
  e.target.style.display = "none"
}
</script>

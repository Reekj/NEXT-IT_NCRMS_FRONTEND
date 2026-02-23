<template>
    <aside class="w-[260px] border-r border-black/10 bg-white">
      <div class="px-6 py-6">
        <div class="flex items-center gap-3">
          <img
            src="../../../../assets/logo.png"
            alt="NCRMS"
            class="h-10 w-10 object-contain"
            @error="onLogoError"
          />
          <div class="leading-tight">
            <div class="text-[16px] font-semibold text-black">NCRMS</div>
            <div class="text-[12px] text-black/50">Divisional Coordinator Portal</div>
          </div>
        </div>
      </div>
  
      <nav class="px-3 pb-8">
        <RouterLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="group flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] font-medium transition"
          :class="isActive(item.to)
            ? 'bg-[#EEF4FF] text-[#0A2395]'
            : 'text-black/60 hover:bg-black/5 hover:text-black/80'"
        >
          <component
            :is="item.icon"
            class="h-5 w-5"
            :class="isActive(item.to) ? 'text-[#0A2395]' : 'text-black/40 group-hover:text-black/60'"
          />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
    </aside>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  import {
    LayoutGrid,
    User,
    Building2,
    Users,
    BookUser,
    BarChart3,
    FileText,
    FolderSearch,
    ClipboardList,
    Fingerprint,
  } from "lucide-vue-next";
  
  const route = useRoute();
  
  function onLogoError(e) {
    // prevents broken image icon; keeps layout stable
    if (e?.target) e.target.style.display = "none";
  }
  
  const nav = computed(() => [
    { label: "Dashboard", to: "/divisional-coordinator/dashboard", icon: LayoutGrid },
    { label: "Profile", to: "/divisional-coordinator/profile", icon: User },
    { label: "Division Units", to: "/divisional-coordinator/division-units", icon: Building2 },
    { label: "Division Officers", to: "/divisional-coordinator/division-officers", icon: Users },
    { label: "Staff Directory", to: "/divisional-coordinator/staff-directory", icon: BookUser },
    { label: "Reports", to: "/divisional-coordinator/reports", icon: FileText },
    { label: "Criminal Records", to: "/divisional-coordinator/criminal-records", icon: FolderSearch },
    { label: "Incident Reports", to: "/divisional-coordinator/incident-reports", icon: ClipboardList },
    { label: "Crime Analytics", to: "/divisional-coordinator/crime-analytics", icon: BarChart3 },
    { label: "Forensic Evidence", to: "/divisional-coordinator/forensic-evidence", icon: Fingerprint },
  ]);
  
  function isActive(path) {
    return route.path === path;
  }
  </script>
  
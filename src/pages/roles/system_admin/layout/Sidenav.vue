<template>
    <aside class="flex h-screen w-[260px] flex-col border-r border-black/10 bg-white">
      <!-- Brand -->
      <div class="flex items-start gap-3 px-6 py-6">
        <img :src="logo" alt="NCRMS" class="h-10 w-10 object-contain" />
        <div class="leading-tight">
          <div class="text-[14px] font-semibold text-black">NCRMS</div>
          <div class="text-[12px] text-black/40">Admin Portal</div>
        </div>
      </div>
  
      <div class="mx-6 border-b border-black/10" />
  
      <!-- Nav -->
      <nav class="flex-1 px-4 py-5">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-medium transition"
          :class="isActive(item.to)
            ? 'bg-black/5 text-black'
            : 'text-black/50 hover:bg-black/5 hover:text-black'"
        >
          <component :is="item.icon" class="h-5 w-5" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
  
      <div class="h-6" />
    </aside>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { RouterLink, useRoute } from "vue-router";
  import { LayoutGrid, User, Users, FileText } from "lucide-vue-next";
  
  import logo from "../../../../assets/logo.png";
  
  const route = useRoute();
  const path = computed(() => route.path);
  
  const navItems = [
    { label: "Dashboard", to: "/system-admin/dashboard", icon: LayoutGrid },
    { label: "Profile", to: "/system-admin/profile", icon: User },
    { label: "Zonal Admins", to: "/system-admin/zonal-admins", icon: Users },
    { label: "Reports", to: "/system-admin/reports", icon: FileText },
  ];
  
  function isActive(to) {
    return path.value === to || path.value.startsWith(to + "/");
  }
  </script>
  
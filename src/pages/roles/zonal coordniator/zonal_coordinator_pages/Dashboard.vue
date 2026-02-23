<!-- src/pages/roles/zonalcoordinator/zonalcoordinator_pages/Dashboard.vue -->
<template>
    <ZonalCoordinatorLayout :user="user">
      <Motion
        tag="div"
        class="space-y-6"
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35, easing: 'ease-out' }"
      >
        <!-- Region -->
        <div class="text-[16px] font-semibold text-black/80">{{ region }}</div>
  
        <!-- Title -->
        <div class="flex items-center justify-between gap-4">
          <h1 class="text-[22px] font-semibold tracking-tight text-black">Dashboard</h1>
        </div>
  
        <!-- Summary cards -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Motion
            v-for="card in summaryCards"
            :key="card.key"
            tag="div"
            class="rounded-2xl border border-black/10 bg-white shadow-sm"
            :initial="{ opacity: 0, y: 10, scale: 0.99 }"
            :animate="{ opacity: 1, y: 0, scale: 1 }"
            :whileHover="{ y: -2 }"
            :transition="{ duration: 0.18, easing: 'ease-out' }"
          >
            <div class="flex items-start justify-between gap-3 p-5">
              <div class="flex items-start gap-4">
                <div
                  class="grid h-11 w-11 place-items-center rounded-xl border"
                  :class="card.iconBoxClass"
                >
                  <component :is="card.icon" class="h-5 w-5" :class="card.iconClass" />
                </div>
  
                <div class="min-w-0">
                  <div class="text-[13px] font-medium text-black/50">{{ card.label }}</div>
                  <div class="mt-1 text-[22px] font-semibold text-black/90">
                    {{ card.value }}
                  </div>
                </div>
              </div>
  
              <button
                type="button"
                class="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white text-black/50
                       hover:bg-black/[0.03] hover:text-black/70 active:scale-[0.98]"
                :aria-label="`Open ${card.label}`"
              >
                <ArrowUpRight class="h-4 w-4" />
              </button>
            </div>
  
            <div class="border-t border-black/10 px-5 py-3">
              <div
                class="text-[12px] font-semibold"
                :class="card.metaClass"
              >
                <span v-if="card.metaIcon" class="mr-1 align-[-2px] inline-block">
                  <component :is="card.metaIcon" class="h-4 w-4" />
                </span>
                {{ card.meta }}
              </div>
            </div>
          </Motion>
        </div>
  
        <!-- National Crime Distribution -->
        <Motion
          tag="section"
          class="rounded-2xl border border-black/10 bg-white shadow-sm"
          :initial="{ opacity: 0, y: 10 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.25, easing: 'ease-out' }"
        >
          <div class="px-5 pt-5 sm:px-7">
            <div class="text-[18px] font-semibold text-black">National Crime Distribution</div>
          </div>
  
          <!-- Chart shell -->
          <div class="px-5 pb-6 pt-4 sm:px-7">
            <div class="rounded-2xl border border-black/10 bg-white shadow-[0_8px_18px_rgba(0,0,0,0.06)] overflow-hidden">
              <!-- Mini tab (Bar) -->
              <div class="px-5 pt-4">
                <div class="inline-flex items-center gap-2">
                  <button
                    type="button"
                    class="text-[13px] font-semibold text-black"
                  >
                    Bar
                  </button>
                </div>
                <div class="mt-2 h-[2px] w-8 rounded-full bg-[#0A2395]" />
              </div>
  
              <!-- Plot area -->
              <div class="px-4 pb-6 pt-2 sm:px-6">
                <div class="rounded-xl border border-black/10 bg-white">
                  <!-- grid background -->
                  <div class="relative h-[280px] w-full overflow-hidden rounded-xl p-4 sm:h-[320px]">
                    <!-- y grid lines -->
                    <div class="absolute inset-0">
                      <div
                        v-for="n in 5"
                        :key="n"
                        class="absolute left-0 right-0 border-t border-dashed border-black/10"
                        :style="{ top: `${(n - 1) * 25}%` }"
                      />
                    </div>
  
                    <!-- bars -->
                    <div class="relative z-10 flex h-full items-end gap-2 sm:gap-3">
                      <button
                        v-for="bar in bars"
                        :key="bar.label"
                        type="button"
                        class="group relative flex h-full flex-1 flex-col items-center justify-end outline-none"
                        @mouseenter="hoveredBar = bar"
                        @mouseleave="hoveredBar = null"
                        @focus="hoveredBar = bar"
                        @blur="hoveredBar = null"
                      >
                        <div
                          class="w-full rounded-md bg-[#3B5BFF]/90 transition
                                 group-hover:bg-[#2F4CFF] group-focus-visible:ring-4 group-focus-visible:ring-black/10"
                          :style="{ height: `${bar.pct}%` }"
                        />
  
                        <div class="mt-3 w-full truncate text-center text-[11px] font-medium text-black/45 sm:text-[12px]">
                          {{ bar.label }}
                        </div>
  
                        <!-- tooltip -->
                        <div
                          v-if="hoveredBar?.label === bar.label"
                          class="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full
                                 rounded-lg border border-black/10 bg-white px-3 py-2 text-[12px] font-semibold text-black shadow-lg"
                        >
                          {{ bar.label }}: {{ bar.value }}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Motion>
  
        <!-- System Audit Report -->
        <Motion
          tag="section"
          class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden"
          :initial="{ opacity: 0, y: 10 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.25, easing: 'ease-out' }"
        >
          <div class="flex flex-col gap-4 border-b border-black/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div class="text-[18px] font-semibold text-black">System Audit Report</div>
  
            <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <div class="relative w-full sm:w-[280px]">
                <Search class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/35 sm:h-4 sm:w-4" />
                <input
                  v-model.trim="auditSearch"
                  type="text"
                  placeholder="Search ..."
                  class="h-11 w-full rounded-xl border border-black/10 bg-white pl-11 pr-3 text-[14px]
                         text-black/70 outline-none placeholder:text-black/35
                         focus:border-black/20 focus:ring-4 focus:ring-black/5 sm:h-10 sm:rounded-lg sm:text-[13px]"
                />
              </div>
  
              <Motion
                tag="button"
                type="button"
                class="grid h-11 w-full place-items-center rounded-xl border border-black/10 bg-white text-black/55
                       transition hover:bg-black/5 sm:h-10 sm:w-10 sm:rounded-lg"
                aria-label="Refresh"
                @click="refreshAudit"
                :whileHover="{ scale: 1.03 }"
                :whileTap="{ scale: 0.96 }"
                :transition="{ duration: 0.14 }"
              >
                <RotateCw class="h-5 w-5 sm:h-4 sm:w-4" />
              </Motion>
            </div>
          </div>
  
          <!-- MOBILE: cards -->
          <div class="sm:hidden p-5 space-y-4">
            <Motion
              v-for="row in filteredAudit"
              :key="row.id"
              tag="div"
              class="rounded-2xl border border-black/10 bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.03)]"
              :initial="{ opacity: 0, y: 10 }"
              :animate="{ opacity: 1, y: 0 }"
              :whileHover="{ y: -2 }"
              :transition="{ duration: 0.18, easing: 'ease-out' }"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="text-[13px] font-semibold text-black/80">{{ row.incidentId }}</div>
                  <div class="mt-1 text-[14px] font-semibold text-black">{{ row.crimeType }}</div>
                  <div class="mt-1 text-[13px] text-black/60">{{ row.zone }}</div>
                </div>
                <div class="text-right">
                  <div class="text-[12px] font-medium text-black/45">Status</div>
                  <div class="mt-1 text-[13px] font-semibold text-black/80">{{ row.status }}</div>
                </div>
              </div>
  
              <div class="mt-4 grid grid-cols-2 gap-3 text-[13px]">
                <div class="rounded-xl border border-black/10 bg-black/[0.02] p-3">
                  <div class="text-black/45 text-[12px] font-medium">Date</div>
                  <div class="mt-1 font-semibold text-black/80">{{ row.date }}</div>
                </div>
                <div class="rounded-xl border border-black/10 bg-black/[0.02] p-3">
                  <div class="text-black/45 text-[12px] font-medium">Incident ID</div>
                  <div class="mt-1 font-semibold text-black/80">{{ row.incidentId }}</div>
                </div>
              </div>
            </Motion>
  
            <div v-if="filteredAudit.length === 0" class="py-10 text-center">
              <div class="text-[14px] font-semibold text-black">No records found.</div>
              <div class="mt-2 text-[13px] text-black/60">Try a different search.</div>
            </div>
          </div>
  
          <!-- DESKTOP/TABLET: table with VERTICAL COLUMN LINES -->
          <div class="hidden sm:block">
            <div class="overflow-x-auto">
              <table class="min-w-[900px] w-full border-collapse">
                <thead>
                  <tr class="bg-white">
                    <th class="thCell">Incident ID</th>
                    <th class="thCell">Zone</th>
                    <th class="thCell">Crime Type</th>
                    <th class="thCell">Date</th>
                    <th class="thCell thCell--last">Status</th>
                  </tr>
                </thead>
  
                <Motion
                  tag="tbody"
                  :initial="{ opacity: 0 }"
                  :animate="{ opacity: 1 }"
                  :transition="{ staggerChildren: 0.04 }"
                >
                  <Motion
                    v-for="row in filteredAudit"
                    :key="row.id"
                    tag="tr"
                    class="hover:bg-black/[0.01]"
                    :initial="{ opacity: 0, y: 6 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :whileHover="{ y: -1 }"
                    :transition="{ duration: 0.16, easing: 'ease-out' }"
                  >
                    <td class="tdCell font-semibold text-black/80">{{ row.incidentId }}</td>
                    <td class="tdCell">{{ row.zone }}</td>
                    <td class="tdCell">{{ row.crimeType }}</td>
                    <td class="tdCell">{{ row.date }}</td>
                    <td class="tdCell tdCell--last">{{ row.status }}</td>
                  </Motion>
  
                  <tr v-if="filteredAudit.length === 0">
                    <td class="tdCell tdCell--last text-center text-black/50" colspan="5">
                      No records found.
                    </td>
                  </tr>
                </Motion>
              </table>
            </div>
          </div>
        </Motion>
      </Motion>
    </ZonalCoordinatorLayout>
  </template>
  
  <script setup>
  import { computed, ref } from "vue";
  import { Motion } from "@motionone/vue";
  import ZonalCoordinatorLayout from "../layout/Layout.vue";
  import {
    FileText,
    AlertTriangle,
    Building2,
    Briefcase,
    ArrowUpRight,
    TrendingUp,
    Plus,
    BadgeCheck,
    Search,
    RotateCw,
  } from "lucide-vue-next";
  
  const user = {
    name: "John John",
    role: "Zonal Coordinator",
    avatarUrl: "",
  };
  
  const region = "South-West";
  
  /** Summary cards (hardcoded to match screenshot) */
  const summaryCards = [
    {
      key: "criminal",
      label: "Total Criminal Record",
      value: "2,000,000",
      icon: FileText,
      iconBoxClass: "border-blue-200 bg-blue-50",
      iconClass: "text-blue-600",
      meta: "10.5% from last month",
      metaClass: "text-green-700",
      metaIcon: TrendingUp,
    },
    {
      key: "incident",
      label: "Total Incident Report",
      value: "30",
      icon: AlertTriangle,
      iconBoxClass: "border-red-200 bg-red-50",
      iconClass: "text-red-600",
      meta: "+3 new zones",
      metaClass: "text-green-700",
      metaIcon: Plus,
    },
    {
      key: "state",
      label: "Total State Commands",
      value: "14",
      icon: Building2,
      iconBoxClass: "border-green-200 bg-green-50",
      iconClass: "text-green-700",
      meta: "Excellent",
      metaClass: "text-green-700",
      metaIcon: BadgeCheck,
    },
    {
      key: "active",
      label: "Active Cases",
      value: "25",
      icon: Briefcase,
      iconBoxClass: "border-purple-200 bg-purple-50",
      iconClass: "text-purple-700",
      meta: "5 critical",
      metaClass: "text-red-600",
      metaIcon: null,
    },
  ];
  
  /** Bar chart (hardcoded categories/values to match screenshot proportions) */
  const rawBars = [
    { label: "Theft", value: 35 },
    { label: "Assault", value: 10 },
    { label: "Fraud", value: 55 },
    { label: "Cybercrime", value: 10 },
    { label: "Drug Abuse", value: 30 },
    { label: "Homicide", value: 90 },
    { label: "Kidnapping", value: 15 },
    { label: "Domestic Violence", value: 92 },
    { label: "Bribery", value: 45 },
    { label: "Others", value: 78 },
  ];
  
  const maxBar = Math.max(...rawBars.map((b) => b.value));
  const bars = computed(() =>
    rawBars.map((b) => ({
      ...b,
      pct: Math.round((b.value / maxBar) * 100),
    }))
  );
  
  const hoveredBar = ref(null);
  
  /** Audit table (hardcoded to screenshot) */
  const auditSearch = ref("");
  
  const auditRows = ref([
    { id: "1", incidentId: "NCRMS-001", zone: "Zone 1", crimeType: "Theft", date: "1/28/2026", status: "Open" },
    { id: "2", incidentId: "NCRMS-002", zone: "Zone 2", crimeType: "Assault", date: "1/28/2026", status: "Closed" },
    { id: "3", incidentId: "NCRMS-003", zone: "Zone 3", crimeType: "Fraud", date: "1/28/2026", status: "Under Investigation" },
    { id: "4", incidentId: "NCRMS-004", zone: "Zone 4", crimeType: "Cybercrime", date: "1/28/2026", status: "Closed" },
    { id: "5", incidentId: "NCRMS-005", zone: "Zone 5", crimeType: "Drug Abuse", date: "1/28/2026", status: "Pending" },
  ]);
  
  const filteredAudit = computed(() => {
    const q = String(auditSearch.value || "").trim().toLowerCase();
    if (!q) return auditRows.value;
  
    return auditRows.value.filter((r) => {
      const hay = `${r.incidentId} ${r.zone} ${r.crimeType} ${r.date} ${r.status}`.toLowerCase();
      return hay.includes(q);
    });
  });
  
  function refreshAudit() {
    // UI-only refresh (keeps interaction like screenshot)
    // you can replace with real fetch later
    auditRows.value = [...auditRows.value];
  }
  </script>
  
  <style scoped>
  /* Table borders MUST show vertical lines (Figma-like) */
  .thCell {
    height: 58px;
    text-align: left;
    padding: 0 18px;
    font-size: 13px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.55);
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    background: rgba(0, 0, 0, 0.02);
  }
  
  .thCell--last {
    border-right: none;
  }
  
  .tdCell {
    height: 64px;
    padding: 0 18px;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.72);
    border-bottom: 1px solid rgba(0, 0, 0, 0.10);
    border-right: 1px solid rgba(0, 0, 0, 0.10);
    vertical-align: middle;
    background: #fff;
  }
  
  .tdCell--last {
    border-right: none;
  }
  </style>
  
<!-- src/pages/roles/divisional_coordinator/divisional_coordinator_pages/Dashboard.vue -->
<template>
    <DivisionalCoordinatorLayout :user="user" headerTitle="Surulere Division">
      <div class="space-y-10">
        <!-- Title -->
        <div>
          <h1 class="text-[22px] font-semibold text-black">Dashboard</h1>
        </div>
  
        <!-- Summary Cards -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <Motion
            v-for="c in cards"
            :key="c.key"
            tag="div"
            class="rounded-2xl border border-black/10 bg-white shadow-sm"
            :initial="{ opacity: 0, y: 10 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.25 }"
          >
            <div class="p-5">
              <div class="flex items-start justify-between gap-4">
                <div class="grid h-11 w-11 place-items-center rounded-xl border" :class="c.iconBoxClass">
                  <component :is="c.icon" class="h-5 w-5" :class="c.iconClass" />
                </div>
  
                <div
                  class="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white text-black/40"
                  aria-hidden="true"
                >
                  ↗
                </div>
              </div>
  
              <div class="mt-4 text-[13px] font-medium text-black/45">
                {{ c.label }}
              </div>
  
              <div class="mt-1 text-[22px] font-semibold text-black">
                {{ c.value }}
              </div>
            </div>
  
            <div class="border-t border-black/10 px-5 py-3">
              <div class="text-[12px] font-semibold" :class="c.metaClass">
                <span v-if="c.metaIcon" class="mr-1 align-[-2px] inline-block">
                  <component :is="c.metaIcon" class="h-4 w-4" />
                </span>
                {{ c.meta }}
              </div>
            </div>
          </Motion>
        </div>
  
        <!-- National Crime Distribution -->
        <section class="rounded-2xl border border-black/10 bg-white shadow-sm">
          <div class="px-6 pt-6 sm:px-8">
            <div class="text-[18px] font-semibold text-black">National Crime Distribution</div>
          </div>
  
          <div class="px-6 pb-7 pt-5 sm:px-8 sm:pb-10">
            <div class="rounded-2xl border border-black/10 bg-white shadow-[0_10px_22px_rgba(16,24,40,0.12)] overflow-hidden">
              <!-- Tab -->
              <div class="px-6 pt-5">
                <div class="text-[13px] font-semibold text-black">Bar</div>
                <div class="mt-2 h-[2px] w-8 rounded-full bg-[#0A2395]" />
              </div>
  
              <!-- Plot -->
              <div class="px-4 pb-7 pt-4 sm:px-6">
                <div class="rounded-xl border border-black/10 bg-white">
                  <div class="relative h-[320px] overflow-hidden rounded-xl p-4 sm:p-5">
                    <!-- Grid (matches the dotted grid look) -->
                    <div class="pointer-events-none absolute inset-0">
                      <!-- horizontal dotted -->
                      <div class="absolute inset-0 bg-grid-plot" />
                    </div>
  
                    <!-- y-axis labels -->
                    <div class="absolute left-4 top-5 bottom-12 w-8 text-[11px] text-black/40">
                      <div class="relative h-full">
                        <div class="absolute left-0 top-0">100</div>
                        <div class="absolute left-0 top-1/4 -translate-y-1/2">80</div>
                        <div class="absolute left-0 top-2/4 -translate-y-1/2">60</div>
                        <div class="absolute left-0 top-3/4 -translate-y-1/2">40</div>
                        <div class="absolute left-0 bottom-0">0</div>
                      </div>
                    </div>
  
                    <!-- bars area -->
                    <div class="relative z-10 ml-10 h-full">
                      <div class="flex h-[calc(100%-44px)] items-end gap-4">
                        <div
                          v-for="b in bars"
                          :key="b.label"
                          class="flex min-w-0 flex-1 flex-col items-center justify-end"
                        >
                          <div
                            class="w-full rounded-none bg-[#3B5BFF]/85"
                            :style="{ height: `${b.pct}%` }"
                          />
                          <div class="mt-3 w-full truncate text-center text-[11px] text-black/55">
                            {{ b.label }}
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <!-- x-axis baseline -->
                    <div class="pointer-events-none absolute left-4 right-4 bottom-12 h-px bg-black/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <!-- System Audit Report -->
        <section class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
          <div class="flex items-center justify-between gap-4 border-b border-black/10 px-6 py-5 sm:px-8">
            <div class="text-[18px] font-semibold text-black">System Audit Report</div>
  
            <div class="flex items-center gap-3">
              <div class="relative w-[260px]">
                <Search class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />
                <input
                  v-model.trim="auditSearch"
                  type="text"
                  placeholder="Search ..."
                  class="h-10 w-full rounded-xl border border-black/10 bg-white pl-10 pr-4 text-[13px]
                         text-black/70 outline-none placeholder:text-black/35
                         focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <button
                type="button"
                class="grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-white shadow-sm hover:bg-[#F9FAFB]"
                @click="refreshAudit"
                aria-label="Refresh"
              >
                <RefreshCcw class="h-4 w-4 text-black/60" />
              </button>
            </div>
          </div>
  
          <div class="overflow-x-auto">
            <table class="w-full min-w-[860px] border-collapse text-left">
              <thead class="bg-white">
                <tr class="text-[13px] font-medium text-black/45">
                  <th class="thCell">Incident ID</th>
                  <th class="thCell">Zone</th>
                  <th class="thCell">Crime Type</th>
                  <th class="thCell">Date</th>
                  <th class="thCell thCell--last">Status</th>
                </tr>
              </thead>
  
              <tbody>
                <tr
                  v-for="r in filteredAudit"
                  :key="r.id"
                  class="text-[13px] text-black/70"
                >
                  <td class="tdCell font-semibold text-black">{{ r.incidentId }}</td>
                  <td class="tdCell">{{ r.zone }}</td>
                  <td class="tdCell font-semibold text-black/80">{{ r.crimeType }}</td>
                  <td class="tdCell">{{ r.date }}</td>
                  <td class="tdCell tdCell--last">{{ r.status }}</td>
                </tr>
  
                <tr v-if="filteredAudit.length === 0">
                  <td colspan="5" class="tdCell tdCell--last text-center text-black/45">
                    No records found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DivisionalCoordinatorLayout>
  </template>
  
  <script setup>
  import { computed, ref } from "vue"
  import { Motion } from "@motionone/vue"
  import DivisionalCoordinatorLayout from "../layout/Layout.vue"
  import {
    Search,
    RefreshCcw,
    Briefcase,
    FileText,
    AlertTriangle,
    Globe,
    TrendingUp,
    Plus,
    BadgeCheck,
  } from "lucide-vue-next"
  
  const user = ref({
    name: "Helena John",
    role: "Divisional Coordinator",
    avatarUrl: "",
  })
  
  /** Cards EXACTLY like screenshot (demo data) */
  const cards = [
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
    {
      key: "closed",
      label: "Closed Cases",
      value: "21",
      icon: FileText,
      iconBoxClass: "border-blue-200 bg-blue-50",
      iconClass: "text-blue-700",
      meta: "10.5% from last month",
      metaClass: "text-green-700",
      metaIcon: TrendingUp,
    },
    {
      key: "pending",
      label: "Pending Investigations",
      value: "30",
      icon: AlertTriangle,
      iconBoxClass: "border-red-200 bg-red-50",
      iconClass: "text-red-700",
      meta: "+3 new zones",
      metaClass: "text-green-700",
      metaIcon: Plus,
    },
    {
      key: "officers",
      label: "Divisional Officers",
      value: "14",
      icon: Globe,
      iconBoxClass: "border-green-200 bg-green-50",
      iconClass: "text-green-700",
      meta: "Excellent",
      metaClass: "text-green-700",
      metaIcon: BadgeCheck,
    },
  ]
  
  /** Chart demo bars (NOT empty) */
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
    { label: "Others", value: 80 },
  ]
  
  const maxBar = Math.max(...rawBars.map((b) => b.value))
  const bars = computed(() =>
    rawBars.map((b) => ({
      ...b,
      pct: Math.round((b.value / maxBar) * 100),
    }))
  )
  
  /** Audit demo table */
  const auditSearch = ref("")
  const auditRows = ref([
    { id: "1", incidentId: "NCRMS-001", zone: "Zone 1", crimeType: "Theft", date: "1/28/2026", status: "Open" },
    { id: "2", incidentId: "NCRMS-002", zone: "Zone 2", crimeType: "Assault", date: "1/28/2026", status: "Closed" },
    { id: "3", incidentId: "NCRMS-003", zone: "Zone 3", crimeType: "Fraud", date: "1/28/2026", status: "Under Investigation" },
    { id: "4", incidentId: "NCRMS-004", zone: "Zone 4", crimeType: "Cybercrime", date: "1/28/2026", status: "Closed" },
    { id: "5", incidentId: "NCRMS-005", zone: "Zone 5", crimeType: "Drug Abuse", date: "1/28/2026", status: "Pending" },
  ])
  
  const filteredAudit = computed(() => {
    const q = String(auditSearch.value || "").trim().toLowerCase()
    if (!q) return auditRows.value
  
    return auditRows.value.filter((r) => {
      const hay = `${r.incidentId} ${r.zone} ${r.crimeType} ${r.date} ${r.status}`.toLowerCase()
      return hay.includes(q)
    })
  })
  
  function refreshAudit() {
    auditSearch.value = ""
    auditRows.value = [...auditRows.value]
  }
  </script>
  
  <style scoped>
  /* Dotted grid like screenshot (both horizontal + vertical) */
  .bg-grid-plot {
    background-image:
      repeating-linear-gradient(
        to right,
        rgba(0, 0, 0, 0.10) 0,
        rgba(0, 0, 0, 0.10) 1px,
        transparent 1px,
        transparent 90px
      ),
      repeating-linear-gradient(
        to top,
        rgba(0, 0, 0, 0.10) 0,
        rgba(0, 0, 0, 0.10) 1px,
        transparent 1px,
        transparent 64px
      );
    opacity: 0.7;
  }
  
  /* TABLE: cell borders MUST always show */
  .thCell {
    height: 54px;
    padding: 0 18px;
    font-size: 13px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.45);
    border-bottom: 1px solid rgba(0, 0, 0, 0.10);
    border-right: 1px solid rgba(0, 0, 0, 0.10);
    background: rgba(0, 0, 0, 0.01);
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
  
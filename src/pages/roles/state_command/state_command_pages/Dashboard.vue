<template>
    <StateCommandLayout>
      <!-- Top State Label -->
      <div class="mb-6 text-[18px] font-semibold text-[#111827]">
        LAGOS
      </div>
  
      <!-- Page Title -->
      <div class="mb-6 text-[22px] font-semibold text-[#111827]">
        Dashboard
      </div>
  
      <!-- ===================== -->
      <!-- Summary Cards -->
      <!-- ===================== -->
      <div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Motion
          v-for="card in summaryCards"
          :key="card.label"
          :initial="{ opacity: 0, y: 8 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.35 }"
          class="rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
        >
          <div class="flex items-start justify-between">
            <div>
              <div class="text-[13px] text-[#667085]">
                {{ card.label }}
              </div>
              <div class="mt-2 text-[24px] font-semibold text-[#111827]">
                {{ card.value }}
              </div>
            </div>
  
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl border"
              :class="card.iconBg"
            >
              <component :is="card.icon" class="h-5 w-5" :class="card.iconColor" />
            </div>
          </div>
  
          <div
            class="mt-4 text-[12px] font-medium"
            :class="card.footerColor"
          >
            {{ card.footer }}
          </div>
        </Motion>
      </div>
  
      <!-- ===================== -->
      <!-- Crime Distribution -->
      <!-- ===================== -->
      <Motion
        :initial="{ opacity: 0, y: 8 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
        class="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
      >
        <div class="mb-6 text-[18px] font-semibold text-[#111827]">
          National Crime Distribution
        </div>
  
        <div class="overflow-x-auto">
          <canvas ref="chartRef" height="120"></canvas>
        </div>
      </Motion>
  
      <!-- ===================== -->
      <!-- System Audit Report -->
      <!-- ===================== -->
      <Motion
        :initial="{ opacity: 0, y: 8 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
        class="mt-8 rounded-2xl border border-black/10 bg-white shadow-sm"
      >
        <div class="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <div class="text-[18px] font-semibold text-[#111827]">
            System Audit Report
          </div>
  
          <div class="relative w-full max-w-[280px]">
            <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />
            <input
              v-model="search"
              type="text"
              placeholder="Search ..."
              class="h-10 w-full rounded-xl border border-black/10 bg-white pl-9 pr-3 text-[13px]
                     outline-none focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
            />
          </div>
        </div>
  
        <div class="overflow-x-auto px-6 py-6">
          <table class="w-full table-fixed border border-[#E5E7EB] text-left">
            <thead class="bg-[#FAFAFA]">
              <tr>
                <th class="px-4 py-3 text-[13px] text-[#667085]">Incident ID</th>
                <th class="px-4 py-3 text-[13px] text-[#667085]">Zone</th>
                <th class="px-4 py-3 text-[13px] text-[#667085]">Crime Type</th>
                <th class="px-4 py-3 text-[13px] text-[#667085]">Date</th>
                <th class="px-4 py-3 text-[13px] text-[#667085]">Status</th>
              </tr>
            </thead>
  
            <tbody>
              <tr
                v-for="row in filteredRows"
                :key="row.id"
                class="border-t border-[#E5E7EB]"
              >
                <td class="px-4 py-3 text-[13px] text-[#111827]">
                  {{ row.id }}
                </td>
                <td class="px-4 py-3 text-[13px] text-[#111827]">
                  {{ row.zone }}
                </td>
                <td class="px-4 py-3 text-[13px] text-[#111827]">
                  {{ row.type }}
                </td>
                <td class="px-4 py-3 text-[13px] text-[#111827]">
                  {{ row.date }}
                </td>
                <td class="px-4 py-3 text-[13px]">
                  <span
                    class="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-medium"
                    :class="statusClass(row.status)"
                  >
                    {{ row.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Motion>
    </StateCommandLayout>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue"
  import { Motion } from "@motionone/vue"
  import { Search, FileText, AlertTriangle, Globe, Briefcase } from "lucide-vue-next"
  import { Chart, registerables } from "chart.js"
  import StateCommandLayout from "../layout/Layout.vue"
  
  Chart.register(...registerables)
  
  const chartRef = ref(null)
  const search = ref("")
  
  // Summary Cards
  const summaryCards = [
    {
      label: "Total Criminal Record",
      value: "2,000,000",
      footer: "↑ 10.5% from last month",
      footerColor: "text-[#16A34A]",
      icon: FileText,
      iconBg: "bg-[#EEF2FF] border-[#C7D2FE]",
      iconColor: "text-[#4F46E5]",
    },
    {
      label: "Total Incident Report",
      value: "30",
      footer: "+3 new zones",
      footerColor: "text-[#16A34A]",
      icon: AlertTriangle,
      iconBg: "bg-[#FEF2F2] border-[#FECACA]",
      iconColor: "text-[#DC2626]",
    },
    {
      label: "Total State Commands",
      value: "14",
      footer: "Excellent",
      footerColor: "text-[#16A34A]",
      icon: Globe,
      iconBg: "bg-[#ECFDF5] border-[#A7F3D0]",
      iconColor: "text-[#059669]",
    },
    {
      label: "Active Cases",
      value: "25",
      footer: "5 critical",
      footerColor: "text-[#DC2626]",
      icon: Briefcase,
      iconBg: "bg-[#F3E8FF] border-[#E9D5FF]",
      iconColor: "text-[#9333EA]",
    },
  ]
  
  // Audit Table Data
  const rows = ref([
    { id: "NCRMS-001", zone: "Zone 1", type: "Theft", date: "1/28/2026", status: "Open" },
    { id: "NCRMS-002", zone: "Zone 2", type: "Assault", date: "1/28/2026", status: "Closed" },
    { id: "NCRMS-003", zone: "Zone 3", type: "Fraud", date: "1/28/2026", status: "Under Investigation" },
    { id: "NCRMS-004", zone: "Zone 4", type: "Cybercrime", date: "1/28/2026", status: "Closed" },
    { id: "NCRMS-005", zone: "Zone 5", type: "Drug Abuse", date: "1/28/2026", status: "Pending" },
  ])
  
  const filteredRows = computed(() => {
    if (!search.value) return rows.value
    return rows.value.filter(r =>
      Object.values(r).some(v =>
        String(v).toLowerCase().includes(search.value.toLowerCase())
      )
    )
  })
  
  function statusClass(status) {
    if (status === "Open") return "bg-[#ECFDF3] text-[#16A34A]"
    if (status === "Closed") return "bg-[#F2F4F7] text-[#667085]"
    return "bg-[#FEF3C7] text-[#B45309]"
  }
  
  onMounted(() => {
    new Chart(chartRef.value, {
      type: "bar",
      data: {
        labels: [
          "Theft","Assault","Fraud","Cybercrime",
          "Drug Abuse","Homicide","Kidnapping",
          "Domestic Violence","Bribery","Others"
        ],
        datasets: [{
          data: [35,10,58,9,30,92,15,95,45,80],
          backgroundColor: "#4F46E5",
          borderRadius: 6
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
    })
  })
  </script>
  
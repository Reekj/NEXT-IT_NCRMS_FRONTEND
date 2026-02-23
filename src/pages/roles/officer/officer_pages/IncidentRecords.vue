<!-- src/pages/roles/officer/officer_pages/IncidentRecords.vue -->
<template>
    <OfficerLayout :user="user">
      <Motion
        tag="div"
        class="space-y-6"
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
      >
        <div class="text-[22px] font-semibold text-black">Incident Records</div>
  
        <section class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
          <!-- Toolbar row -->
          <div class="flex items-center justify-between gap-4 px-6 py-5 sm:px-8">
            <div class="flex items-center gap-3">
              <div class="relative">
                <Search class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                <input
                  v-model.trim="q"
                  type="text"
                  placeholder="Search ..."
                  class="h-10 w-[260px] rounded-xl border border-black/10 bg-white pl-10 pr-4 text-[13px]
                         outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <button
                type="button"
                class="grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-white shadow-sm hover:bg-[#F9FAFB]"
                @click="refresh"
                aria-label="Refresh"
              >
                <RotateCw class="h-4 w-4 text-black/60" />
              </button>
            </div>
  
            <Motion
              tag="button"
              type="button"
              class="inline-flex h-10 items-center gap-2 rounded-lg px-4 text-[13px] font-semibold text-white
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                     shadow-sm hover:opacity-95 active:opacity-90"
              :whileHover="{ scale: 1.02 }"
              :whileTap="{ scale: 0.98 }"
              @click="goNew"
            >
              <UserPlus class="h-4 w-4 text-white" />
              New
            </Motion>
          </div>
  
          <div class="border-t border-black/10" />
  
          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full min-w-[1120px] border-collapse text-left">
              <thead>
                <tr class="bg-[#FAFAFA]">
                  <th class="thCell">Incident ID</th>
                  <th class="thCell">Incident Type</th>
                  <th class="thCell">Zone</th>
                  <th class="thCell">State Command</th>
                  <th class="thCell">LGA</th>
                  <th class="thCell">Date of Incident</th>
                  <th class="thCell">Status</th>
                  <th class="thCell thCell--last">Action</th>
                </tr>
              </thead>
  
              <tbody>
                <tr v-for="row in filtered" :key="row.id" class="hover:bg-black/[0.01]">
                  <td class="tdCell">{{ row.incidentId }}</td>
                  <td class="tdCell">{{ row.incidentType }}</td>
                  <td class="tdCell">{{ row.zone }}</td>
                  <td class="tdCell">{{ row.stateCommand }}</td>
                  <td class="tdCell">{{ row.lga }}</td>
                  <td class="tdCell">{{ formatDate(row.dateOfIncident) }}</td>
                  <td class="tdCell">{{ row.status }}</td>
  
                  <td class="tdCell tdCell--last">
                    <div class="flex items-center justify-center gap-2">
                      <!-- View -->
                      <button
                        type="button"
                        class="grid h-9 w-9 place-items-center rounded-lg hover:bg-black/5 active:bg-black/10"
                        aria-label="View"
                        @click="goView(row)"
                      >
                        <Eye class="h-4 w-4 text-black/60" />
                      </button>
  
                      <!-- Edit -->
                      <button
                        type="button"
                        class="grid h-9 w-9 place-items-center rounded-lg hover:bg-black/5 active:bg-black/10"
                        aria-label="Edit"
                        @click="goEdit(row)"
                      >
                        <Pencil class="h-4 w-4 text-black/60" />
                      </button>
  
                      <!-- Delete -->
                      <button
                        type="button"
                        class="grid h-9 w-9 place-items-center rounded-lg hover:bg-red-50 active:bg-red-100"
                        aria-label="Delete"
                        @click="removeRow(row)"
                      >
                        <Trash2 class="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
  
                <tr v-if="!filtered.length">
                  <td colspan="8" class="tdCell tdCell--last text-center text-black/50">
                    No records found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Pagination (UI only like Figma) -->
          <div class="px-6 py-6 sm:px-8">
            <div class="flex justify-center">
              <div class="inline-flex overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
                <button class="px-4 py-2 text-[13px] text-black/60 hover:bg-black/5">‹ Previous</button>
                <button class="px-4 py-2 text-[13px] bg-black/5">1</button>
                <button class="px-4 py-2 text-[13px] hover:bg-black/5">2</button>
                <button class="px-4 py-2 text-[13px] hover:bg-black/5">3</button>
                <button class="px-4 py-2 text-[13px] hover:bg-black/5">4</button>
                <button class="px-4 py-2 text-[13px] text-black/60 hover:bg-black/5">…</button>
                <button class="px-4 py-2 text-[13px] hover:bg-black/5">13</button>
                <button class="px-4 py-2 text-[13px] hover:bg-black/5">14</button>
                <button class="px-4 py-2 text-[13px] text-black/60 hover:bg-black/5">Next ›</button>
              </div>
            </div>
          </div>
        </section>
      </Motion>
    </OfficerLayout>
  </template>
  
  <script setup>
  import { computed, onBeforeUnmount, onMounted, ref } from "vue"
  import { useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { Search, RotateCw, Eye, UserPlus, Pencil, Trash2 } from "lucide-vue-next"
  import OfficerLayout from "../layout/Layout.vue"
  
  const router = useRouter()
  
  const user = ref({
    name: "James King",
    role: "Officer",
    avatarUrl: "",
  })
  
  /** ===============================
   * LocalStorage (synced)
   * =============================== */
  const KEY = "ncrms_officer_incident_records"
  const EVT = "ncrms-officer-incident-records-updated"
  
  function safeRead() {
    try {
      const raw = localStorage.getItem(KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  function safeWrite(next) {
    localStorage.setItem(KEY, JSON.stringify(Array.isArray(next) ? next : []))
    window.dispatchEvent(new CustomEvent(EVT))
  }
  
  function uid() {
    return `inc-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`
  }
  
  function seedIfEmpty() {
    const existing = safeRead()
    if (existing.length) return
  
    safeWrite([
      {
        id: uid(),
        incidentId: "INC-001",
        incidentType: "Traffic Accident",
        zone: "Zone 1",
        stateCommand: "Lagos",
        lga: "Ikeja",
        dateOfIncident: "2025-01-12",
        status: "Open",
        description: "A vehicle collision was reported at the roundabout.",
      },
      {
        id: uid(),
        incidentId: "INC-001",
        incidentType: "Domestic Disturbance",
        zone: "Zone 2",
        stateCommand: "Kano",
        lga: "Nasarawa",
        dateOfIncident: "2025-01-12",
        status: "Closed",
        description: "Reported dispute resolved.",
      },
      {
        id: uid(),
        incidentId: "INC-001",
        incidentType: "Theft",
        zone: "Zone 3",
        stateCommand: "Lagos",
        lga: "Ikeja",
        dateOfIncident: "2025-01-12",
        status: "Under Investigation",
        description: "Phone theft reported at market.",
      },
      {
        id: uid(),
        incidentId: "INC-001",
        incidentType: "Domestic Disturbance",
        zone: "Zone 4",
        stateCommand: "Lagos",
        lga: "Ikeja",
        dateOfIncident: "2025-01-12",
        status: "Under Investigation",
        description: "Follow-up required.",
      },
      {
        id: uid(),
        incidentId: "INC-001",
        incidentType: "Domestic Disturbance",
        zone: "Zone 5",
        stateCommand: "Lagos",
        lga: "Ikeja",
        dateOfIncident: "2025-01-12",
        status: "Closed",
        description: "Case closed.",
      },
      {
        id: uid(),
        incidentId: "INC-001",
        incidentType: "Traffic Accident",
        zone: "Zone 6",
        stateCommand: "Lagos",
        lga: "Ikeja",
        dateOfIncident: "2025-01-12",
        status: "Open",
        description: "Minor collision.",
      },
      {
        id: uid(),
        incidentId: "INC-001",
        incidentType: "Traffic Accident",
        zone: "Zone 7",
        stateCommand: "Lagos",
        lga: "Ikeja",
        dateOfIncident: "2025-01-12",
        status: "Under Investigation",
        description: "Investigation ongoing.",
      },
      {
        id: uid(),
        incidentId: "INC-001",
        incidentType: "Domestic Disturbance",
        zone: "Zone 8",
        stateCommand: "Lagos",
        lga: "Ikeja",
        dateOfIncident: "2025-01-12",
        status: "Closed",
        description: "Resolved.",
      },
      {
        id: uid(),
        incidentId: "INC-001",
        incidentType: "Domestic Disturbance",
        zone: "Zone 9",
        stateCommand: "Lagos",
        lga: "Ikeja",
        dateOfIncident: "2025-01-12",
        status: "Closed",
        description: "Closed.",
      },
    ])
  }
  
  /** Page state */
  const q = ref("")
  const rows = ref([])
  
  function refresh() {
    rows.value = safeRead()
  }
  
  const filtered = computed(() => {
    const term = String(q.value || "").trim().toLowerCase()
    if (!term) return rows.value
    return rows.value.filter((r) =>
      [
        r.incidentId,
        r.incidentType,
        r.zone,
        r.stateCommand,
        r.lga,
        r.dateOfIncident,
        r.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    )
  })
  
  function goNew() {
    router.push({ path: "/officer/incident-records/new" })
  }
  function goView(row) {
    router.push({ path: `/officer/incident-records/${row.id}` })
  }
  function goEdit(row) {
    router.push({ path: `/officer/incident-records/${row.id}/edit` })
  }
  
  function removeRow(row) {
    const ok = window.confirm(`Delete incident "${row.incidentId}"?`)
    if (!ok) return
    const next = safeRead().filter((x) => x.id !== row.id)
    safeWrite(next)
  }
  
  function formatDate(iso) {
    if (!iso) return "-"
    const [y, m, d] = String(iso).split("-")
    if (!y || !m || !d) return iso
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${Number(d)} ${months[Number(m) - 1]} ${y}`
  }
  
  function onUpdated() {
    refresh()
  }
  
  onMounted(() => {
    seedIfEmpty()
    refresh()
    window.addEventListener(EVT, onUpdated)
  })
  onBeforeUnmount(() => {
    window.removeEventListener(EVT, onUpdated)
  })
  </script>
  
  <style scoped>
  .thCell {
    height: 58px;
    text-align: left;
    padding: 0 18px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.55);
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    background: rgba(0, 0, 0, 0.02);
    white-space: nowrap;
  }
  .thCell--last {
    border-right: none;
  }
  
  .tdCell {
    height: 64px;
    padding: 0 18px;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.68);
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    background: #fff;
    vertical-align: middle;
    white-space: nowrap;
  }
  .tdCell--last {
    border-right: none;
  }
  </style>
  
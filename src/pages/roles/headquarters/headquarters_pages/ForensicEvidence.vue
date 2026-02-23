<!-- src/pages/roles/officer/officer_pages/ForensicEvidence.vue -->
<template>
    <OfficerLayout :user="user">
      <div class="space-y-6">
        <div class="text-[22px] font-semibold text-black/80">Forensic Evidence</div>
  
        <Motion
          :initial="{ opacity: 0, y: 10 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.35 }"
          class="rounded-2xl border border-black/10 bg-white shadow-[0_10px_30px_rgba(16,24,40,0.08)] overflow-hidden"
        >
          <!-- Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-8">
            <div class="flex items-center gap-3">
              <div class="relative">
                <Search class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />
                <input
                  v-model="q"
                  type="text"
                  placeholder="Search ..."
                  class="h-10 w-[280px] rounded-xl border border-black/10 bg-white pl-10 pr-4 text-[13px]
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
  
            <!-- <Motion
              as="button"
              type="button"
              :whileHover="{ scale: 1.02 }"
              :whileTap="{ scale: 0.98 }"
              class="inline-flex h-10 items-center gap-2 rounded-lg px-5 text-[13px] font-semibold text-white
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                     shadow-sm hover:opacity-95 active:opacity-90"
              @click="goNew"
            >
              <UserPlus class="h-4 w-4 text-white" />
              New
            </Motion> -->
          </div>
  
          <!-- Table -->
          <div class="overflow-x-auto border-t border-black/10">
            <table class="min-w-[1150px] w-full border-collapse text-left">
              <thead>
                <tr class="bg-[#FAFAFA]">
                  <th class="thCell">Evidence ID</th>
                  <th class="thCell">Case ID</th>
                  <th class="thCell">Evidence Type</th>
                  <th class="thCell">Description</th>
                  <th class="thCell">Zone</th>
                  <th class="thCell">Date Collected</th>
                  <th class="thCell">Status</th>
                  <th class="thCell">Evidence Count</th>
                  <th class="thCell thCell--last">Action</th>
                </tr>
              </thead>
  
              <tbody>
                <tr v-for="row in filtered" :key="row.id" class="hover:bg-black/[0.01]">
                  <td class="tdCell">{{ row.evidenceId }}</td>
                  <td class="tdCell">{{ row.caseId }}</td>
                  <td class="tdCell">{{ row.evidenceType }}</td>
                  <td class="tdCell">{{ row.description }}</td>
                  <td class="tdCell">{{ row.zone }}</td>
                  <td class="tdCell">{{ formatDate(row.dateCollected) }}</td>
                  <td class="tdCell">{{ row.status }}</td>
                  <td class="tdCell">{{ row.evidenceCount }}</td>
                  <td class="tdCell tdCell--last">
                    <button
                      type="button"
                      class="grid h-9 w-9 place-items-center rounded-lg hover:bg-black/5 active:bg-black/10"
                      @click="goView(row)"
                      aria-label="View"
                    >
                      <Eye class="h-5 w-5 text-black/55" />
                    </button>
                  </td>
                </tr>
  
                <tr v-if="filtered.length === 0">
                  <td colspan="9" class="tdCell tdCell--last text-center text-black/45">
                    No records found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Pagination (UI only) -->
          <div class="px-6 py-6 sm:px-8">
            <div class="flex items-center justify-center">
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
        </Motion>
      </div>
    </OfficerLayout>
  </template>
  
  <script setup>
  import { computed, onBeforeUnmount, onMounted, ref } from "vue"
  import { useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { Eye, RotateCw, Search, UserPlus } from "lucide-vue-next"
  import OfficerLayout from "../layout/Layout.vue"
  
  const router = useRouter()
  
  const user = ref({
    name: "James King",
    role: "Officer",
    avatarUrl: "",
  })
  
  /** storage */
  const FE_KEY = "ncrms_officer_forensic_evidence"
  const FE_EVENT = "ncrms-officer-forensic-evidence-updated"
  
  function safeRead() {
    try {
      const raw = localStorage.getItem(FE_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  function safeWrite(next) {
    localStorage.setItem(FE_KEY, JSON.stringify(Array.isArray(next) ? next : []))
    window.dispatchEvent(new CustomEvent(FE_EVENT))
  }
  function uid() {
    return `fe-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`
  }
  
  function seedIfEmpty() {
    const existing = safeRead()
    if (existing.length) return
  
    safeWrite([
      { id: uid(), evidenceId: "EV-001", caseId: "C-001", evidenceType: "Fingerprint", description: "Doorhandle", zone: "Zone 1", dateCollected: "2025-01-12", status: "Verified", evidenceCount: "3" },
      { id: uid(), evidenceId: "EV-001", caseId: "C-001", evidenceType: "Images, DNA", description: "Blood Sample", zone: "Zone 2", dateCollected: "2025-01-12", status: "Verified", evidenceCount: "3" },
      { id: uid(), evidenceId: "EV-001", caseId: "C-001", evidenceType: "Images", description: "CCTV snapshot", zone: "Zone 3", dateCollected: "2025-01-12", status: "Pending", evidenceCount: "3" },
      { id: uid(), evidenceId: "EV-001", caseId: "C-001", evidenceType: "Document", description: "Statement record", zone: "Zone 4", dateCollected: "2025-01-12", status: "Pending", evidenceCount: "3" },
      { id: uid(), evidenceId: "EV-001", caseId: "C-001", evidenceType: "Fingerprint", description: "Doorhandle", zone: "Zone 5", dateCollected: "2025-01-12", status: "Pending", evidenceCount: "3" },
      { id: uid(), evidenceId: "EV-001", caseId: "C-001", evidenceType: "Images, DNA", description: "Doorhandle", zone: "Zone 6", dateCollected: "2025-01-12", status: "Pending", evidenceCount: "3" },
      { id: uid(), evidenceId: "EV-001", caseId: "C-001", evidenceType: "Images, DNA", description: "Doorhandle", zone: "Zone 7", dateCollected: "2025-01-12", status: "Pending", evidenceCount: "3" },
      { id: uid(), evidenceId: "EV-001", caseId: "C-001", evidenceType: "Images, DNA", description: "Doorhandle", zone: "Zone 8", dateCollected: "2025-01-12", status: "Verified", evidenceCount: "3" },
      { id: uid(), evidenceId: "EV-001", caseId: "C-001", evidenceType: "Images, DNA", description: "Doorhandle", zone: "Zone 9", dateCollected: "2025-01-12", status: "Verified", evidenceCount: "3" },
    ])
  }
  
  /** page state */
  const q = ref("")
  const rows = ref([])
  
  function refresh() {
    rows.value = safeRead()
  }
  
  function goNew() {
    router.push({ path: "/officer/forensic-evidence/new" })
  }
  function goView(row) {
    router.push({ path: `/headquarters/forensic-evidence/${row.id}` })
  }
  
  const filtered = computed(() => {
    const term = String(q.value || "").trim().toLowerCase()
    if (!term) return rows.value
    return rows.value.filter((r) =>
      [
        r.evidenceId,
        r.caseId,
        r.evidenceType,
        r.description,
        r.zone,
        r.dateCollected,
        r.status,
        r.evidenceCount,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    )
  })
  
  function formatDate(iso) {
    if (!iso) return "-"
    const [y, m, d] = String(iso).split("-")
    if (!y || !m || !d) return iso
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    return `${Number(d)} ${months[Number(m) - 1]} ${y}`
  }
  
  function onUpdated() {
    refresh()
  }
  
  onMounted(() => {
    seedIfEmpty()
    refresh()
    window.addEventListener(FE_EVENT, onUpdated)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener(FE_EVENT, onUpdated)
  })
  </script>
  
  <style scoped>
  /* ALWAYS show table cell borders (vertical + horizontal) */
  .thCell {
    height: 58px;
    padding: 0 18px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(0,0,0,0.55);
    border-bottom: 1px solid rgba(0,0,0,0.12);
    border-right: 1px solid rgba(0,0,0,0.12);
    background: rgba(0,0,0,0.02);
    white-space: nowrap;
  }
  .thCell--last { border-right: none; }
  
  .tdCell {
    height: 64px;
    padding: 0 18px;
    font-size: 13px;
    color: rgba(0,0,0,0.70);
    border-bottom: 1px solid rgba(0,0,0,0.12);
    border-right: 1px solid rgba(0,0,0,0.12);
    background: #fff;
    vertical-align: middle;
  }
  .tdCell--last { border-right: none; }
  </style>
  
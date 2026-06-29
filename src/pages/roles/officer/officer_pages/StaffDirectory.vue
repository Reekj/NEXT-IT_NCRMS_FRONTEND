<!-- src/pages/roles/officer/officer_pages/StaffDirectory.vue -->
<template>
    <OfficerLayout :user="user">
      <Motion
        tag="div"
        class="space-y-6"
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
      >
        <h1 class="text-[22px] font-semibold text-black">Staff Directory</h1>
  
        <section class="overflow-hidden rounded-[16px] border border-[#D7D7D7] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
          <div class="flex flex-wrap items-center gap-5 border-b border-[#D7D7D7] px-6 py-5">
            <div class="relative">
              <select v-model="zoneFilter" class="filterInput">
                <option value="">Zone</option>
                <option v-for="zone in zones" :key="zone" :value="zone">{{ zone }}</option>
              </select>
              <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black" />
            </div>
  
            <div class="relative">
              <select v-model="stateFilter" class="filterInput">
                <option value="">State</option>
                <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
              </select>
              <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black" />
            </div>
  
            <div class="relative">
              <input v-model.trim="search" type="text" placeholder="Search..." class="filterInput w-[220px] pr-10" />
              <Search class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/60" />
            </div>
          </div>
  
          <div class="overflow-x-auto">
            <table class="w-full min-w-[1180px] border-collapse">
              <thead>
                <tr>
                  <th class="thCell">Full Name</th>
                  <th class="thCell">Staff Type</th>
                  <th class="thCell">Division</th>
                  <th class="thCell">Zone</th>
                  <th class="thCell">State</th>
                  <th class="thCell">LGA</th>
                  <th class="thCell">Gender</th>
                  <th class="thCell">Rank</th>
                  <th class="thCell thCell--last">Actions</th>
                </tr>
              </thead>
  
              <tbody>
                <tr v-for="row in pagedRows" :key="row.id">
                  <td class="tdCell font-semibold">{{ row.fullName }}</td>
                  <td class="tdCell font-semibold">{{ row.staffType }}</td>
                  <td class="tdCell font-semibold">{{ row.division }}</td>
                  <td class="tdCell font-semibold">{{ row.zone }}</td>
                  <td class="tdCell font-semibold">{{ row.state }}</td>
                  <td class="tdCell font-semibold">{{ row.lga }}</td>
                  <td class="tdCell font-semibold">{{ row.gender }}</td>
                  <td class="tdCell font-semibold">{{ row.rank }}</td>
                  <td class="tdCell tdCell--last">
                    <button type="button" class="mx-auto grid h-8 w-8 place-items-center rounded-lg hover:bg-black/5" @click="viewStaff(row)">
                      <Eye class="h-4 w-4 text-black/55" />
                    </button>
                  </td>
                </tr>
  
                <tr v-if="pagedRows.length === 0">
                  <td colspan="9" class="tdCell tdCell--last text-center text-black/50">No records found.</td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <div class="flex justify-center px-6 py-6">
            <div class="inline-flex overflow-hidden rounded-lg border border-[#D7D7D7] bg-white">
              <button class="pageBtn" :disabled="page === 1" @click="page--">‹ Previous</button>
              <button v-for="p in pageButtons" :key="p.key" class="pageBtn" :class="p.value === page ? 'active' : ''" :disabled="p.type === 'dots'" @click="p.type === 'page' && (page = p.value)">
                {{ p.label }}
              </button>
              <button class="pageBtn" :disabled="page === totalPages" @click="page++">Next ›</button>
            </div>
          </div>
        </section>
      </Motion>
    </OfficerLayout>
  </template>
  
  <script setup>
  import { computed, onMounted, ref, watch } from "vue"
  import { useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { ChevronDown, Eye, Search } from "lucide-vue-next"
  import OfficerLayout from "../layout/Layout.vue"
  
  const router = useRouter()
  
  const user = {
    name: "James King",
    role: "Officer",
    avatarUrl: "",
  }
  
  const STAFF_VIEW_KEY = "ncrms_officer_staff_directory_view"
  const KEY_ZONAL_COORDINATORS = "ncrms_headquarters_zonal_coordinators"
  const KEY_HQ_OFFICERS = "ncrms_headquarters_hq_officers"
  
  const search = ref("")
  const zoneFilter = ref("")
  const stateFilter = ref("")
  const rows = ref([])
  const page = ref(1)
  const pageSize = 9
  
  function readArray(key) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "[]")
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  
  function safeId(prefix, value) {
    return `${prefix}:${value || crypto?.randomUUID?.() || Math.random().toString(16).slice(2)}`
  }
  
  function defaultPhoto() {
    return "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80"
  }
  
  function normalizeZonalCoordinator(r) {
    return {
      id: safeId("zc", r?.id || r?.coordinatorId),
      fullName: r?.fullName || "Kay Bentley",
      staffType: "Zonal Coordinator",
      email: r?.email || "bentley@gmail.com",
      phone: r?.phone || "09082763545",
      dateOfBirth: r?.dateOfBirth || "20 Jul 1990",
      address: r?.address || "45, Opebi Road, Ikeja",
      state: r?.state || "Lagos",
      lga: r?.lga || "Ikeja",
      gender: r?.gender || "Male",
      rank: r?.rank || "Inspector general",
      division: r?.division || "Operations",
      zone: r?.zone || "Zone 1",
      badgeNo: r?.badgeNo || "33454",
      station: r?.station || "Police Headquarters, Abuja",
      photoUrl: r?.photoUrl || r?.avatarUrl || defaultPhoto(),
      photoName: r?.photoName || "michealjackson.dp",
    }
  }
  
  function normalizeHqOfficer(r) {
    return {
      id: safeId("hq", r?.id),
      fullName: r?.fullName || "Micheal Jackson",
      staffType: "HQ Officer",
      email: r?.email || "bentley@gmail.com",
      phone: r?.phone || "09082763545",
      dateOfBirth: r?.dateOfBirth || "20 Jul 1990",
      address: r?.address || "45, Opebi Road, Ikeja",
      state: r?.state || "Lagos",
      lga: r?.lga || "Ikeja",
      gender: r?.gender || "Male",
      rank: r?.rank || "Inspector",
      division: r?.division || "Operations",
      zone: r?.zone || "Zone 1",
      badgeNo: r?.badgeNo || "33454",
      station: r?.station || "Police Headquarters, Abuja",
      photoUrl: r?.photoUrl || r?.avatarUrl || defaultPhoto(),
      photoName: r?.photoName || "michealjackson.dp",
    }
  }
  
  function seedFallbackRows() {
    return [
      ["HQ Officer", "Operations", "Zone 1", "Lagos", "Ikeja", "Male", "Inspector"],
      ["Zonal Coordinator", "Intelligence", "Zone 2", "Kano", "Nasarawa", "Female", "Asst Inspector"],
      ["State Command", "Forensic Services", "Zone 3", "Lagos", "Ikeja", "Male", "Deputy Inspector"],
      ["Divisional Coordinator", "Special Crimes", "Zone 4", "Lagos", "Ikeja", "Male", "Asst Inspector"],
      ["Officer", "Legal & Compliance", "Zone 5", "Lagos", "Ikeja", "Male", "Asst Inspector"],
      ["HQ Officer", "Special Crimes", "Zone 6", "Lagos", "Ikeja", "Female", "Asst Inspector"],
      ["Officer", "Criminal Investigation", "Zone 7", "Lagos", "Ikeja", "Female", "Asst Inspector"],
      ["Officer", "Criminal Investigation", "Zone 8", "Lagos", "Ikeja", "Female", "Asst Inspector"],
      ["Officer", "Intelligence", "Zone 9", "Lagos", "Ikeja", "Female", "Asst Inspector"],
    ].map(([staffType, division, zone, state, lga, gender, rank], index) => ({
      id: `demo:${index + 1}`,
      fullName: "Micheal Jackson",
      staffType,
      email: "bentley@gmail.com",
      phone: "09082763545",
      dateOfBirth: "20 Jul 1990",
      address: "45, Opebi Road, Ikeja",
      state,
      lga,
      gender,
      rank,
      division,
      zone,
      badgeNo: "33454",
      station: "Police Headquarters, Abuja",
      photoUrl: defaultPhoto(),
      photoName: "michealjackson.dp",
    }))
  }
  
  function buildRows() {
    const fromStorage = [
      ...readArray(KEY_HQ_OFFICERS).map(normalizeHqOfficer),
      ...readArray(KEY_ZONAL_COORDINATORS).map(normalizeZonalCoordinator),
    ]
  
    rows.value = fromStorage.length ? fromStorage : seedFallbackRows()
  }
  
  const zones = computed(() => [...new Set(rows.value.map((r) => r.zone).filter(Boolean))])
  const states = computed(() => [...new Set(rows.value.map((r) => r.state).filter(Boolean))])
  
  const filteredRows = computed(() => {
    const q = search.value.toLowerCase()
  
    return rows.value.filter((row) => {
      const matchesSearch = !q || Object.values(row).join(" ").toLowerCase().includes(q)
      const matchesZone = !zoneFilter.value || row.zone === zoneFilter.value
      const matchesState = !stateFilter.value || row.state === stateFilter.value
      return matchesSearch && matchesZone && matchesState
    })
  })
  
  const totalPages = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / pageSize)))
  
  const pagedRows = computed(() => {
    const start = (page.value - 1) * pageSize
    return filteredRows.value.slice(start, start + pageSize)
  })
  
  const pageButtons = computed(() => [
    { key: "1", type: "page", value: 1, label: "1" },
    { key: "2", type: "page", value: 2, label: "2" },
    { key: "3", type: "page", value: 3, label: "3" },
    { key: "4", type: "page", value: 4, label: "4" },
    { key: "dots", type: "dots", value: null, label: "..." },
    { key: "13", type: "page", value: 13, label: "13" },
    { key: "14", type: "page", value: 14, label: "14" },
  ].filter((p) => p.type === "dots" || p.value <= totalPages.value || p.value === 13 || p.value === 14))
  
  watch([search, zoneFilter, stateFilter], () => {
    page.value = 1
  })
  
  function viewStaff(row) {
    sessionStorage.setItem(STAFF_VIEW_KEY, JSON.stringify(row))
    router.push(`/officer/staff-directory/${encodeURIComponent(row.id)}`)
  }
  
  onMounted(buildRows)
  </script>
  
  <style scoped>
  .filterInput {
    height: 40px;
    min-width: 150px;
    appearance: none;
    border-radius: 5px;
    border: 1px solid #d7d7d7;
    background: white;
    padding: 0 38px 0 14px;
    color: #777;
    font-size: 13px;
    outline: none;
  }
  
  .thCell,
  .tdCell {
    height: 60px;
    border-bottom: 1px solid #d7d7d7;
    border-right: 1px solid #d7d7d7;
    padding: 0 18px;
    text-align: left;
    font-size: 14px;
    color: #444;
    white-space: nowrap;
  }
  
  .thCell {
    background: #f8f8f8;
    font-weight: 700;
  }
  
  .tdCell {
    background: #fff;
    font-weight: 500;
  }
  
  .thCell--last,
  .tdCell--last {
    border-right: none;
    text-align: center;
  }
  
  .pageBtn {
    height: 40px;
    min-width: 42px;
    border-right: 1px solid #d7d7d7;
    padding: 0 14px;
    font-size: 14px;
    font-weight: 700;
  }
  
  .pageBtn:last-child {
    border-right: none;
  }
  
  .pageBtn.active {
    background: #f5f5f5;
  }
  
  .pageBtn:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
  </style>
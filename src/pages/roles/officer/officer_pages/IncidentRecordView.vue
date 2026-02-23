<!-- src/pages/roles/officer/officer_pages/IncidentRecordView.vue -->
<template>
    <OfficerLayout :user="user">
      <Motion
        tag="div"
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
      >
        <section class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
          <div class="border-b border-black/10 px-6 py-5 sm:px-8">
            <div class="text-[20px] font-medium text-black">View Incident Record</div>
          </div>
  
          <div class="px-6 py-8 sm:px-10 sm:py-10">
            <div class="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-3">
              <ReadField label="Incident ID" :value="record.incidentId" />
              <ReadField label="Incident Type" :value="record.incidentType" />
              <ReadField label="Date of Incident" :value="formatDate(record.dateOfIncident)" />
  
              <ReadField label="Zone" :value="record.zone" />
              <ReadField label="State Command" :value="record.stateCommand" />
              <ReadField label="LGA" :value="record.lga" />
  
              <ReadField label="Status" :value="record.status" />
              <div class="md:col-span-2">
                <ReadField label="Incident Description" :value="record.description" />
              </div>
            </div>
  
            <div class="mt-10">
              <button
                type="button"
                class="h-11 rounded-xl px-10 text-[14px] font-semibold text-white
                       bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                       shadow-sm hover:opacity-95 active:opacity-90"
                @click="back"
              >
                Back
              </button>
  
              <button
                type="button"
                class="ml-4 h-11 rounded-xl border border-black/10 bg-white px-8 text-[14px] font-medium text-black/80
                       shadow-sm hover:bg-black/5"
                @click="goEdit"
              >
                Edit
              </button>
            </div>
          </div>
        </section>
      </Motion>
    </OfficerLayout>
  </template>
  
  <script setup>
  import { computed, onMounted, ref } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import OfficerLayout from "../layout/Layout.vue"
  
  const router = useRouter()
  const route = useRoute()
  
  const user = ref({
    name: "James King",
    role: "Officer",
    avatarUrl: "",
  })
  
  const KEY = "ncrms_officer_incident_records"
  
  function safeRead() {
    try {
      const raw = localStorage.getItem(KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  
  const record = ref({
    incidentId: "-",
    incidentType: "-",
    dateOfIncident: "",
    zone: "-",
    stateCommand: "-",
    lga: "-",
    status: "-",
    description: "-",
  })
  
  const id = computed(() => String(route.params.id || ""))
  
  onMounted(() => {
    const found = safeRead().find((x) => x.id === id.value)
    if (found) record.value = found
  })
  
  function formatDate(iso) {
    if (!iso) return "-"
    const [y, m, d] = String(iso).split("-")
    if (!y || !m || !d) return iso
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${Number(d)} ${months[Number(m) - 1]} ${y}`
  }
  
  function back() {
    router.back()
  }
  function goEdit() {
    router.push({ path: `/officer/incident-records/${id.value}/edit` })
  }
  
  /** local read-only field (keeps consistent UI) */
  const ReadField = {
    props: { label: String, value: String },
    template: `
      <div>
        <div class="text-[14px] font-medium text-black/80">{{ label }}</div>
        <input
          :value="value || '-'"
          disabled
          class="mt-3 h-12 w-full rounded-xl border border-[#D7E6FF] bg-white px-5 text-[14px] text-[#5E7BD6]
                 outline-none"
        />
      </div>
    `,
  }
  </script>
  
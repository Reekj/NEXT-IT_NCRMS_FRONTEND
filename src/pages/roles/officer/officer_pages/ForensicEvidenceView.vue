<!-- src/pages/roles/officer/officer_pages/ForensicEvidenceView.vue -->
<template>
    <OfficerLayout :user="user">
      <div class="flex items-start justify-between gap-4">
        <div>
          <div class="text-[22px] font-semibold text-black">Evidence Details</div>
        </div>
  
        <button
          type="button"
          class="inline-flex items-center gap-2 text-[14px] font-medium text-black/70 hover:text-black"
          @click="goBack"
        >
          <ArrowLeft class="h-4 w-4" />
          <span class="underline underline-offset-4">Back to List</span>
        </button>
      </div>
  
      <div class="mt-6 space-y-10">
        <!-- Evidence Information -->
        <section>
          <div class="text-[18px] font-semibold text-black">Evidence Information</div>
  
          <Motion
            :initial="{ opacity: 0, y: 8 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.25 }"
            class="mt-4 rounded-none border border-black/20 bg-white p-8"
          >
            <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-10">
              <InfoRow label="Evidence ID:" :value="row?.evidenceId || 'EV-002'" />
              <InfoRow label="Case ID:" :value="row?.caseId || 'C-002'" />
              <InfoRow label="Evidence Type:" :value="row?.evidenceType || 'DNA Sample'" />
              <InfoRow label="Collected From:" :value="row?.collectedFrom || 'Crime Scene'" />
              <InfoRow label="Collected Date:" :value="prettyDate(row?.dateCollected) || '09 Jan 2026'" />
              <InfoRow label="Collected By:" :value="row?.collectedBy || 'Mr John James'" />
              <InfoRow label="Status:" :value="row?.status || 'Pending'" />
            </div>
          </Motion>
        </section>
  
        <!-- Evidence Preview -->
        <section>
          <div class="text-[18px] font-semibold text-black">Evidence Preview</div>
          <div class="mt-4 text-[18px] font-semibold text-black/90">DNA Sample Data</div>
  
          <Motion
            :initial="{ opacity: 0, y: 8 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.25 }"
            class="mt-4 rounded-none border border-black/20 bg-white p-8"
          >
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div class="space-y-6">
                <InfoRow label="Sample ID:" :value="row?.sampleId || 'DNA-1011'" />
                <InfoRow label="Lab Analysis:" :value="row?.labAnalysis || 'In Progress'" />
                <InfoRow label="Match Status:" :value="row?.matchStatus || 'No Match'" />
              </div>
  
              <!-- image placeholder (matches screenshot vibe) -->
              <div class="flex items-start justify-end">
                <div class="h-[200px] w-full max-w-[420px] overflow-hidden border border-black/20 bg-white">
                  <svg viewBox="0 0 600 300" class="h-full w-full">
                    <defs>
                      <linearGradient id="g" x1="0" x2="1">
                        <stop offset="0" stop-color="#111" />
                        <stop offset="1" stop-color="#444" />
                      </linearGradient>
                      <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0" />
                        <feComponentTransfer>
                          <feFuncA type="table" tableValues="0 0.55" />
                        </feComponentTransfer>
                      </filter>
                    </defs>
                    <rect width="600" height="300" fill="url(#g)" />
                    <path
                      d="M60,180 C120,40 240,260 310,130 C360,40 460,260 540,120"
                      fill="none"
                      stroke="#f2f2f2"
                      stroke-width="26"
                      stroke-linecap="round"
                      opacity="0.75"
                    />
                    <path
                      d="M70,190 C130,60 250,270 320,140 C370,60 470,270 550,130"
                      fill="none"
                      stroke="#111"
                      stroke-width="18"
                      stroke-linecap="round"
                      opacity="0.65"
                    />
                    <rect width="600" height="300" filter="url(#noise)" opacity="0.55" />
                  </svg>
                </div>
              </div>
            </div>
          </Motion>
  
          <div class="mt-8 flex flex-wrap items-center gap-4">
            <Motion
              as="button"
              type="button"
              :whileHover="{ scale: 1.02 }"
              :whileTap="{ scale: 0.98 }"
              class="inline-flex h-11 items-center gap-2 rounded-xl px-6 text-[14px] font-semibold text-white
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)] shadow-sm"
              @click="downloadReport"
            >
              <Download class="h-4 w-4" />
              Download Report
            </Motion>
  
            <button
              type="button"
              class="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-8 text-[14px] font-semibold text-black/70
                     shadow-sm hover:bg-black/[0.02]"
              @click="goBack"
            >
              Cancel
            </button>
          </div>
        </section>
      </div>
    </OfficerLayout>
  </template>
  
  <script setup>
  import { computed, defineComponent, h, onMounted, ref } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { ArrowLeft, Download } from "lucide-vue-next"
  import OfficerLayout from "../layout/Layout.vue"
  
  const router = useRouter()
  const route = useRoute()
  
  const user = ref({ name: "James King", role: "Officer", avatarUrl: "" })
  
  const FE_KEY = "ncrms_officer_forensic_evidence"
  
  function safeRead() {
    try {
      const raw = localStorage.getItem(FE_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  
  const row = ref(null)
  
  onMounted(() => {
    const id = String(route.params.id || "")
    const list = safeRead()
    row.value = list.find((x) => String(x.id) === id) || null
    if (!row.value) router.push({ path: "/officer/forensic-evidence" })
  })
  
  function goBack() {
    router.push({ path: "/officer/forensic-evidence" })
  }
  
  function downloadReport() {
    // UI-only: keeps button "working" without backend
    // Replace with real download later.
    alert("Report download started (demo).")
  }
  
  function prettyDate(iso) {
    if (!iso) return ""
    // accepts either ISO or already pretty
    if (!String(iso).includes("-")) return iso
    const [y, m, d] = String(iso).split("-")
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    return `${Number(d)} ${months[Number(m) - 1]} ${y}`
  }
  
  const InfoRow = defineComponent({
    name: "InfoRow",
    props: {
      label: { type: String, default: "" },
      value: { type: String, default: "" },
    },
    setup(props) {
      return () =>
        h("div", { class: "grid grid-cols-[220px_1fr] items-center gap-6" }, [
          h("div", { class: "text-[16px] font-medium text-black/85" }, props.label),
          h("div", { class: "text-[16px] text-black/85" }, props.value || "-"),
        ])
    },
  })
  </script>
  
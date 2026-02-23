<template>
    <OfficerLayout :user="user">
      <Motion
        tag="div"
        class="space-y-8"
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
      >
        <!-- Title -->
        <h1 class="text-[22px] font-semibold text-black">Dashboard</h1>
  
        <!-- Stat Cards -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Active Cases"
            value="6"
            meta="5 critical"
            metaTone="danger"
            :icon="Briefcase"
            iconBoxClass="border-purple-200 bg-purple-50"
            iconClass="text-purple-700"
          />
  
          <StatCard
            title="Pending Incident"
            value="2"
            meta="10.5% from last month"
            metaTone="success"
            :icon="FileText"
            iconBoxClass="border-blue-200 bg-blue-50"
            iconClass="text-blue-700"
          />
  
          <StatCard
            title="Criminal Record"
            value="30"
            meta="+3 new zones"
            metaTone="success"
            :icon="AlertTriangle"
            iconBoxClass="border-red-200 bg-red-50"
            iconClass="text-red-600"
          />
  
          <StatCard
            title="Forensic Evidence"
            value="5"
            meta="Excellent"
            metaTone="success"
            :icon="Globe"
            iconBoxClass="border-green-200 bg-green-50"
            iconClass="text-green-700"
          />
        </div>
  
        <!-- Quick Links -->
        <section class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
          <div class="border-b border-black/10 px-6 py-5 sm:px-8">
            <div class="text-[18px] font-semibold text-black">Quick Links</div>
          </div>
  
          <div class="px-6 py-8 sm:px-8">
            <div class="flex flex-wrap gap-6">
              <button
                type="button"
                class="h-12 rounded-xl px-8 text-[14px] font-semibold text-white
                       bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                       shadow-sm hover:opacity-95 active:opacity-90"
                @click="goIncident"
              >
                Add Incident Report
              </button>
  
              <button
                type="button"
                class="h-12 rounded-xl px-8 text-[14px] font-semibold text-white
                       bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                       shadow-sm hover:opacity-95 active:opacity-90"
                @click="goCriminal"
              >
                Update Criminal Record
              </button>
  
              <button
                type="button"
                class="h-12 rounded-xl px-8 text-[14px] font-semibold text-white
                       bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                       shadow-sm hover:opacity-95 active:opacity-90"
                @click="goEvidence"
              >
                Upload Forensic Evidence
              </button>
            </div>
          </div>
        </section>
  
        <!-- Assigned Cases -->
        <section class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
          <div class="flex items-center justify-between gap-4 border-b border-black/10 px-6 py-5 sm:px-8">
            <div class="text-[18px] font-semibold text-black">Assigned Cases</div>
  
            <div class="flex items-center gap-3">
              <div class="relative w-[260px]">
                <Search class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                <input
                  v-model="q"
                  type="text"
                  placeholder="Search ..."
                  class="h-10 w-full rounded-xl border border-black/10 bg-white pl-10 pr-4 text-[13px]
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
          </div>
  
          <div class="overflow-x-auto">
            <table class="w-full min-w-[980px] border-collapse text-left">
              <thead>
                <tr class="bg-white">
                  <th class="thCell">Case ID</th>
                  <th class="thCell">Case Title</th>
                  <th class="thCell">Zone</th>
                  <th class="thCell">Status</th>
                  <th class="thCell thCell--last">Date</th>
                </tr>
              </thead>
  
              <tbody>
                <tr v-for="row in filtered" :key="row.key" class="hover:bg-black/[0.01]">
                  <td class="tdCell">{{ row.caseId }}</td>
                  <td class="tdCell">{{ row.caseTitle }}</td>
                  <td class="tdCell">{{ row.zone }}</td>
                  <td class="tdCell">{{ row.status }}</td>
                  <td class="tdCell tdCell--last">{{ row.date }}</td>
                </tr>
  
                <tr v-if="filtered.length === 0">
                  <td class="tdCell tdCell--last text-center text-black/50" colspan="5">
                    No records found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </Motion>
    </OfficerLayout>
  </template>
  
  <script setup>
import { computed, ref, defineComponent, h } from "vue"
import { useRouter } from "vue-router"
import { Motion } from "@motionone/vue"
import {
  Briefcase,
  FileText,
  AlertTriangle,
  Globe,
  Search,
  RotateCw,
  ArrowUpRight,
} from "lucide-vue-next"
import OfficerLayout from "../layout/Layout.vue"

const router = useRouter()

const user = ref({
  name: "James King",
  role: "Officer",
  avatarUrl: "",
})

function goIncident() {
  router.push({ path: "/officer/incident-records" })
}
function goCriminal() {
  router.push({ path: "/officer/criminal-records" })
}
function goEvidence() {
  router.push({ path: "/officer/forensic-evidence" })
}

/** Assigned cases (demo like Figma) */
const q = ref("")
const rows = ref([
  { key: "1", caseId: "C-0011", caseTitle: "Theft", zone: "Zone 1", status: "Open", date: "1/28/2026" },
  { key: "2", caseId: "C-0011", caseTitle: "Assault", zone: "Zone 2", status: "Closed", date: "1/28/2026" },
  { key: "3", caseId: "C-0011", caseTitle: "Fraud", zone: "Zone 3", status: "Under Investigation", date: "1/28/2026" },
  { key: "4", caseId: "C-0011", caseTitle: "Cybercrime", zone: "Zone 4", status: "Closed", date: "1/28/2026" },
  { key: "5", caseId: "C-0011", caseTitle: "Drug Abuse", zone: "Zone 5", status: "Pending", date: "1/28/2026" },
])

function refresh() {
  rows.value = [...rows.value]
}

const filtered = computed(() => {
  const term = String(q.value || "").trim().toLowerCase()
  if (!term) return rows.value
  return rows.value.filter((r) =>
    `${r.caseId} ${r.caseTitle} ${r.zone} ${r.status} ${r.date}`.toLowerCase().includes(term)
  )
})

/** ✅ FIX: real component so <StatCard /> renders in template */
const StatCard = defineComponent({
  name: "StatCard",
  props: {
    title: { type: String, default: "" },
    value: { type: String, default: "" },
    meta: { type: String, default: "" },
    metaTone: { type: String, default: "success" },
    icon: { type: [Object, Function], default: null },
    iconBoxClass: { type: String, default: "" },
    iconClass: { type: String, default: "" },
  },
  setup(props) {
    return () =>
      h(
        Motion,
        {
          tag: "div",
          class: "rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden",
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.22 },
        },
        {
          default: () => [
            h("div", { class: "p-5" }, [
              h("div", { class: "flex items-start justify-between gap-3" }, [
                h("div", { class: ["grid h-11 w-11 place-items-center rounded-xl border", props.iconBoxClass] }, [
                  props.icon ? h(props.icon, { class: ["h-5 w-5", props.iconClass] }) : null,
                ]),

                h(
                  "button",
                  {
                    type: "button",
                    class:
                      "grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white text-black/45 " +
                      "hover:bg-black/[0.03] hover:text-black/70 active:scale-[0.98]",
                    "aria-label": "Open",
                  },
                  [h(ArrowUpRight, { class: "h-4 w-4" })]
                ),
              ]),

              h("div", { class: "mt-5 text-[13px] font-medium text-black/45" }, props.title),
              h("div", { class: "mt-1 text-[22px] font-semibold text-black" }, props.value),
            ]),

            h("div", { class: "border-t border-black/10 px-5 py-3" }, [
              h(
                "div",
                {
                  class: [
                    "text-[12px] font-semibold",
                    props.metaTone === "danger" ? "text-red-600" : "text-green-700",
                  ],
                },
                [
                  props.metaTone !== "danger"
                    ? h("span", { class: "mr-1 align-[-2px] inline-block" }, "↑")
                    : null,
                  props.meta,
                ]
              ),
            ]),
          ],
        }
      )
  },
})
</script>

  <style scoped>
  /* MUST: show table cell borders (vertical + horizontal) */
  .thCell {
    height: 58px;
    text-align: left;
    padding: 0 18px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.45);
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    background: #fff;
    vertical-align: middle;
  }
  .tdCell--last {
    border-right: none;
  }
  </style>
  
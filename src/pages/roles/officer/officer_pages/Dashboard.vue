<template>
  <OfficerLayout :user="safeUser">
    <Motion
      tag="div"
      class="space-y-8"
      :initial="{ opacity: 0, y: 10 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.35 }"
    >
      <h1 class="text-[22px] font-semibold text-[#111827]">Dashboard</h1>

      <section class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          v-for="card in visibleStats"
          :key="card.key"
          v-bind="card"
          @open="handleStatOpen(card)"
        />
      </section>

      <section v-if="canViewAnalytics" class="space-y-5">
        <h2 class="text-[22px] font-semibold text-[#111827]">Crime Analytics Overview</h2>

        <div class="rounded-[18px] border border-[#E5E7EB] bg-white px-4 py-5 shadow-[0_3px_8px_rgba(15,23,42,0.14)] sm:px-6">
          <div class="chart-tab">Bar</div>

          <ApexChart
            type="bar"
            height="305"
            :options="crimeBarOptions"
            :series="crimeBarSeries"
          />
        </div>
      </section>

      <section v-if="canViewAnalytics" class="space-y-5">
        <h2 class="text-[22px] font-semibold text-[#111827]">Incident Report Trend</h2>

        <div class="rounded-[18px] border border-[#E5E7EB] bg-white px-4 py-5 shadow-[0_3px_8px_rgba(15,23,42,0.14)] sm:px-6">
          <div class="chart-tab">Line</div>

          <ApexChart
            type="line"
            height="310"
            :options="incidentLineOptions"
            :series="incidentLineSeries"
          />
        </div>
      </section>
    </Motion>
  </OfficerLayout>
</template>

<script setup>
import { computed, defineComponent, h, markRaw } from "vue"
import { useRouter } from "vue-router"
import { Motion } from "@motionone/vue"
import ApexChart from "vue3-apexcharts"
import {
  FileText,
  AlertTriangle,
  BriefcaseBusiness,
  Globe2,
  ArrowUpRight,
} from "lucide-vue-next"
import OfficerLayout from "../layout/Layout.vue"

const router = useRouter()

const currentUser = {
  name: "James King",
  role: "Officer",
  avatarUrl: "",
  permissions: [
    "dashboard:view",
    "analytics:view",
    "criminal-records:view",
    "incident-records:view",
    "users:view-summary",
  ],
}

const safeUser = computed(() => ({
  name: currentUser.name,
  role: currentUser.role,
  avatarUrl: currentUser.avatarUrl,
}))

function hasPermission(permission) {
  return Array.isArray(currentUser.permissions) && currentUser.permissions.includes(permission)
}

const canViewAnalytics = computed(() => hasPermission("analytics:view"))

const stats = computed(() => [
  {
    key: "criminal-records",
    title: "Total Criminal Record",
    value: "2,000,000",
    meta: "10.5% from last month",
    metaTone: "success",
    permission: "criminal-records:view",
    route: "/officer/criminal-records",
    icon: markRaw(FileText),
    iconBoxClass: "border-[#304FFE] bg-[#EEF2FF]",
    iconClass: "text-[#304FFE]",
  },
  {
    key: "incident-reports",
    title: "Total Incident Report",
    value: "30",
    meta: "+ 3 new zones",
    metaTone: "success",
    permission: "incident-records:view",
    route: "/officer/incident-records",
    icon: markRaw(AlertTriangle),
    iconBoxClass: "border-[#EF4444] bg-[#FEE2E2]",
    iconClass: "text-[#DC2626]",
  },
  {
    key: "today-records",
    title: "Today Records",
    value: "25",
    meta: "5 critical",
    metaTone: "danger",
    permission: "criminal-records:view",
    route: "/officer/criminal-records",
    icon: markRaw(BriefcaseBusiness),
    iconBoxClass: "border-[#A855F7] bg-[#F3E8FF]",
    iconClass: "text-[#7E22CE]",
  },
  {
    key: "users",
    title: "Users",
    value: "30",
    meta: "+ 3 new zones",
    metaTone: "success",
    permission: "users:view-summary",
    route: "/officer/staff-directory",
    icon: markRaw(Globe2),
    iconBoxClass: "border-[#22C55E] bg-[#DCFCE7]",
    iconClass: "text-[#15803D]",
  },
])

const visibleStats = computed(() => stats.value.filter((item) => hasPermission(item.permission)))

function handleStatOpen(card) {
  if (!hasPermission(card.permission)) return
  router.push(card.route)
}

const crimeCategories = [
  "Theft",
  "Assault",
  "Fraud",
  "Cybercrime",
  "Drug Abuse",
  "Homicide",
  "Kidnapping",
  "Domestic\nViolence",
  "Bribery",
  "Others",
]

const crimeBarSeries = [
  {
    name: "Records",
    data: [36, 11, 58, 10, 30, 91, 15, 93, 45, 79],
  },
]

const crimeBarOptions = {
  chart: {
    toolbar: { show: false },
    fontFamily: "Inter, ui-sans-serif, system-ui",
  },
  plotOptions: {
    bar: {
      columnWidth: "75%",
      borderRadius: 0,
    },
  },
  colors: ["#4965F5"],
  dataLabels: { enabled: false },
  grid: {
    borderColor: "#C9CDD5",
    strokeDashArray: 3,
  },
  xaxis: {
    categories: crimeCategories,
    labels: {
      style: {
        colors: "#4B5563",
        fontSize: "12px",
        fontWeight: 600,
      },
    },
    axisBorder: { color: "#9CA3AF" },
    axisTicks: { show: false },
  },
  yaxis: {
    min: 0,
    max: 100,
    tickAmount: 5,
    labels: {
      style: {
        colors: "#4B5563",
        fontSize: "12px",
        fontWeight: 600,
      },
    },
  },
  tooltip: {
    theme: "light",
  },
}

const incidentLineSeries = [
  {
    name: "2026",
    data: [70, 17, 32, 20, 41, 12, 57, 15, 57, 52, 92, 42],
  },
]

const incidentLineOptions = {
  chart: {
    toolbar: { show: false },
    fontFamily: "Inter, ui-sans-serif, system-ui",
    zoom: { enabled: false },
  },
  colors: ["#8EA2FF"],
  stroke: {
    curve: "smooth",
    width: 2,
  },
  markers: {
    size: 5,
    strokeWidth: 4,
    strokeColors: "#DDE4FF",
    colors: ["#8EA2FF"],
  },
  grid: {
    borderColor: "#C9CDD5",
    strokeDashArray: 3,
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
    labels: {
      style: {
        colors: "#4B5563",
        fontSize: "12px",
      },
    },
    axisBorder: { color: "#9CA3AF" },
    axisTicks: { show: false },
  },
  yaxis: {
    min: 0,
    max: 100,
    tickAmount: 5,
    labels: {
      style: {
        colors: "#4B5563",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: true,
    position: "bottom",
    horizontalAlign: "center",
    markers: {
      width: 8,
      height: 8,
      radius: 8,
    },
  },
  tooltip: {
    theme: "light",
  },
}

const StatCard = defineComponent({
  name: "StatCard",
  props: {
    title: String,
    value: String,
    meta: String,
    metaTone: String,
    icon: [Object, Function],
    iconBoxClass: String,
    iconClass: String,
  },
  emits: ["open"],
  setup(props, { emit }) {
    return () =>
      h(
        "article",
        {
          class:
            "overflow-hidden rounded-[14px] border border-[#E1E5EC] bg-white shadow-[0_2px_5px_rgba(15,23,42,0.06)]",
        },
        [
          h("div", { class: "p-4" }, [
            h("div", { class: "flex items-start justify-between gap-3" }, [
              h(
                "div",
                {
                  class: [
                    "grid h-10 w-10 place-items-center rounded-[10px] border",
                    props.iconBoxClass,
                  ],
                },
                [props.icon ? h(props.icon, { class: ["h-5 w-5", props.iconClass] }) : null]
              ),

              h(
                "button",
                {
                  type: "button",
                  class:
                    "mt-[70px] grid h-7 w-7 place-items-center rounded-full border border-[#CBD5E1] text-[#94A3B8] transition hover:border-[#1D4ED8] hover:text-[#1D4ED8]",
                  "aria-label": `Open ${props.title}`,
                  onClick: () => emit("open"),
                },
                [h(ArrowUpRight, { class: "h-4 w-4" })]
              ),
            ]),

            h("p", { class: "mt-4 text-[13px] font-semibold text-[#667085]" }, props.title),
            h("p", { class: "mt-1 text-[20px] font-bold leading-none text-[#111827]" }, props.value),
          ]),

          h("div", { class: "border-t border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3" }, [
            h(
              "p",
              {
                class: [
                  "text-[12px] font-bold",
                  props.metaTone === "danger" ? "text-[#B91C1C]" : "text-[#047857]",
                ],
              },
              props.metaTone === "danger" ? props.meta : `↑ ${props.meta}`
            ),
          ]),
        ]
      )
  },
})
</script>

<style scoped>
.chart-tab {
  position: relative;
  margin-bottom: 18px;
  width: 100%;
  border-bottom: 1px solid #d1d5db;
  padding: 0 0 8px 6px;
  color: #111827;
  font-size: 13px;
  font-weight: 700;
}

.chart-tab::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 3px;
  width: 28px;
  background: #06b6d4;
  border-radius: 999px;
}
</style>
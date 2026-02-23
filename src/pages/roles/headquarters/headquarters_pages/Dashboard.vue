<!-- src/pages/roles/headquarters/headquarters_pages/Dashboard.vue -->
<template>
  <HeadquartersLayout :user="user">
    <Motion
      tag="div"
      :initial="{ opacity: 0, y: 12 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.35, easing: 'ease-out' }"
      class="relative space-y-12 pb-[130px]"
    >
      <!-- MORE BACKGROUND ACTION (page-level, safe + subtle) -->
      <div class="dashBg" aria-hidden="true">
        <!-- soft grid -->
        <div class="dashBg__grid" />
        <!-- moving glow blobs -->
        <div class="dashBg__blob dashBg__blob--a" />
        <div class="dashBg__blob dashBg__blob--b" />
        <div class="dashBg__blob dashBg__blob--c" />
        <!-- top sweep highlight -->
        <div class="dashBg__sweep" />
        <!-- noise overlay -->
        <div class="dashBg__noise" />
      </div>

      <!-- Page heading -->
      <div class="flex flex-col gap-3">
        <h1 class="text-[28px] sm:text-[24px] font-semibold tracking-tight text-[#0A2395]">
          Dashboard
        </h1>
        <div class="h-[3px] w-14 rounded-full bg-[linear-gradient(90deg,#0A2395,#030B2F)]" />
        <p class="text-[14px] sm:text-[13px] text-black/55">
          Overview of national records, incidents, active cases and zones.
        </p>
      </div>

      <!-- Metric cards -->
      <Motion
        tag="section"
        class="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-4"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ staggerChildren: 0.08 }"
      >
        <Motion
          tag="div"
          :initial="{ opacity: 0, y: 10, scale: 0.98 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :whileHover="{ y: -4, scale: 1.01 }"
          :whileTap="{ scale: 0.99 }"
          :transition="{ duration: 0.22, easing: 'ease-out' }"
        >
          <HQStatCard
            :icon="FileIcon"
            title="Total Criminal Record"
            value="2,000,000"
            trend-text="10.5% from last month"
            trend-type="up"
            tint="#EEF2FF"
            border="#C9D6FF"
            accent="#2F5BFF"
          />
        </Motion>

        <Motion
          tag="div"
          :initial="{ opacity: 0, y: 10, scale: 0.98 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :whileHover="{ y: -4, scale: 1.01 }"
          :whileTap="{ scale: 0.99 }"
          :transition="{ duration: 0.22, easing: 'ease-out' }"
        >
          <HQStatCard
            :icon="AlertIcon"
            title="Total Incident Report"
            value="30"
            trend-text="+3 new zones"
            trend-type="up"
            tint="#FCEBEB"
            border="#F3B8B8"
            accent="#E15252"
          />
        </Motion>

        <Motion
          tag="div"
          :initial="{ opacity: 0, y: 10, scale: 0.98 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :whileHover="{ y: -4, scale: 1.01 }"
          :whileTap="{ scale: 0.99 }"
          :transition="{ duration: 0.22, easing: 'ease-out' }"
        >
          <HQStatCard
            :icon="BriefcaseIcon"
            title="Active Cases"
            value="25"
            trend-text="5 critical"
            trend-type="down"
            tint="#F4EEFA"
            border="#D8C7EA"
            accent="#7A49A5"
          />
        </Motion>

        <Motion
          tag="div"
          :initial="{ opacity: 0, y: 10, scale: 0.98 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :whileHover="{ y: -4, scale: 1.01 }"
          :whileTap="{ scale: 0.99 }"
          :transition="{ duration: 0.22, easing: 'ease-out' }"
        >
          <HQStatCard
            :icon="GlobeIcon"
            title="Total Zones"
            value="99.8%"
            trend-text="Excellent"
            trend-type="ok"
            tint="#EAF8F0"
            border="#BFECD1"
            accent="#18A957"
          />
        </Motion>
      </Motion>

      <!-- National Crime Distribution -->
      <div class="space-y-4">
        <div class="flex items-end justify-between gap-3">
          <h2 class="text-[18px] sm:text-[18px] font-semibold text-black">National Crime Distribution</h2>

          <div class="hidden sm:flex items-center gap-2 text-[12px] text-black/55">
            <span class="inline-flex h-2 w-2 rounded-full bg-[linear-gradient(90deg,#0A2395,#030B2F)]"></span>
            Values (0–100)
          </div>
        </div>

        <Motion
          tag="div"
          :initial="{ opacity: 0, y: 12, scale: 0.99 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :whileHover="{ y: -2 }"
          :transition="{ duration: 0.25, easing: 'ease-out' }"
          class="rounded-2xl border border-[#0A2395]/10 bg-white shadow-[0_8px_24px_rgba(3,11,47,0.06)]"
        >
          <div class="px-5 sm:px-6 pt-6">
            <div class="inline-flex items-center gap-2">
              <div class="text-[14px] sm:text-[13px] font-semibold text-black">Bar</div>
              <div class="mt-1 h-[3px] w-12 rounded-full bg-[linear-gradient(90deg,#0A2395,#030B2F)]" />
            </div>
          </div>

          <!-- MOBILE -->
          <div class="px-5 sm:hidden pb-7 pt-5">
            <div class="space-y-4">
              <Motion
                v-for="(b, i) in bars"
                :key="b.label + i"
                tag="button"
                type="button"
                class="w-full rounded-2xl border border-[#0A2395]/10 bg-white p-4 text-left shadow-[0_1px_0_rgba(0,0,0,0.03)]"
                :initial="{ opacity: 0, y: 10 }"
                :animate="{ opacity: 1, y: 0 }"
                :whileTap="{ scale: 0.99 }"
                :transition="{ duration: 0.18, easing: 'ease-out' }"
                @click="selectBar(i)"
              >
                <div class="flex items-center justify-between gap-3">
                  <div class="text-[15px] font-semibold text-black/85 whitespace-pre-line">
                    {{ b.label }}
                  </div>
                  <div class="text-[14px] font-semibold text-black">
                    {{ b.value }}
                  </div>
                </div>

                <div class="mt-3 h-3 w-full rounded-full bg-black/5 overflow-hidden">
                  <div
                    class="h-full rounded-full bg-[linear-gradient(90deg,#0A2395,#030B2F)] transition-all"
                    :style="{ width: `${Math.max(2, Math.min(100, b.value))}%`, opacity: selectedBar === i ? 0.95 : 0.85 }"
                  />
                </div>

                <div class="mt-3 text-[12px] text-black/55">
                  Tap to {{ selectedBar === i ? "clear" : "select" }}.
                  <span v-if="selectedBar === i" class="font-medium text-black/70"> Selected</span>
                </div>
              </Motion>
            </div>
          </div>

          <!-- DESKTOP/TABLET -->
          <div class="px-5 sm:px-6 pb-7 pt-5 hidden sm:block">
            <div class="rounded-2xl border border-[#0A2395]/10 bg-white p-4 overflow-x-auto">
              <svg viewBox="0 0 980 360" class="min-w-[980px] w-full h-[320px]" role="img" aria-label="National Crime Distribution Bar Chart">
                <rect x="60" y="30" width="890" height="260" fill="transparent" />

                <!-- grid -->
                <g class="text-[11px]">
                  <g v-for="tick in yTicks" :key="tick">
                    <line
                      :x1="60"
                      :x2="950"
                      :y1="yScale(tick)"
                      :y2="yScale(tick)"
                      stroke="rgba(10,35,149,0.14)"
                      stroke-dasharray="4 4"
                    />
                    <text x="38" :y="yScale(tick) + 4" text-anchor="end" fill="rgba(0,0,0,0.55)">
                      {{ tick }}
                    </text>
                  </g>
                </g>

                <!-- bars -->
                <g>
                  <g v-for="(b, i) in bars" :key="b.label">
                    <rect
                      :x="barX(i)"
                      :y="barY(b.value)"
                      :width="barW"
                      :height="barH(b.value)"
                      rx="6"
                      fill="url(#ncrmsBar)"
                      style="cursor: pointer; transition: transform 150ms ease, opacity 150ms ease;"
                      @mouseenter="hoverBar = i"
                      @mouseleave="hoverBar = -1"
                      @click="selectBar(i)"
                      :transform="hoverBar === i || selectedBar === i ? `translate(0,-3)` : `translate(0,0)`"
                      :opacity="hoverBar === i || selectedBar === i ? 0.95 : 0.86"
                    />
                    <text :x="barX(i) + barW / 2" y="335" text-anchor="middle" fill="rgba(0,0,0,0.7)" class="text-[11px]">
                      {{ b.label }}
                    </text>
                  </g>
                </g>

                <!-- axes -->
                <line x1="60" y1="290" x2="950" y2="290" stroke="rgba(0,0,0,0.18)" />
                <line x1="60" y1="30" x2="60" y2="290" stroke="rgba(0,0,0,0.18)" />

                <!-- defs -->
                <defs>
                  <linearGradient id="ncrmsBar" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#0A2395" />
                    <stop offset="100%" stop-color="#030B2F" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div class="mt-3 text-[12px] text-black/55">
              <span class="font-medium text-black/70">Selected:</span>
              <span v-if="selectedBar > -1" class="ml-1">
                {{ bars[selectedBar].label }} ({{ bars[selectedBar].value }})
              </span>
              <span v-else class="ml-1">Click a bar to view value.</span>
            </div>
          </div>
        </Motion>
      </div>

      <!-- System Audit Report -->
      <Motion
        tag="div"
        :initial="{ opacity: 0, y: 12, scale: 0.99 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :whileHover="{ y: -2 }"
        :transition="{ duration: 0.25, easing: 'ease-out' }"
        class="rounded-2xl border border-[#0A2395]/10 bg-white shadow-[0_10px_32px_rgba(3,11,47,0.08)]"
      >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#0A2395]/10 bg-[#EEF2FF]/40 px-5 sm:px-6 py-5">
          <div class="text-[16px] font-semibold text-black">System Audit Report</div>

          <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
            <div class="relative w-full sm:w-auto">
              <input
                v-model.trim="search"
                type="text"
                placeholder="Search ..."
                class="h-11 sm:h-9 w-full sm:w-[260px] rounded-xl sm:rounded-lg border border-black/10 bg-white pl-10 pr-3 text-[14px] sm:text-[13px]
                       text-black/70 outline-none placeholder:text-black/35 focus:border-[#0A2395]/30 focus:ring-4 focus:ring-[#0A2395]/10"
              />
              <Search class="pointer-events-none absolute left-4 sm:left-3 top-1/2 h-5 w-5 sm:h-4 sm:w-4 -translate-y-1/2 text-black/45" />
            </div>

            <Motion
              tag="button"
              type="button"
              class="grid h-11 w-full sm:h-9 sm:w-9 place-items-center rounded-xl sm:rounded-lg border border-black/10 bg-white text-black/45 transition hover:bg-black/5"
              aria-label="Refresh"
              @click="onRefresh"
              :whileHover="{ scale: 1.03 }"
              :whileTap="{ scale: 0.98 }"
              :transition="{ duration: 0.15 }"
            >
              <RotateCw class="h-5 w-5 sm:h-4 sm:w-4" />
            </Motion>
          </div>
        </div>

        <!-- MOBILE: card list -->
        <div class="sm:hidden p-5 space-y-4">
          <Motion
            v-for="row in filteredRows"
            :key="row.id"
            tag="div"
            class="rounded-2xl border border-[#0A2395]/10 bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.03)]"
            :initial="{ opacity: 0, y: 10 }"
            :animate="{ opacity: 1, y: 0 }"
            :whileHover="{ y: -2 }"
            :transition="{ duration: 0.18, easing: 'ease-out' }"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="text-[15px] font-semibold text-black/85">{{ row.incidentId }}</div>
                <div class="mt-1 text-[13px] text-black/60">{{ row.crimeType }}</div>
              </div>

              <Motion
                tag="span"
                class="statusPill"
                :class="pillClass(row.status)"
                :whileTap="{ scale: 0.98 }"
                :transition="{ duration: 0.12 }"
              >
                {{ row.status }}
              </Motion>
            </div>

            <div class="mt-4 grid grid-cols-2 gap-3 text-[13px]">
              <div class="rounded-xl border border-black/10 bg-black/[0.02] p-3">
                <div class="text-black/45 text-[12px] font-medium">Zone</div>
                <div class="mt-1 font-semibold text-black/80">{{ row.zone }}</div>
              </div>

              <div class="rounded-xl border border-black/10 bg-black/[0.02] p-3">
                <div class="text-black/45 text-[12px] font-medium">Date</div>
                <div class="mt-1 font-semibold text-black/80">{{ row.date }}</div>
              </div>
            </div>
          </Motion>

          <div v-if="filteredRows.length === 0" class="text-center text-[14px] text-black/55 py-8">
            No records found.
          </div>
        </div>

        <!-- DESKTOP/TABLET: table -->
        <div class="hidden sm:block overflow-x-auto">
          <table class="min-w-[760px] w-full border-collapse">
            <thead>
              <tr class="bg-white">
                <th class="thCell">Incident ID</th>
                <th class="thCell">Zone</th>
                <th class="thCell">Crime Type</th>
                <th class="thCell">Date</th>
                <th class="thCell thCell--last">Status</th>
              </tr>
            </thead>

            <Motion tag="tbody" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ staggerChildren: 0.06 }">
              <Motion
                v-for="row in filteredRows"
                :key="row.id"
                tag="tr"
                class="hover:bg-black/[0.01]"
                :initial="{ opacity: 0, x: -6 }"
                :animate="{ opacity: 1, x: 0 }"
                :whileHover="{ x: 4 }"
                :transition="{ duration: 0.18, easing: 'ease-out' }"
              >
                <td class="tdCell font-semibold text-black/80">{{ row.incidentId }}</td>
                <td class="tdCell">{{ row.zone }}</td>
                <td class="tdCell">{{ row.crimeType }}</td>
                <td class="tdCell">{{ row.date }}</td>
                <td class="tdCell tdCell--last">
                  <Motion
                    tag="span"
                    class="statusPill"
                    :class="pillClass(row.status)"
                    :whileHover="{ scale: 1.03 }"
                    :whileTap="{ scale: 0.98 }"
                    :transition="{ duration: 0.15 }"
                  >
                    {{ row.status }}
                  </Motion>
                </td>
              </Motion>

              <tr v-if="filteredRows.length === 0">
                <td class="tdCell tdCell--last text-center text-black/50" colspan="5">
                  No records found.
                </td>
              </tr>
            </Motion>
          </table>
        </div>
      </Motion>

      <!-- (REMOVED from normal flow) -->
      <!-- The blue band is now fixed below -->
    </Motion>

    <!-- FIXED: Dashboard footer band (base touches screen bottom, stays visible while scroll) -->
    <!-- respects sidebar width on lg -->
    <div
      class="fixed bottom-0 z-40 w-full lg:left-[260px] lg:w-[calc(100%-260px)]"
    >
      <div class="px-4 sm:px-6 lg:px-10 pb-4">
        <div class="rounded-2xl bg-[linear-gradient(90deg,#0A2395,#030B2F)] px-10 py-8 text-white shadow-[0_20px_60px_rgba(3,11,47,0.25)]">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div class="text-[18px] font-semibold">National Criminal Records System</div>
              <div class="text-[13px] text-white/70">Secure. Centralized. Authoritative.</div>
            </div>

            <div class="text-[13px] text-white/70">
              © {{ new Date().getFullYear() }} NCRMS Headquarters
            </div>
          </div>
        </div>
      </div>
    </div>
  </HeadquartersLayout>
</template>

<script setup>
import { computed, defineComponent, h, ref } from "vue";
import { Motion } from "@motionone/vue";
import HeadquartersLayout from "../layout/Layout.vue";
import { FileText, AlertTriangle, Briefcase, Globe, Search, RotateCw, ArrowUpRight } from "lucide-vue-next";

const user = {
  name: "Helena John",
  role: "Headquarters",
  avatarUrl: "",
};

const FileIcon = FileText;
const AlertIcon = AlertTriangle;
const BriefcaseIcon = Briefcase;
const GlobeIcon = Globe;

const HQStatCard = defineComponent({
  name: "HQStatCard",
  props: {
    icon: { type: [Object, Function], required: true },
    title: { type: String, required: true },
    value: { type: String, required: true },
    trendText: { type: String, required: true },
    trendType: { type: String, required: true }, // up | down | ok
    tint: { type: String, required: true },
    border: { type: String, required: true },
    accent: { type: String, required: true },
  },
  setup(props) {
    const isUp = () => props.trendType === "up";
    const isDown = () => props.trendType === "down";
    const footerColor = () => (isDown() ? "#B91C1C" : "#15803D");

    return () =>
      h(
        "div",
        { class: "relative overflow-hidden rounded-2xl border border-[#0A2395]/10 bg-white shadow-sm" },
        [
          h("div", {
            class: "absolute left-0 top-0 h-[4px] w-full",
            style: { background: "linear-gradient(90deg,#0A2395,#030B2F)" },
          }),

          h("div", { class: "flex items-start justify-between px-6 pt-6" }, [
            h(
              "div",
              {
                class: "grid h-12 w-12 place-items-center rounded-2xl border",
                style: { background: props.tint, borderColor: props.border },
              },
              [h(props.icon, { class: "h-6 w-6", style: { color: props.accent } })]
            ),

            h(
              "button",
              {
                type: "button",
                class:
                  "mt-1 grid h-8 w-8 place-items-center rounded-full border border-black/10 text-black/35 transition hover:bg-black/5",
                "aria-label": "Open details",
              },
              [h(ArrowUpRight, { class: "h-4 w-4" })]
            ),
          ]),

          h("div", { class: "px-6 pb-5 pt-4" }, [
            h("div", { class: "text-[14px] sm:text-[13px] text-black/45" }, props.title),
            h("div", { class: "mt-2 text-[28px] sm:text-[20px] font-semibold tracking-tight text-black" }, props.value),
          ]),

          h(
            "div",
            { class: "border-t border-black/10 px-6 py-4 text-[14px] sm:text-[13px] font-semibold" },
            [h("span", { style: { color: footerColor() } }, isUp() ? `↑ ${props.trendText}` : props.trendText)]
          ),
        ]
      );
  },
});

// chart
const hoverBar = ref(-1);
const selectedBar = ref(-1);

const bars = ref([
  { label: "Theft", value: 35 },
  { label: "Assault", value: 10 },
  { label: "Fraud", value: 55 },
  { label: "Cybercrime", value: 8 },
  { label: "Drug Abuse", value: 28 },
  { label: "Homicide", value: 90 },
  { label: "Kidnapping", value: 14 },
  { label: "Domestic\nViolence", value: 92 },
  { label: "Bribery", value: 44 },
  { label: "Others", value: 78 },
]);

function selectBar(i) {
  selectedBar.value = selectedBar.value === i ? -1 : i;
}

const yMax = 100;
const yTicks = [0, 20, 40, 60, 80, 100];

function yScale(v) {
  const top = 30;
  const bottom = 290;
  const t = Math.max(0, Math.min(yMax, Number(v)));
  return bottom - (t / yMax) * (bottom - top);
}

const barW = 70;
const barGap = 22;
function barX(i) {
  return 90 + i * (barW + barGap);
}
function barY(v) {
  return yScale(v);
}
function barH(v) {
  return 290 - yScale(v);
}

// table
const search = ref("");
const rows = ref([
  { id: "1", incidentId: "NCRMS-001", zone: "Zone 1", crimeType: "Theft", date: "1/28/2026", status: "Open" },
  { id: "2", incidentId: "NCRMS-002", zone: "Zone 2", crimeType: "Assault", date: "1/28/2026", status: "Closed" },
  { id: "3", incidentId: "NCRMS-003", zone: "Zone 3", crimeType: "Fraud", date: "1/28/2026", status: "Under Investigation" },
  { id: "4", incidentId: "NCRMS-004", zone: "Zone 4", crimeType: "Cybercrime", date: "1/28/2026", status: "Closed" },
  { id: "5", incidentId: "NCRMS-005", zone: "Zone 5", crimeType: "Drug Abuse", date: "1/28/2026", status: "Pending" },
]);

const filteredRows = computed(() => {
  const q = String(search.value || "").trim().toLowerCase();
  if (!q) return rows.value;
  return rows.value.filter((r) => {
    const hay = `${r.incidentId} ${r.zone} ${r.crimeType} ${r.date} ${r.status}`.toLowerCase();
    return hay.includes(q);
  });
});

function pillClass(status) {
  const s = String(status || "").toLowerCase();
  if (s === "open") return "border-green-500/40 bg-green-50 text-green-700";
  if (s === "closed") return "border-black/10 bg-black/5 text-black/70";
  if (s.includes("investigation")) return "border-orange-500/40 bg-orange-50 text-orange-700";
  if (s === "pending") return "border-orange-500/40 bg-orange-50 text-orange-700";
  return "border-black/10 bg-black/5 text-black/60";
}

function onRefresh() {
  // UI-only placeholder
}
</script>

<style scoped>
/* ====== Background system (subtle, premium, not distracting) ====== */
.dashBg {
  position: absolute;
  inset: -28px;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
  border-radius: 24px;
}

/* soft grid */
.dashBg__grid {
  position: absolute;
  inset: 0;
  opacity: 0.55;
  background-image:
    linear-gradient(to right, rgba(10,35,149,0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(10,35,149,0.06) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(circle at 30% 10%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 68%);
}

/* animated blobs */
.dashBg__blob {
  position: absolute;
  width: 520px;
  height: 520px;
  border-radius: 9999px;
  filter: blur(40px);
  opacity: 0.28;
  background: radial-gradient(circle at 30% 30%, rgba(10,35,149,0.55), rgba(3,11,47,0) 62%);
  animation: dashFloat 14s ease-in-out infinite;
}

.dashBg__blob--a {
  left: -140px;
  top: -160px;
  animation-duration: 16s;
}

.dashBg__blob--b {
  right: -180px;
  top: -120px;
  background: radial-gradient(circle at 30% 30%, rgba(3,11,47,0.55), rgba(10,35,149,0) 62%);
  animation-duration: 18s;
  animation-delay: -5s;
}

.dashBg__blob--c {
  left: 28%;
  bottom: -240px;
  width: 680px;
  height: 680px;
  background: radial-gradient(circle at 30% 30%, rgba(47,91,255,0.45), rgba(3,11,47,0) 62%);
  animation-duration: 20s;
  animation-delay: -8s;
}

/* top sweep */
.dashBg__sweep {
  position: absolute;
  left: -30%;
  top: -40%;
  width: 160%;
  height: 220px;
  opacity: 0.22;
  background: linear-gradient(90deg, transparent, rgba(10,35,149,0.22), transparent);
  transform: rotate(-8deg);
  animation: dashSweep 9s ease-in-out infinite;
}

/* subtle noise overlay */
.dashBg__noise {
  position: absolute;
  inset: 0;
  opacity: 0.08;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
  mix-blend-mode: multiply;
}

@keyframes dashFloat {
  0% { transform: translate3d(0,0,0) scale(1); }
  50% { transform: translate3d(22px, -18px, 0) scale(1.06); }
  100% { transform: translate3d(0,0,0) scale(1); }
}

@keyframes dashSweep {
  0% { transform: translateX(-12%) rotate(-8deg); opacity: 0.14; }
  50% { transform: translateX(10%) rotate(-8deg); opacity: 0.24; }
  100% { transform: translateX(-12%) rotate(-8deg); opacity: 0.14; }
}

/* keep your existing styles */
.thCell {
  height: 58px;
  text-align: left;
  padding: 0 18px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.35);
  border-bottom: 1px solid rgba(0, 0, 0, 0.10);
}

.thCell--last {
  text-align: left;
}

.tdCell {
  height: 64px;
  padding: 0 18px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.72);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  vertical-align: middle;
}

.tdCell--last {
  border-right: none;
}

.statusPill {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
}
</style>

<!-- src/pages/roles/system_admin/system_admin_pages/Dashboard.vue -->
<template>
  <SystemAdminLayout :user="user">
    <Motion
      tag="div"
      :initial="{ opacity: 0, y: 12 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.35, easing: 'ease-out' }"
    >
      <h1 class="text-[22px] font-semibold tracking-tight text-black">Dashboard</h1>

      <!-- Metric cards -->
      <Motion
        tag="section"
        class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ staggerChildren: 0.08 }"
      >
        <Motion
          tag="div"
          :initial="{ opacity: 0, y: 10, scale: 0.98 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :whileHover="{ y: -4, scale: 1.01 }"
          :transition="{ duration: 0.22, easing: 'ease-out' }"
        >
          <StatCard
            :icon="FileIcon"
            title="Total Records"
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
          :transition="{ duration: 0.22, easing: 'ease-out' }"
        >
          <StatCard
            :icon="GlobeIcon"
            title="Active Zones"
            value="30"
            trend-text="+3 new zones"
            trend-type="up"
            tint="#EAF8F0"
            border="#BFECD1"
            accent="#18A957"
          />
        </Motion>

        <Motion
          tag="div"
          :initial="{ opacity: 0, y: 10, scale: 0.98 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :whileHover="{ y: -4, scale: 1.01 }"
          :transition="{ duration: 0.22, easing: 'ease-out' }"
        >
          <StatCard
            :icon="AlertIcon"
            title="System Alerts"
            value="25"
            trend-text="5 critical"
            trend-type="down"
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
          :transition="{ duration: 0.22, easing: 'ease-out' }"
        >
          <StatCard
            :icon="ClockIcon"
            title="Uptime"
            value="99.8%"
            trend-text="Excellent"
            trend-type="ok"
            tint="#F4EEFA"
            border="#D8C7EA"
            accent="#7A49A5"
          />
        </Motion>
      </Motion>

      <!-- Lower grid -->
      <section class="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_1fr]">
        <!-- System Audit Report -->
        <Motion
          tag="div"
          :initial="{ opacity: 0, y: 12, scale: 0.99 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :whileHover="{ y: -2 }"
          :transition="{ duration: 0.25, easing: 'ease-out' }"
          class="rounded-2xl border border-black/10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.03)]"
        >
          <div class="flex items-center justify-between gap-4 border-b border-black/10 px-6 py-4">
            <div class="text-[16px] font-semibold text-black">System Audit Report</div>

            <div class="flex items-center gap-3">
              <div class="flex h-9 w-[280px] items-center gap-2 rounded-lg border border-black/10 bg-white px-3">
                <Search class="h-4 w-4 text-black/40" />
                <input
                  v-model.trim="search"
                  type="text"
                  placeholder="Search ..."
                  class="h-full w-full bg-transparent text-[13px] text-black/70 outline-none placeholder:text-black/35"
                />
              </div>

              <Motion
                tag="button"
                type="button"
                class="grid h-9 w-9 place-items-center rounded-lg border border-black/10 bg-white text-black/45 transition hover:bg-black/5"
                aria-label="Refresh"
                @click="onRefresh"
                :whileHover="{ scale: 1.06 }"
                :whileTap="{ scale: 0.94 }"
                :transition="{ duration: 0.15 }"
              >
                <RotateCw class="h-4 w-4" />
              </Motion>
            </div>
          </div>

          <div class="px-6 pb-3 pt-3">
            <div
              class="grid grid-cols-[1.2fr_1fr_0.8fr] gap-4 border-b border-black/10 pb-3 text-[13px] text-black/45"
            >
              <div>Type</div>
              <div>Date</div>
              <div>Status</div>
            </div>
          </div>

          <Motion
            tag="div"
            class="divide-y divide-black/10"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :transition="{ staggerChildren: 0.05 }"
          >
            <Motion
              v-for="row in filteredAuditRows"
              :key="row.type + row.date + row.status"
              tag="div"
              class="grid grid-cols-[1.2fr_1fr_0.8fr] items-center gap-4 px-6 py-4"
              :initial="{ opacity: 0, x: -6 }"
              :animate="{ opacity: 1, x: 0 }"
              :whileHover="{ x: 4 }"
              :transition="{ duration: 0.18, easing: 'ease-out' }"
            >
              <div class="text-[14px] font-medium text-black/85">{{ row.type }}</div>
              <div class="text-[14px] text-black/70">{{ row.date }}</div>
              <div><StatusPill :status="row.status" /></div>
            </Motion>
          </Motion>
        </Motion>

        <!-- Recent Activities -->
        <Motion
          tag="div"
          :initial="{ opacity: 0, y: 12, scale: 0.99 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :whileHover="{ y: -2 }"
          :transition="{ duration: 0.25, easing: 'ease-out' }"
          class="rounded-2xl border border-black/10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.03)]"
        >
          <div class="border-b border-black/10 px-6 py-4">
            <div class="text-[16px] font-semibold text-black">Recent Activities</div>
          </div>

          <div class="p-6">
            <Motion
              tag="div"
              class="space-y-4"
              :initial="{ opacity: 0 }"
              :animate="{ opacity: 1 }"
              :transition="{ staggerChildren: 0.08 }"
            >
              <Motion
                tag="div"
                :initial="{ opacity: 0, y: 8, scale: 0.99 }"
                :animate="{ opacity: 1, y: 0, scale: 1 }"
                :whileHover="{ y: -2 }"
                :transition="{ duration: 0.2, easing: 'ease-out' }"
              >
                <ActivityCard
                  :icon="FilePlus"
                  tone="info"
                  title="New Zonal Admin Created"
                  subtitle="Lagos Zone - Admin: John Dame"
                  time="2 hours ago"
                />
              </Motion>

              <Motion
                tag="div"
                :initial="{ opacity: 0, y: 8, scale: 0.99 }"
                :animate="{ opacity: 1, y: 0, scale: 1 }"
                :whileHover="{ y: -2 }"
                :transition="{ duration: 0.2, easing: 'ease-out' }"
              >
                <ActivityCard
                  :icon="AlertTriangle"
                  tone="danger"
                  title="Security Alert Triggered"
                  subtitle="Unusual login attempt detected"
                  time="1 day ago"
                />
              </Motion>

              <Motion
                tag="div"
                :initial="{ opacity: 0, y: 8, scale: 0.99 }"
                :animate="{ opacity: 1, y: 0, scale: 1 }"
                :whileHover="{ y: -2 }"
                :transition="{ duration: 0.2, easing: 'ease-out' }"
              >
                <ActivityCard
                  :icon="FilePlus"
                  tone="info"
                  title="New Zonal Admin Created"
                  subtitle="Lagos Zone - Admin: John Dame"
                  time="2 hours ago"
                />
              </Motion>
            </Motion>
          </div>
        </Motion>
      </section>
    </Motion>
  </SystemAdminLayout>
</template>

<script setup>
import { computed, defineComponent, h, ref } from "vue";
import { Motion } from "@motionone/vue";
import SystemAdminLayout from "../layout/Layout.vue";
import {
  Search,
  RotateCw,
  ArrowUpRight,
  FileText,
  Globe,
  AlertTriangle,
  Clock,
  FilePlus,
} from "lucide-vue-next";

const user = {
  name: "John Michaelson",
  role: "System Administrator",
  avatarUrl: "",
};

const search = ref("");

const auditRows = ref([
  { type: "Security Audit", date: "Jan 10, 2026", status: "Passed" },
  { type: "Data Integrity", date: "Jan 10, 2026", status: "Warning" },
  { type: "Access Control", date: "Jan 10, 2026", status: "Passed" },
  { type: "Security Audit", date: "Jan 10, 2026", status: "Passed" },
  { type: "System Performance", date: "Jan 10, 2026", status: "Failed" },
]);

const filteredAuditRows = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return auditRows.value;
  return auditRows.value.filter(
    (r) =>
      r.type.toLowerCase().includes(q) ||
      r.date.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
  );
});

function onRefresh() {
  // UI-only placeholder
}

const FileIcon = FileText;
const GlobeIcon = Globe;
const AlertIcon = AlertTriangle;
const ClockIcon = Clock;

const StatCard = defineComponent({
  name: "StatCard",
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
    const footerColor = () => (isDown() ? "#E15252" : "#1A8E4B");

    return () =>
      h(
        "div",
        {
          class:
            "rounded-2xl border border-black/10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.03)]",
        },
        [
          h("div", { class: "flex items-start justify-between px-6 pt-5" }, [
            h(
              "div",
              {
                class: "grid h-11 w-11 place-items-center rounded-xl border",
                style: { background: props.tint, borderColor: props.border },
              },
              [h(props.icon, { class: "h-5 w-5", style: { color: props.accent } })]
            ),

            h(
              "button",
              {
                type: "button",
                class:
                  "mt-2 grid h-7 w-7 place-items-center rounded-full border border-black/10 text-black/35",
                "aria-label": "Open details",
              },
              [h(ArrowUpRight, { class: "h-4 w-4" })]
            ),
          ]),

          h("div", { class: "px-6 pb-4 pt-4" }, [
            h("div", { class: "text-[13px] text-black/45" }, props.title),
            h(
              "div",
              { class: "mt-1 text-[20px] font-semibold tracking-tight text-black" },
              props.value
            ),
          ]),

          h(
            "div",
            { class: "border-t border-black/10 px-6 py-3 text-[13px] font-medium" },
            [
              h(
                "span",
                { style: { color: footerColor() } },
                isUp()
                  ? [
                      h("span", { class: "inline-flex items-center gap-2" }, [
                        h("span", { class: "inline-grid h-4 w-4 place-items-center" }, [
                          h(
                            "svg",
                            { viewBox: "0 0 24 24", class: "h-4 w-4" },
                            [
                              h("path", {
                                d: "M12 19V5",
                                fill: "none",
                                stroke: "currentColor",
                                "stroke-width": "2",
                                "stroke-linecap": "round",
                              }),
                              h("path", {
                                d: "M6 11l6-6 6 6",
                                fill: "none",
                                stroke: "currentColor",
                                "stroke-width": "2",
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                              }),
                            ]
                          ),
                        ]),
                        h("span", null, props.trendText),
                      ]),
                    ]
                  : props.trendText
              ),
            ]
          ),
        ]
      );
  },
});

const StatusPill = defineComponent({
  name: "StatusPill",
  props: { status: { type: String, required: true } },
  setup(props) {
    const cfg = () => {
      const s = String(props.status).toLowerCase();
      if (s === "passed")
        return {
          wrap: "border-[#31C26A] bg-[#E9F9F0] text-[#1A8E4B]",
          dot: "bg-[#31C26A]",
        };
      if (s === "warning")
        return {
          wrap: "border-[#FF9C4A] bg-[#FFF2E7] text-[#E07B2A]",
          dot: "bg-[#FF9C4A]",
        };
      return {
        wrap: "border-[#FF6B6B] bg-[#FFECEC] text-[#E15252]",
        dot: "bg-[#FF6B6B]",
      };
    };

    return () =>
      h(
        "span",
        {
          class:
            "inline-flex items-center gap-2 rounded-full border px-3 py-[2px] text-[12px] font-medium " +
            cfg().wrap,
        },
        [h("span", { class: "h-2 w-2 rounded-full " + cfg().dot }), props.status]
      );
  },
});

const ActivityCard = defineComponent({
  name: "ActivityCard",
  props: {
    icon: { type: [Object, Function], required: true },
    tone: { type: String, required: true }, // info | danger
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    time: { type: String, required: true },
  },
  setup(props) {
    const chip = () =>
      props.tone === "danger"
        ? { bg: "#FCEBEB", bd: "#F3B8B8", fg: "#E15252" }
        : { bg: "#EEF2FF", bd: "#C9D6FF", fg: "#2F5BFF" };

    return () =>
      h(
        "div",
        {
          class:
            "rounded-xl border border-black/10 bg-white px-5 py-4 shadow-[0_1px_0_rgba(0,0,0,0.03)]",
        },
        [
          h("div", { class: "flex items-start gap-3" }, [
            h(
              "div",
              {
                class: "grid h-9 w-9 place-items-center rounded-lg border",
                style: { background: chip().bg, borderColor: chip().bd },
              },
              [h(props.icon, { class: "h-4 w-4", style: { color: chip().fg } })]
            ),

            h("div", { class: "flex-1" }, [
              h("div", { class: "text-[13px] font-semibold text-black" }, props.title),
              h("div", { class: "mt-1 text-[12px] text-black/55" }, props.subtitle),
              h("div", { class: "mt-3 text-[12px] text-black/35" }, props.time),
            ]),
          ]),
        ]
      );
  },
});
</script>

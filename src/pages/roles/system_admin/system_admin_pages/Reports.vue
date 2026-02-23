<!-- src/pages/roles/system_admin/system_admin_pages/Reports.vue -->
<template>
  <SystemAdminLayout :user="user">
    <!-- Page Title -->
    <Motion
      tag="div"
      class="px-1"
      :initial="{ opacity: 0, y: 12 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.35, easing: 'ease-out' }"
    >
      <h1 class="text-[20px] font-semibold text-black">System Audit Report</h1>

      <!-- Card -->
      <Motion
        tag="div"
        class="mt-5 rounded-2xl border border-black/10 bg-white shadow-sm"
        :initial="{ opacity: 0, y: 10, scale: 0.99 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :transition="{ duration: 0.25, easing: 'ease-out' }"
      >
        <!-- Filters / Actions Row -->
        <Motion
          tag="div"
          class="flex flex-col gap-4 border-b border-black/10 px-6 py-5 lg:flex-row lg:items-center lg:justify-between"
          :initial="{ opacity: 0, y: 8 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.22, easing: 'ease-out' }"
        >
          <!-- Left: Filters + Search -->
          <Motion
            tag="div"
            class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :transition="{ staggerChildren: 0.05 }"
          >
            <!-- Date Range -->
            <Motion
              tag="div"
              class="relative"
              :initial="{ opacity: 0, y: 6 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.18 }"
              :whileHover="{ y: -1 }"
            >
              <select v-model="filters.dateRange" class="filterSelect pr-10">
                <option value="">Date Range</option>
                <option value="today">Today</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="all">All time</option>
              </select>
              <!-- <ChevronDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/60" /> -->
            </Motion>

            <!-- All Users -->
            <Motion
              tag="div"
              class="relative"
              :initial="{ opacity: 0, y: 6 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.18 }"
              :whileHover="{ y: -1 }"
            >
              <select v-model="filters.user" class="filterSelect pr-10">
                <option value="">All Users</option>
                <option v-for="u in userOptions" :key="u" :value="u">{{ u }}</option>
              </select>
              <!-- <ChevronDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/60" /> -->
            </Motion>

            <!-- Action Type -->
            <Motion
              tag="div"
              class="relative"
              :initial="{ opacity: 0, y: 6 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.18 }"
              :whileHover="{ y: -1 }"
            >
              <select v-model="filters.actionType" class="filterSelect pr-10">
                <option value="">Action Type</option>
                <option v-for="a in actionOptions" :key="a" :value="a">{{ a }}</option>
              </select>
              <!-- <ChevronDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/60" /> -->
            </Motion>

            <!-- Search -->
            <Motion
              tag="div"
              class="relative"
              :initial="{ opacity: 0, y: 6 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.18 }"
              :whileHover="{ y: -1 }"
            >
              <input
                v-model.trim="filters.search"
                type="text"
                placeholder="Search..."
                class="searchInput pr-10"
              />
              <Search class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/60" />
            </Motion>
          </Motion>

          <!-- Right: Export Buttons -->
          <Motion
            tag="div"
            class="flex items-center gap-3"
            :initial="{ opacity: 0, y: 6 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.2, easing: 'ease-out' }"
          >
            <Motion
              tag="button"
              type="button"
              class="exportBtn"
              @click="exportCSV"
              :whileHover="{ scale: 1.02, y: -1 }"
              :whileTap="{ scale: 0.96 }"
              :transition="{ duration: 0.14 }"
            >
              <FileDown class="h-4 w-4 text-black/70" />
              Export CSV
            </Motion>

            <Motion
              tag="button"
              type="button"
              class="exportBtn"
              @click="exportPDF"
              :whileHover="{ scale: 1.02, y: -1 }"
              :whileTap="{ scale: 0.96 }"
              :transition="{ duration: 0.14 }"
            >
              <FileDown class="h-4 w-4 text-black/70" />
              Export PDF
            </Motion>
          </Motion>
        </Motion>

        <!-- Table -->
        <Motion
          tag="div"
          class="overflow-x-auto"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :transition="{ duration: 0.25, easing: 'ease-out' }"
        >
          <table class="min-w-full border-collapse">
            <thead>
              <Motion
                tag="tr"
                class="bg-black/[0.02]"
                :initial="{ opacity: 0, y: 6 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.2, easing: 'ease-out' }"
              >
                <th class="thCell">Timestamp</th>
                <th class="thCell">User</th>
                <th class="thCell">Action</th>
                <th class="thCell">Detail</th>
                <th class="thCell">Status</th>
              </Motion>
            </thead>

            <tbody>
              <Motion
                tag="template"
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :transition="{ staggerChildren: 0.015 }"
              >
                <Motion
                  v-for="row in pagedRows"
                  :key="row.id"
                  tag="tr"
                  class="hover:bg-black/[0.01]"
                  :initial="{ opacity: 0, y: 6 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :whileHover="{ y: -1 }"
                  :transition="{ duration: 0.16, easing: 'ease-out' }"
                >
                  <td class="tdCell">{{ row.timestamp }}</td>
                  <td class="tdCell">{{ row.user }}</td>
                  <td class="tdCell">{{ row.action }}</td>
                  <td class="tdCell">{{ row.detail }}</td>
                  <td class="tdCell">
                    <Motion
                      tag="span"
                      class="statusPill"
                      :class="statusPillClass(row.status)"
                      :whileHover="{ scale: 1.03 }"
                      :transition="{ duration: 0.14 }"
                    >
                      <span class="statusDot" :class="statusDotClass(row.status)"></span>
                      {{ row.status }}
                    </Motion>
                  </td>
                </Motion>

                <Motion
                  v-if="filteredRows.length === 0"
                  tag="tr"
                  :initial="{ opacity: 0, y: 6 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.2, easing: 'ease-out' }"
                >
                  <td class="tdCell text-center text-black/50" colspan="5">
                    No audit logs found.
                  </td>
                </Motion>
              </Motion>
            </tbody>
          </table>
        </Motion>

        <!-- Pagination -->
        <Motion
          tag="div"
          class="flex items-center justify-center px-6 py-6"
          :initial="{ opacity: 0, y: 8 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.22, easing: 'ease-out' }"
        >
          <div class="inline-flex overflow-hidden rounded-lg border border-black/10 bg-white">
            <Motion
              tag="button"
              type="button"
              class="pgBtn px-4"
              :disabled="page === 1"
              @click="prevPage"
              :whileHover="page === 1 ? {} : { scale: 1.02 }"
              :whileTap="page === 1 ? {} : { scale: 0.96 }"
              :transition="{ duration: 0.12 }"
            >
              <ChevronLeft class="h-4 w-4" />
              <span>Previous</span>
            </Motion>

            <Motion
              v-for="p in pageButtons"
              :key="p.key"
              tag="button"
              type="button"
              class="pgBtn min-w-10 px-3"
              :class="p.type === 'page' && p.value === page ? 'bg-black/[0.03] text-black' : ''"
              :disabled="p.type === 'dots'"
              @click="p.type === 'page' ? (page = p.value) : null"
              :whileHover="p.type === 'dots' ? {} : { scale: 1.03 }"
              :whileTap="p.type === 'dots' ? {} : { scale: 0.95 }"
              :transition="{ duration: 0.1 }"
            >
              {{ p.label }}
            </Motion>

            <Motion
              tag="button"
              type="button"
              class="pgBtn px-4"
              :disabled="page === totalPages"
              @click="nextPage"
              :whileHover="page === totalPages ? {} : { scale: 1.02 }"
              :whileTap="page === totalPages ? {} : { scale: 0.96 }"
              :transition="{ duration: 0.12 }"
            >
              <span>Next</span>
              <ChevronRight class="h-4 w-4" />
            </Motion>
          </div>
        </Motion>
      </Motion>
    </Motion>
  </SystemAdminLayout>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { Motion } from "@motionone/vue";
import SystemAdminLayout from "../layout/Layout.vue";
import { ChevronDown, Search, FileDown, ChevronLeft, ChevronRight } from "lucide-vue-next";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const user = {
  name: "John Michaelson",
  role: "System Administrator",
  avatarUrl: "",
};

const STORAGE_KEY = "ncrms_system_admin_audit_reports";

function seedDefault() {
  return [
    { id: "1", timestamp: "12 Aug 2026 10:20 AM", user: "Johnny Depp", action: "Created Record", detail: "Record ID: 12345", status: "Success" },
    { id: "2", timestamp: "12 Aug 2026 10:20 AM", user: "Johnny Depp", action: "Updated Profile", detail: "Changed Email", status: "Success" },
    { id: "3", timestamp: "12 Aug 2026 10:20 AM", user: "Johnny Depp", action: "Failed Login", detail: "IP: 192.123.0.1", status: "Failed" },
    { id: "4", timestamp: "12 Aug 2026 10:20 AM", user: "Johnny Depp", action: "System Error", detail: "—", status: "Warning" },
    { id: "5", timestamp: "12 Aug 2026 10:20 AM", user: "Johnny Depp", action: "System Error", detail: "—", status: "Warning" },
    { id: "6", timestamp: "12 Aug 2026 10:20 AM", user: "Johnny Depp", action: "Failed Login", detail: "IP: 192.123.0.1", status: "Failed" },
    { id: "7", timestamp: "12 Aug 2026 10:20 AM", user: "Johnny Depp", action: "Failed Login", detail: "IP: 192.123.0.1", status: "Failed" },
    { id: "8", timestamp: "12 Aug 2026 10:20 AM", user: "Johnny Depp", action: "Failed Login", detail: "IP: 192.123.0.1", status: "Failed" },
    { id: "9", timestamp: "12 Aug 2026 10:20 AM", user: "Johnny Depp", action: "Failed Login", detail: "IP: 192.123.0.1", status: "Failed" },
    ...Array.from({ length: 40 }).map((_, i) => ({
      id: `seed-${i + 10}`,
      timestamp: "12 Aug 2026 10:20 AM",
      user: "Johnny Depp",
      action: i % 3 === 0 ? "Created Record" : i % 3 === 1 ? "System Error" : "Failed Login",
      detail: i % 3 === 0 ? "Record ID: 12345" : i % 3 === 1 ? "—" : "IP: 192.123.0.1",
      status: i % 3 === 0 ? "Success" : i % 3 === 1 ? "Warning" : "Failed",
    })),
  ];
}

function readRows() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed) && parsed.length) return parsed;

    const seeded = seedDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  } catch {
    const seeded = seedDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
}

const rows = ref([]);

onMounted(() => {
  rows.value = readRows();
});

const filters = ref({
  dateRange: "",
  user: "",
  actionType: "",
  search: "",
});

const userOptions = computed(() => {
  const set = new Set(rows.value.map((r) => r.user).filter(Boolean));
  return Array.from(set);
});

const actionOptions = computed(() => {
  const set = new Set(rows.value.map((r) => r.action).filter(Boolean));
  return Array.from(set);
});

function normalize(v) {
  return String(v || "").toLowerCase();
}

const filteredRows = computed(() => {
  const f = filters.value;

  let data = [...rows.value];

  if (f.dateRange && f.dateRange !== "all") {
  }

  if (f.user) data = data.filter((r) => r.user === f.user);
  if (f.actionType) data = data.filter((r) => r.action === f.actionType);

  const q = normalize(f.search);
  if (q) {
    data = data.filter((r) => {
      const hay = `${r.timestamp} ${r.user} ${r.action} ${r.detail} ${r.status}`;
      return normalize(hay).includes(q);
    });
  }

  return data;
});

const page = ref(1);
const pageSize = 9;

const totalPages = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / pageSize)));

const pagedRows = computed(() => {
  const start = (page.value - 1) * pageSize;
  return filteredRows.value.slice(start, start + pageSize);
});

watch(
  () => [filters.value.dateRange, filters.value.user, filters.value.actionType, filters.value.search, filteredRows.value.length],
  () => {
    page.value = 1;
  }
);

const pageButtons = computed(() => {
  const last = totalPages.value;
  const btns = [];

  const addPage = (n) => btns.push({ key: `p-${n}`, type: "page", value: n, label: String(n) });
  const addDots = (key) => btns.push({ key, type: "dots", value: null, label: "..." });

  addPage(1);
  if (last >= 2) addPage(2);
  if (last >= 3) addPage(3);
  if (last >= 4) addPage(4);

  if (last > 6) addDots("dots-1");

  if (last >= 2) addPage(Math.max(5, last - 1));
  if (last >= 1) addPage(last);

  return btns;
});

function prevPage() {
  page.value = Math.max(1, page.value - 1);
}
function nextPage() {
  page.value = Math.min(totalPages.value, page.value + 1);
}

function statusPillClass(status) {
  const s = normalize(status);
  if (s === "success") return "border-green-500/50 text-green-700 bg-green-50";
  if (s === "failed") return "border-red-500/50 text-red-600 bg-red-50";
  if (s === "warning") return "border-orange-500/50 text-orange-600 bg-orange-50";
  return "border-black/10 text-black/60 bg-black/5";
}
function statusDotClass(status) {
  const s = normalize(status);
  if (s === "success") return "bg-green-600";
  if (s === "failed") return "bg-red-500";
  if (s === "warning") return "bg-orange-500";
  return "bg-black/40";
}

function exportCSV() {
  const data = filteredRows.value;
  if (!data.length) {
    alert("No records to export.");
    return;
  }

  const headers = ["Timestamp", "User", "Action", "Detail", "Status"];
  const lines = [
    headers.join(","),
    ...data.map((r) => [
      csvEscape(r.timestamp),
      csvEscape(r.user),
      csvEscape(r.action),
      csvEscape(r.detail),
      csvEscape(r.status),
    ].join(",")),
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `system-audit-report-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function csvEscape(v) {
  const s = String(v ?? "");
  const needs = /[",\n]/.test(s);
  return needs ? `"${s.replace(/"/g, '""')}"` : s;
}

function exportPDF() {
  const data = filteredRows.value;
  if (!data.length) {
    alert("No records to export.");
    return;
  }

  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

  doc.setFontSize(14);
  doc.text("System Audit Report", 40, 40);

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString("en-GB")}`, 40, 58);

  autoTable(doc, {
    startY: 80,
    head: [["Timestamp", "User", "Action", "Detail", "Status"]],
    body: data.map((r) => [
      r.timestamp ?? "—",
      r.user ?? "—",
      r.action ?? "—",
      r.detail ?? "—",
      r.status ?? "—",
    ]),
    styles: { fontSize: 9, cellPadding: 6, overflow: "linebreak" },
    headStyles: { fillColor: [245, 245, 245], textColor: 60, fontStyle: "normal" },
    theme: "grid",
  });

  doc.save(`system-audit-report-${new Date().toISOString().slice(0, 10)}.pdf`);
}
</script>

<style scoped>
.filterSelect,
.searchInput {
  height: 42px;
  width: 160px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #fff;
  padding: 0 14px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.55);
  outline: none;
}

.searchInput {
  width: 220px;
  padding-right: 40px;
}

.filterSelect:focus,
.searchInput:focus {
  border-color: rgba(0, 0, 0, 0.22);
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.04);
}

.exportBtn {
  display: inline-flex;
  height: 42px;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(0, 0, 0, 0.03);
  padding: 0 16px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.75);
}

.exportBtn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.thCell {
  height: 58px;
  text-align: left;
  padding: 0 18px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.55);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}

.thCell:last-child {
  border-right: none;
}

.tdCell {
  height: 58px;
  padding: 0 18px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.68);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  vertical-align: middle;
}

.tdCell:last-child {
  border-right: none;
}

.statusPill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
}

.statusDot {
  height: 6px;
  width: 6px;
  border-radius: 9999px;
}

.pgBtn {
  display: inline-flex;
  height: 40px;
  align-items: center;
  gap: 8px;
  border-right: 1px solid rgba(0, 0, 0, 0.10);
  padding: 0 12px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.65);
}

.pgBtn:hover {
  background: rgba(0, 0, 0, 0.03);
}

.pgBtn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
</style>

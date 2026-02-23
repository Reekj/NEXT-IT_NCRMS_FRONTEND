<!-- src/pages/roles/system_admin/system_admin_pages/ZonalAdmins.vue -->
<template>
  <SystemAdminLayout :user="user">
    <Motion
      tag="div"
      :initial="{ opacity: 0, y: 12 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.35, easing: 'ease-out' }"
    >
      <Motion
        tag="div"
        class="rounded-2xl border border-black/10 bg-white shadow-sm"
        :initial="{ opacity: 0, y: 10, scale: 0.99 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :transition="{ duration: 0.25, easing: 'ease-out' }"
      >
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-black/10 px-7 py-5">
          <h1 class="text-[20px] font-semibold text-black">Zonal Admins</h1>

          <div class="flex items-center gap-3">
            <Motion
              tag="button"
              type="button"
              class="inline-flex h-10 items-center gap-2 rounded-lg px-4 text-[13px] font-medium text-white
                   bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                   shadow-sm hover:opacity-95 active:opacity-90"
              @click="goNew"
              :whileHover="{ scale: 1.02, y: -1 }"
              :whileTap="{ scale: 0.96 }"
              :transition="{ duration: 0.15 }"
            >
              <Search class="h-4 w-4 text-white" />
              New
            </Motion>

            <Motion
              tag="button"
              type="button"
              class="inline-flex h-10 items-center gap-2 rounded-lg border border-black/10 bg-black/5 px-4
                   text-[13px] font-medium text-black/70 hover:bg-black/10 active:bg-black/15"
              @click="exportTable"
              :whileHover="{ scale: 1.02, y: -1 }"
              :whileTap="{ scale: 0.96 }"
              :transition="{ duration: 0.15 }"
            >
              <FileDown class="h-4 w-4 text-black/60" />
              Export Table
            </Motion>
          </div>
        </div>

        <!-- Table -->
        <div class="px-0">
          <!-- Header row -->
          <Motion
            tag="div"
            class="grid grid-cols-[1.2fr_1.3fr_.9fr_.7fr_.9fr_.8fr_.7fr] gap-0"
            :initial="{ opacity: 0, y: 6 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.2, easing: 'ease-out' }"
          >
            <div class="cell cell--head">Full Name</div>
            <div class="cell cell--head">Email</div>
            <div class="cell cell--head">Assigned Zone</div>
            <div class="cell cell--head">Status</div>
            <div class="cell cell--head">Last Login</div>
            <div class="cell cell--head">Date Created</div>
            <div class="cell cell--head cell--last">Actions</div>
          </Motion>

          <!-- Body -->
          <div>
            <Motion
              tag="div"
              :initial="{ opacity: 0 }"
              :animate="{ opacity: 1 }"
              :transition="{ staggerChildren: 0.03 }"
            >
              <Motion
                v-for="row in pagedRows"
                :key="row.id"
                tag="div"
                class="grid grid-cols-[1.2fr_1.3fr_.9fr_.7fr_.9fr_.8fr_.7fr] gap-0"
                :initial="{ opacity: 0, y: 6 }"
                :animate="{ opacity: 1, y: 0 }"
                :whileHover="{ y: -2 }"
                :transition="{ duration: 0.18, easing: 'ease-out' }"
              >
                <div class="cell">
                  <div class="text-[13px] text-black/70">{{ row.fullName }}</div>
                </div>

                <div class="cell">
                  <div class="text-[13px] text-black/60">{{ row.email }}</div>
                </div>

                <div class="cell">
                  <div class="text-[13px] text-black/60">{{ row.zone }}</div>
                </div>

                <div class="cell">
                  <Motion
                    tag="span"
                    class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px]"
                    :class="statusStyles(row.status)"
                    :whileHover="{ scale: 1.03 }"
                    :transition="{ duration: 0.15 }"
                  >
                    <span class="h-1.5 w-1.5 rounded-full" :class="statusDot(row.status)"></span>
                    {{ row.status || "—" }}
                  </Motion>
                </div>

                <div class="cell">
                  <div class="text-[13px] text-black/60">{{ row.lastLogin }}</div>
                </div>

                <div class="cell">
                  <div class="text-[13px] text-black/60">{{ row.dateCreated }}</div>
                </div>

                <div class="cell cell--last">
                  <div class="flex items-center gap-4">
                    <!-- View -->
                    <Motion
                      tag="button"
                      type="button"
                      class="text-black/40 hover:text-black/70"
                      title="View"
                      @click="goView(row.id)"
                      :whileHover="{ scale: 1.12 }"
                      :whileTap="{ scale: 0.9 }"
                      :transition="{ duration: 0.12 }"
                    >
                      <Eye class="h-4 w-4" />
                    </Motion>

                    <!-- Edit -->
                    <Motion
                      tag="button"
                      type="button"
                      class="text-black/40 hover:text-black/70"
                      title="Edit"
                      @click="goEdit(row.id)"
                      :whileHover="{ scale: 1.12 }"
                      :whileTap="{ scale: 0.9 }"
                      :transition="{ duration: 0.12 }"
                    >
                      <Pencil class="h-4 w-4" />
                    </Motion>

                    <!-- Delete (UI only) -->
                    <Motion
                      tag="button"
                      type="button"
                      class="text-black/40 hover:text-red-600"
                      title="Delete"
                      @click="removeRow(row.id)"
                      :whileHover="{ scale: 1.12 }"
                      :whileTap="{ scale: 0.9 }"
                      :transition="{ duration: 0.12 }"
                    >
                      <Trash2 class="h-4 w-4" />
                    </Motion>
                  </div>
                </div>
              </Motion>
            </Motion>

            <!-- Empty state -->
            <Motion
              v-if="rows.length === 0"
              tag="div"
              class="px-7 py-12 text-center"
              :initial="{ opacity: 0, y: 10 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.22, easing: 'ease-out' }"
            >
              <div class="text-[14px] font-semibold text-black">No Zonal Admins</div>
              <div class="mt-2 text-[13px] text-black/60">
                Click <span class="font-medium">New</span> to create a Zonal Admin.
              </div>
            </Motion>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-center px-7 py-6">
          <div class="inline-flex overflow-hidden rounded-lg border border-black/10 bg-white">
            <Motion
              tag="button"
              type="button"
              class="inline-flex h-10 items-center gap-2 border-r border-black/10 px-4 text-[13px] text-black/60 hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
              @click="prevPage"
              :disabled="page === 1"
              :whileHover="page === 1 ? {} : { scale: 1.02 }"
              :whileTap="page === 1 ? {} : { scale: 0.96 }"
              :transition="{ duration: 0.12 }"
            >
              <ChevronLeft class="h-4 w-4" />
              Previous
            </Motion>

            <Motion
              v-for="p in pageButtons"
              :key="p.key"
              tag="button"
              type="button"
              class="h-10 min-w-10 border-r border-black/10 px-3 text-[13px] text-black/60 hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-60"
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
              class="inline-flex h-10 items-center gap-2 px-4 text-[13px] text-black/60 hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
              @click="nextPage"
              :disabled="page === totalPages"
              :whileHover="page === totalPages ? {} : { scale: 1.02 }"
              :whileTap="page === totalPages ? {} : { scale: 0.96 }"
              :transition="{ duration: 0.12 }"
            >
              Next
              <ChevronRight class="h-4 w-4" />
            </Motion>
          </div>
        </div>
      </Motion>
    </Motion>
  </SystemAdminLayout>
</template>

<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { Motion } from "@motionone/vue";
import { useRouter, useRoute } from "vue-router";
import SystemAdminLayout from "../layout/Layout.vue";
import {
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FileDown,
  Search,
} from "lucide-vue-next";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const router = useRouter();
const route = useRoute();

const user = {
  name: "John Michaelson",
  role: "System Administrator",
  avatarUrl: "",
};

const STORAGE_KEY = "ncrms_system_admin_zonal_admins";

function readRows() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRows(next) {
  rows.value = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

const rows = ref([]);

const page = ref(1);
const pageSize = 9;

const totalPages = computed(() => Math.max(1, Math.ceil(rows.value.length / pageSize)));

const pagedRows = computed(() => {
  const start = (page.value - 1) * pageSize;
  return rows.value.slice(start, start + pageSize);
});

function syncRows() {
  rows.value = readRows();
  page.value = Math.min(page.value, totalPages.value);
  if (page.value < 1) page.value = 1;
}

onMounted(syncRows);

watch(
  () => route.fullPath,
  () => {
    if (route.path === "/system-admin/zonal-admins") syncRows();
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

function goNew() {
  router.push("/system-admin/zonal-admins/new");
}
function goEdit(id) {
  router.push(`/system-admin/zonal-admins/${id}/edit`);
}
function goView(id) {
  router.push(`/system-admin/zonal-admins/${id}`);
}
function removeRow(id) {
  writeRows(rows.value.filter((r) => r.id !== id));
  page.value = Math.min(page.value, totalPages.value);
}

function exportTable() {
  const data = Array.isArray(rows.value) ? rows.value : [];
  if (!data.length) {
    alert("No records to export.");
    return;
  }

  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

  doc.setFontSize(14);
  doc.text("NCRMS — Zonal Admins", 40, 40);

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString("en-GB")}`, 40, 58);

  autoTable(doc, {
    startY: 80,
    head: [["Full Name", "Email", "Assigned Zone", "Status", "Last Login", "Date Created"]],
    body: data.map((r) => [
      r.fullName ?? "—",
      r.email ?? "—",
      r.zone ?? "—",
      r.status ?? "—",
      r.lastLogin ?? "—",
      r.dateCreated ?? "—",
    ]),
    styles: { fontSize: 9, cellPadding: 6, overflow: "linebreak" },
    headStyles: { fillColor: [3, 11, 47], textColor: 255, fontStyle: "bold" },
  });

  doc.save(`zonal-admins-${new Date().toISOString().slice(0, 10)}.pdf`);
}

function statusStyles(status) {
  const s = String(status || "").toLowerCase();
  if (s === "active") return "border-green-200 bg-green-50 text-green-700";
  if (s === "suspended") return "border-orange-200 bg-orange-50 text-orange-700";
  return "border-black/10 bg-black/5 text-black/60";
}
function statusDot(status) {
  const s = String(status || "").toLowerCase();
  if (s === "active") return "bg-green-600";
  if (s === "suspended") return "bg-orange-600";
  return "bg-black/40";
}
</script>

<style scoped>
/* Matches Figma cell spec:
   - min height 60px
   - padding: 10px top/bottom, 16px left/right
   - border-right + border-bottom 1px
*/
.cell {
  min-height: 60px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
}

.cell--head {
  background: rgba(0, 0, 0, 0.02);
  font-size: 13px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.5);
}

.cell--last {
  border-right: 0;
}
</style>

<!-- src/pages/roles/headquarters/headquarters_pages/ZonalCoordinatorEdit.vue -->
<template>
    <HeadquartersLayout :user="user">
      <Motion
        tag="div"
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35, easing: 'ease-out' }"
        class="space-y-6"
      >
        <h1 class="text-[22px] font-semibold tracking-tight text-black">Zonal Coordinators</h1>
  
        <Motion
          tag="section"
          class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden"
          :initial="{ opacity: 0, y: 10, scale: 0.99 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 0.25, easing: 'ease-out' }"
        >
          <div class="border-b border-black/10 px-5 py-5 sm:px-7">
            <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div class="text-[20px] font-semibold text-black">Edit Zonal Coordinator</div>
  
              <Motion
                tag="button"
                type="button"
                class="inline-flex h-10 items-center justify-center rounded-lg border border-black/10 bg-white px-4
                       text-[13px] font-semibold text-black/70 shadow-sm hover:bg-black/5 active:bg-black/10"
                @click="goBack"
                :whileHover="{ scale: 1.02, y: -1 }"
                :whileTap="{ scale: 0.96 }"
                :transition="{ duration: 0.15 }"
              >
                Back
              </Motion>
            </div>
  
            <div v-if="coordinatorId" class="mt-2 text-[13px] text-black/55">
              Editing: <span class="font-semibold text-black/70">{{ coordinatorId }}</span>
            </div>
          </div>
  
          <form class="px-5 py-6 sm:px-7 sm:py-8" @submit.prevent="onUpdate">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <!-- Full Name -->
              <div>
                <label class="mb-2 block text-[13px] font-semibold text-black/80">Full Name</label>
                <input
                  v-model.trim="form.fullName"
                  type="text"
                  class="h-12 w-full rounded-2xl border border-[#DCE7FF] bg-white px-4 text-[14px]
                         text-black/80 outline-none
                         focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <!-- Email -->
              <div>
                <label class="mb-2 block text-[13px] font-semibold text-black/80">Email Address</label>
                <input
                  v-model.trim="form.email"
                  type="email"
                  class="h-12 w-full rounded-2xl border border-[#DCE7FF] bg-white px-4 text-[14px]
                         text-black/80 outline-none
                         focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <!-- Zone -->
              <div>
                <label class="mb-2 block text-[13px] font-semibold text-black/80">Assigned Zone</label>
                <div class="relative">
                  <select
                    v-model="form.zone"
                    class="h-12 w-full appearance-none rounded-2xl border border-[#DCE7FF] bg-white px-4 pr-11 text-[14px]
                           text-black/80 outline-none
                           focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                  >
                    <option value="" disabled>Select zone</option>
                    <option v-for="z in zones" :key="z" :value="z">{{ z }}</option>
                  </select>
                  <ChevronDown
                    class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40"
                  />
                </div>
              </div>
  
              <!-- Status -->
              <div>
                <label class="mb-2 block text-[13px] font-semibold text-black/80">Account Status</label>
                <div class="relative">
                  <select
                    v-model="form.status"
                    class="h-12 w-full appearance-none rounded-2xl border border-[#DCE7FF] bg-white px-4 pr-11 text-[14px]
                           text-black/80 outline-none
                           focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                  >
                    <option value="" disabled>Select status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown
                    class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40"
                  />
                </div>
              </div>
  
              <!-- Date Created -->
              <div class="md:col-span-1">
                <label class="mb-2 block text-[13px] font-semibold text-black/80">Date Created</label>
                <div class="relative">
                  <input
                    v-model="form.dateCreatedISO"
                    type="date"
                    class="h-12 w-full rounded-2xl border border-[#DCE7FF] bg-white px-4 pr-11 text-[14px]
                           text-black/80 outline-none
                           focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                  />
                  <!-- <Calendar
                    class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40"
                  /> -->
                </div>
              </div>
            </div>
  
            <div class="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Motion
                tag="button"
                type="submit"
                class="inline-flex h-11 w-full items-center justify-center rounded-xl
                       bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                       px-7 text-[14px] font-semibold text-white shadow-sm
                       hover:opacity-95 active:opacity-90 sm:w-auto sm:text-[13px]"
                :whileHover="{ scale: 1.02, y: -1 }"
                :whileTap="{ scale: 0.96 }"
                :transition="{ duration: 0.15 }"
              >
                Update
              </Motion>
  
              <Motion
                tag="button"
                type="button"
                class="inline-flex h-11 w-full items-center justify-center rounded-xl border border-black/10 bg-white
                       px-7 text-[14px] font-semibold text-black/70 shadow-sm
                       hover:bg-black/5 active:bg-black/10 sm:w-auto sm:text-[13px]"
                @click="goBack"
                :whileHover="{ scale: 1.02, y: -1 }"
                :whileTap="{ scale: 0.96 }"
                :transition="{ duration: 0.15 }"
              >
                Cancel
              </Motion>
            </div>
          </form>
        </Motion>
      </Motion>
    </HeadquartersLayout>
  </template>
  
  <script setup>
  import { Motion } from "@motionone/vue";
  import { onMounted, reactive, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import HeadquartersLayout from "../layout/Layout.vue";
  import { Calendar, ChevronDown } from "lucide-vue-next";
  
  const router = useRouter();
  const route = useRoute();
  
  const user = {
    name: "Helena John",
    role: "Headquarters",
    avatarUrl: "",
  };
  
  const STORAGE_KEY = "ncrms_headquarters_zonal_coordinators";
  
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  
  const zones = [
    "Zone 1",
    "Zone 2",
    "Zone 3",
    "Zone 4",
    "Zone 5",
    "Zone 6",
    "Zone 7",
    "Zone 8",
    "Zone 9",
  ];
  
  const recordId = ref(String(route.params.id || ""));
  const coordinatorId = ref("");
  
  const form = reactive({
    fullName: "",
    email: "",
    zone: "",
    status: "",
    dateCreatedISO: "",
  });
  
  function formatDateToFigma(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return "";
    const dd = String(d.getDate()).padStart(2, "0");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const mmm = months[d.getMonth()];
    const yyyy = d.getFullYear();
    return `${dd} ${mmm} ${yyyy}`;
  }
  
  function parseFigmaDateToISO(figmaDate) {
    // expects "12 Jan 2025"
    const s = String(figmaDate || "").trim();
    if (!s) return "";
  
    const parts = s.split(/\s+/);
    if (parts.length < 3) return "";
  
    const dd = parts[0];
    const mmm = parts[1];
    const yyyy = parts[2];
  
    const map = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
  
    const mm = map[mmm] || "";
    if (!mm) return "";
    const day = String(dd).padStart(2, "0");
    return `${yyyy}-${mm}-${day}`;
  }
  
  function hydrate() {
    const all = readRows();
    const found = all.find((r) => String(r.id) === String(recordId.value));
    if (!found) {
      alert("Record not found.");
      router.replace("/headquarters/zonal-coordinators");
      return;
    }
  
    coordinatorId.value = found.coordinatorId || "";
  
    form.fullName = found.fullName || "";
    form.email = found.email || "";
    form.zone = found.zone || "";
    form.status = found.status || "";
    form.dateCreatedISO = parseFigmaDateToISO(found.dateCreated) || "";
  }
  
  onMounted(hydrate);
  
  function onUpdate() {
    if (!form.fullName || !form.email || !form.zone || !form.status || !form.dateCreatedISO) {
      alert("Please fill all fields.");
      return;
    }
  
    const all = readRows();
    const idx = all.findIndex((r) => String(r.id) === String(recordId.value));
    if (idx < 0) {
      alert("Record not found.");
      router.replace("/headquarters/zonal-coordinators");
      return;
    }
  
    const prev = all[idx];
  
    const updated = {
      ...prev,
      fullName: form.fullName,
      email: form.email,
      zone: form.zone,
      status: form.status,
      dateCreated: formatDateToFigma(form.dateCreatedISO),
    };
  
    const next = [...all];
    next[idx] = updated;
    writeRows(next);
  
    router.push("/headquarters/zonal-coordinators");
  }
  
  function goBack() {
    router.push("/headquarters/zonal-coordinators");
  }
  </script>
  
<template>
    <HeadquartersLayout :user="user">
      <Motion
        tag="div"
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35, easing: 'ease-out' }"
        class="space-y-6"
      >
        <Motion
          tag="section"
          class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden"
          :initial="{ opacity: 0, y: 10, scale: 0.99 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 0.25, easing: 'ease-out' }"
        >
          <div class="border-b border-black/10 px-6 py-5 sm:px-8">
            <h1 class="text-[20px] font-semibold text-black">Add HQ Officer</h1>
          </div>
  
          <form class="px-6 py-7 sm:px-8" @submit.prevent="onSave">
            <div class="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
              <div>
                <label class="mb-2 block text-[14px] sm:text-[13px] font-semibold text-black/80">Full Name</label>
                <input
                  v-model.trim="form.fullName"
                  type="text"
                  placeholder="Enter full name"
                  class="h-12 w-full rounded-xl border border-[#DCE7FF] px-5 text-[14px] text-[#6E88C7]
                         outline-none focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <div>
                <label class="mb-2 block text-[14px] sm:text-[13px] font-semibold text-black/80">Email</label>
                <input
                  v-model.trim="form.email"
                  type="email"
                  placeholder="Enter email"
                  class="h-12 w-full rounded-xl border border-[#DCE7FF] px-5 text-[14px] text-[#6E88C7]
                         outline-none focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <div>
                <label class="mb-2 block text-[14px] sm:text-[13px] font-semibold text-black/80">Phone Number</label>
                <input
                  v-model.trim="form.phone"
                  type="tel"
                  placeholder="Enter phone number"
                  class="h-12 w-full rounded-xl border border-[#DCE7FF] px-5 text-[14px] text-[#6E88C7]
                         outline-none focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <div>
                <label class="mb-2 block text-[14px] sm:text-[13px] font-semibold text-black/80">Date Created</label>
                <div class="relative">
                  <input
                    v-model.trim="form.dateCreated"
                    type="text"
                    placeholder="e.g. 12 Jan 2025"
                    class="h-12 w-full rounded-xl border border-[#DCE7FF] px-5 pr-12 text-[14px] text-[#6E88C7]
                           outline-none focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                  />
                  <Calendar class="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/35" />
                </div>
              </div>
            </div>
  
            <!-- Permissions -->
            <div class="mt-8">
              <div class="text-[20px] font-semibold text-black/90">Permissions</div>
            </div>
  
            <div class="mt-6 border-t border-black/10 pt-6">
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <label
                  v-for="p in permissionOptions"
                  :key="p.key"
                  class="flex items-center gap-3 text-[14px] font-semibold text-black/80"
                >
                  <input
                    type="checkbox"
                    class="h-4 w-4 rounded border-black/20"
                    :checked="form.permissions.includes(p.key)"
                    @change="togglePermission(p.key)"
                  />
                  <span>{{ p.label }}</span>
                </label>
              </div>
            </div>
  
            <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Motion
                tag="button"
                type="submit"
                class="h-11 w-full sm:w-[120px] rounded-xl bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                       text-[14px] font-semibold text-white shadow-sm hover:opacity-95 active:opacity-90"
                :whileHover="{ scale: 1.02, y: -1 }"
                :whileTap="{ scale: 0.97 }"
                :transition="{ duration: 0.14 }"
              >
                Save
              </Motion>
  
              <Motion
                tag="button"
                type="button"
                class="h-11 w-full sm:w-[120px] rounded-xl border border-black/10 bg-white
                       text-[14px] font-semibold text-black/70 shadow-sm hover:bg-black/5 active:bg-black/10"
                @click="onCancel"
                :whileHover="{ scale: 1.02, y: -1 }"
                :whileTap="{ scale: 0.97 }"
                :transition="{ duration: 0.14 }"
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
  import HeadquartersLayout from "../layout/Layout.vue";
  import { Calendar } from "lucide-vue-next";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  const user = {
    name: "Helena John",
    role: "Headquarters",
    avatarUrl: "",
  };
  
  const STORAGE_KEY = "ncrms_headquarters_hq_officers";
  
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
  
  const permissionOptions = [
    { key: "staff_directory_view", label: "Staff Directory - View" },
    { key: "staff_directory_manage", label: "Staff Directory - Add/Edit" },
    { key: "staff_report_view", label: "Staff Report - View" },
    { key: "staff_report_generate", label: "Staff Report - Generate" },
    { key: "criminal_record_view", label: "Criminal Record - View" },
    { key: "criminal_record_generate", label: "Criminal Record - Generate" },
    { key: "incident_report_view", label: "Incident Report - View" },
    { key: "incident_report_generate", label: "Incident Report - Generate" },
  ];
  
  const form = ref({
    fullName: "",
    email: "",
    phone: "",
    dateCreated: "",
    permissions: [],
  });
  
  function togglePermission(key) {
    const curr = new Set(form.value.permissions);
    if (curr.has(key)) curr.delete(key);
    else curr.add(key);
    form.value.permissions = Array.from(curr);
  }
  
  function onSave() {
    const next = readRows();
  
    next.unshift({
      id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
      fullName: form.value.fullName || "—",
      email: form.value.email || "—",
      phone: form.value.phone || "—",
      dateCreated: form.value.dateCreated || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      permissions: Array.isArray(form.value.permissions) ? form.value.permissions : [],
    });
  
    writeRows(next);
    router.push("/headquarters/hq-officers");
  }
  
  function onCancel() {
    router.push("/headquarters/hq-officers");
  }
  </script>
  
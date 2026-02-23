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
          <div class="border-b border-black/10 px-6 py-5 sm:px-8 flex items-center justify-between gap-4">
            <h1 class="text-[20px] font-semibold text-black">HQ Officer - View</h1>
  
            <Motion
              tag="button"
              type="button"
              class="hidden sm:inline-flex h-10 items-center gap-2 rounded-lg border border-black/10 bg-white px-4
                     text-[13px] font-semibold text-black/70 hover:bg-black/5 active:bg-black/10"
              @click="goBack"
              :whileHover="{ scale: 1.02, y: -1 }"
              :whileTap="{ scale: 0.97 }"
              :transition="{ duration: 0.14 }"
            >
              Back
            </Motion>
          </div>
  
          <div v-if="!record" class="px-6 py-10 sm:px-8 text-center">
            <div class="text-[14px] font-semibold text-black">Record not found</div>
            <div class="mt-2 text-[13px] text-black/60">This HQ Officer may have been deleted.</div>
            <div class="mt-6 flex justify-center">
              <Motion
                tag="button"
                type="button"
                class="h-11 px-6 rounded-xl border border-black/10 bg-white text-[14px] font-semibold text-black/70
                       hover:bg-black/5 active:bg-black/10"
                @click="goBack"
                :whileHover="{ scale: 1.02, y: -1 }"
                :whileTap="{ scale: 0.97 }"
                :transition="{ duration: 0.14 }"
              >
                Back
              </Motion>
            </div>
          </div>
  
          <div v-else class="px-6 py-7 sm:px-8">
            <div class="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
              <div>
                <label class="mb-2 block text-[14px] sm:text-[13px] font-semibold text-black/80">Full Name</label>
                <input
                  :value="record.fullName"
                  disabled
                  class="h-12 w-full rounded-xl border border-[#DCE7FF] bg-black/[0.03] px-5 text-[14px] text-[#6E88C7] opacity-95"
                />
              </div>
  
              <div>
                <label class="mb-2 block text-[14px] sm:text-[13px] font-semibold text-black/80">Email</label>
                <input
                  :value="record.email"
                  disabled
                  class="h-12 w-full rounded-xl border border-[#DCE7FF] bg-black/[0.03] px-5 text-[14px] text-[#6E88C7] opacity-95"
                />
              </div>
  
              <div>
                <label class="mb-2 block text-[14px] sm:text-[13px] font-semibold text-black/80">Phone Number</label>
                <input
                  :value="record.phone"
                  disabled
                  class="h-12 w-full rounded-xl border border-[#DCE7FF] bg-black/[0.03] px-5 text-[14px] text-[#6E88C7] opacity-95"
                />
              </div>
  
              <div>
                <label class="mb-2 block text-[14px] sm:text-[13px] font-semibold text-black/80">Date Created</label>
                <div class="relative">
                  <input
                    :value="record.dateCreated"
                    disabled
                    class="h-12 w-full rounded-xl border border-[#DCE7FF] bg-black/[0.03] px-5 pr-12 text-[14px] text-[#6E88C7] opacity-95"
                  />
                  <Calendar class="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/35" />
                </div>
              </div>
            </div>
  
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
                    :checked="(record.permissions || []).includes(p.key)"
                    disabled
                  />
                  <span>{{ p.label }}</span>
                </label>
              </div>
            </div>
  
            <div class="mt-10">
              <Motion
                tag="button"
                type="button"
                class="h-11 w-full sm:w-[140px] rounded-xl border border-black/10 bg-white
                       text-[14px] font-semibold text-black/70 shadow-sm hover:bg-black/5 active:bg-black/10"
                @click="goBack"
                :whileHover="{ scale: 1.02, y: -1 }"
                :whileTap="{ scale: 0.97 }"
                :transition="{ duration: 0.14 }"
              >
                Back
              </Motion>
            </div>
          </div>
        </Motion>
      </Motion>
    </HeadquartersLayout>
  </template>
  
  <script setup>
  import { Motion } from "@motionone/vue";
  import HeadquartersLayout from "../layout/Layout.vue";
  import { Calendar } from "lucide-vue-next";
  import { onMounted, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  
  const router = useRouter();
  const route = useRoute();
  
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
  
  const record = ref(null);
  
  function hydrate() {
    const id = String(route.params.id || "");
    const all = readRows();
    record.value = all.find((r) => String(r.id) === id) || null;
  }
  
  onMounted(hydrate);
  
  function goBack() {
    router.push("/headquarters/hq-officers");
  }
  </script>
  
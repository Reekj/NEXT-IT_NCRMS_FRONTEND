<!-- src/pages/roles/headquarters/headquarters_pages/ZonesEdit.vue -->
<template>
    <HeadquartersLayout :user="user">
      <Motion
        tag="div"
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35, easing: 'ease-out' }"
        class="space-y-6"
      >
        <h1 class="text-[22px] font-semibold tracking-tight text-black">Zones</h1>
  
        <Motion
          tag="section"
          class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden"
          :initial="{ opacity: 0, y: 10, scale: 0.99 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 0.25, easing: 'ease-out' }"
        >
          <div class="border-b border-black/10 px-6 py-5">
            <div class="text-[20px] font-semibold text-black">Edit Zone</div>
          </div>
  
          <form class="px-6 py-8" @submit.prevent="onUpdate">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label class="mb-2 block text-[14px] font-semibold text-black/80">Zone Name</label>
                <input
                  v-model.trim="form.zoneName"
                  type="text"
                  class="h-12 w-full rounded-2xl border border-[#DCE7FF] px-4 text-[14px] text-black/80 outline-none
                         focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <div>
                <label class="mb-2 block text-[14px] font-semibold text-black/80">Status</label>
                <div class="relative">
                  <select
                    v-model="form.status"
                    class="h-12 w-full appearance-none rounded-2xl border border-[#DCE7FF] bg-white px-4 pr-10 text-[14px] text-black/80 outline-none
                           focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/35" />
                </div>
              </div>
  
              <div class="md:col-span-2">
                <label class="mb-2 block text-[14px] font-semibold text-black/80">Description</label>
                <input
                  v-model.trim="form.description"
                  type="text"
                  class="h-12 w-full rounded-2xl border border-[#DCE7FF] px-4 text-[14px] text-black/80 outline-none
                         focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <div class="md:col-span-2 md:max-w-[420px]">
                <label class="mb-2 block text-[14px] font-semibold text-black/80">Date Created</label>
                <div class="relative">
                  <input
                    v-model.trim="form.dateCreated"
                    type="text"
                    class="h-12 w-full rounded-2xl border border-[#DCE7FF] px-4 pr-12 text-[14px] text-black/80 outline-none
                           focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                  />
                  <Calendar class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/35" />
                </div>
              </div>
            </div>
  
            <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Motion
                tag="button"
                type="submit"
                class="inline-flex h-12 w-full items-center justify-center rounded-xl px-8 text-[14px] font-semibold text-white
                       bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)] shadow-sm hover:opacity-95 active:opacity-90 sm:w-auto"
                :whileHover="{ scale: 1.02, y: -1 }"
                :whileTap="{ scale: 0.96 }"
                :transition="{ duration: 0.15 }"
              >
                Update
              </Motion>
  
              <Motion
                tag="button"
                type="button"
                class="inline-flex h-12 w-full items-center justify-center rounded-xl border border-black/10 bg-white px-8
                       text-[14px] font-semibold text-black/70 hover:bg-black/5 active:bg-black/10 sm:w-auto"
                @click="onCancel"
                :whileHover="{ scale: 1.01 }"
                :whileTap="{ scale: 0.97 }"
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
  import { onMounted, ref } from "vue";
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
  
  const STORAGE_KEY = "ncrms_headquarters_zones";
  
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
  
  const form = ref({
    id: "",
    zoneName: "",
    description: "",
    status: "Inactive",
    dateCreated: "",
  });
  
  onMounted(() => {
    const id = String(route.params.id || "");
    const rows = readRows();
    const found = rows.find((r) => String(r.id) === id);
  
    if (!found) {
      router.replace("/headquarters/zones");
      return;
    }
  
    form.value = {
      id: found.id,
      zoneName: found.zoneName || "",
      description: found.description || "",
      status: found.status || "Inactive",
      dateCreated: found.dateCreated || "",
    };
  });
  
  function onCancel() {
    router.push("/headquarters/zones");
  }
  
  function onUpdate() {
    const rows = readRows();
    const id = String(form.value.id || route.params.id || "");
  
    const nextRows = rows.map((r) => {
      if (String(r.id) !== id) return r;
      return {
        ...r,
        zoneName: String(form.value.zoneName || "").trim() || r.zoneName,
        description: String(form.value.description || "").trim() || r.description,
        status: String(form.value.status || "").trim() || r.status,
        dateCreated: String(form.value.dateCreated || "").trim() || r.dateCreated,
      };
    });
  
    writeRows(nextRows);
    router.push("/headquarters/zones");
  }
  </script>
  
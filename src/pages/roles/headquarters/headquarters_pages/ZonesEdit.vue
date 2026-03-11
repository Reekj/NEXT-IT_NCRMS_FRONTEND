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
          <div v-if="zoneId" class="mt-1 text-[13px] text-black/55">
            Editing: <span class="font-semibold text-black/70">{{ zoneId }}</span>
          </div>
        </div>

        <div v-if="isLoading" class="px-6 py-6">
          <div class="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-black/[0.02] px-4 py-2 text-[13px] text-black/60">
            <span class="h-2 w-2 rounded-full bg-black/30 animate-pulse" />
            Loading zone...
          </div>
        </div>

        <form v-else class="px-6 py-8" @submit.prevent="onUpdate">
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
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
          </div>

          <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Motion
              tag="button"
              type="submit"
              class="inline-flex h-12 w-full items-center justify-center rounded-xl px-8 text-[14px] font-semibold text-white
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)] shadow-sm hover:opacity-95 active:opacity-90
                     disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              :disabled="isSaving"
              :whileHover="isSaving ? {} : { scale: 1.02, y: -1 }"
              :whileTap="isSaving ? {} : { scale: 0.96 }"
              :transition="{ duration: 0.15 }"
            >
              {{ isSaving ? "Updating..." : "Update" }}
            </Motion>

            <Motion
              tag="button"
              type="button"
              class="inline-flex h-12 w-full items-center justify-center rounded-xl border border-black/10 bg-white px-8
                     text-[14px] font-semibold text-black/70 hover:bg-black/5 active:bg-black/10 sm:w-auto"
              @click="onCancel"
              :disabled="isSaving"
              :whileHover="isSaving ? {} : { scale: 1.01 }"
              :whileTap="isSaving ? {} : { scale: 0.97 }"
              :transition="{ duration: 0.15 }"
            >
              Cancel
            </Motion>
          </div>

          <div v-if="errorMsg" class="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
            {{ errorMsg }}
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
import { ChevronDown } from "lucide-vue-next";

import { getZoneById, updateZone } from "../../../../services/zone.service";
import { getApiErrorMessage } from "../../../../services/api";

const router = useRouter();
const route = useRoute();

const user = {
  name: "Headquarters",
  role: "Headquarters",
  avatarUrl: "",
};

const zoneId = ref(String(route.params.id || ""));

const isLoading = ref(false);
const isSaving = ref(false);
const errorMsg = ref("");

const form = reactive({
  zoneName: "",
  description: "",
  status: "inactive",
});

async function hydrate() {
  errorMsg.value = "";
  isLoading.value = true;

  try {
    const data = await getZoneById(zoneId.value);

    // accept common shapes {data:{...}} or direct object
    const z = data?.data || data?.zone || data;

    if (!z) {
      router.replace("/headquarters/zones");
      return;
    }

    form.zoneName = z?.zoneName || z?.name || "";
    form.description = z?.description || "";
    form.status = String(z?.status || "inactive").toLowerCase() === "active" ? "active" : "inactive";
  } catch (err) {
    errorMsg.value = getApiErrorMessage(err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(hydrate);

function onCancel() {
  router.push("/headquarters/zones");
}

async function onUpdate() {
  errorMsg.value = "";

  const payload = {
    zoneName: String(form.zoneName || "").trim(),
    description: String(form.description || "").trim(),
    status: String(form.status || "").trim() || "inactive",
  };

  if (!payload.zoneName || !payload.description || !payload.status) {
    errorMsg.value = "Please fill all fields.";
    return;
  }

  isSaving.value = true;
  try {
    await updateZone(zoneId.value, payload);
    router.push("/headquarters/zones");
  } catch (err) {
    errorMsg.value = getApiErrorMessage(err);
  } finally {
    isSaving.value = false;
  }
}
</script>
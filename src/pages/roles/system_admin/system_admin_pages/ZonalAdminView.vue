<!-- src/pages/roles/system_admin/system_admin_pages/ZonalAdminView.vue -->
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
        <div class="border-b border-black/10 px-7 py-5">
          <h1 class="text-[20px] font-semibold text-black">Zonal Admin</h1>
        </div>

        <div class="px-7 py-10">
          <div class="mx-auto w-full max-w-[980px]">
            <!-- Not found -->
            <Motion
              v-if="notFound"
              tag="div"
              class="rounded-xl border border-black/10 bg-white p-6 text-[13px] text-black/70"
              :initial="{ opacity: 0, y: 8 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.2, easing: 'ease-out' }"
            >
              Zonal Admin not found.
              <Motion
                tag="button"
                type="button"
                class="mt-4 inline-flex h-10 items-center rounded-lg border border-black/10 px-4 text-[13px] font-medium hover:bg-black/[0.03]"
                @click="back"
                :whileHover="{ scale: 1.03 }"
                :whileTap="{ scale: 0.95 }"
                :transition="{ duration: 0.15 }"
              >
                Back to list
              </Motion>
            </Motion>

            <!-- Details -->
            <div v-else>
              <Motion
                tag="div"
                class="grid grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-2"
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :transition="{ staggerChildren: 0.06 }"
              >
                <!-- Full Name -->
                <Motion
                  tag="div"
                  class="space-y-2"
                  :initial="{ opacity: 0, y: 8 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.2 }"
                >
                  <div class="text-[13px] font-medium text-black/70">Full Name</div>
                  <input class="input" type="text" :value="data.fullName" readonly />
                </Motion>

                <!-- Email -->
                <Motion
                  tag="div"
                  class="space-y-2"
                  :initial="{ opacity: 0, y: 8 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.2 }"
                >
                  <div class="text-[13px] font-medium text-black/70">Email Address</div>
                  <input class="input" type="text" :value="data.email" readonly />
                </Motion>

                <!-- Assigned Zone -->
                <Motion
                  tag="div"
                  class="space-y-2"
                  :initial="{ opacity: 0, y: 8 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.2 }"
                >
                  <div class="text-[13px] font-medium text-black/70">Assigned Zone</div>
                  <div class="relative">
                    <input class="input pr-10" type="text" :value="data.zone" readonly />
                    <ChevronDown
                      class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"
                    />
                  </div>
                </Motion>

                <!-- Account Status -->
                <Motion
                  tag="div"
                  class="space-y-2"
                  :initial="{ opacity: 0, y: 8 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.2 }"
                >
                  <div class="text-[13px] font-medium text-black/70">Account Status</div>
                  <div class="relative">
                    <input class="input pr-10" type="text" :value="data.status" readonly />
                    <ChevronDown
                      class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"
                    />
                  </div>
                </Motion>

                <!-- Date Created (LEFT) -->
                <Motion
                  tag="div"
                  class="space-y-2"
                  :initial="{ opacity: 0, y: 8 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.2 }"
                >
                  <div class="text-[13px] font-medium text-black/70">Date Created</div>
                  <div class="relative">
                    <input class="input pr-10" type="text" :value="data.dateCreated" readonly />
                    <Calendar
                      class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"
                    />
                  </div>
                </Motion>

                <!-- Password (RIGHT, same row as Date Created) -->
                <Motion
                  tag="div"
                  class="space-y-2"
                  :initial="{ opacity: 0, y: 8 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.2 }"
                >
                  <div class="text-[13px] font-medium text-black/70">Password</div>
                  <input
                    class="input"
                    type="password"
                    placeholder="••••••••"
                    readonly
                  />
                </Motion>

                <!-- Last Login (LEFT column, next row) -->
                <Motion
                  tag="div"
                  class="space-y-2"
                  :initial="{ opacity: 0, y: 8 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.2 }"
                >
                  <div class="text-[13px] font-medium text-black/70">Last Login</div>
                  <input class="input" type="text" :value="data.lastLogin" readonly />
                </Motion>
              </Motion>

              <div class="mt-12 flex items-center gap-4">
                <Motion
                  tag="button"
                  type="button"
                  class="h-10 rounded-lg px-8 text-[13px] font-medium text-white
                       bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                       shadow-sm hover:opacity-95 active:opacity-90"
                  @click="back"
                  :whileHover="{ scale: 1.03, y: -1 }"
                  :whileTap="{ scale: 0.95 }"
                  :transition="{ duration: 0.15 }"
                >
                  Back
                </Motion>

                <Motion
                  tag="button"
                  type="button"
                  class="h-10 rounded-lg border border-black/10 bg-white px-8 text-[13px] font-medium text-black/70
                       hover:bg-black/5 active:bg-black/10"
                  @click="goEdit"
                  :whileHover="{ scale: 1.02 }"
                  :whileTap="{ scale: 0.95 }"
                  :transition="{ duration: 0.15 }"
                >
                  Edit
                </Motion>
              </div>

              <Motion
                tag="div"
                class="mt-6 text-[11px] text-black/40"
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :transition="{ delay: 0.25 }"
              >
              </Motion>
            </div>
          </div>
        </div>
      </Motion>
    </Motion>
  </SystemAdminLayout>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { Motion } from "@motionone/vue";
import { useRouter, useRoute } from "vue-router";
import SystemAdminLayout from "../layout/Layout.vue";
import { ChevronDown, Calendar } from "lucide-vue-next";

const router = useRouter();
const route = useRoute();

const user = { name: "John Michaelson", role: "System Administrator", avatarUrl: "" };

const STORAGE_KEY = "ncrms_system_admin_zonal_admins";
const id = String(route.params.id || "");

const notFound = ref(false);

const data = reactive({
  id,
  fullName: "—",
  email: "—",
  zone: "—",
  status: "—",
  dateCreated: "—",
  lastLogin: "—",
});

function readRows() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

onMounted(() => {
  const rows = readRows();
  const found = rows.find((r) => String(r.id) === id);

  if (!found) {
    notFound.value = true;
    return;
  }

  Object.assign(data, {
    id: String(found.id),
    fullName: found.fullName || "—",
    email: found.email || "—",
    zone: found.zone || "—",
    status: found.status || "—",
    dateCreated: found.dateCreated || "—",
    lastLogin: found.lastLogin || "—",
  });
});

function back() {
  router.push("/system-admin/zonal-admins");
}
function goEdit() {
  router.push(`/system-admin/zonal-admins/${id}/edit`);
}
</script>

<style scoped>
.input {
  height: 48px;
  width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(59, 130, 246, 0.18);
  background: #fff;
  padding: 0 16px;
  font-size: 13px;
  color: rgba(59, 130, 246, 0.75);
  outline: none;
}
</style>

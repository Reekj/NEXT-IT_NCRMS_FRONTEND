<template>
  <div class="min-h-screen bg-[#F6F7FB]">
    <div class="flex">
      <!-- Sidebar -->
      <SystemAdminSidebar />

      <!-- Main column -->
      <div class="flex min-h-screen flex-1 flex-col">
        <!-- Topbar -->
        <header class="h-[76px] border-b border-black/10 bg-white">
          <div class="flex h-full items-center justify-between px-8">
            <!-- LEFT: Logout -->
            <button
              type="button"
              class="inline-flex h-9 items-center gap-2 rounded-lg px-2
                     text-[13px] font-medium text-red-600
                     hover:bg-red-50 active:bg-red-100"
              @click="logout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 8V6a2 2 0 012-2h5"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 16v2a2 2 0 002 2h5"
                />
              </svg>
              Logout
            </button>

            <!-- RIGHT: User -->
            <div class="flex items-center gap-3">
              <!-- Avatar -->
              <div class="h-11 w-11 overflow-hidden rounded-full bg-black/10">
                <img
                  v-if="displayUser?.avatarUrl"
                  :src="displayUser.avatarUrl"
                  alt="User avatar"
                  class="h-full w-full object-cover"
                />
                <div
                  v-else
                  class="grid h-full w-full place-items-center text-[12px] font-semibold text-black/60"
                >
                  {{ initials }}
                </div>
              </div>

              <!-- Name + role -->
              <div class="leading-tight">
                <div class="text-[13px] font-semibold text-black">
                  {{ displayUser?.name || "User" }}
                </div>
                <div class="text-[12px] text-black/50">
                  {{ displayUser?.role || "Role" }}
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Page -->
        <main class="flex-1 px-10 py-8">
          <slot></slot>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
import SystemAdminSidebar from "./Sidenav.vue";

const router = useRouter();

const USER_STORAGE_KEY = "ncrms_system_admin_current_user";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

function readStoredUser() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

const storedUser = ref(readStoredUser());

const displayUser = computed(() => {
  const base = props.user || {};
  const stored = storedUser.value || {};
  return {
    ...base,
    ...stored,
  };
});

const initials = computed(() => {
  const parts = String(displayUser.value?.name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const first = parts[0]?.[0] || "U";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
});

function onUserUpdated() {
  storedUser.value = readStoredUser();
}

onMounted(() => {
  window.addEventListener("ncrms-user-updated", onUserUpdated);
  window.addEventListener("storage", onUserUpdated);
});

onBeforeUnmount(() => {
  window.removeEventListener("ncrms-user-updated", onUserUpdated);
  window.removeEventListener("storage", onUserUpdated);
});

function logout() {
  localStorage.clear();
  sessionStorage.clear();
  router.replace("/login");
}
</script>

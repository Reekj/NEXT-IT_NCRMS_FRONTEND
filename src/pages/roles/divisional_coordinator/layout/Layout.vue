<template>
    <div class="min-h-screen bg-white">
      <div class="flex">
        <!-- Sidebar -->
        <Sidebar :user="user" />
  
        <!-- Main -->
        <div class="min-w-0 flex-1">
          <!-- Topbar -->
          <div class="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-black/10">
            <div class="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6 lg:px-10">
              
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
                <div class="h-11 w-11 overflow-hidden rounded-full bg-black/5">
                  <img
                    v-if="user?.avatarUrl"
                    :src="user.avatarUrl"
                    alt="Avatar"
                    class="h-full w-full object-cover"
                  />
                  <div
                    v-else
                    class="grid h-full w-full place-items-center text-[13px] font-semibold text-black/50"
                  >
                    {{ initials }}
                  </div>
                </div>
  
                <div class="leading-tight">
                  <div class="text-[13px] font-semibold text-black">
                    {{ user?.name || "Helena John" }}
                  </div>
                  <div class="text-[12px] text-black/50">
                    {{ user?.role || "Divisional Coordinator" }}
                  </div>
                </div>
              </div>
  
            </div>
          </div>
  
          <!-- Page -->
          <main class="mx-0 w-full max-w-[1200px] px-6 py-8 lg:px-10">
            <slot />
          </main>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue"
  import { useRouter } from "vue-router"
  import Sidebar from "./Sidebar.vue"
  
  const router = useRouter()
  
  const props = defineProps({
    user: { type: Object, default: () => ({}) },
    headerTitle: { type: String, default: "Surulere Division" },
  })
  
  const initials = computed(() => {
    const name = String(props.user?.name || "Helena John").trim()
    const parts = name.split(/\s+/).filter(Boolean)
    const first = parts[0]?.[0] || "U"
    const last = parts.length > 1 ? parts[parts.length - 1][0] : ""
    return (first + last).toUpperCase()
  })
  
  function logout() {
    localStorage.clear()
    sessionStorage.clear()
    router.replace("/roles")
  }
  </script>
  
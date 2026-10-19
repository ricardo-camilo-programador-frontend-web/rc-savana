<script setup lang="ts">
interface Props {
  title?: string
  message?: string
  icon?: string
  iconStyle?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'mdi:paw',
  title: 'Under Development',
  message:
    'We\'re working on something pawsome! This section of our pet shop is currently under development. Please check back later.',
})
</script>

<template>
  <div class="flex min-h-[300px] items-center justify-center p-8">
    <div
      class="relative max-w-[500px] transform overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 p-12 text-center shadow-xl transition-all duration-300 hover:scale-[1.02]"
    >
      <div
        class="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-orange-400 to-orange-500"
      />

      <Icon
        v-if="props.icon"
        :name="icon"
        :class="[props.iconStyle]"
        class="mb-6 animate-bounce text-5xl text-orange-500 transition-all"
      />

      <h2
        class="mb-6 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-4xl font-bold text-transparent"
      >
        {{ props.title }}
      </h2>

      <p class="mb-8 text-xl leading-relaxed text-gray-600">
        {{ props.message }}
      </p>

      <div class="relative mt-8">
        <div
          class="absolute inset-0 bg-gradient-to-r from-orange-200 to-yellow-200 opacity-20 blur-lg"
        />
        <Icon
          v-if="props.icon"
          :name="icon"
          :class="[props.iconStyle]"
          class="relative z-10 animate-pulse text-3xl text-orange-500 transition-all"
        />
      </div>
    </div>
  </div>
</template>

<template lang="html">
  <transition name="fade">
        <div class="popup-modal" v-if="isVisible">
            <div class="wrapper">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'PopupModal',
  data: () => ({
    isVisible: false,
  }),
  methods: {
    open() {
        this.isVisible = true
    },
    close() {
        this.isVisible = false
    },
  },
}
</script>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

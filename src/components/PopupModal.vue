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

.popup-modal {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  z-index: 1;
}

.wrapper {
  margin: 0 auto;
  padding: 1rem;
  color: white;
}
</style>

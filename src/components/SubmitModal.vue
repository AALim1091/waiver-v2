<template>
  <transition name="modal-fade">

    <div class="modal-overlay" @click="reloadPage">

      <div class="modal" @click.stop>
        <img class="check" src="../assets/submit.jpg" alt="" />
        <h6>Saved!</h6>
        <p>Your Details have been posted Successfully</p>
        <button @Click="reloadPage">Start New Form</button>
      </div>

      <div class="close" @click="reloadPage">
        <img class="close-img" src="../assets/close.jpg" alt="" />
      </div>

    </div>
  </transition>
</template>


<script>
  export default {
    methods: {
    //Reloads the page on 'Start New Form' button click    
    reloadPage() {
      window.location.reload();
    }
  }
}
</script>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: #0517a3;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
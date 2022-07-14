<template>
  <transition name="modal-fade">

    <div class="modal-overlay" @click="$emit('close-modal')">

      <div class="modal" @click.stop>
        <h6>Are you sure you want to delete this post?</h6>
        <button class="delete-modal-ok-button" @Click="Delete()">OK -> {{deleteID}}</button>
        <button class="delete-modal-cancel-button" @Click="$emit('close-modal')">Cancel</button>
      </div>

      <div class="close" @click="$emit('close-modal')">
        <img class="close-img" src="../assets/close.jpg" alt="" />
      </div>

    </div>
  </transition>
</template>


<script>
  export default {
    props: ['deleteID'],
    data(){
       deletedWaiver: null; 
    },
    methods: {
    //Reloads the page on 'Start New Form' button click    
    reloadPage() {
      window.location.reload();
    },
     async Delete(id){
            await axios.delete('https://testapi.io/api/pechangarc/resource/waiver/' + deleteID).then((response) =>{
                     //Perform Success Action
                     this.deletedWaiver = response;
                     this.getData()
                     $emit('close-modal')
                 }).catch((err) => console.error(err));
            
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

.delete-modal-cancel-button{
  background: rgb(236, 4, 4);
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
.delete-modal-ok-button{
  background: rgb(3, 169, 64);
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
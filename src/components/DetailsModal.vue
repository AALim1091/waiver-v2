<template>
  <transition name="modal-fade">

    <div class="modal-overlay" @click="$emit('close-modal')">

        <div class="details-modal" @click.stop>
            <h6>DETAILS</h6>
            <!--Show details of selected entry-->
            <!-- {{details}} -->

               <!--First Name Field-->
                <label>First Name</label>
                <div v-if="details != null">
                  {{details.first}}
                </div>
                
                <!--Last Name Field-->
                <label>Last Name</label>
                <div v-if="details != null">
                  {{details.last}}
                </div>

                <!--Email Field-->
                <label>Email</label>
                <div v-if="details != null">
                  {{details.email}}
                </div>

                <!--Phone Number Field-->
                <label>Phone Number</label>
                <div v-if="details != null">
                  {{details.phone}}
                </div>

                <!--Location Select box-->
                <label>Location:</label>
                <div v-if="details != null">
                  {{details.waiver}}
                </div>

                <!--createdAt Field-->
                <label>Created At:</label>
                <div v-if="details != null">
                  {{details.createdAt}}
                </div>

                <!--updatedAt Field-->
                <label>Updated At:</label>
                <div v-if="details != null">
                  {{details.updatedAt}}
                </div>

                <!--updatedAt Field-->
                <label>Notes:</label>
                <div v-if="details != null">
                  {{details.notes}}
                </div>

            <button class="details-modal-cancel-button" @click="$emit('close-modal')">Cancel</button>
        </div>

        <!--Close(X) button-->
        <div class="close" @click="$emit('close-modal')">
          <img class="close-img" src="../assets/close.jpg" alt="" />
        </div>

    </div>
  </transition>
</template>


<script>
import axios from "axios"
  export default {
    props: ["details"],
    // props:{
    //   detailId: {
    //         type: Number,
    //         required: true
    //   }
    // },
    
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

.details-modal {
  text-align: center;
  background-color: white;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 750px;
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
.details-close-button{
  background-color: #d70505;
  width: 150px;
  height: 40px;
  text-align: center;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
.details-modal-cancel-button {
  background-color: #b20707;
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
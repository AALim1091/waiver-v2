<template>
  <transition name="modal-fade">

    <div class="modal-overlay" @click="$emit('close-modal')">

        <div class="editNotes-modal" @click.stop>
            <h6>NOTES</h6>
            <!-- {{editNotes}} -->
            <!-- <input type = "<textarea>" class="EditNotesInput" v-model="notes" placeholder = "Enter Notes here" required > -->
            <textarea class="EditNotesInput" v-model="notes" @click=clearText() placeholder = "Enter Notes Here. . .">
             <!--Show editNotes of selected entry-->

            </textarea>
            <button class ="notes-button" @click="handleEditSubmit(editID)">Submit Notes</button>
            {{editID}}
            {{editNotes}}

            <button class="editNotes-close-button" @Click="$emit('close-modal')">Close </button>
        </div>

        <div class="close" @click="$emit('close-modal')">
            <img class="close-img" src="../assets/close.jpg" alt="" />
        </div>

    </div>
  </transition>
</template>
<!--<EditModal v-show="showEditModal" :editNotes="waiverEditNotes" :editID="waiverEditID" @close-modal="hideEditModal" />-->

<script>
import axios from "axios"
  export default {
 
    props: ["editNotes, editID"],
    methods: {
    //Reloads the page on 'Start New Form' button click    
    reloadPage() {
      window.location.reload();
    },
    handleEditSubmit(id){
      
     axios.put("https://testapi.io/api/pechangarc/resource/waiver" + id, this.notes)
                 .then((result) => {
                     //Perform Success Action
                     console.warn(result)
                     result.data.json()
                 })
                 .then(data =>{this.editNotes.updatedAt = data.updatedAt})
                 .catch(error => {
                  console.log('error here');
                 })
            
    }   
  }
}
</script>

<style scoped>
.EditNotesInput{
    vertical-align: top;
    text-align: left;
    padding: 50px;
    height: 75%;
    width: 75%;
    box-sizing: border-box;
    border: solid black;
    border-bottom: solid black;
    color: #555;
  }

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

.editNotes-modal {
  text-align: center;
  background-color: white;
  align-items: center;
  display: flex;
  flex-direction: column;
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
.editNotes-close-button{
  background-color: #d70505;
  width: 150px;
  height: 40px;
  text-align: center;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
.notes-button {
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
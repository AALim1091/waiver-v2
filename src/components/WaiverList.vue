<template>
    <div>
    <h1>Waiver List (Admin Portal)</h1>
    <!-- Search Waiver Field -->
    <div class="row">
        <!-- <label>Search Waiver</label> -->
        <!-- <form @submit.prevent class="waiverSearchForm"> -->
            <input type = "text" class="waiverSearchBar" v-model="waiverSearch" placeholder= "Search By Waiver">
            <button class="my-button-style search-button" v-on:click="getData">Search</button>  
        <!-- </form> -->

    </div>
        <table border = "1px">
            <tr>
                <td>ID</td>
                <td>Waiver</td>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Email</td>
                <td>Phone Number</td>
                <td>Consent</td>
                <td>Created At</td>
                <td>Updated At</td>
                <td>Notes</td>
                <td>Action</td>
            </tr>
             <tr v-for="waivers in waiverList" v-bind:key="waivers.id">
            <td>{{waivers.id}}</td>
            <td>{{waivers.waiver}}</td>
            <td>{{waivers.first}}</td>
            <td>{{waivers.last}}</td>
            <td>{{waivers.email}}</td>
            <td>{{waivers.phone}}</td>
            <td>
                <!--Nothing would be in the list unless consent was approved anyway-->
                <img v-if="waivers.consent === true" src="../assets/approve.jpg">
            </td>
            <td>{{waivers.createdAt}}</td>
            <td>{{waivers.updatedAt}}</td>
            <td>{{waivers.note}}</td>
             <td>
                <div class="row">
                    <div>
                        <button class="my-button-style details-button" @click="displayDetailsModal(waivers.id)">Details</button>
                    </div>
                    <div>
                        <button class="my-button-style edit-button" @click="displayEditModal(waivers.id)">Edit</button>
                    </div>
                    <div>
                        <button class="my-button-style delete-button" @click="displayDeleteModal(waivers.id)">Delete</button>
                    </div>
                </div>
            </td> 
            </tr>
        </table>        
    </div>

    <!--Show Details Modal-->
    <div>
        <DetailsModal v-show="showDetailsModal" :details="waiverDetails" @close-modal="hideDetailsModal" />
    </div>

    <!--Show Edit Modal-->
    <div>
        <EditModal v-show="showEditModal" :editNotes="waiverEditNotes" :editID="waiverEditID" @close-modal="hideEditModal" />
    </div>

     <!--Show Delete Modal-->
    <div>
        <DeleteModal v-show="showDeleteModal" :deleteID="selectedDeleteID" @close-modal="hideDeleteModal" />
    </div>

</template>



<script>
import axios from "axios"
import DetailsModal from '../components/DetailsModal.vue'
import EditModal from '../components/EditModal.vue'
import DeleteModal from '../components/DeleteModal.vue'

export default
{
    
        components: { DetailsModal,EditModal,DeleteModal },
        name: "WaiverList",
    data()
    {
        return {
            
            //For Delete Modal
            selectedDeleteID: null,

            //Display Modal Variables
            showDetailsModal: false,
            showEditModal: false,
            showDeleteModal: false,

            //array to store get values from api
            waiverList:[],
        
             //Waiver Search variable
            waiverSearch:null,
      
            //Waiver Details variable
            waiverDetails:null,
           

            //Waiver Edit Notes variable
            waiverEditNotes:null,
            waiverEditID: null
            
        }
    },
     methods:{
        displayDetailsModal(id)
        {
            //set modal visbility to true
            this.getDetails(id);
            this.showDetailsModal = true
        },
        hideDetailsModal()
        {
            //set modal visbility to false
            //this.waiverDetails = null.first;
            this.showDetailsModal = false
            this.waiverDetails.first = null;
        },
        displayEditModal(id)
        {
            //set modal visbility to true
            this.getDetails(id)
            this.showEditModal = true
        },
        hideEditModal()
        {
            //set modal visbility to false
            this.showEditModal = false
        },
        displayDeleteModal(id)
        {
            this.selectedDeleteID = id;
            //set modal visbility to true
            this.showDeleteModal = true
        },
        hideDeleteModal()
        {
            
            //set modal visbility to false
            this.showDeleteModal = false

        },
        async getData(){
        //gets data from api
        let result = await axios.get('https://testapi.io/api/pechangarc/resource/waiver');
        //warnings to console
        //console.warn(result.data.data)

        //Below cleans existing front end data, but should create one method to sanitize data in db ONCE and only worry about new entries
        //^ WIP ^
        result.data.data.forEach(entry => {
            //Sanitize Phone column
            if(entry.phone == 'n/a' || entry.phone == null || entry.phone == '000-000-0000')
            {
                entry.phone = 'N/A';
            }
            //Sanitize Consent column
            if(entry.consent == 1)
            {
                entry.consent = true;
            }

            //dealing with phone numbers that are formatted incorrectly
            //if(!entry.phone.contains('-'))
            //{
                //set this variable to the index 0,1,2 of string string (951)
                //phoneNumPart1 = 
                //set this variable to the index 3,4,5 of string string (951)
                //phoneNumPart1 = 
                //set this variable to the 1st 3 letters of string (951)
                //phoneNumPart1 = 

                //entry.phone = phoneNumPart1 + '-' + phoneNumPart2 + '-' + phoneNumPart3;            }
            //}


            //push the edited entry into DB ~~~~~
        });

        //stores each waiver entry into an array for outputting
        this.waiverList = result.data.data

        //filter wavierlist here
        if(this.waiverSearch != null && this.waiverSearch != '')
        {
            this.waiverList = this.waiverList.filter(waivers => waivers.waiver.toLowerCase().includes(this.waiverSearch.toLowerCase()));
        }



        },
        async Delete(id){
            await axios.delete('https://testapi.io/api/pechangarc/resource/waiver/' + id).then(() =>{
                     //Perform Success Action
                     this.getData()
                 }).catch((err) => console.error(err));
            
        },
        async getDetails(id){
                    
            let result = await axios.get('https://testapi.io/api/pechangarc/resource/waiver/' + id);
            
                     //Perform Success Action

                    //  For Details Modal
                     this.waiverDetails = result.data;
                      

                    //For Edit Notes Modal
                     this.waiverEditNotes = result.data.note;
                     this.waiverEditID = id;

                    // //Get notes portion from id
                    // //this deals with empty
                    if(this.waiverEditNotes === null || this.waiverEditNotes ==="")
                    {
                        this.waiverEditNotes = "There are no Notes to Edit for this entry";
                    }           
            
                    return result.data;
        }
    },
    async mounted()
    {
        this.getData()
    },
   
}
</script>

<style scoped>
.waiverSearchBar{
    padding: 10px;
    font-size: 12px;
    border: 1px solid grey;
    float: left;
    width: 80%;
    background: #f1f1f1;
}
.waiverSearchForm{
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
    }

  .search-button{
    background: rgb(4, 124, 236);
    border:0;
    padding: 10px 20px;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    margin-left: -150px;
  }

  .delete-button{
    background: rgb(236, 4, 4);
    cursor: pointer;
  }
  .details-button{
    background: rgb(5, 24, 122);
    cursor: pointer;
  }
  .edit-button{
    background: rgb(177, 15, 210);
    cursor: pointer;
  }
</style>
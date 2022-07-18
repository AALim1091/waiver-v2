<template>
    <div>
    <h1>Waiver List (Admin Portal)</h1>

     <div>
        <h2><small><b>Filter by Date or Waiver then click "Search" Button</b></small></h2>
        <i><b><p>*To Clear a search: </p></b></i>
        <small><p><b>-Waiver Search:</b> Empty search box then click the "Search" Button </p></small>
        <small><p><b>-Date Search:</b> Click the Date X and then the "Search" Button </p></small>
    </div>

    <!-- Search Waiver Field -->
        <div class="row">
            <!-- <label>Search Waiver</label> -->
            <!-- <form @submit.prevent class="waiverSearchForm"> -->
                <input type = "text" class="waiverSearchBar" v-model="waiverSearch" placeholder= "Search By Waiver">
                <button class="my-button-style search-button" v-on:click="getData">Search</button>  
            <!-- </form> -->
        </div>

     <!-- Date Range Picker Field -->
        <Datepicker range @reset="clearDateTime" v-model="selectedDate" :lang="datePickerLanguage" :show-clear-button="true" :circle="true" />

    <!-- Present total items on the page for user -->
    <div>total items in list: {{totalItems}}</div>
    <div>total items on page: {{totalItemsPerPage}}</div>
    <div>Page number: {{pageNum + 1}}</div>


     <!--Pagination Componenet-->
     <!-- Location Select box -->
    <label>Select Page:</label>
      <select class="pageSelect" @change="selectPage(pageNum)"  v-model ="pageNum" boarder="1px">  
        <!-- <v-on:change="changeRoute($event)" -->
        <option :value ="0"> 1 </option>
        <option :value ="1"> 2 </option>
        <option :value ="2"> 3 </option>
      </select>
<button v-if="pageNum > 0" class="previousPageButton" v-on:click="prevPage">Prev Page</button>
<button v-if="this.pagedData[this.pageNum + 1] != null" class="nextPageButton" v-on:click="nextPage">Next Page</button>  

    
<!------------------------------------------------------------------------------------------------------------------->
       <!-- TABLE OF DATA -->
<!------------------------------------------------------------------------------------------------------------------->       
        <table class="waiverListTable">
            <tr>
                <td><b>ID</b></td>
                <td><b>Waiver</b></td>
                <td><b>First Name</b></td>
                <td><b>Last Name</b></td>
                <td><b>Email</b></td>
                <td><b>Phone Number</b></td>
                <td><b>Consent</b></td>
                <td><b>Created At</b></td>
                <td><b>Updated At</b></td>
                <td><b>Notes</b></td>
                <td><b>Action</b></td>
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
                <img class="consentImg" v-if="waivers.consent === true" src="../assets/approve.jpg">
            </td>
            <td>{{waivers.createdAt}}</td>
            <td>{{waivers.updatedAt}}</td>
            <td>{{waivers.notes}}</td>
             <td>
                <div class="row">
                    <div>
                        <button class="my-button-style details-button" @click="displayDetailsModal(waivers.id)">Details</button>
                    </div>
                    <div>
                        <button class="my-button-style edit-button" @click="displayEditModal(waivers.id)">Add/Edit Notes</button>
                    </div>
                    <div>
                        <button class="my-button-style delete-button" @click="displayDeleteModal(waivers.id)">Delete</button>
                    </div>
                </div>
            </td> 
            </tr>
        </table>        
    </div>
<!------------------------------------------------------------------------------------------------------------------->
        <!--Modals-->
<!------------------------------------------------------------------------------------------------------------------->
    <!--Show Details Modal-->
    <div>
        <DetailsModal v-show="showDetailsModal" :details="waiverDetails" @close-modal="hideDetailsModal" />
    </div>

    <!--Show Edit Modal-->
    <div>
        <EditModal v-show="showEditModal" :details="waiverDetails" @close-modal="hideEditModal" />
    </div>

     <!--Show Delete Modal-->
    <div>
        <DeleteModal v-show="showDeleteModal" :deleteID="selectedDeleteID" @close-modal="hideDeleteModal" />
    </div>

</template>

<!------------------------------------------------------------------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------------------->
<script>

//For CRUD/access to API
import axios from "axios"

//Modals
import DetailsModal from '../components/DetailsModal.vue';
import EditModal from '../components/EditModal.vue';
import DeleteModal from '../components/DeleteModal.vue';

//DatePicker
import 'vue-datepicker-ui/lib/vuedatepickerui.css';
import VueDatepickerUi from 'vue-datepicker-ui';
//Moment for DatePicker -> formats date/time
import moment from 'moment';

//Pagination


export default
{
    
        components: { DetailsModal, EditModal, DeleteModal, Datepicker: VueDatepickerUi},
        name: "WaiverList",
    data()
    {
        return {
            
            //Pagination
            perPage: 20, //# of items per page
            totalItemsPerPage: null, //total # of items per page
            totalItems: null, //total # of items in list
            pages:[], //total # of pages
            pagedData:[], //sectioned items
            pageNum: 0,
            maxPageCount: 0,

            //DatePicker
            selectedDate: 
            [
                new Date(),
                new Date()
            ],
            
            //Date-Picker-Variables
            datePickerLanguage: 'en',
            formatedCreateAtDate: null ,
            formattedUpdatedAt: null,


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
            //Pagination aka a nightmare 
            createPageData(dataList, itemsPerPage)
            {   
                this.pagedData = []; //sectioned items 
                let splitPage = [];
                let count = 1;
                let itemsPerPageIncrement = 1;
                //this.pagedData = new Array(5);
                for(let i = 0; i <= dataList.length; i++) //iterate through entire list
                {
                    splitPage.push(dataList[i]); //push  item into splitpage
                    //- 1 because of - based indexing
                    if(itemsPerPageIncrement == itemsPerPage || i == dataList.length - 1) //seperate if # of items equal desired item count for page
                    {
                        let tempArray = JSON.parse(JSON.stringify(splitPage));
                        this.pagedData.push(tempArray);
                        splitPage = []; //empty for next items per page
                        this.pages.push(count);
                        count++;
                        itemsPerPageIncrement = 0;
                    }
                    itemsPerPageIncrement++;               
                }
            },
            selectPage(selectionNum)
            {
                this.pageNum = selectionNum;
                this.getData();
            },
            prevPage()
            {
                this.pageNum--;
                this.getData();
            },
            nextPage()
            {
               this.pageNum++;
               this.getData();
            },
            // maxPages()
            // {
            //     for(let i = 0; i <= this.pages.length; i++)
            //     {
            //         maxPageCount++;
            //     }
            //     return maxPageCount;
            // },
            formatDateTime(value)
            {
                //console.log(moment(value).format('DD-MM-YYYY'))
                //.toDate()
                return moment(value).format('MM-DD-YYYY');
            },
            clearDateTime()
            {
                this.selectedDate[0] = null
                this.selectedDate[1] = null
            },
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
                //this.getData();
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            async getData(){
            //gets data from api
            let result = await axios.get('https://testapi.io/api/pechangarc/resource/waiver'); 
            //warnings to console
            //console.warn(result.data.data)

            //Below cleans existing front end data, but should create one method to sanitize data in db ONCE and only worry about new entries
            //^ WIP ^

            this.totalItems = result.data.data.length;
            console.log(this.totalItems)

            


            result.data.data.forEach(entry => {
                //count for Pagination
                

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
                if(entry.createdAt != null || entry.updatedAt != null)
                {

                    entry.createdAt = this.formatDateTime(entry.createdAt); 
                    entry.updatedAt = this.formatDateTime(entry.updatedAt);

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

            //console.log(this.selectedDate)

            //////////////Filter By Search////////////////////////////
            if(this.waiverSearch != null && this.waiverSearch != '')
            {
                this.waiverList = this.waiverList.filter(waivers => waivers.waiver.toLowerCase().includes(this.waiverSearch.toLowerCase()));
            }
            ////////////////Filter By Date////////////////////////////
            if(this.selectedDate[0] != null && this.selectedDate[1] != null)
            {
                    
                    console.log("DATES ARE SELECTED")
                    console.log(this.selectedDate)
                    
                    
                    this.waiverList = this.waiverList.filter(waivers => 
                        new Date(waivers.createdAt) >= this.selectedDate[0] 
                        &&  new Date(waivers.createdAt) <= this.selectedDate[1]
                    );

            }
            console.log(this.waiverList);
            ////////////////Pagination////////////////////////////
                this.createPageData(this.waiverList, this.perPage)
                this.waiverList = this.pagedData[this.pageNum];
                this.totalItemsPerPage = this.waiverList.length; //For item count of page

            
            
            },
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////            
            async Delete(id){
                await axios.delete('https://testapi.io/api/pechangarc/resource/waiver/' + id).then(() =>{
                        //Perform Success Action
                        this.getData()
                    }).catch((err) => console.error(err));
                
            },
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            async getDetails(id){
                        
                let result = await axios.get('https://testapi.io/api/pechangarc/resource/waiver/' + id);
                
                        //Perform Success Action
                        //  For Details Modal
                        this.waiverDetails = result.data;
           
            }
        },
    async mounted()
    {
        this.getData()
        this.clearDateTime()
    },
   
}
</script>

<style scoped>
/* .pageSelect{
  float:left;
} */
.pageSelect{
   cursor: pointer;
}
.previousPageButton{
    background: rgb(8, 169, 197);
    position: absolute;
    top:38%;
    left: 0;
    cursor: pointer;
}
.nextPageButton{
    background: rgb(8, 169, 197);
    position:absolute;
    top: 38%;
    right:0;
    cursor: pointer;   
}
.waiverListTable{
    border: 1px solid;
    width: 100%;
    height: 100%;
}
.tr,td{
    border: 1px solid;
}
.consentImg{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
}
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
    background: rgb(15, 67, 150);
    cursor: pointer;
  }
</style>
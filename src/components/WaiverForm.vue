<template>
<!--
  <p>
    {{form.waiver}}
  </p>
-->
<img v-if="form.waiver === spaConstant" alt="Pechanga logo" src="../assets/Spa-logo.png">
<img v-if="form.waiver === golfConstant" alt="Pechanga logo" src="../assets/Journey-logo.jpg">
<img v-if="form.waiver === casinoConstant" alt="Pechanga logo" src="../assets/logo.jpg">

  <div class="WaiverForm">
    <h1>{{ msg }}</h1> 
  </div>
  <!--Mock Waiver agreements-->

    <ul v-if="form.waiver === golfConstant">
      <li>{{golfBulletPoint1}}</li>
      <li>{{golfBulletPoint2}}</li>
      <li>{{golfBulletPoint3}}</li>
    </ul>
     <ul v-if="form.waiver === spaConstant">
      <li>{{spaBulletPoint1}}</li>
      <li>{{spaBulletPoint2}}</li>
      <li>{{spaBulletPoint3}}</li>
    </ul>
     <ul v-if="form.waiver === casinoConstant">
      <li>{{casinoBulletPoint1}}</li>
      <li>{{casinoBulletPoint2}}</li>
      <li>{{casinoBulletPoint3}}</li>
    </ul>
 

  <form class ="waiverForm" @submit.prevent method = "post">
    <!--First Name Field-->
    <label>First Name</label>
    <input type = "text" v-model="form.first" placeholder = "First Name" required >
    <!--Last Name Field-->
    <label>Last Name</label>
    <input type = "text" v-model="form.last" placeholder = "Last Name" required >
    <!--Email Field-->
    <label>Email</label>
    <input type = "email" v-model="form.email" placeholder = "something@something.com/net/org/etc"  required >
    <!--Phone Number Field-->
    <label>Phone Number</label>
    <input type = "tel" v-model="form.phone" minlength="0" maxlength="14" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder = "xxx-xxx-xxxx"> <!--Phone Number is NOT required-->
    <!--Location Select box-->
    <label>Location:</label>
      <select v-model ="form.waiver">
        <option :value ="golfConstant"> Golf </option>
        <option :value ="spaConstant"> Spa </option>
        <option :value ="casinoConstant"> Casino </option>
      </select>
      <!--Terms and conditions checkbox-->
    <div class = "consent">
      <input type = "checkbox" v-model = "form.consent" required >
      <label>I agree to the following terms and conditions.</label>
    </div>
    <!--Submit Button-->
    <div class = "submit">
        <button class="my-button-style submit-button" @click="handleSubmit">Submit</button>
    </div>
  </form>

  <!--Post Successful Message-->
  <SubmitModal v-show="showModal" @close-modal="hideSubmitModal" />

   


  <!-- For Testing  Form 
  <p> text: {{ this.text }}</p>
  <p> SUCCESS: {{form.submitSuccessful}}</p>
  <p> First Name: {{form.first}}</p>
  <p> Last Name: {{form.last}}</p>
  <p> Email: {{form.email}}</p>
  <p> Phone Number: {{form.phone}}</p>
  <p> Location: {{form.waiver}}</p>
  <p> Terms Accepted: {{form.consent}}</p>
-->
 <!-- Populate the Waiver hidden field value through a url querystring parameter. Ie: index.html?waiver={spa/golf/casino}  -->

</template>

<script>
import axios from 'axios';
import SubmitModal from '../components/SubmitModal.vue'

export default {
  components: { SubmitModal },
  name: 'WaiverForm',
  data()
  {
    return{
      showModal: false,
      form: {
        first: "testttt",
        last: "testttt",
        email: "testttt@gmail",
        phone: "",
        waiver: "Golf",
        consent: true,

      },
      golfConstant: "Golf",
      spaConstant: "Spa",
      casinoConstant: "Casino",
      golfBulletPoint1: "Golf bullet point 1",
      golfBulletPoint2: "Golf bullet point 2",
      golfBulletPoint3: "Golf bullet point 3",
      spaBulletPoint1: "Spabullet point 1",
      spaBulletPoint2: "Spa bullet point 2",
      spaBulletPoint3: "Spa bullet point 3",
      casinoBulletPoint1: "Casino bullet point 1",
      casinoBulletPoint2: "Casino bullet point 2",
      casinoBulletPoint3: "Casino bullet point 3"
      
    }
  },
  methods: {
     displaySubmitModal()
    {
        //set modal visbility to true
        this.showModal = true
    },
    hideSubmitModal()
    {
        //set modal visbility to false
        this.showModal = false
    },
    handleSubmit(){
      if(this.form.phone === null || this.form.phone === "")
      {
        this.form.phone = '000-000-0000'
      }
     axios.post("https://testapi.io/api/pechangarc/resource/waiver", this.form)
                 .then((result) => {
                     //Perform Success Action
                     //console.warn(result)
                     this.displaySubmitModal();
                 }).catch(error => {
                  console.log('error here');
                 })
            
    }
  },
  props: {
    msg: String,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  form.waiverForm{
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
    }
  label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }
  input{
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
  }
  input[type = "checkbox"]{
    display: inline-block;
    width: 16px;
    margin: 0 10px 0 0;
    position: relative;
    top: 2px;
  }
  .submit-button{
    background: green;
  }

  .my-button-style
  {
    border:0;
    padding: 5px 10px;
    color: white;
    border-radius: 20px;
  }

  .submit{
    text-align: center;
  }
  ul{
    text-align:center;
    list-style-position: inside;
  }
</style>

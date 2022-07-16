import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//DataPicker usage
import VueDatepickerUi from 'vue-datepicker-ui'
import 'vue-datepicker-ui/lib/vuedatepickerui.css';

createApp(App).use(router).mount('#app')

//Data Picker
//app.component('Datepicker', VueDatepickerUi)
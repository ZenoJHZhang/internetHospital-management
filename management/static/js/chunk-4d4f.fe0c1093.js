(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4d4f"],{EmVA:function(t,e,r){"use strict";r.d(e,"e",function(){return a}),r.d(e,"b",function(){return n}),r.d(e,"f",function(){return s}),r.d(e,"c",function(){return i}),r.d(e,"a",function(){return l}),r.d(e,"d",function(){return c});var o=r("t3Un");function a(t,e,r,a){return Object(o.a)({url:"/managementDoctor/listDoctorByNameOrNumberWithDepartmentId",method:"post",params:{doctorMessage:t,departmentId:e,pageNumber:r,pageSize:a}})}function n(t){return Object(o.a)({url:"/managementDoctor/getDoctorById",method:"get",params:{doctorId:t}})}function s(t){return Object(o.a)({url:"/managementDoctor/updateDoctor",method:"post",data:t})}function i(t){return Object(o.a)({url:"/managementDoctor/insertDoctor",method:"post",data:t})}function l(t){return Object(o.a)({url:"/managementDoctor/deleteDoctor",method:"post",params:{doctorId:t}})}function c(t,e){return Object(o.a)({url:"/img/insertDoctorImg",method:"post",params:{imgStr:t,doctorId:e}})}},JLmY:function(t,e,r){"use strict";e.a={getDay:function(t,e){var r=new Date,o=r.getTime(),a=864e5*t;r.setTime(parseInt(o+a));var n=r.getFullYear(),s=(r.getMonth()+1).toString();s.length<=1&&(s="0"+s);var i=r.getDate().toString();return i.length<=1&&(i="0"+i),n+e+s+e+i}}},MvBy:function(t,e,r){"use strict";r.d(e,"f",function(){return a}),r.d(e,"h",function(){return n}),r.d(e,"d",function(){return s}),r.d(e,"b",function(){return i}),r.d(e,"e",function(){return l}),r.d(e,"g",function(){return c}),r.d(e,"c",function(){return d}),r.d(e,"a",function(){return u});var o=r("t3Un");function a(t,e){return Object(o.a)({url:"/managementNormalSchedule/list",method:"post",params:{departmentId:t,scheduleTime:e}})}function n(t,e,r){return Object(o.a)({url:"/managementNormalSchedule/update",method:"post",params:{scheduleDepartmentId:t,timeInterval:e,totalNumber:r}})}function s(t,e,r,a){return Object(o.a)({url:"/managementNormalSchedule/insert",method:"post",params:{departmentId:t,scheduleTime:e,timeInterval:r,totalNumber:a}})}function i(t,e){return Object(o.a)({url:"/managementNormalSchedule/delete",method:"post",params:{scheduleDepartmentId:t,timeInterval:e}})}function l(t,e){return Object(o.a)({url:"/managementExpertSchedule/list",method:"post",params:{departmentId:t,scheduleTime:e,type:1}})}function c(t,e,r){return Object(o.a)({url:"/managementExpertSchedule/update",method:"post",params:{scheduleDoctorId:t,timeInterval:e,totalNumber:r}})}function d(t,e,r,a,n){return Object(o.a)({url:"/managementExpertSchedule/insert",method:"post",params:{departmentId:t,doctorId:e,scheduleTime:r,timeInterval:a,totalNumber:n}})}function u(t,e){return Object(o.a)({url:"/managementExpertSchedule/delete",method:"post",params:{scheduleDoctorId:t,timeInterval:e}})}},TIhl:function(t,e,r){},uRCV:function(t,e,r){"use strict";r.r(e);var o=r("4d7F"),a=r.n(o),n=r("JLmY"),s=r("EmVA"),i=r("MvBy"),l={data:function(){return{doctorId:16,departmentId:0,doctorMessage:"",pageNumber:1,pageSize:4,total:1,doctorList:[],confirmDeleteVisible:!1,doctor:"",pickerOption:{disabledDate:function(t){var e=new Date,r=e.setDate(e.getDate()+7);return t<=new Date||t>=r}},scheduleTime:"",tableData:[{}],todayScheduleDoctorDtoList:[],noDoctor:!1,insertTable:[{}]}},mounted:function(){this.$nextTick(function(){this.scheduleTime=n.a.getDay(1,"-"),this.listExpert()})},methods:{getDoctorDetail:function(){var t=this,e=this.doctorId;return null==e&&this.$router.push({name:"ScheduleManagement"}),new a.a(function(r,o){Object(s.b)(e).then(function(e){t.doctor=e.data.returnData,t.doctorDepartmentList=t.doctor.departmentList,r(e)}).catch(function(t){o(t)})})},listExpert:function(){var t=this,e=this.$route.query.departmentId;null==e?this.$router.push({name:"ScheduleManagement"}):this.departmentId=e,Object(i.e)(this.departmentId,this.scheduleTime).then(function(e){if(200===e.data.returnCode){var r=e.data.returnData;t.todayScheduleDoctorDtoList=r.todayScheduleDoctorDtoList,0===t.todayScheduleDoctorDtoList.length?t.noDoctor=!0:(t.doctorId=t.todayScheduleDoctorDtoList[0].doctorId,t.getDoctorDetail(),t.todayScheduleDoctorDtoList.forEach(function(e){0!==e.length&&(t.$set(e,"show",!1),t.$set(e,"time",[]))}))}})},handleDelete:function(t,e){var r=this;Object(i.a)(e.scheduleDoctorId,e.timeInterval).then(function(t){200===t.data.returnCode&&(r.$store.state.errorTokenVisible=!0,r.$store.state.errorTokenMessage="专家科室排班删除成功！",r.listExpert())})},updateScheduleDoctor:function(t){var e=this;void 0===t.totalNumber||void 0===t.timeInterval?(this.$store.state.errorTokenVisible=!0,this.$store.state.errorTokenMessage="请将排班信息填写完整"):Object(i.g)(t.scheduleDoctorId,t.timeInterval,t.totalNumber).then(function(t){200===t.data.returnCode&&(e.$store.state.errorTokenVisible=!0,e.$store.state.errorTokenMessage="专家科室排班更新成功！",e.listExpert())})},filterTimeInterval:function(t){for(var e=[{value:"上午",label:"上午"},{value:"下午",label:"下午"},{value:"晚上",label:"晚上"}],r=function(r){t.scheduleDoctorDtoList.forEach(function(t){t.timeInterval===e[r].value&&e.splice(r,1)})},o=0;o<e.length;o++)r(o);this.$set(t,"time",e)},toggle:function(t){t.show=!t.show,this.filterTimeInterval(t)},insertExpert:function(t){var e=this,r=void 0,o=this.insertTable[0].totalNumber,a=this.insertTable[0].timeInterval;void 0===o||void 0===a?(this.$store.state.errorTokenVisible=!0,this.$store.state.errorTokenMessage="请将排班信息填写完整"):0!==t.scheduleDoctorDtoList.length?(r=t.scheduleDoctorDtoList[0].scheduleDoctorId,Object(i.g)(r,a,o).then(function(t){200===t.data.returnCode&&(e.$store.state.errorTokenVisible=!0,e.$store.state.errorTokenMessage="专家科室排班新增成功！",e.listExpert())})):Object(i.c)(this.departmentId,this.doctorId,this.scheduleTime,a,o).then(function(t){200===t.data.returnCode&&(e.$store.state.errorTokenVisible=!0,e.$store.state.errorTokenMessage="专家科室排班新增成功！",e.listExpert())}),this.insertTable=[{}]},changeDoctor:function(t){this.doctorId=t.doctorId,this.getDoctorDetail()}}},c=(r("zwEb"),r("KHd+")),d=Object(c.a)(l,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-container",[r("el-aside",{staticStyle:{"padding-top":"50px","margin-left":"5%"},attrs:{width:"50%"}},[r("span",{staticStyle:{"font-weight":"700","margin-right":"50px"}},[t._v("排班日期")]),t._v(" "),r("el-date-picker",{attrs:{"picker-options":t.pickerOption,align:"right",type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:t.scheduleTime,callback:function(e){t.scheduleTime=e},expression:"scheduleTime"}}),t._v(" "),r("div",[t.noDoctor?r("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"30px"},attrs:{shadow:"hover"}},[t._v("暂无医生")]):t._e()],1),t._v(" "),t.noDoctor?t._e():r("div",t._l(t.todayScheduleDoctorDtoList,function(e,o){return r("div",{key:o},[r("div",{on:{click:function(r){t.changeDoctor(e)}}},[r("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"30px"},attrs:{shadow:"hover"}},[r("div",{staticStyle:{"font-weight":"700","margin-left":"10px","margin-bottom":"10px"}},[r("span",[t._v(t._s(e.doctorName))]),t._v(" "),e.scheduleDoctorDtoList.length<3?r("el-button",{staticStyle:{"margin-left":"70%"},attrs:{type:"primary"},on:{click:function(r){t.toggle(e)}}},[t._v("新增排班")]):t._e()],1),t._v(" "),r("el-table",{staticStyle:{width:"760px"},attrs:{data:e.scheduleDoctorDtoList,stripe:""}},[r("el-table-column",{attrs:{prop:"timeInterval",label:"时段",width:"300"}}),t._v(" "),r("el-table-column",{attrs:{prop:"totalNumber",label:"号源数",width:"240"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-input",{attrs:{type:"number",step:"1",min:"1"},model:{value:e.row.totalNumber,callback:function(r){t.$set(e.row,"totalNumber",r)},expression:"scope.row.totalNumber"}})]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(r){t.updateScheduleDoctor(e.row)}}},[t._v("更新排班")]),t._v(" "),r("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(r){t.handleDelete(e.$index,e.row)}}},[t._v("删除排班")])]}}])})],1),t._v(" "),e.show?r("div",[r("div",{staticStyle:{"font-weight":"700","margin-top":"20px"}},[t._v("新增排班信息填写")]),t._v(" "),r("el-table",{staticStyle:{width:"760px","margin-top":"20px"},attrs:{data:t.insertTable,stripe:""}},[r("el-table-column",{attrs:{prop:"timeInterval",label:"时段",width:"300"},scopedSlots:t._u([{key:"default",fn:function(o){return[r("el-select",{model:{value:o.row.timeInterval,callback:function(e){t.$set(o.row,"timeInterval",e)},expression:"scope.row.timeInterval"}},t._l(e.time,function(t){return r("el-option",{key:t.index,attrs:{label:t.label,value:t.value}})}))]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"totalNumber",label:"号源数",width:"240"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-input",{attrs:{type:"number",step:"1",min:"1"},model:{value:e.row.totalNumber,callback:function(r){t.$set(e.row,"totalNumber",r)},expression:"scope.row.totalNumber"}})]}}])})],1),t._v(" "),r("el-button",{staticStyle:{"margin-top":"20px","margin-left":"50px"},attrs:{type:"primary"},on:{click:function(r){t.insertExpert(e)}}},[t._v("确认添加")]),t._v(" "),r("el-button",{on:{click:function(r){t.toggle(e)}}},[t._v("取消")])],1):t._e()],1)],1)])}))],1),t._v(" "),r("el-main",{staticStyle:{"text-align":"center","margin-top":"20px",padding:"30px","margin-left":"5%","margin-right":"5%"}},[t.noDoctor?t._e():r("div",[r("el-card",{attrs:{"body-style":{padding:"0px",height:"360px"},shadow:"hover"}},[r("div",{attrs:{slot:"header"},slot:"header"},[r("span",{staticStyle:{"font-weight":"700","font-size":"18px"}},[t._v(t._s(t.doctor.doctorName))])]),t._v(" "),r("el-row",{staticStyle:{"padding-top":"40px","padding-left":"25%"}},[r("el-col",[r("img",{staticStyle:{width:"120px",height:"120px"},attrs:{src:t.doctor.imgPath}})])],1),t._v(" "),r("el-row",[r("el-col",{staticClass:"title",attrs:{span:8}},[r("div",[t._v("医生工号")])]),t._v(" "),r("el-col",{staticClass:"detail",attrs:{span:14}},[r("div",[t._v(t._s(t.doctor.doctorNumber))])])],1),t._v(" "),r("el-row",{staticClass:"row-style"},[r("el-col",{staticClass:"title",attrs:{span:8}},[r("div",[t._v("医生职称")])]),t._v(" "),r("el-col",{staticClass:"detail",attrs:{span:14}},[r("div",[t._v(t._s(t.doctor.doctorTitle))])])],1),t._v(" "),r("el-row",{staticClass:"row-style"},[r("el-col",{staticClass:"title",attrs:{span:8}},[r("div",[t._v("医生擅长")])]),t._v(" "),r("el-col",{staticClass:"detail",attrs:{span:14}},[r("div",[t._v(t._s(t.doctor.goodAt))])])],1),t._v(" "),r("el-row",{staticClass:"row-style"},[r("el-col",{staticClass:"title",attrs:{span:8}},[r("div",[t._v("医生手机号")])]),t._v(" "),r("el-col",{staticClass:"detail",attrs:{span:14}},[r("div",[t._v(t._s(t.doctor.phone))])])],1),t._v(" "),r("el-row",{staticClass:"row-style"},[r("el-col",{staticClass:"title",attrs:{span:8}},[r("div",[t._v("医生身份证号")])]),t._v(" "),r("el-col",{staticClass:"detail",attrs:{span:14}},[r("div",[t._v(t._s(t.doctor.doctorIdCard))])])],1),t._v(" "),r("el-row",{staticClass:"row-style"},[r("el-col",{staticClass:"title",attrs:{span:8}},[r("div",[t._v("医生所属科室")])]),t._v(" "),r("el-col",{staticClass:"detail",attrs:{span:14}},[r("el-row",{staticStyle:{"margin-bottom":"15px"},attrs:{gutter:20}},t._l(t.doctor.departmentList,function(e,o){return r("el-col",{key:o,attrs:{span:12}},[t._v(t._s(e.departmentName))])}))],1)],1)],1)],1)])],1)],1)},[],!1,null,null,null);d.options.__file="expertDepartmentSchedule.vue";e.default=d.exports},zwEb:function(t,e,r){"use strict";var o=r("TIhl");r.n(o).a}}]);
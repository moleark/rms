(this.webpackJsonprms=this.webpackJsonprms||[]).push([[3],{122:function(e,t,n){e.exports=n.p+"static/media/logo.ee7cd8ed.svg"},124:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n(11),a=n(29),o=n(17),c=(n(98),n(52)),s=n(122);function u(){return i.nav.loginTop(r.createElement("div",{className:"d-flex align-items-center position-relative"},r.createElement("img",{className:"App-logo h-3c position-absolute",src:s,alt:"img"}),r.createElement("div",{className:"h3 flex-fill text-center"},r.createElement("span",{className:"text-primary mr-3"},"\u540c"),r.createElement("span",{className:"text-danger"},"\u82b1"))))}var l=[{type:"mobile",caption:"\u624b\u673a\u53f7",regex:i.mobileRegex},{type:"email",caption:"\u90ae\u7bb1",regex:i.emailRegex}];function m(e){return l.find((function(t){return!0===t.regex.test(e)}))}var p=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),h=function(e,t,n,r){return new(n||(n=Promise))((function(i,a){function o(e){try{s(r.next(e))}catch(t){a(t)}}function c(e){try{s(r.throw(e))}catch(t){a(t)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,c)}s((r=r.apply(e,t||[])).next())}))},f=function(e,t){var n,r,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"===typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(a){return function(c){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,r=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(i=(i=o.trys).length>0&&i[i.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(c){a=[6,c],r=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}},d=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.accountPageCaption="\u6ce8\u518c\u8d26\u53f7",t.accountLabel="\u6ce8\u518c\u8d26\u53f7",t.accountSubmitCaption="\u6ce8\u518c\u65b0\u8d26\u53f7",t.passwordPageCaption="\u8d26\u53f7\u5bc6\u7801",t.passwordSubmitCaption="\u6ce8\u518c\u65b0\u8d26\u53f7",t.successText="\u6ce8\u518c\u6210\u529f",t.login=function(e){return h(t,void 0,void 0,(function(){var t;return f(this,(function(n){switch(n.label){case 0:return[4,o.p.login({user:e||this.account,pwd:this.password,guest:i.nav.guest})];case 1:return void 0===(t=n.sent())?(alert("something wrong!"),[2]):[4,i.nav.logined(t)];case 2:return n.sent(),[2]}}))}))},t}return p(t,e),t.prototype.internalStart=function(){return h(this,void 0,void 0,(function(){return f(this,(function(e){return this.openVPage(v),[2]}))}))},t.prototype.toVerify=function(e){this.account=e,this.openVPage(y)},t.prototype.toPassword=function(){this.openVPage(g)},t.prototype.toSuccess=function(e){this.openVPage(w,e)},t.prototype.regReturn=function(e){var t;switch(e){default:return"\u670d\u52a1\u5668\u53d1\u751f\u9519\u8bef";case 4:return"\u9a8c\u8bc1\u7801\u9519\u8bef";case 0:return;case 1:t="\u7528\u6237\u540d "+this.account;break;case 2:t="\u624b\u673a\u53f7 +"+this.account;break;case 3:t="\u90ae\u7bb1 "+this.account}return t+" \u5df2\u7ecf\u88ab\u6ce8\u518c\u8fc7\u4e86"},t.prototype.checkAccount=function(){return h(this,void 0,void 0,(function(){var e,t;return f(this,(function(n){switch(n.label){case 0:return[4,o.p.isExists(this.account)];case 1:return e=n.sent(),void 0!==(t=this.accountError(e))?[2,t]:[4,o.p.sendVerify(this.account,this.type,i.nav.oem)];case 2:return e=n.sent(),this.toVerify(this.account),[2]}}))}))},t.prototype.accountError=function(e){if(e>0)return"\u5df2\u7ecf\u88ab\u6ce8\u518c\u4f7f\u7528\u4e86"},t.prototype.execute=function(){return h(this,void 0,void 0,(function(){var e,t;return f(this,(function(n){switch(n.label){case 0:switch(e={nick:void 0,user:this.account,pwd:this.password,country:void 0,mobile:void 0,mobileCountry:void 0,email:void 0,verify:this.verify},this.type){case"mobile":e.mobile=Number(this.account),e.mobileCountry=86;break;case"email":e.email=this.account}return[4,o.p.register(e)];case 1:return 0===(t=n.sent())?(i.nav.clear(),this.toSuccess(),[2]):[2,this.regReturn(t)]}}))}))},t}(a.a),b=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.accountPageCaption="\u5bc6\u7801\u627e\u56de",t.accountLabel="\u8d26\u53f7",t.accountSubmitCaption="\u6ce8\u518c\u65b0\u8d26\u53f7",t.passwordPageCaption="\u91cd\u7f6e\u5bc6\u7801",t.passwordSubmitCaption="\u63d0\u4ea4",t.successText="\u6210\u529f\u4fee\u6539\u5bc6\u7801",t}return p(t,e),t.prototype.execute=function(){return h(this,void 0,void 0,(function(){var e;return f(this,(function(t){switch(t.label){case 0:return[4,o.p.resetPassword(this.account,this.password,this.verify,this.type)];case 1:return e=t.sent(),i.nav.clear(),this.toSuccess(e),[2,void 0]}}))}))},t.prototype.accountError=function(e){if(0===e)return"\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u8d26\u53f7"},t}(d),v=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.schema=[{name:"user",type:"string",required:!0,maxLength:100},{name:"verify",type:"submit"}],t.res=Object(i.resLang)(c.d),t.page=function(){return r.createElement(i.Page,{header:t.controller.accountPageCaption},r.createElement("div",{className:"w-max-20c my-5 py-5",style:{marginLeft:"auto",marginRight:"auto"}},u(),r.createElement("div",{className:"h-3c"}),r.createElement(i.Form,{schema:t.schema,uiSchema:t.uiSchema,onButtonClick:t.onSubmit,onEnter:t.onEnter,requiredFlag:!1}),i.nav.privacyEntry()))},t.onSubmit=function(e,n){return h(t,void 0,void 0,(function(){var e,t,r,i,a;return f(this,(function(o){switch(o.label){case 0:return n.clearContextErrors(),e="user",t=n.getValue(e),void 0===(r=m(t))?(n.setError(e,"\u5fc5\u987b\u662f\u624b\u673a\u53f7\u6216\u90ae\u7bb1"),[2]):"mobile"!==(i=r.type)||11===t.length&&"1"===t[0]?(this.controller.account=t,this.controller.type=i,[4,this.controller.checkAccount()]):(n.setError(e,"\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7"),[2]);case 1:return void 0!==(a=o.sent())&&n.setError(e,a),[2]}}))}))},t.onEnter=function(e,n){return h(t,void 0,void 0,(function(){return f(this,(function(t){switch(t.label){case 0:return"user"!==e?[3,2]:[4,this.onSubmit("verify",n)];case 1:return[2,t.sent()];case 2:return[2]}}))}))},t}return p(t,e),t.prototype.open=function(){return h(this,void 0,void 0,(function(){return f(this,(function(e){return this.uiSchema={items:{user:{widget:"text",label:this.controller.accountLabel,placeholder:"\u624b\u673a\u53f7\u6216\u90ae\u7bb1"},verify:{widget:"button",className:"btn btn-primary btn-block mt-3",label:"\u53d1\u9001\u9a8c\u8bc1\u7801"}}},this.openPage(this.page),[2]}))}))},t}(a.b),y=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.schema=[{name:"verify",type:"number",required:!0,maxLength:6},{name:"submit",type:"submit"}],t.onVerifyChanged=function(e,t,n){e.setDisabled("submit",!t||6!==t.length)},t.uiSchema={items:{verify:{widget:"text",label:"\u9a8c\u8bc1\u7801",placeholder:"\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801",onChanged:t.onVerifyChanged},submit:{widget:"button",className:"btn btn-primary btn-block mt-3",label:"\u4e0b\u4e00\u6b65 >",disabled:!0}}},t.onSubmit=function(e,n){return h(t,void 0,void 0,(function(){var e;return f(this,(function(t){switch(t.label){case 0:return e=this.controller.verify=n.getValue("verify"),[4,o.p.checkVerify(this.controller.account,e)];case 1:return 0===t.sent()?(n.setError("verify","\u9a8c\u8bc1\u7801\u9519\u8bef"),[2]):(this.controller.toPassword(),[2])}}))}))},t.onEnter=function(e,n){return h(t,void 0,void 0,(function(){return f(this,(function(t){switch(t.label){case 0:return"verify"!==e?[3,2]:[4,this.onSubmit("submit",n)];case 1:return[2,t.sent()];case 2:return[2]}}))}))},t.page=function(){var e,n;switch(t.controller.type){case"mobile":e="\u624b\u673a\u53f7";break;case"email":e="\u90ae\u7bb1",n=r.createElement(r.Fragment,null,r.createElement("span",{className:"text-danger"},"\u6ce8\u610f"),": \u6709\u53ef\u80fd\u8bef\u4e3a\u5783\u573e\u90ae\u4ef6\uff0c\u8bf7\u68c0\u67e5",r.createElement("br",null))}return r.createElement(i.Page,{header:"\u9a8c\u8bc1\u7801"},r.createElement("div",{className:"w-max-20c my-5 py-5",style:{marginLeft:"auto",marginRight:"auto"}},"\u9a8c\u8bc1\u7801\u5df2\u7ecf\u53d1\u9001\u5230",e,r.createElement("br",null),r.createElement("div",{className:"py-2 px-3 my-2 text-primary bg-light"},r.createElement("b",null,t.controller.account)),n,r.createElement("div",{className:"h-1c"}),r.createElement(i.Form,{schema:t.schema,uiSchema:t.uiSchema,onButtonClick:t.onSubmit,onEnter:t.onEnter,requiredFlag:!1})))},t}return p(t,e),t.prototype.open=function(){return h(this,void 0,void 0,(function(){return f(this,(function(e){return this.openPage(this.page),[2]}))}))},t}(a.b),g=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.schema=[{name:"pwd",type:"string",required:!0,maxLength:100},{name:"rePwd",type:"string",required:!0,maxLength:100},{name:"submit",type:"submit"}],t.onSubmit=function(e,n){return h(t,void 0,void 0,(function(){var e,t,a,o;return f(this,(function(c){switch(c.label){case 0:return e=n.form.data,t=e.pwd,a=e.rePwd,t&&t===a?[3,1]:(n.setValue("pwd",""),n.setValue("rePwd",""),o="\u5bc6\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\u5bc6\u7801\uff01",n.setError("pwd",o),[3,3]);case 1:return this.controller.password=t,[4,this.controller.execute()];case 2:void 0!==(o=c.sent())&&i.nav.push(r.createElement(i.Page,{header:"\u6ce8\u518c\u4e0d\u6210\u529f"},r.createElement("div",{className:"p-5 text-danger"},o))),c.label=3;case 3:return[2,o]}}))}))},t.onEnter=function(e,n){return h(t,void 0,void 0,(function(){return f(this,(function(t){switch(t.label){case 0:return"rePwd"!==e?[3,2]:[4,this.onSubmit("submit",n)];case 1:return[2,t.sent()];case 2:return[2]}}))}))},t.page=function(){return r.createElement(i.Page,{header:t.controller.passwordPageCaption},r.createElement("div",{className:"w-max-20c my-5 py-5",style:{marginLeft:"auto",marginRight:"auto"}},"\u6ce8\u518c\u8d26\u53f7",r.createElement("br",null),r.createElement("div",{className:"py-2 px-3 my-2 text-primary bg-light"},r.createElement("b",null,t.controller.account)),r.createElement("div",{className:"h-1c"}),r.createElement(i.Form,{schema:t.schema,uiSchema:t.uiSchema,onButtonClick:t.onSubmit,onEnter:t.onEnter,requiredFlag:!1})))},t}return p(t,e),t.prototype.open=function(){return h(this,void 0,void 0,(function(){return f(this,(function(e){return this.uiSchema={items:{pwd:{widget:"password",placeholder:"\u5bc6\u7801",label:"\u5bc6\u7801"},rePwd:{widget:"password",placeholder:"\u91cd\u590d\u5bc6\u7801",label:"\u91cd\u590d\u5bc6\u7801"},submit:{widget:"button",className:"btn btn-primary btn-block mt-3",label:this.controller.passwordSubmitCaption}}},this.openPage(this.page),[2]}))}))},t}(a.b),w=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.page=function(e){var n=e.users,a=t.controller,o=a.account,c=a.successText,s=a.login;return void 0===n?r.createElement(i.Page,{header:!1},r.createElement("div",{className:"container w-max-30c"},r.createElement("div",{className:"my-5"},r.createElement("div",{className:"py-5"},"\u8d26\u53f7 ",r.createElement("strong",{className:"text-primary"},o," ")," ",c,"\uff01"),r.createElement("button",{className:"btn btn-success btn-block",type:"button",onClick:function(){return s(void 0)}},"\u76f4\u63a5\u767b\u5f55")))):r.createElement(i.Page,{header:!1},r.createElement("div",{className:"container w-max-30c"},r.createElement("div",{className:"my-5"},r.createElement("div",{className:"py-5 text-success"},c),n.map((function(e){var t=e.name;return r.createElement("div",{className:"py-2 cursor-pointer",onClick:function(){return s(t)}},"\u767b\u5f55\u8d26\u53f7 ",r.createElement("strong",{className:"text-primary"},t," "))})))))},t}return p(t,e),t.prototype.open=function(e){return h(this,void 0,void 0,(function(){return f(this,(function(t){return this.openPage(this.page,{users:e}),[2]}))}))},t}(a.b),E=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),x=function(e,t,n,r){return new(n||(n=Promise))((function(i,a){function o(e){try{s(r.next(e))}catch(t){a(t)}}function c(e){try{s(r.throw(e))}catch(t){a(t)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,c)}s((r=r.apply(e,t||[])).next())}))},k=function(e,t){var n,r,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"===typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(a){return function(c){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,r=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(i=(i=o.trys).length>0&&i[i.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(c){a=[6,c],r=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}},N=[{name:"username",type:"string",required:!0,maxLength:100},{name:"password",type:"string",required:!0,maxLength:100},{name:"login",type:"submit"}],S=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.res=Object(i.resLang)(c.c),t.uiSchema={items:{username:{placeholder:"\u624b\u673a/\u90ae\u7bb1/\u7528\u6237\u540d",label:"\u767b\u5f55\u8d26\u53f7"},password:{widget:"password",placeholder:"\u5bc6\u7801",label:"\u5bc6\u7801"},login:{widget:"button",className:"btn btn-primary btn-block mt-3",label:"\u767b\u5f55"}}},t.onSubmit=function(e,n){return x(t,void 0,void 0,(function(){var e,t,r,a,c;return k(this,(function(s){switch(s.label){case 0:return e=n.form.data,t=e.username,void 0===(r=e.password)?[2,"something wrong, pwd is undefined"]:[4,o.p.login({user:t,pwd:r,guest:i.nav.guest})];case 1:return void 0===(a=s.sent())?(c=m(t),[2,(void 0!==c?c.caption:"\u7528\u6237\u540d")+"\u6216\u5bc6\u7801\u9519\uff01"]):(console.log("onLoginSubmit: user=%s pwd:%s",a.name,a.token),[4,i.nav.logined(a,this.props.callback)]);case 2:return s.sent(),[2]}}))}))},t.onEnter=function(e,n){return x(t,void 0,void 0,(function(){return k(this,(function(t){switch(t.label){case 0:return"password"!==e?[3,2]:[4,this.onSubmit("login",n)];case 1:return[2,t.sent()];case 2:return[2]}}))}))},t.clickReg=function(){new d(void 0).start()},t.clickForget=function(){new b(void 0).start()},t}return E(t,e),t.prototype.render=function(){var e=this,t=r.createElement("div",null,r.createElement("div",{className:"d-block"},r.createElement("div",{className:"text-center"},r.createElement("button",{className:"btn btn-link",style:{margin:"0px auto"},onClick:this.clickReg},"\u6ce8\u518c\u8d26\u53f7")),i.nav.privacyEntry())),n=!1;return!0===this.props.withBack&&(n="\u767b\u5f55"),r.createElement(i.Page,{header:n,footer:t},r.createElement("div",{className:"d-flex p-5 flex-column justify-content-center align-items-center"},r.createElement("div",{className:"flex-fill"}),r.createElement("div",{className:"w-20c"},u(),r.createElement("div",{className:"h-2c"}),r.createElement(i.Form,{schema:N,uiSchema:this.uiSchema,onButtonClick:this.onSubmit,onEnter:this.onEnter,requiredFlag:!1}),r.createElement("button",{className:"btn btn-link btn-block",onClick:function(){return e.clickForget()}},"\u5fd8\u8bb0\u5bc6\u7801")),r.createElement("div",{className:"flex-fill"}),r.createElement("div",{className:"flex-fill"})))},t}(r.Component);t.default=S}}]);
//# sourceMappingURL=3.4ac6098e.chunk.js.map
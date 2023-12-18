(()=>{"use strict";var e={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-2",headers:{authorization:"ed383b99-1870-4886-8866-3d44839ba706","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function n(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),u=c.querySelector(".card__image"),a=c.querySelector(".card__title"),i=c.querySelector(".card__like-button"),l=c.querySelector(".card__like-counter"),s=e.likes.some((function(e){return e._id===t})),d=c.querySelector(".card__delete-button");return u.src=e.link,u.alt=e.name,a.textContent=e.name,l.textContent=e.likes.length,e.owner._id===t?d.style.display="block":d.style.display="none",s?i.classList.add("card__like-button_is-active"):i.classList.remove("card__like-button_is-active"),u.addEventListener("click",(function(){return o(c)})),i.addEventListener("click",(function(){return n(c,e)})),d.addEventListener("click",(function(){return r(c,e)})),c}function r(n,r){var o,c=n.querySelector(".card__like-button"),u=n.querySelector(".card__like-counter");c.classList.contains("card__like-button_is-active")?(o=r._id,fetch("".concat(e.baseUrl,"/cards/likes/").concat(o),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(e){u.textContent=e.likes.length,c.classList.remove("card__like-button_is-active")})).catch((function(e){return console.error("Ошибка при добавлении карточки:",e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}(r._id).then((function(e){u.textContent=e.likes.length,c.classList.add("card__like-button_is-active")})).catch((function(e){return console.error("Ошибка при добавлении карточки:",e)}))}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)}function u(e){var t=document.querySelector(".popup_is-opened");"Escape"===e.key&&c(t)}function a(e){var t=document.querySelector(".popup_is-opened");e.target.matches(".popup_is-opened, .popup__close")&&c(t)}function i(e,t,n){var r=e.closest(n.formSelector).querySelector(".popup__input_type_error-".concat(e.name));e.classList.add(n.inputErrorClass),r.textContent=t}function l(e,t){var n=e.closest(t.formSelector).querySelector(".popup__input_type_error-".concat(e.name));e.classList.remove(t.inputErrorClass),n.textContent=""}function s(e,t,n){e?(t.removeAttribute("disabled"),t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function d(e,t){var n=e.querySelectorAll(t.inputSelector),r=e.querySelector(t.submitButtonSelector);n.forEach((function(e){return l(e,t)})),s(!1,r,t)}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var _={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},f=null,y=document.querySelector(".places__list"),m=document.querySelector(".profile"),v=m.querySelector(".profile__image"),h=m.querySelector(".profile__edit-button"),S=m.querySelector(".profile__title"),b=m.querySelector(".profile__description"),q=m.querySelector(".profile__add-button"),C=document.querySelector('.popup__form[name="avatar"]'),k=C.querySelector(".popup__input_type_url"),E=document.querySelector('.popup__form[name="edit-profile"]'),g=E.querySelector(".popup__input_type_name"),L=E.querySelector(".popup__input_type_description"),x=document.querySelector('.popup__form[name="new-place"]'),A=x.querySelector(".popup__input_type_card-name"),w=x.querySelector(".popup__input_type_url"),U=document.querySelectorAll(".popup"),B=document.querySelector(".popup_type_edit_avatar"),j=B.querySelector(_.submitButtonSelector),O=document.querySelector(".popup_type_edit"),T=O.querySelector(_.submitButtonSelector),I=document.querySelector(".popup_type_new-card"),P=I.querySelector(_.submitButtonSelector),D=document.querySelector(".popup_type_image"),M=D.querySelector(".popup__image"),N=D.querySelector(".popup__caption");function J(n,r){var o;(o=r._id,fetch("".concat(e.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(){return function(e){e.remove()}(n)})).catch((function(e){return console.error("Ошибка при добавлении карточки:",e)}))}function V(e){var t=e.closest(".card"),n=t.querySelector(".card__image"),r=t.querySelector(".card__title");M.src=n.src,M.alt=r.alt,N.textContent=r.textContent,o(D)}Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t,o,c=(o=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,o)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=c[0],a=c[1];f=u._id,v.style.backgroundImage="url(\\".concat(u.avatar,")"),S.textContent=u.name,b.textContent=u.about,a.forEach((function(e){y.append(n(e,f,r,J,V))}))})).catch((function(e){return console.error("Ошибка при получении данных пользователя:",e)})),C.addEventListener("submit",(function(n){n.preventDefault();var r,o=j.textContent;j.textContent="Сохранение...",(r=k.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then((function(e){return t(e)}))).then((function(e){v.style.backgroundImage="url(\\".concat(e.avatar,")"),c(B)})).catch((function(e){return console.error("Ошибка при получении данных пользователя:",e)})).finally((function(){return j.textContent=o})),d(C,_)})),E.addEventListener("submit",(function(n){n.preventDefault();var r,o,u=T.textContent;T.textContent="Сохранение...",(r=g.value,o=L.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then((function(e){return t(e)}))).then((function(e){S.textContent=e.name,b.textContent=e.about,c(O)})).catch((function(e){return console.error("Ошибка получения данных пользователя:",e)})).finally((function(){return T.textContent=u})),d(E,_)})),x.addEventListener("submit",(function(o){o.preventDefault();var u,a,i=P.textContent;P.textContent="Добаление...",(u=A.value,a=w.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:u,link:a})}).then((function(e){return t(e)}))).then((function(e){var t=n(e,f,r,J,V);y.prepend(t),c(I),x.reset()})).catch((function(e){return console.error("Ошибка при добавлении карточки:",e)})).finally((function(){return P.textContent=i})),d(x,_)})),v.addEventListener("click",(function(){return k.value=v.style.backgroundImage.replace(/url\(["']?(.*?)["']?\)/,"$1"),void o(B)})),h.addEventListener("click",(function(){return g.value=S.textContent,L.value=b.textContent,void o(O)})),q.addEventListener("click",(function(){return o(I)})),U.forEach((function(e){return e.addEventListener("mousedown",a)})),function(e){document.querySelectorAll(e.formSelector).forEach((function(t){return function(e,t){var n=e.querySelector(t.submitButtonSelector);e.addEventListener("input",(function(r){var o=r.target,c=e.checkValidity();!function(e,t){e.validity.valueMissing?i(e,"Это обязательное поле",t):(e.validity.patternMismatch?e.setCustomValidity(e.dataset.error):e.setCustomValidity(""),e.validity.valid?l(e,t):i(e,e.validationMessage,t))}(o,t),s(c,n,t)})),e.addEventListener("reset",(function(){return d(e)}))}(t,e)}))}(_),d(C,_),d(E,_),d(x,_)})();
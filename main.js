(()=>{"use strict";var e="",t=[{name:"Москва",link:e+"6d7d6bb13c9e45748c8a.webp"},{name:"Санкт-Петербург",link:e+"aa2fb222b0ceb2a31c82.webp"},{name:"Самара",link:e+"1ec21b9cd669caf69c64.webp"},{name:"Казань",link:e+"d0bfe072855cab088c63.webp"},{name:"Краснодар",link:e+"cc8dd11bf95501c885e8.webp"},{name:"Сочи",link:e+"b33870373964de0d0623.webp"}];function n(e,t,n,r){var o=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),c=o.querySelector(".card__image"),u=o.querySelector(".card__title"),p=o.querySelector(".card__like-button"),a=o.querySelector(".card__delete-button");return c.src=e.link,c.alt=e.name,u.textContent=e.name,c.addEventListener("click",t),p.addEventListener("click",n),a.addEventListener("click",r),o}function r(e){e.target.closest(".card").querySelector(".card__like-button").classList.toggle("card__like-button_is-active")}function o(e){e.target.closest(".card").remove()}function c(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",p)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",p)}function p(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}var a=document.querySelector(".places__list"),l=document.querySelector(".profile"),i=l.querySelector(".profile__edit-button"),d=l.querySelector(".profile__title"),_=l.querySelector(".profile__description"),s=l.querySelector(".profile__add-button"),m=document.querySelector('.popup__form[name="edit-profile"]'),y=m.querySelector(".popup__input_type_name"),f=m.querySelector(".popup__input_type_description"),q=document.querySelector('.popup__form[name="new-place"]'),S=q.querySelector(".popup__input_type_card-name"),v=q.querySelector(".popup__input_type_url"),b=document.querySelectorAll(".popup"),k=document.querySelector(".popup_type_edit"),E=document.querySelector(".popup_type_new-card"),L=document.querySelector(".popup_type_image"),w=L.querySelector(".popup__image"),g=L.querySelector(".popup__caption");function x(e){var t=e.target.closest(".card"),n=t.querySelector(".card__image"),r=t.querySelector(".card__title");w.src=n.src,w.alt=r.alt,g.textContent=r.textContent,c(L)}t.forEach((function(e){return a.append(n(e,x,r,o))})),m.addEventListener("submit",(function(e){e.preventDefault(),d.textContent=y.value,_.textContent=f.value,u(k)})),q.addEventListener("submit",(function(e){e.preventDefault();var t=n({name:S.value,link:v.value},x,r,o);a.prepend(t),u(E),q.reset()})),i.addEventListener("click",(function(){y.value=d.textContent,f.value=_.textContent,c(k)})),s.addEventListener("click",(function(){return c(E)})),b.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.matches(".popup_is-opened, .popup__close")&&u(e)}))}))})();
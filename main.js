(()=>{"use strict";const e={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit",inactiveButtonClass:"popup__submit_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};class t{constructor({item:e,currentUser:t,handleCardClick:r,handleDeleteCard:s,handleLikeCard:i},a){this._cardId=e._id,this._name=e.name,this._link=e.link,this._likes=e.likes,this._ownerId=e.owner._id,this._cardElement=a,this._handleCardClick=r,this._handleDeleteCard=s,this._handleLikeCard=i,this._currentUser=t}_getCardTemplate(){return document.querySelector(this._cardElement).content.querySelector("li").cloneNode(!0)}updateLikes(e,t){0!==e.length?this._cardLikeCounter.textContent=e.length:this._cardLikeCounter.textContent="0","setLike"===t?this._cardLikeButton.classList.add("photo-card__like-button_active"):this._cardLikeButton.classList.remove("photo-card__like-button_active"),e.some((e=>e._id===this._currentUser))&&this._cardLikeButton.classList.add("photo-card__like-button_active")}_setEventListeners(){this._cardLikeButton.addEventListener("click",(()=>{this._cardLikeButton.classList.contains("photo-card__like-button_active")?this._handleLikeCard.handleDeleteLike(this._cardId,this._cardItem):this._handleLikeCard.handleSetLike(this._cardId,this._cardItem)})),this._ownerId===this._currentUser&&this._cardDeleteButton.addEventListener("click",(()=>this._handleDeleteCard(this._cardId,this._cardItem))),this._cardImage.addEventListener("click",(()=>this._handleCardClick()))}deleteCard(){this._cardItem.remove(),this._cardItem=null}createCard(){return this._cardItem=this._getCardTemplate(),this._cardImage=this._cardItem.querySelector(".photo-card__image"),this._cardLikeButton=this._cardItem.querySelector(".photo-card__like-button"),this._cardLikeCounter=this._cardItem.querySelector(".photo-card__like-counter"),this._cardDeleteButton=this._cardItem.querySelector(".photo-card__delete"),this._cardItem.querySelector(".photo-card__title").textContent=this._name,this._cardImage.src=this._link,this._cardImage.alt=this._name,this._ownerId!==this._currentUser&&this._cardDeleteButton.remove(),this.updateLikes(this._likes,""),this._setEventListeners(),this._cardItem}}class r{constructor(e,t){this._popupInput=e.inputSelector,this._popupSubmit=e.submitButtonSelector,this._popupSubmitDisabled=e.inactiveButtonClass,this._popupInputTypeError=e.inputErrorClass,this._popupErrorVisible=e.errorClass,this._formToValidate=t,this._submitButton=this._formToValidate.querySelector(this._popupSubmit),this._inputArray=this._formToValidate.querySelectorAll(this._popupInput)}_showInputError(e,t){const r=this._formToValidate.querySelector(`#${e.id}-error`);r.textContent=t,e.classList.add(this._popupInputTypeError),r.classList.add(this._popupErrorVisible)}_hideInputError(e){const t=this._formToValidate.querySelector(`#${e.id}-error`);t.textContent="",e.classList.remove(this._popupInputTypeError),t.classList.remove(this._popupErrorVisible)}_validateInput(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}switchSubmitButton(){0===Array.from(this._inputArray).filter((e=>!e.validity.valid)).length?(this._submitButton.disabled=!1,this._submitButton.classList.remove(this._popupSubmitDisabled)):(this._submitButton.disabled=!0,this._submitButton.classList.add(this._popupSubmitDisabled))}validateInputs(){this._inputArray.forEach((e=>{this._validateInput(e),this._hideInputError(e)}))}_setInputEvtListeners(){this._formToValidate.addEventListener("submit",(e=>{e.preventDefault()})),this._inputArray.forEach((e=>{e.addEventListener("input",(()=>{this._validateInput(e),this.switchSubmitButton()}))}))}enableValidation(){this._setInputEvtListeners(this._formToValidate)}}class s{constructor(e){this._popup=document.querySelector(e),this._handleEsc=e=>{this._handleEscClose(e)}}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEsc)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEsc)}_handleEscClose(e){"Escape"===e.key&&this.close()}setEventListeners(){this._popup.addEventListener("click",(e=>{(e.target.classList.contains("popup_opened")||e.target.classList.contains("popup__close-button"))&&this.close()}))}}class i extends s{constructor(e,{handleSubmitForm:t}){super(e),this._handleSubmitForm=t,this._form=this._popup.querySelector(".popup__form"),this._inputList=this._form.querySelectorAll(".popup__input"),this._submitbutton=this._popup.querySelector(".popup__submit")}_getInputValues(){return this._formValues={},this._inputList.forEach((e=>{this._formValues[e.name]=e.value})),this._formValues}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(()=>{this.renderLoading(!0),this._handleSubmitForm(this._getInputValues())}))}close(){super.close(),this._form.reset()}renderLoading(e){this._submitbutton.textContent=e?"Сохранение...":this._submitbutton.dataset.value}}const a=new class{constructor(e){this._headers=e.headers,this._serverURL=e.serverURL,this._handlePromiseReturn=e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)}getUserInfo(){return fetch(`${this._serverURL}/users/me`,{headers:this._headers}).then((e=>this._handlePromiseReturn(e)))}sendUserInfo(e){return fetch(`${this._serverURL}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})}).then((e=>this._handlePromiseReturn(e)))}updateAvatar(e){return fetch(`${this._serverURL}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((e=>this._handlePromiseReturn(e)))}getCards(){return fetch(`${this._serverURL}/cards`,{headers:this._headers}).then((e=>this._handlePromiseReturn(e)))}sendCard(e){return fetch(`${this._serverURL}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})}).then((e=>this._handlePromiseReturn(e)))}deleteCard(e){return fetch(`${this._serverURL}/cards/${e}`,{method:"DELETE",headers:this._headers})}setLike(e){return fetch(`${this._serverURL}/cards/${e}/likes`,{method:"PUT",headers:this._headers}).then((e=>this._handlePromiseReturn(e)))}deleteLike(e){return fetch(`${this._serverURL}/cards/${e}/likes`,{method:"DELETE",headers:this._headers}).then((e=>this._handlePromiseReturn(e)))}}({serverURL:"https://mesto.nomoreparties.co/v1/frontend-st-cohort-201",headers:{authorization:"bd0847e6-dbc8-430a-9d7d-6eb5fc0d60ce","Content-Type":"application/json"}});let n="";Promise.all([a.getUserInfo(),a.getCards()]).then((e=>{n=e[0]._id,console.log("ID пользователя:",n),v.setUserInfo(e[0]),o.renderElements(e[1])})).catch((e=>{console.log(e)}));const o=new class{constructor({renderer:e},t){this._renderer=e,this._container=document.querySelector(t)}addItem(e){this._container.append(e)}addNewItem(e){this._container.prepend(e)}renderElements(e){this._container.innerHTML="",e.forEach((e=>{this._renderer(e)}))}}({renderer:e=>{o.addItem(C(e,n))}},".photo-cards"),d=document.querySelector(".popup_edit_profile "+e.formSelector),h=document.querySelector(".popup_update-avatar "+e.formSelector),l=new r(e,d),u=new r(e,h),c=document.querySelector(".popup_edit_profile"),_=c.querySelector("#profile_name"),p=c.querySelector("#profile_about"),m=document.querySelector(".profile__button"),v=new class{constructor({profileTitle:e,profileAbout:t,profileAvatar:r}){this._title=document.querySelector(e),this._about=document.querySelector(t),this._avatar=document.querySelector(r)}getUserInfo(){return this._info={title:this._title.textContent,about:this._about.textContent,avatar:this._avatar.src},this._info}setUserInfo(e){this._title.textContent=e.name,this._about.textContent=e.about,this._avatar.src=e.avatar}}({profileTitle:".profile__title",profileAbout:".profile__about",profileAvatar:".profile__avatar"}),L=new i(".popup_edit_profile",{handleSubmitForm:e=>{a.sendUserInfo(e).then((e=>{v.setUserInfo({name:e.name,about:e.about,avatar:e.avatar}),L.close()})).catch((e=>{console.log(e)})).finally((()=>{L.renderLoading(!1)}))}});document.querySelector(".profile__edit-avatar-button").addEventListener("click",(()=>{b.open(),u.validateInputs(),u.switchSubmitButton()}));const b=new i(".popup_update-avatar",{handleSubmitForm:e=>{a.updateAvatar(e.avatar).then((e=>{v.setUserInfo({avatar:e.avatar,name:e.name,about:e.about}),b.close()})).catch((e=>{console.log(e)})).finally((()=>{b.renderLoading(!1)}))}}),f=new r(e,document.querySelector(".popup_new-place "+e.formSelector)),S=new class extends s{constructor(e){super(e),this._image=this._popup.querySelector(".popup__image"),this._caption=this._popup.querySelector(".popup__caption")}open({title:e,src:t}){this._image.src=t,this._image.alt=e,this._caption.textContent=e,super.open()}}(".popup_view_image"),k=new class extends s{constructor(e,{handleSubmitDelete:t}){super(e),this._handleSubmitDelete=t,this._form=this._popup.querySelector(".popup__form")}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._handleSubmitDelete(this._idCard,this._card)}))}getCard(e,t){this._clear(),this._idCard=e,this._cardElement=t}open(e){this._card=e,super.open()}_clear(){this._idCard="",this._cardElement=""}}(".popup_delete-place",{handleSubmitDelete:(e,t)=>{a.deleteCard(e).then((()=>{t.deleteCard(),k.close()})).catch((e=>{console.log(e)}))}}),E=document.querySelector(".profile__add-button"),C=(e,r)=>{const s=new t({item:e,currentUser:r,handleCardClick:()=>{S.open({title:e.name,src:e.link})},handleDeleteCard:(e,t)=>{k.open(s),k.getCard(e,t)},handleLikeCard:{handleSetLike:e=>{a.setLike(e).then((e=>{s.updateLikes(e.likes,"setLike")})).catch((e=>{console.log(e)}))},handleDeleteLike:e=>{a.deleteLike(e).then((e=>{s.updateLikes(e.likes,"deleteLike")})).catch((e=>{console.log(e)}))}}},"#photo-card");return s.createCard()},I=new i(".popup_new-place",{handleSubmitForm:e=>{a.sendCard(e).then((e=>{o.addNewItem(C(e,n)),I.close()})).finally((()=>{I.renderLoading(!1)}))}});m.addEventListener("click",(function(){var e;e=v.getUserInfo(),_.value=e.title,p.value=e.about,L.open(),l.validateInputs(),l.switchSubmitButton()})),E.addEventListener("click",(function(){I.open(),f.validateInputs(),f.switchSubmitButton()})),document.addEventListener("DOMContentLoaded",(function(){l.enableValidation(),f.enableValidation(),u.enableValidation(),S.setEventListeners(),L.setEventListeners(),k.setEventListeners(),I.setEventListeners(),b.setEventListeners()}))})();
(self["webpackChunkprofile"] = self["webpackChunkprofile"] || []).push([["apps_profile_src_bootstrap_ts"],{

/***/ 5660
/*!********************************************!*\
  !*** ./apps/profile/src/app/app.config.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appConfig: () => (/* binding */ appConfig)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 5839);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 6886);
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.routes */ 5076);



const appConfig = {
  providers: [(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.provideBrowserGlobalErrorListeners)(), (0,_angular_router__WEBPACK_IMPORTED_MODULE_1__.provideRouter)(_app_routes__WEBPACK_IMPORTED_MODULE_2__.appRoutes)]
};

/***/ },

/***/ 5076
/*!********************************************!*\
  !*** ./apps/profile/src/app/app.routes.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appRoutes: () => (/* binding */ appRoutes)
/* harmony export */ });
const appRoutes = [{
  path: '',
  loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! ./remote-entry/entry.routes */ 261)).then(m => m.remoteRoutes)
}];

/***/ },

/***/ 3451
/*!***************************************!*\
  !*** ./apps/profile/src/bootstrap.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ 2581);
/* harmony import */ var _app_app_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.config */ 5660);
/* harmony import */ var _app_remote_entry_entry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/remote-entry/entry */ 2781);



(0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__.bootstrapApplication)(_app_remote_entry_entry__WEBPACK_IMPORTED_MODULE_2__.RemoteEntry, _app_app_config__WEBPACK_IMPORTED_MODULE_1__.appConfig).catch(err => console.error(err));

/***/ }

}])
//# sourceMappingURL=apps_profile_src_bootstrap_ts.js.map
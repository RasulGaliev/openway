/******/ var __webpack_modules__ = ({

/***/ 496
(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// NAMESPACE OBJECT: ./node_modules/.pnpm/@module-federation+runtime@_aa07f8e6c2f14d1107e37642ec194e65/node_modules/@module-federation/runtime/dist/bundler.js
var bundler_namespaceObject = {};
__webpack_require__.r(bundler_namespaceObject);
__webpack_require__.d(bundler_namespaceObject, {
  Module: () => (Module$1),
  ModuleFederation: () => (ModuleFederation),
  createInstance: () => (createInstance),
  getInstance: () => (getInstance),
  getRemoteEntry: () => (getRemoteEntry),
  getRemoteInfo: () => (getRemoteInfo),
  init: () => (init),
  loadRemote: () => (loadRemote),
  loadScript: () => (loadScript),
  loadScriptNode: () => (loadScriptNode),
  loadShare: () => (loadShare),
  loadShareSync: () => (loadShareSync),
  preloadRemote: () => (preloadRemote),
  registerGlobalPlugins: () => (registerGlobalPlugins),
  registerPlugins: () => (dist_registerPlugins),
  registerRemotes: () => (registerRemotes),
  registerShared: () => (registerShared)
});

;// ./node_modules/.pnpm/@module-federation+webpack-_50a6c8031394c685b97cf731a2b434f2/node_modules/@module-federation/webpack-bundler-runtime/dist/attachShareScopeMap.js
//#region src/attachShareScopeMap.ts
function attachShareScopeMap(webpackRequire) {
  if (!webpackRequire.S || webpackRequire.federation.hasAttachShareScopeMap || !webpackRequire.federation.instance || !webpackRequire.federation.instance.shareScopeMap) return;
  webpackRequire.S = webpackRequire.federation.instance.shareScopeMap;
  webpackRequire.federation.hasAttachShareScopeMap = true;
}

//#endregion

//# sourceMappingURL=attachShareScopeMap.js.map
;// ./node_modules/.pnpm/@module-federation+webpack-_50a6c8031394c685b97cf731a2b434f2/node_modules/@module-federation/webpack-bundler-runtime/dist/constant.js
//#region src/constant.ts
const FEDERATION_SUPPORTED_TYPES = ["script"];

//#endregion

//# sourceMappingURL=constant.js.map
;// ./node_modules/.pnpm/@module-federation+webpack-_50a6c8031394c685b97cf731a2b434f2/node_modules/@module-federation/webpack-bundler-runtime/dist/updateOptions.js
//#region src/updateOptions.ts
function updateConsumeOptions(options) {
  const {
    webpackRequire,
    moduleToHandlerMapping
  } = options;
  const {
    consumesLoadingData,
    initializeSharingData
  } = webpackRequire;
  const {
    sharedFallback,
    bundlerRuntime,
    libraryType
  } = webpackRequire.federation;
  if (consumesLoadingData && !consumesLoadingData._updated) {
    const {
      moduleIdToConsumeDataMapping: updatedModuleIdToConsumeDataMapping = {},
      initialConsumes: updatedInitialConsumes = [],
      chunkMapping: updatedChunkMapping = {}
    } = consumesLoadingData;
    Object.entries(updatedModuleIdToConsumeDataMapping).forEach(([id, data]) => {
      if (!moduleToHandlerMapping[id]) moduleToHandlerMapping[id] = {
        getter: sharedFallback ? bundlerRuntime?.getSharedFallbackGetter({
          shareKey: data.shareKey,
          factory: data.fallback,
          webpackRequire,
          libraryType
        }) : data.fallback,
        treeShakingGetter: sharedFallback ? data.fallback : void 0,
        shareInfo: {
          shareConfig: {
            requiredVersion: data.requiredVersion,
            strictVersion: data.strictVersion,
            singleton: data.singleton,
            eager: data.eager,
            layer: data.layer
          },
          scope: Array.isArray(data.shareScope) ? data.shareScope : [data.shareScope || "default"],
          treeShaking: sharedFallback ? {
            get: data.fallback,
            mode: data.treeShakingMode
          } : void 0
        },
        shareKey: data.shareKey
      };
    });
    if ("initialConsumes" in options) {
      const {
        initialConsumes = []
      } = options;
      updatedInitialConsumes.forEach(id => {
        if (!initialConsumes.includes(id)) initialConsumes.push(id);
      });
    }
    if ("chunkMapping" in options) {
      const {
        chunkMapping = {}
      } = options;
      Object.entries(updatedChunkMapping).forEach(([id, chunkModules]) => {
        if (!chunkMapping[id]) chunkMapping[id] = [];
        chunkModules.forEach(moduleId => {
          if (!chunkMapping[id].includes(moduleId)) chunkMapping[id].push(moduleId);
        });
      });
    }
    consumesLoadingData._updated = 1;
  }
  if (initializeSharingData && !initializeSharingData._updated) {
    const {
      federation
    } = webpackRequire;
    if (!federation.instance || !initializeSharingData.scopeToSharingDataMapping) return;
    const shared = {};
    for (let [scope, stages] of Object.entries(initializeSharingData.scopeToSharingDataMapping)) for (let stage of stages) if (typeof stage === "object" && stage !== null) {
      const {
        name,
        version,
        factory,
        eager,
        singleton,
        requiredVersion,
        strictVersion
      } = stage;
      const shareConfig = {
        requiredVersion: `^${version}`
      };
      const isValidValue = function (val) {
        return typeof val !== "undefined";
      };
      if (isValidValue(singleton)) shareConfig.singleton = singleton;
      if (isValidValue(requiredVersion)) shareConfig.requiredVersion = requiredVersion;
      if (isValidValue(eager)) shareConfig.eager = eager;
      if (isValidValue(strictVersion)) shareConfig.strictVersion = strictVersion;
      const options = {
        version,
        scope: [scope],
        shareConfig,
        get: factory
      };
      if (shared[name]) shared[name].push(options);else shared[name] = [options];
    }
    federation.instance.registerShared(shared);
    initializeSharingData._updated = 1;
  }
}
function updateRemoteOptions(options) {
  const {
    webpackRequire,
    idToExternalAndNameMapping = {},
    idToRemoteMap = {},
    chunkMapping = {}
  } = options;
  const {
    remotesLoadingData
  } = webpackRequire;
  const remoteInfos = webpackRequire.federation?.bundlerRuntimeOptions?.remotes?.remoteInfos;
  if (!remotesLoadingData || remotesLoadingData._updated || !remoteInfos) return;
  const {
    chunkMapping: updatedChunkMapping,
    moduleIdToRemoteDataMapping
  } = remotesLoadingData;
  if (!updatedChunkMapping || !moduleIdToRemoteDataMapping) return;
  for (let [moduleId, data] of Object.entries(moduleIdToRemoteDataMapping)) {
    if (!idToExternalAndNameMapping[moduleId]) idToExternalAndNameMapping[moduleId] = [data.shareScope, data.name, data.externalModuleId];
    if (!idToRemoteMap[moduleId] && remoteInfos[data.remoteName]) {
      const items = remoteInfos[data.remoteName];
      idToRemoteMap[moduleId] ||= [];
      items.forEach(item => {
        if (!idToRemoteMap[moduleId].includes(item)) idToRemoteMap[moduleId].push(item);
      });
    }
  }
  if (chunkMapping) Object.entries(updatedChunkMapping).forEach(([id, chunkModules]) => {
    if (!chunkMapping[id]) chunkMapping[id] = [];
    chunkModules.forEach(moduleId => {
      if (!chunkMapping[id].includes(moduleId)) chunkMapping[id].push(moduleId);
    });
  });
  remotesLoadingData._updated = 1;
}

//#endregion

//# sourceMappingURL=updateOptions.js.map
;// ./node_modules/.pnpm/@module-federation+sdk@2.5._a798783c209e371a5dfec692960a63df/node_modules/@module-federation/sdk/dist/constant.js
//#region src/constant.ts
const FederationModuleManifest = "federation-manifest.json";
const MANIFEST_EXT = ".json";
const BROWSER_LOG_KEY = "FEDERATION_DEBUG";
const NameTransformSymbol = {
  AT: "@",
  HYPHEN: "-",
  SLASH: "/"
};
const NameTransformMap = {
  [NameTransformSymbol.AT]: "scope_",
  [NameTransformSymbol.HYPHEN]: "_",
  [NameTransformSymbol.SLASH]: "__"
};
const EncodedNameTransformMap = {
  [NameTransformMap[NameTransformSymbol.AT]]: NameTransformSymbol.AT,
  [NameTransformMap[NameTransformSymbol.HYPHEN]]: NameTransformSymbol.HYPHEN,
  [NameTransformMap[NameTransformSymbol.SLASH]]: NameTransformSymbol.SLASH
};
const SEPARATOR = ":";
const ManifestFileName = "mf-manifest.json";
const StatsFileName = "mf-stats.json";
const MFModuleType = {
  NPM: "npm",
  APP: "app"
};
const MODULE_DEVTOOL_IDENTIFIER = "__MF_DEVTOOLS_MODULE_INFO__";
const ENCODE_NAME_PREFIX = "ENCODE_NAME_PREFIX";
const TEMP_DIR = ".federation";
let TreeShakingStatus = /* @__PURE__ */function (TreeShakingStatus) {
  /**
  * Not handled by deploy server, needs to infer by the real runtime period.
  */
  TreeShakingStatus[TreeShakingStatus["UNKNOWN"] = 1] = "UNKNOWN";
  /**
  * It means the shared has been calculated , runtime should take this shared as first choice.
  */
  TreeShakingStatus[TreeShakingStatus["CALCULATED"] = 2] = "CALCULATED";
  /**
  * It means the shared has been calculated, and marked as no used
  */
  TreeShakingStatus[TreeShakingStatus["NO_USE"] = 0] = "NO_USE";
  return TreeShakingStatus;
}({});

//#endregion

//# sourceMappingURL=constant.js.map
;// ./node_modules/.pnpm/@module-federation+sdk@2.5._a798783c209e371a5dfec692960a63df/node_modules/@module-federation/sdk/dist/env.js


//#region src/env.ts
const isBrowserEnvValue = typeof ENV_TARGET !== "undefined" ? ENV_TARGET === "web" : typeof window !== "undefined" && typeof window.document !== "undefined";
function isBrowserEnv() {
  return isBrowserEnvValue;
}
function isReactNativeEnv() {
  return typeof navigator !== "undefined" && navigator?.product === "ReactNative";
}
function isBrowserDebug() {
  try {
    if (isBrowserEnv() && window.localStorage) return Boolean(localStorage.getItem(BROWSER_LOG_KEY));
  } catch (error) {
    return false;
  }
  return false;
}
function isDebugMode() {
  if (typeof process !== "undefined" && process.env && process.env["FEDERATION_DEBUG"]) return Boolean(process.env["FEDERATION_DEBUG"]);
  if (typeof FEDERATION_DEBUG !== "undefined" && Boolean(FEDERATION_DEBUG)) return true;
  return isBrowserDebug();
}
const getProcessEnv = function () {
  return typeof process !== "undefined" && process.env ? process.env : {};
};

//#endregion

//# sourceMappingURL=env.js.map
;// ./node_modules/.pnpm/@module-federation+sdk@2.5._a798783c209e371a5dfec692960a63df/node_modules/@module-federation/sdk/dist/utils.js
/* unused harmony import specifier */ var utils_SEPARATOR;
/* unused harmony import specifier */ var utils_MANIFEST_EXT;
/* unused harmony import specifier */ var utils_NameTransformSymbol;
/* unused harmony import specifier */ var utils_NameTransformMap;
/* unused harmony import specifier */ var utils_getProcessEnv;



//#region src/utils.ts
const LOG_CATEGORY = "[ Federation Runtime ]";
const parseEntry = (str, devVerOrUrl, separator = utils_SEPARATOR) => {
  const strSplit = str.split(separator);
  const devVersionOrUrl = utils_getProcessEnv()["NODE_ENV"] === "development" && devVerOrUrl;
  const defaultVersion = "*";
  const isEntry = s => s.startsWith("http") || s.includes(utils_MANIFEST_EXT);
  if (strSplit.length >= 2) {
    let [name, ...versionOrEntryArr] = strSplit;
    if (str.startsWith(separator)) {
      name = strSplit.slice(0, 2).join(separator);
      versionOrEntryArr = [devVersionOrUrl || strSplit.slice(2).join(separator)];
    }
    let versionOrEntry = devVersionOrUrl || versionOrEntryArr.join(separator);
    if (isEntry(versionOrEntry)) return {
      name,
      entry: versionOrEntry
    };else return {
      name,
      version: versionOrEntry || defaultVersion
    };
  } else if (strSplit.length === 1) {
    const [name] = strSplit;
    if (devVersionOrUrl && isEntry(devVersionOrUrl)) return {
      name,
      entry: devVersionOrUrl
    };
    return {
      name,
      version: devVersionOrUrl || defaultVersion
    };
  } else throw `Invalid entry value: ${str}`;
};
const composeKeyWithSeparator = function (...args) {
  if (!args.length) return "";
  return args.reduce((sum, cur) => {
    if (!cur) return sum;
    if (!sum) return cur;
    return `${sum}${SEPARATOR}${cur}`;
  }, "");
};
const encodeName = function (name, prefix = "", withExt = false) {
  try {
    const ext = withExt ? ".js" : "";
    return `${prefix}${name.replace(new RegExp(`${utils_NameTransformSymbol.AT}`, "g"), utils_NameTransformMap[utils_NameTransformSymbol.AT]).replace(new RegExp(`${utils_NameTransformSymbol.HYPHEN}`, "g"), utils_NameTransformMap[utils_NameTransformSymbol.HYPHEN]).replace(new RegExp(`${utils_NameTransformSymbol.SLASH}`, "g"), utils_NameTransformMap[utils_NameTransformSymbol.SLASH])}${ext}`;
  } catch (err) {
    throw err;
  }
};
const decodeName = function (name, prefix, withExt) {
  try {
    let decodedName = name;
    if (prefix) {
      if (!decodedName.startsWith(prefix)) return decodedName;
      decodedName = decodedName.replace(new RegExp(prefix, "g"), "");
    }
    decodedName = decodedName.replace(new RegExp(`${NameTransformMap[NameTransformSymbol.AT]}`, "g"), EncodedNameTransformMap[NameTransformMap[NameTransformSymbol.AT]]).replace(new RegExp(`${NameTransformMap[NameTransformSymbol.SLASH]}`, "g"), EncodedNameTransformMap[NameTransformMap[NameTransformSymbol.SLASH]]).replace(new RegExp(`${NameTransformMap[NameTransformSymbol.HYPHEN]}`, "g"), EncodedNameTransformMap[NameTransformMap[NameTransformSymbol.HYPHEN]]);
    if (withExt) decodedName = decodedName.replace(".js", "");
    return decodedName;
  } catch (err) {
    throw err;
  }
};
const generateExposeFilename = (exposeName, withExt) => {
  if (!exposeName) return "";
  let expose = exposeName;
  if (expose === ".") expose = "default_export";
  if (expose.startsWith("./")) expose = expose.replace("./", "");
  return encodeName(expose, "__federation_expose_", withExt);
};
const generateShareFilename = (pkgName, withExt) => {
  if (!pkgName) return "";
  return encodeName(pkgName, "__federation_shared_", withExt);
};
const getResourceUrl = (module, sourceUrl) => {
  if ("getPublicPath" in module) {
    let publicPath;
    if (!module.getPublicPath.startsWith("function")) publicPath = new Function(module.getPublicPath)();else publicPath = new Function("return " + module.getPublicPath)()();
    return `${publicPath}${sourceUrl}`;
  } else if ("publicPath" in module) {
    if (!isBrowserEnv() && !isReactNativeEnv() && "ssrPublicPath" in module && typeof module.ssrPublicPath === "string") return `${module.ssrPublicPath}${sourceUrl}`;
    return `${module.publicPath}${sourceUrl}`;
  } else {
    console.warn("Cannot get resource URL. If in debug mode, please ignore.", module, sourceUrl);
    return "";
  }
};
const assert = (condition, msg) => {
  if (!condition) error(msg);
};
const error = msg => {
  throw new Error(`${LOG_CATEGORY}: ${msg}`);
};
const warn = msg => {
  console.warn(`${LOG_CATEGORY}: ${msg}`);
};
function safeToString(info) {
  try {
    return JSON.stringify(info, null, 2);
  } catch (e) {
    return "";
  }
}
const VERSION_PATTERN_REGEXP = /^([\d^=v<>~]|[*xX]$)/;
function isRequiredVersion(str) {
  return VERSION_PATTERN_REGEXP.test(str);
}

//#endregion

//# sourceMappingURL=utils.js.map
;// ./node_modules/.pnpm/@module-federation+webpack-_50a6c8031394c685b97cf731a2b434f2/node_modules/@module-federation/webpack-bundler-runtime/dist/remotes.js





//#region src/remotes.ts
function remotes(options) {
  updateRemoteOptions(options);
  const {
    chunkId,
    promises,
    webpackRequire,
    chunkMapping,
    idToExternalAndNameMapping,
    idToRemoteMap
  } = options;
  attachShareScopeMap(webpackRequire);
  if (webpackRequire.o(chunkMapping, chunkId)) chunkMapping[chunkId].forEach(id => {
    let getScope = webpackRequire.R;
    if (!getScope) getScope = [];
    const data = idToExternalAndNameMapping[id];
    const remoteInfos = idToRemoteMap[id] || [];
    if (getScope.indexOf(data) >= 0) return;
    getScope.push(data);
    if (data.p) return promises.push(data.p);
    const onError = error => {
      if (!error) error = /* @__PURE__ */new Error("Container missing");
      if (typeof error.message === "string") error.message += `\nwhile loading "${data[1]}" from ${data[2]}`;
      webpackRequire.m[id] = () => {
        throw error;
      };
      data.p = 0;
    };
    const handleFunction = (fn, arg1, arg2, d, next, first) => {
      try {
        const promise = fn(arg1, arg2);
        if (promise && promise.then) {
          const p = promise.then(result => next(result, d), onError);
          if (first) promises.push(data.p = p);else return p;
        } else return next(promise, d, first);
      } catch (error) {
        onError(error);
      }
    };
    const onExternal = (external, _, first) => external ? handleFunction(webpackRequire.I, data[0], 0, external, onInitialized, first) : onError();
    var onInitialized = (_, external, first) => handleFunction(external.get, data[1], getScope, 0, onFactory, first);
    var onFactory = factory => {
      data.p = 1;
      webpackRequire.m[id] = module => {
        module.exports = factory();
      };
    };
    const onRemoteLoaded = () => {
      try {
        const remoteModuleName = decodeName(remoteInfos[0].name, ENCODE_NAME_PREFIX) + data[1].slice(1);
        const instance = webpackRequire.federation.instance;
        const loadRemote = () => webpackRequire.federation.instance.loadRemote(remoteModuleName, {
          loadFactory: false,
          from: "build"
        });
        if (instance.options.shareStrategy === "version-first") {
          const shareScopes = Array.isArray(data[0]) ? data[0] : [data[0]];
          return Promise.all(shareScopes.map(shareScope => instance.sharedHandler.initializeSharing(shareScope))).then(() => {
            return loadRemote();
          });
        }
        return loadRemote();
      } catch (error) {
        onError(error);
      }
    };
    if (remoteInfos.length === 1 && FEDERATION_SUPPORTED_TYPES.includes(remoteInfos[0].externalType) && remoteInfos[0].name) handleFunction(onRemoteLoaded, data[2], 0, 0, onFactory, 1);else handleFunction(webpackRequire, data[2], 0, 0, onExternal, 1);
  });
}

//#endregion

//# sourceMappingURL=remotes.js.map
;// ./node_modules/.pnpm/@module-federation+webpack-_50a6c8031394c685b97cf731a2b434f2/node_modules/@module-federation/webpack-bundler-runtime/dist/getUsedExports.js
//#region src/getUsedExports.ts
function getUsedExports(webpackRequire, sharedName) {
  const usedExports = webpackRequire.federation.usedExports;
  if (!usedExports) return;
  return usedExports[sharedName];
}

//#endregion

//# sourceMappingURL=getUsedExports.js.map
;// ./node_modules/.pnpm/@module-federation+webpack-_50a6c8031394c685b97cf731a2b434f2/node_modules/@module-federation/webpack-bundler-runtime/dist/error-codes/dist/error-codes.js
//#region ../error-codes/dist/error-codes.mjs
const RUNTIME_012 = "RUNTIME-012";

//#endregion

//# sourceMappingURL=error-codes.js.map
;// ./node_modules/.pnpm/@module-federation+webpack-_50a6c8031394c685b97cf731a2b434f2/node_modules/@module-federation/webpack-bundler-runtime/dist/error-codes/dist/getShortErrorMsg.js
//#region ../error-codes/dist/getShortErrorMsg.mjs
const getDocsUrl = errorCode => {
  return `View the docs to see how to solve: https://module-federation.io/guide/troubleshooting/${errorCode.split("-")[0].toLowerCase()}#${errorCode.toLowerCase()}`;
};
const getShortErrorMsg = (errorCode, errorDescMap, args, originalErrorMsg) => {
  const msg = [`${[errorDescMap[errorCode]]} #${errorCode}`];
  args && msg.push(`args: ${JSON.stringify(args)}`);
  msg.push(getDocsUrl(errorCode));
  originalErrorMsg && msg.push(`Original Error Message:\n ${originalErrorMsg}`);
  return msg.join("\n");
};

//#endregion

//# sourceMappingURL=getShortErrorMsg.js.map
;// ./node_modules/.pnpm/@module-federation+webpack-_50a6c8031394c685b97cf731a2b434f2/node_modules/@module-federation/webpack-bundler-runtime/dist/consumes.js






//#region src/consumes.ts
function consumes(options) {
  updateConsumeOptions(options);
  const {
    chunkId,
    promises,
    installedModules,
    webpackRequire,
    chunkMapping,
    moduleToHandlerMapping
  } = options;
  attachShareScopeMap(webpackRequire);
  if (webpackRequire.o(chunkMapping, chunkId)) chunkMapping[chunkId].forEach(id => {
    if (webpackRequire.o(installedModules, id)) return promises.push(installedModules[id]);
    const onFactory = factory => {
      installedModules[id] = 0;
      webpackRequire.m[id] = module => {
        delete webpackRequire.c[id];
        const result = factory();
        const {
          shareInfo
        } = moduleToHandlerMapping[id];
        if (shareInfo?.shareConfig?.layer && result && typeof result === "object") try {
          if (!result.hasOwnProperty("layer") || result.layer === void 0) result.layer = shareInfo.shareConfig.layer;
        } catch (e) {}
        module.exports = result;
      };
    };
    const onError = error => {
      delete installedModules[id];
      webpackRequire.m[id] = module => {
        delete webpackRequire.c[id];
        throw error;
      };
    };
    try {
      const federationInstance = webpackRequire.federation.instance;
      if (!federationInstance) throw new Error("Federation instance not found!");
      const {
        shareKey,
        getter,
        shareInfo,
        treeShakingGetter
      } = moduleToHandlerMapping[id];
      const usedExports = getUsedExports(webpackRequire, shareKey);
      const customShareInfo = {
        ...shareInfo
      };
      if (Array.isArray(customShareInfo.scope) && Array.isArray(customShareInfo.scope[0])) customShareInfo.scope = customShareInfo.scope[0];
      if (usedExports) customShareInfo.treeShaking = {
        usedExports,
        useIn: [federationInstance.options.name]
      };
      const promise = federationInstance.loadShare(shareKey, {
        customShareInfo
      }).then(factory => {
        if (factory === false) {
          if (typeof getter !== "function") throw new Error(getShortErrorMsg(RUNTIME_012, {
            [RUNTIME_012]: "The getter for the shared module is not a function. This may be caused by setting \"shared.import: false\" without the host providing the corresponding lib."
          }, {
            shareKey
          }));
          return treeShakingGetter?.() || getter();
        }
        return factory;
      });
      if (promise.then) promises.push(installedModules[id] = promise.then(onFactory).catch(onError));else onFactory(promise);
    } catch (e) {
      onError(e);
    }
  });
}

//#endregion

//# sourceMappingURL=consumes.js.map
;// ./node_modules/.pnpm/@module-federation+webpack-_50a6c8031394c685b97cf731a2b434f2/node_modules/@module-federation/webpack-bundler-runtime/dist/initializeSharing.js



//#region src/initializeSharing.ts
function initializeSharing({
  shareScopeName,
  webpackRequire,
  initPromises,
  initTokens,
  initScope
}) {
  const shareScopeKeys = Array.isArray(shareScopeName) ? shareScopeName : [shareScopeName];
  var initializeSharingPromises = [];
  var _initializeSharing = function (shareScopeKey) {
    if (!initScope) initScope = [];
    const mfInstance = webpackRequire.federation.instance;
    var initToken = initTokens[shareScopeKey];
    if (!initToken) initToken = initTokens[shareScopeKey] = {
      from: mfInstance.name
    };
    if (initScope.indexOf(initToken) >= 0) return;
    initScope.push(initToken);
    const promise = initPromises[shareScopeKey];
    if (promise) return promise;
    var warn = msg => typeof console !== "undefined" && console.warn && console.warn(msg);
    var initExternal = id => {
      var handleError = err => warn("Initialization of sharing external failed: " + err);
      try {
        var module = webpackRequire(id);
        if (!module) return;
        var initFn = module => module && module.init && module.init(webpackRequire.S[shareScopeKey], initScope, {
          shareScopeMap: webpackRequire.S || {},
          shareScopeKeys: shareScopeName
        });
        if (module.then) return promises.push(module.then(initFn, handleError));
        var initResult = initFn(module);
        if (initResult && typeof initResult !== "boolean" && initResult.then) return promises.push(initResult["catch"](handleError));
      } catch (err) {
        handleError(err);
      }
    };
    const promises = mfInstance.initializeSharing(shareScopeKey, {
      strategy: mfInstance.options.shareStrategy,
      initScope,
      from: "build"
    });
    attachShareScopeMap(webpackRequire);
    const bundlerRuntimeRemotesOptions = webpackRequire.federation.bundlerRuntimeOptions.remotes;
    if (bundlerRuntimeRemotesOptions) Object.keys(bundlerRuntimeRemotesOptions.idToRemoteMap).forEach(moduleId => {
      const info = bundlerRuntimeRemotesOptions.idToRemoteMap[moduleId];
      const externalModuleId = bundlerRuntimeRemotesOptions.idToExternalAndNameMapping[moduleId][2];
      if (info.length > 1) initExternal(externalModuleId);else if (info.length === 1) {
        const remoteInfo = info[0];
        if (!FEDERATION_SUPPORTED_TYPES.includes(remoteInfo.externalType)) initExternal(externalModuleId);
      }
    });
    if (!promises.length) return initPromises[shareScopeKey] = true;
    return initPromises[shareScopeKey] = Promise.all(promises).then(() => initPromises[shareScopeKey] = true);
  };
  shareScopeKeys.forEach(key => {
    initializeSharingPromises.push(_initializeSharing(key));
  });
  return Promise.all(initializeSharingPromises).then(() => true);
}

//#endregion

//# sourceMappingURL=initializeSharing.js.map
// EXTERNAL MODULE: ./node_modules/.pnpm/@babel+runtime@7.29.2/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(2088);
;// ./node_modules/.pnpm/@module-federation+webpack-_50a6c8031394c685b97cf731a2b434f2/node_modules/@module-federation/webpack-bundler-runtime/dist/installInitialConsumes.js




//#region src/installInitialConsumes.ts
function handleInitialConsumes(options) {
  const {
    moduleId,
    moduleToHandlerMapping,
    webpackRequire,
    asyncLoad
  } = options;
  const federationInstance = webpackRequire.federation.instance;
  if (!federationInstance) throw new Error("Federation instance not found!");
  const {
    shareKey,
    shareInfo
  } = moduleToHandlerMapping[moduleId];
  try {
    const usedExports = getUsedExports(webpackRequire, shareKey);
    const customShareInfo = {
      ...shareInfo
    };
    if (usedExports) customShareInfo.treeShaking = {
      usedExports,
      useIn: [federationInstance.options.name]
    };
    if (asyncLoad) return federationInstance.loadShare(shareKey, {
      customShareInfo
    });
    return federationInstance.loadShareSync(shareKey, {
      customShareInfo
    });
  } catch (err) {
    console.error("loadShareSync failed! The function should not be called unless you set \"eager:true\". If you do not set it, and encounter this issue, you can check whether an async boundary is implemented.");
    console.error("The original error message is as follows: ");
    throw err;
  }
}
function installInitialConsumes(options) {
  updateConsumeOptions(options);
  const {
    moduleToHandlerMapping,
    webpackRequire,
    installedModules,
    initialConsumes,
    asyncLoad
  } = options;
  const factoryIdSets = [];
  initialConsumes.forEach(id => {
    const factoryGetter = () => handleInitialConsumes({
      moduleId: id,
      moduleToHandlerMapping,
      webpackRequire,
      asyncLoad
    });
    factoryIdSets.push([id, factoryGetter]);
  });
  const setModule = (id, factoryGetter) => {
    webpackRequire.m[id] = module => {
      installedModules[id] = 0;
      delete webpackRequire.c[id];
      const factory = factoryGetter();
      if (typeof factory !== "function") throw new Error(`Shared module is not available for eager consumption: ${id}`);
      const result = factory();
      const {
        shareInfo
      } = moduleToHandlerMapping[id];
      if (shareInfo?.shareConfig?.layer && result && typeof result === "object") try {
        if (!result.hasOwnProperty("layer") || result.layer === void 0) result.layer = shareInfo.shareConfig.layer;
      } catch (e) {}
      module.exports = result;
    };
  };
  if (asyncLoad) return Promise.all(factoryIdSets.map(/*#__PURE__*/function () {
    var _ref = (0,asyncToGenerator/* default */.A)(function* ([id, factoryGetter]) {
      const result = yield factoryGetter();
      setModule(id, () => result);
    });
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()));
  factoryIdSets.forEach(([id, factoryGetter]) => {
    setModule(id, factoryGetter);
  });
}

//#endregion

//# sourceMappingURL=installInitialConsumes.js.map
;// ./node_modules/.pnpm/@module-federation+webpack-_50a6c8031394c685b97cf731a2b434f2/node_modules/@module-federation/webpack-bundler-runtime/dist/initContainerEntry.js
//#region src/initContainerEntry.ts
function initContainerEntry(options) {
  const {
    webpackRequire,
    shareScope,
    initScope,
    shareScopeKey,
    remoteEntryInitOptions
  } = options;
  if (!webpackRequire.S) return;
  if (!webpackRequire.federation || !webpackRequire.federation.instance || !webpackRequire.federation.initOptions) return;
  const federationInstance = webpackRequire.federation.instance;
  federationInstance.initOptions({
    name: webpackRequire.federation.initOptions.name,
    remotes: [],
    ...remoteEntryInitOptions
  });
  const hostShareScopeKeys = remoteEntryInitOptions?.shareScopeKeys;
  const hostShareScopeMap = remoteEntryInitOptions?.shareScopeMap;
  if (!shareScopeKey || typeof shareScopeKey === "string") {
    const key = shareScopeKey || "default";
    if (Array.isArray(hostShareScopeKeys)) hostShareScopeKeys.forEach(hostKey => {
      if (!hostShareScopeMap[hostKey]) hostShareScopeMap[hostKey] = {};
      const sc = hostShareScopeMap[hostKey];
      federationInstance.initShareScopeMap(hostKey, sc, {
        hostShareScopeMap: remoteEntryInitOptions?.shareScopeMap || {}
      });
    });else federationInstance.initShareScopeMap(key, shareScope, {
      hostShareScopeMap: remoteEntryInitOptions?.shareScopeMap || {}
    });
  } else shareScopeKey.forEach(key => {
    if (!hostShareScopeKeys || !hostShareScopeMap) {
      federationInstance.initShareScopeMap(key, shareScope, {
        hostShareScopeMap: remoteEntryInitOptions?.shareScopeMap || {}
      });
      return;
    }
    if (!hostShareScopeMap[key]) hostShareScopeMap[key] = {};
    const sc = hostShareScopeMap[key];
    federationInstance.initShareScopeMap(key, sc, {
      hostShareScopeMap: remoteEntryInitOptions?.shareScopeMap || {}
    });
  });
  if (webpackRequire.federation.attachShareScopeMap) webpackRequire.federation.attachShareScopeMap(webpackRequire);
  if (!Array.isArray(shareScopeKey)) return webpackRequire.I(shareScopeKey || "default", initScope);
  if (Boolean(webpackRequire.federation.initOptions.shared)) return webpackRequire.I(shareScopeKey, initScope);
  return Promise.all(shareScopeKey.map(key => {
    return webpackRequire.I(key, initScope);
  })).then(() => true);
}

//#endregion

//# sourceMappingURL=initContainerEntry.js.map
;// ./node_modules/.pnpm/@module-federation+sdk@2.5._a798783c209e371a5dfec692960a63df/node_modules/@module-federation/sdk/dist/logger.js


//#region src/logger.ts
const PREFIX = "[ Module Federation ]";
const DEFAULT_DELEGATE = console;
const LOGGER_STACK_SKIP_TOKENS = ["logger.ts", "logger.js", "captureStackTrace", "Logger.emit", "Logger.log", "Logger.info", "Logger.warn", "Logger.error", "Logger.debug"];
function captureStackTrace() {
  try {
    const stack = (/* @__PURE__ */new Error()).stack;
    if (!stack) return;
    const [, ...rawLines] = stack.split("\n");
    const filtered = rawLines.filter(line => !LOGGER_STACK_SKIP_TOKENS.some(token => line.includes(token)));
    if (!filtered.length) return;
    return `Stack trace:\n${filtered.slice(0, 5).join("\n")}`;
  } catch {
    return;
  }
}
var Logger = class {
  constructor(prefix, delegate = DEFAULT_DELEGATE) {
    this.prefix = prefix;
    this.delegate = delegate ?? DEFAULT_DELEGATE;
  }
  setPrefix(prefix) {
    this.prefix = prefix;
  }
  setDelegate(delegate) {
    this.delegate = delegate ?? DEFAULT_DELEGATE;
  }
  emit(method, args) {
    const delegate = this.delegate;
    const stackTrace = isDebugMode() ? captureStackTrace() : void 0;
    const enrichedArgs = stackTrace ? [...args, stackTrace] : args;
    const order = (() => {
      switch (method) {
        case "log":
          return ["log", "info"];
        case "info":
          return ["info", "log"];
        case "warn":
          return ["warn", "info", "log"];
        case "error":
          return ["error", "warn", "log"];
        default:
          return ["debug", "log"];
      }
    })();
    for (const candidate of order) {
      const handler = delegate[candidate];
      if (typeof handler === "function") {
        handler.call(delegate, this.prefix, ...enrichedArgs);
        return;
      }
    }
    for (const candidate of order) {
      const handler = DEFAULT_DELEGATE[candidate];
      if (typeof handler === "function") {
        handler.call(DEFAULT_DELEGATE, this.prefix, ...enrichedArgs);
        return;
      }
    }
  }
  log(...args) {
    this.emit("log", args);
  }
  warn(...args) {
    this.emit("warn", args);
  }
  error(...args) {
    this.emit("error", args);
  }
  success(...args) {
    this.emit("info", args);
  }
  info(...args) {
    this.emit("info", args);
  }
  ready(...args) {
    this.emit("info", args);
  }
  debug(...args) {
    if (isDebugMode()) this.emit("debug", args);
  }
};
function createLogger(prefix) {
  return new Logger(prefix);
}
function createInfrastructureLogger(prefix) {
  const infrastructureLogger = new Logger(prefix);
  Object.defineProperty(infrastructureLogger, "__mf_infrastructure_logger__", {
    value: true,
    enumerable: false,
    configurable: false
  });
  return infrastructureLogger;
}
function bindLoggerToCompiler(loggerInstance, compiler, name) {
  if (!loggerInstance.__mf_infrastructure_logger__) return;
  if (!compiler?.getInfrastructureLogger) return;
  try {
    const infrastructureLogger = compiler.getInfrastructureLogger(name);
    if (infrastructureLogger && typeof infrastructureLogger === "object" && (typeof infrastructureLogger.log === "function" || typeof infrastructureLogger.info === "function" || typeof infrastructureLogger.warn === "function" || typeof infrastructureLogger.error === "function")) loggerInstance.setDelegate(infrastructureLogger);
  } catch {
    loggerInstance.setDelegate(void 0);
  }
}
const logger = createLogger(PREFIX);
const infrastructureLogger = createInfrastructureLogger(PREFIX);

//#endregion

//# sourceMappingURL=logger.js.map
;// ./node_modules/.pnpm/@module-federation+error-codes@2.5.1/node_modules/@module-federation/error-codes/dist/getShortErrorMsg.mjs
//#region src/getShortErrorMsg.ts
const getShortErrorMsg_getDocsUrl = errorCode => {
  return `View the docs to see how to solve: https://module-federation.io/guide/troubleshooting/${errorCode.split("-")[0].toLowerCase()}#${errorCode.toLowerCase()}`;
};
const getShortErrorMsg_getShortErrorMsg = (errorCode, errorDescMap, args, originalErrorMsg) => {
  const msg = [`${[errorDescMap[errorCode]]} #${errorCode}`];
  args && msg.push(`args: ${JSON.stringify(args)}`);
  msg.push(getShortErrorMsg_getDocsUrl(errorCode));
  originalErrorMsg && msg.push(`Original Error Message:\n ${originalErrorMsg}`);
  return msg.join("\n");
};

//#endregion

//# sourceMappingURL=getShortErrorMsg.mjs.map
;// ./node_modules/.pnpm/@module-federation+error-codes@2.5.1/node_modules/@module-federation/error-codes/dist/browser.mjs


//#region src/browser.ts
function logAndReport(code, descMap, args, logger, originalErrorMsg, context) {
  return logger(getShortErrorMsg_getShortErrorMsg(code, descMap, args, originalErrorMsg));
}

//#endregion

//# sourceMappingURL=browser.mjs.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/logger.js



//#region src/utils/logger.ts
const logger_LOG_CATEGORY = "[ Federation Runtime ]";
const logger_logger = createLogger(logger_LOG_CATEGORY);
function logger_assert(condition, msgOrCode, descMap, args, context) {
  if (!condition) if (descMap !== void 0) logger_error(msgOrCode, descMap, args, void 0, context);else logger_error(msgOrCode);
}
function logger_error(msgOrCode, descMap, args, originalErrorMsg, context) {
  if (descMap !== void 0) return logAndReport(msgOrCode, descMap, args ?? {}, msg => {
    throw new Error(`${logger_LOG_CATEGORY}: ${msg}`);
  }, originalErrorMsg, context);
  const msg = msgOrCode;
  if (msg instanceof Error) {
    if (!msg.message.startsWith(logger_LOG_CATEGORY)) msg.message = `${logger_LOG_CATEGORY}: ${msg.message}`;
    throw msg;
  }
  throw new Error(`${logger_LOG_CATEGORY}: ${msg}`);
}
function warn$1(msg) {
  if (msg instanceof Error) {
    if (!msg.message.startsWith(logger_LOG_CATEGORY)) msg.message = `${logger_LOG_CATEGORY}: ${msg.message}`;
    logger_logger.warn(msg);
  } else logger_logger.warn(msg);
}

//#endregion

//# sourceMappingURL=logger.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/tool.js
/* unused harmony import specifier */ var _asyncToGenerator;
/* unused harmony import specifier */ var tool_warn$1;




//#region src/utils/tool.ts
function addUniqueItem(arr, item) {
  if (arr.findIndex(name => name === item) === -1) arr.push(item);
  return arr;
}
function getFMId(remoteInfo) {
  if ("version" in remoteInfo && remoteInfo.version) return `${remoteInfo.name}:${remoteInfo.version}`;else if ("entry" in remoteInfo && remoteInfo.entry) return `${remoteInfo.name}:${remoteInfo.entry}`;else return `${remoteInfo.name}`;
}
function isRemoteInfoWithEntry(remote) {
  return typeof remote.entry !== "undefined";
}
function isPureRemoteEntry(remote) {
  return !remote.entry.includes(".json");
}
function safeWrapper(_x, _x2) {
  return _safeWrapper.apply(this, arguments);
}
function _safeWrapper() {
  _safeWrapper = _asyncToGenerator(function* (callback, disableWarn) {
    try {
      return yield callback();
    } catch (e) {
      !disableWarn && tool_warn$1(e);
      return;
    }
  });
  return _safeWrapper.apply(this, arguments);
}
function isObject(val) {
  return val && typeof val === "object";
}
const objectToString = Object.prototype.toString;
function isPlainObject(val) {
  return objectToString.call(val) === "[object Object]";
}
function isStaticResourcesEqual(url1, url2) {
  const REG_EXP = /^(https?:)?\/\//i;
  return url1.replace(REG_EXP, "").replace(/\/$/, "") === url2.replace(REG_EXP, "").replace(/\/$/, "");
}
function arrayOptions(options) {
  return Array.isArray(options) ? options : [options];
}
function getRemoteEntryInfoFromSnapshot(snapshot) {
  const defaultRemoteEntryInfo = {
    url: "",
    type: "global",
    globalName: ""
  };
  if (isBrowserEnvValue || isReactNativeEnv() || !("ssrRemoteEntry" in snapshot)) return "remoteEntry" in snapshot ? {
    url: snapshot.remoteEntry,
    type: snapshot.remoteEntryType,
    globalName: snapshot.globalName
  } : defaultRemoteEntryInfo;
  if ("ssrRemoteEntry" in snapshot) return {
    url: snapshot.ssrRemoteEntry || defaultRemoteEntryInfo.url,
    type: snapshot.ssrRemoteEntryType || defaultRemoteEntryInfo.type,
    globalName: snapshot.globalName
  };
  return defaultRemoteEntryInfo;
}
const processModuleAlias = (name, subPath) => {
  let moduleName;
  if (name.endsWith("/")) moduleName = name.slice(0, -1);else moduleName = name;
  if (subPath.startsWith(".")) subPath = subPath.slice(1);
  moduleName = moduleName + subPath;
  return moduleName;
};

//#endregion

//# sourceMappingURL=tool.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/global.js




//#region src/global.ts
const CurrentGlobal = typeof globalThis === "object" ? globalThis : window;
const nativeGlobal = (() => {
  try {
    return document.defaultView;
  } catch {
    return CurrentGlobal;
  }
})();
const Global = nativeGlobal;
function definePropertyGlobalVal(target, key, val) {
  Object.defineProperty(target, key, {
    value: val,
    configurable: false,
    writable: true
  });
}
function includeOwnProperty(target, key) {
  return Object.hasOwnProperty.call(target, key);
}
if (!includeOwnProperty(CurrentGlobal, "__GLOBAL_LOADING_REMOTE_ENTRY__")) definePropertyGlobalVal(CurrentGlobal, "__GLOBAL_LOADING_REMOTE_ENTRY__", {});
const globalLoading = CurrentGlobal.__GLOBAL_LOADING_REMOTE_ENTRY__;
function setGlobalDefaultVal(target) {
  if (includeOwnProperty(target, "__VMOK__") && !includeOwnProperty(target, "__FEDERATION__")) definePropertyGlobalVal(target, "__FEDERATION__", target.__VMOK__);
  if (!includeOwnProperty(target, "__FEDERATION__")) {
    definePropertyGlobalVal(target, "__FEDERATION__", {
      __GLOBAL_PLUGIN__: [],
      __INSTANCES__: [],
      moduleInfo: {},
      __SHARE__: {},
      __MANIFEST_LOADING__: {},
      __PRELOADED_MAP__: /* @__PURE__ */new Map()
    });
    definePropertyGlobalVal(target, "__VMOK__", target.__FEDERATION__);
  }
  target.__FEDERATION__.__GLOBAL_PLUGIN__ ??= [];
  target.__FEDERATION__.__INSTANCES__ ??= [];
  target.__FEDERATION__.moduleInfo ??= {};
  target.__FEDERATION__.__SHARE__ ??= {};
  target.__FEDERATION__.__MANIFEST_LOADING__ ??= {};
  target.__FEDERATION__.__PRELOADED_MAP__ ??= /* @__PURE__ */new Map();
}
setGlobalDefaultVal(CurrentGlobal);
setGlobalDefaultVal(nativeGlobal);
function resetFederationGlobalInfo() {
  CurrentGlobal.__FEDERATION__.__GLOBAL_PLUGIN__ = [];
  CurrentGlobal.__FEDERATION__.__INSTANCES__ = [];
  CurrentGlobal.__FEDERATION__.moduleInfo = {};
  CurrentGlobal.__FEDERATION__.__SHARE__ = {};
  CurrentGlobal.__FEDERATION__.__MANIFEST_LOADING__ = {};
  Object.keys(globalLoading).forEach(key => {
    delete globalLoading[key];
  });
}
function setGlobalFederationInstance(FederationInstance) {
  CurrentGlobal.__FEDERATION__.__INSTANCES__.push(FederationInstance);
}
function getGlobalFederationConstructor() {
  return CurrentGlobal.__FEDERATION__.__DEBUG_CONSTRUCTOR__;
}
function setGlobalFederationConstructor(FederationConstructor, isDebug = isDebugMode()) {
  if (isDebug) {
    CurrentGlobal.__FEDERATION__.__DEBUG_CONSTRUCTOR__ = FederationConstructor;
    CurrentGlobal.__FEDERATION__.__DEBUG_CONSTRUCTOR_VERSION__ = "2.5.1";
  }
}
function getInfoWithoutType(target, key) {
  if (typeof key === "string") {
    if (target[key]) return {
      value: target[key],
      key
    };else {
      const targetKeys = Object.keys(target);
      for (const targetKey of targetKeys) {
        const [targetTypeOrName, _] = targetKey.split(":");
        const nKey = `${targetTypeOrName}:${key}`;
        const typeWithKeyRes = target[nKey];
        if (typeWithKeyRes) return {
          value: typeWithKeyRes,
          key: nKey
        };
      }
      return {
        value: void 0,
        key
      };
    }
  } else logger_error(`getInfoWithoutType: "key" must be a string, got ${typeof key} (${JSON.stringify(key)}).`);
}
const getGlobalSnapshot = () => nativeGlobal.__FEDERATION__.moduleInfo;
const getTargetSnapshotInfoByModuleInfo = (moduleInfo, snapshot) => {
  const getModuleInfo = getInfoWithoutType(snapshot, getFMId(moduleInfo)).value;
  if (getModuleInfo && !getModuleInfo.version && "version" in moduleInfo && moduleInfo["version"]) getModuleInfo.version = moduleInfo["version"];
  if (getModuleInfo) return getModuleInfo;
  if ("version" in moduleInfo && moduleInfo["version"]) {
    const {
      version,
      ...resModuleInfo
    } = moduleInfo;
    const moduleKeyWithoutVersion = getFMId(resModuleInfo);
    const getModuleInfoWithoutVersion = getInfoWithoutType(nativeGlobal.__FEDERATION__.moduleInfo, moduleKeyWithoutVersion).value;
    if (getModuleInfoWithoutVersion?.version === version) return getModuleInfoWithoutVersion;
  }
};
const getGlobalSnapshotInfoByModuleInfo = moduleInfo => getTargetSnapshotInfoByModuleInfo(moduleInfo, nativeGlobal.__FEDERATION__.moduleInfo);
const setGlobalSnapshotInfoByModuleInfo = (remoteInfo, moduleDetailInfo) => {
  const moduleKey = getFMId(remoteInfo);
  nativeGlobal.__FEDERATION__.moduleInfo[moduleKey] = moduleDetailInfo;
  return nativeGlobal.__FEDERATION__.moduleInfo;
};
const addGlobalSnapshot = moduleInfos => {
  nativeGlobal.__FEDERATION__.moduleInfo = {
    ...nativeGlobal.__FEDERATION__.moduleInfo,
    ...moduleInfos
  };
  return () => {
    const keys = Object.keys(moduleInfos);
    for (const key of keys) delete nativeGlobal.__FEDERATION__.moduleInfo[key];
  };
};
const getRemoteEntryExports = (name, globalName) => {
  const remoteEntryKey = globalName || `__FEDERATION_${name}:custom__`;
  return {
    remoteEntryKey,
    entryExports: CurrentGlobal[remoteEntryKey]
  };
};
const registerGlobalPlugins = plugins => {
  const {
    __GLOBAL_PLUGIN__
  } = nativeGlobal.__FEDERATION__;
  plugins.forEach(plugin => {
    if (__GLOBAL_PLUGIN__.findIndex(p => p.name === plugin.name) === -1) __GLOBAL_PLUGIN__.push(plugin);else warn$1(`The plugin ${plugin.name} has been registered.`);
  });
};
const getGlobalHostPlugins = () => nativeGlobal.__FEDERATION__.__GLOBAL_PLUGIN__;
const getPreloaded = id => CurrentGlobal.__FEDERATION__.__PRELOADED_MAP__.get(id);
const setPreloaded = id => CurrentGlobal.__FEDERATION__.__PRELOADED_MAP__.set(id, true);

//#endregion

//# sourceMappingURL=global.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/constant.js
//#region src/constant.ts
const DEFAULT_SCOPE = "default";
const DEFAULT_REMOTE_TYPE = "global";

//#endregion

//# sourceMappingURL=constant.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/semver/constants.js
//#region src/utils/semver/constants.ts
const buildIdentifier = "[0-9A-Za-z-]+";
const build = `(?:\\+(${buildIdentifier}(?:\\.${buildIdentifier})*))`;
const numericIdentifier = "0|[1-9]\\d*";
const numericIdentifierLoose = "[0-9]+";
const nonNumericIdentifier = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
const preReleaseIdentifierLoose = `(?:${numericIdentifierLoose}|${nonNumericIdentifier})`;
const preReleaseLoose = `(?:-?(${preReleaseIdentifierLoose}(?:\\.${preReleaseIdentifierLoose})*))`;
const preReleaseIdentifier = `(?:${numericIdentifier}|${nonNumericIdentifier})`;
const preRelease = `(?:-(${preReleaseIdentifier}(?:\\.${preReleaseIdentifier})*))`;
const xRangeIdentifier = `${numericIdentifier}|x|X|\\*`;
const xRangePlain = `[v=\\s]*(${xRangeIdentifier})(?:\\.(${xRangeIdentifier})(?:\\.(${xRangeIdentifier})(?:${preRelease})?${build}?)?)?`;
const hyphenRange = `^\\s*(${xRangePlain})\\s+-\\s+(${xRangePlain})\\s*$`;
const loosePlain = `[v=\\s]*${`(${numericIdentifierLoose})\\.(${numericIdentifierLoose})\\.(${numericIdentifierLoose})`}${preReleaseLoose}?${build}?`;
const gtlt = "((?:<|>)?=?)";
const comparatorTrim = `(\\s*)${gtlt}\\s*(${loosePlain}|${xRangePlain})`;
const loneTilde = "(?:~>?)";
const tildeTrim = `(\\s*)${loneTilde}\\s+`;
const loneCaret = "(?:\\^)";
const caretTrim = `(\\s*)${loneCaret}\\s+`;
const star = "(<|>)?=?\\s*\\*";
const caret = `^${loneCaret}${xRangePlain}$`;
const fullPlain = `v?${`(${numericIdentifier})\\.(${numericIdentifier})\\.(${numericIdentifier})`}${preRelease}?${build}?`;
const tilde = `^${loneTilde}${xRangePlain}$`;
const xRange = `^${gtlt}\\s*${xRangePlain}$`;
const comparator = `^${gtlt}\\s*(${fullPlain})$|^$`;
const gte0 = "^\\s*>=\\s*0.0.0\\s*$";

//#endregion

//# sourceMappingURL=constants.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/semver/utils.js


//#region src/utils/semver/utils.ts
function parseRegex(source) {
  return new RegExp(source);
}
function isXVersion(version) {
  return !version || version.toLowerCase() === "x" || version === "*";
}
function pipe(...fns) {
  return x => fns.reduce((v, f) => f(v), x);
}
function extractComparator(comparatorString) {
  return comparatorString.match(parseRegex(comparator));
}
function combineVersion(major, minor, patch, preRelease) {
  const mainVersion = `${major}.${minor}.${patch}`;
  if (preRelease) return `${mainVersion}-${preRelease}`;
  return mainVersion;
}

//#endregion

//# sourceMappingURL=utils.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/semver/parser.js



//#region src/utils/semver/parser.ts
function parseHyphen(range) {
  return range.replace(parseRegex(hyphenRange), (_range, from, fromMajor, fromMinor, fromPatch, _fromPreRelease, _fromBuild, to, toMajor, toMinor, toPatch, toPreRelease) => {
    if (isXVersion(fromMajor)) from = "";else if (isXVersion(fromMinor)) from = `>=${fromMajor}.0.0`;else if (isXVersion(fromPatch)) from = `>=${fromMajor}.${fromMinor}.0`;else from = `>=${from}`;
    if (isXVersion(toMajor)) to = "";else if (isXVersion(toMinor)) to = `<${Number(toMajor) + 1}.0.0-0`;else if (isXVersion(toPatch)) to = `<${toMajor}.${Number(toMinor) + 1}.0-0`;else if (toPreRelease) to = `<=${toMajor}.${toMinor}.${toPatch}-${toPreRelease}`;else to = `<=${to}`;
    return `${from} ${to}`.trim();
  });
}
function parseComparatorTrim(range) {
  return range.replace(parseRegex(comparatorTrim), "$1$2$3");
}
function parseTildeTrim(range) {
  return range.replace(parseRegex(tildeTrim), "$1~");
}
function parseCaretTrim(range) {
  return range.replace(parseRegex(caretTrim), "$1^");
}
function parseCarets(range) {
  return range.trim().split(/\s+/).map(rangeVersion => rangeVersion.replace(parseRegex(caret), (_, major, minor, patch, preRelease) => {
    if (isXVersion(major)) return "";else if (isXVersion(minor)) return `>=${major}.0.0 <${Number(major) + 1}.0.0-0`;else if (isXVersion(patch)) {
      if (major === "0") return `>=${major}.${minor}.0 <${major}.${Number(minor) + 1}.0-0`;else return `>=${major}.${minor}.0 <${Number(major) + 1}.0.0-0`;
    } else if (preRelease) {
      if (major === "0") {
        if (minor === "0") return `>=${major}.${minor}.${patch}-${preRelease} <${major}.${minor}.${Number(patch) + 1}-0`;else return `>=${major}.${minor}.${patch}-${preRelease} <${major}.${Number(minor) + 1}.0-0`;
      } else return `>=${major}.${minor}.${patch}-${preRelease} <${Number(major) + 1}.0.0-0`;
    } else {
      if (major === "0") if (minor === "0") return `>=${major}.${minor}.${patch} <${major}.${minor}.${Number(patch) + 1}-0`;else return `>=${major}.${minor}.${patch} <${major}.${Number(minor) + 1}.0-0`;
      return `>=${major}.${minor}.${patch} <${Number(major) + 1}.0.0-0`;
    }
  })).join(" ");
}
function parseTildes(range) {
  return range.trim().split(/\s+/).map(rangeVersion => rangeVersion.replace(parseRegex(tilde), (_, major, minor, patch, preRelease) => {
    if (isXVersion(major)) return "";else if (isXVersion(minor)) return `>=${major}.0.0 <${Number(major) + 1}.0.0-0`;else if (isXVersion(patch)) return `>=${major}.${minor}.0 <${major}.${Number(minor) + 1}.0-0`;else if (preRelease) return `>=${major}.${minor}.${patch}-${preRelease} <${major}.${Number(minor) + 1}.0-0`;
    return `>=${major}.${minor}.${patch} <${major}.${Number(minor) + 1}.0-0`;
  })).join(" ");
}
function parseXRanges(range) {
  return range.split(/\s+/).map(rangeVersion => rangeVersion.trim().replace(parseRegex(xRange), (ret, gtlt, major, minor, patch, preRelease) => {
    const isXMajor = isXVersion(major);
    const isXMinor = isXMajor || isXVersion(minor);
    const isXPatch = isXMinor || isXVersion(patch);
    if (gtlt === "=" && isXPatch) gtlt = "";
    preRelease = "";
    if (isXMajor) {
      if (gtlt === ">" || gtlt === "<") return "<0.0.0-0";else return "*";
    } else if (gtlt && isXPatch) {
      if (isXMinor) minor = 0;
      patch = 0;
      if (gtlt === ">") {
        gtlt = ">=";
        if (isXMinor) {
          major = Number(major) + 1;
          minor = 0;
          patch = 0;
        } else {
          minor = Number(minor) + 1;
          patch = 0;
        }
      } else if (gtlt === "<=") {
        gtlt = "<";
        if (isXMinor) major = Number(major) + 1;else minor = Number(minor) + 1;
      }
      if (gtlt === "<") preRelease = "-0";
      return `${gtlt + major}.${minor}.${patch}${preRelease}`;
    } else if (isXMinor) return `>=${major}.0.0${preRelease} <${Number(major) + 1}.0.0-0`;else if (isXPatch) return `>=${major}.${minor}.0${preRelease} <${major}.${Number(minor) + 1}.0-0`;
    return ret;
  })).join(" ");
}
function parseStar(range) {
  return range.trim().replace(parseRegex(star), "");
}
function parseGTE0(comparatorString) {
  return comparatorString.trim().replace(parseRegex(gte0), "");
}

//#endregion

//# sourceMappingURL=parser.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/semver/compare.js
//#region src/utils/semver/compare.ts
function compareAtom(rangeAtom, versionAtom) {
  rangeAtom = Number(rangeAtom) || rangeAtom;
  versionAtom = Number(versionAtom) || versionAtom;
  if (rangeAtom > versionAtom) return 1;
  if (rangeAtom === versionAtom) return 0;
  return -1;
}
function comparePreRelease(rangeAtom, versionAtom) {
  const {
    preRelease: rangePreRelease
  } = rangeAtom;
  const {
    preRelease: versionPreRelease
  } = versionAtom;
  if (rangePreRelease === void 0 && Boolean(versionPreRelease)) return 1;
  if (Boolean(rangePreRelease) && versionPreRelease === void 0) return -1;
  if (rangePreRelease === void 0 && versionPreRelease === void 0) return 0;
  for (let i = 0, n = rangePreRelease.length; i <= n; i++) {
    const rangeElement = rangePreRelease[i];
    const versionElement = versionPreRelease[i];
    if (rangeElement === versionElement) continue;
    if (rangeElement === void 0 && versionElement === void 0) return 0;
    if (!rangeElement) return 1;
    if (!versionElement) return -1;
    return compareAtom(rangeElement, versionElement);
  }
  return 0;
}
function compareVersion(rangeAtom, versionAtom) {
  return compareAtom(rangeAtom.major, versionAtom.major) || compareAtom(rangeAtom.minor, versionAtom.minor) || compareAtom(rangeAtom.patch, versionAtom.patch) || comparePreRelease(rangeAtom, versionAtom);
}
function eq(rangeAtom, versionAtom) {
  return rangeAtom.version === versionAtom.version;
}
function compare(rangeAtom, versionAtom) {
  switch (rangeAtom.operator) {
    case "":
    case "=":
      return eq(rangeAtom, versionAtom);
    case ">":
      return compareVersion(rangeAtom, versionAtom) < 0;
    case ">=":
      return eq(rangeAtom, versionAtom) || compareVersion(rangeAtom, versionAtom) < 0;
    case "<":
      return compareVersion(rangeAtom, versionAtom) > 0;
    case "<=":
      return eq(rangeAtom, versionAtom) || compareVersion(rangeAtom, versionAtom) > 0;
    case void 0:
      return true;
    default:
      return false;
  }
}

//#endregion

//# sourceMappingURL=compare.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/semver/index.js




//#region src/utils/semver/index.ts
function parseComparatorString(range) {
  return pipe(parseCarets, parseTildes, parseXRanges, parseStar)(range);
}
function parseRange(range) {
  return pipe(parseHyphen, parseComparatorTrim, parseTildeTrim, parseCaretTrim)(range.trim()).split(/\s+/).join(" ");
}
function satisfy(version, range) {
  if (!version) return false;
  const extractedVersion = extractComparator(version);
  if (!extractedVersion) return false;
  const [, versionOperator,, versionMajor, versionMinor, versionPatch, versionPreRelease] = extractedVersion;
  const versionAtom = {
    operator: versionOperator,
    version: combineVersion(versionMajor, versionMinor, versionPatch, versionPreRelease),
    major: versionMajor,
    minor: versionMinor,
    patch: versionPatch,
    preRelease: versionPreRelease?.split(".")
  };
  const orRanges = range.split("||");
  for (const orRange of orRanges) {
    const trimmedOrRange = orRange.trim();
    if (!trimmedOrRange) return true;
    if (trimmedOrRange === "*" || trimmedOrRange === "x") return true;
    try {
      const parsedSubRange = parseRange(trimmedOrRange);
      if (!parsedSubRange.trim()) return true;
      const parsedComparatorString = parsedSubRange.split(" ").map(rangeVersion => parseComparatorString(rangeVersion)).join(" ");
      if (!parsedComparatorString.trim()) return true;
      const comparators = parsedComparatorString.split(/\s+/).map(comparator => parseGTE0(comparator)).filter(Boolean);
      if (comparators.length === 0) continue;
      let subRangeSatisfied = true;
      for (const comparator of comparators) {
        const extractedComparator = extractComparator(comparator);
        if (!extractedComparator) {
          subRangeSatisfied = false;
          break;
        }
        const [, rangeOperator,, rangeMajor, rangeMinor, rangePatch, rangePreRelease] = extractedComparator;
        if (!compare({
          operator: rangeOperator,
          version: combineVersion(rangeMajor, rangeMinor, rangePatch, rangePreRelease),
          major: rangeMajor,
          minor: rangeMinor,
          patch: rangePatch,
          preRelease: rangePreRelease?.split(".")
        }, versionAtom)) {
          subRangeSatisfied = false;
          break;
        }
      }
      if (subRangeSatisfied) return true;
    } catch (e) {
      console.error(`[semver] Error processing range part "${trimmedOrRange}":`, e);
      continue;
    }
  }
  return false;
}

//#endregion

//# sourceMappingURL=index.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/share.js







//#region src/utils/share.ts
function formatShare(shareArgs, from, name, shareStrategy) {
  let get;
  if ("get" in shareArgs) get = shareArgs.get;else if ("lib" in shareArgs) get = () => Promise.resolve(shareArgs.lib);else get = () => Promise.resolve(() => {
    logger_error(`Cannot get shared "${name}" from "${from}": neither "get" nor "lib" is provided in the share config.`);
  });
  if (shareArgs.shareConfig?.eager && shareArgs.treeShaking?.mode) logger_error(`Invalid shared config for "${name}" from "${from}": cannot use both "eager: true" and "treeShaking.mode" simultaneously. Choose one strategy.`);
  return {
    deps: [],
    useIn: [],
    from,
    loading: null,
    ...shareArgs,
    shareConfig: {
      requiredVersion: `^${shareArgs.version}`,
      singleton: false,
      eager: false,
      strictVersion: false,
      ...shareArgs.shareConfig
    },
    get,
    loaded: shareArgs?.loaded || "lib" in shareArgs ? true : void 0,
    version: shareArgs.version ?? "0",
    scope: Array.isArray(shareArgs.scope) ? shareArgs.scope : [shareArgs.scope ?? "default"],
    strategy: (shareArgs.strategy ?? shareStrategy) || "version-first",
    treeShaking: shareArgs.treeShaking ? {
      ...shareArgs.treeShaking,
      mode: shareArgs.treeShaking.mode ?? "server-calc",
      status: shareArgs.treeShaking.status ?? TreeShakingStatus.UNKNOWN,
      useIn: []
    } : void 0
  };
}
function formatShareConfigs(prevOptions, newOptions) {
  const shareArgs = newOptions.shared || {};
  const from = newOptions.name;
  const newShareInfos = Object.keys(shareArgs).reduce((res, pkgName) => {
    const arrayShareArgs = arrayOptions(shareArgs[pkgName]);
    res[pkgName] = res[pkgName] || [];
    arrayShareArgs.forEach(shareConfig => {
      res[pkgName].push(formatShare(shareConfig, from, pkgName, newOptions.shareStrategy));
    });
    return res;
  }, {});
  const allShareInfos = {
    ...prevOptions.shared
  };
  Object.keys(newShareInfos).forEach(shareKey => {
    if (!allShareInfos[shareKey]) allShareInfos[shareKey] = newShareInfos[shareKey];else newShareInfos[shareKey].forEach(newUserSharedOptions => {
      if (!allShareInfos[shareKey].find(sharedVal => sharedVal.version === newUserSharedOptions.version)) allShareInfos[shareKey].push(newUserSharedOptions);
    });
  });
  return {
    allShareInfos,
    newShareInfos
  };
}
function shouldUseTreeShaking(treeShaking, usedExports) {
  if (!treeShaking) return false;
  const {
    status,
    mode
  } = treeShaking;
  if (status === TreeShakingStatus.NO_USE) return false;
  if (status === TreeShakingStatus.CALCULATED) return true;
  if (mode === "runtime-infer") {
    if (!usedExports) return true;
    return isMatchUsedExports(treeShaking, usedExports);
  }
  return false;
}
/**
* compare version a and b, return true if a is less than b
*/
function versionLt(a, b) {
  const transformInvalidVersion = version => {
    if (!Number.isNaN(Number(version))) {
      const splitArr = version.split(".");
      let validVersion = version;
      for (let i = 0; i < 3 - splitArr.length; i++) validVersion += ".0";
      return validVersion;
    }
    return version;
  };
  if (satisfy(transformInvalidVersion(a), `<=${transformInvalidVersion(b)}`)) return true;else return false;
}
const findVersion = (shareVersionMap, cb) => {
  const callback = cb || function (prev, cur) {
    return versionLt(prev, cur);
  };
  return Object.keys(shareVersionMap).reduce((prev, cur) => {
    if (!prev) return cur;
    if (callback(prev, cur)) return cur;
    if (prev === "0") return cur;
    return prev;
  }, 0);
};
const isLoaded = shared => {
  return Boolean(shared.loaded) || typeof shared.lib === "function";
};
const isLoading = shared => {
  return Boolean(shared.loading);
};
const isMatchUsedExports = (treeShaking, usedExports) => {
  if (!treeShaking || !usedExports) return false;
  const {
    usedExports: treeShakingUsedExports
  } = treeShaking;
  if (!treeShakingUsedExports) return false;
  if (usedExports.every(e => treeShakingUsedExports.includes(e))) return true;
  return false;
};
function findSingletonVersionOrderByVersion(shareScopeMap, scope, pkgName, treeShaking) {
  const versions = shareScopeMap[scope][pkgName];
  let version = "";
  let useTreesShaking = shouldUseTreeShaking(treeShaking);
  const callback = function (prev, cur) {
    if (useTreesShaking) {
      if (!versions[prev].treeShaking) return true;
      if (!versions[cur].treeShaking) return false;
      return !isLoaded(versions[prev].treeShaking) && versionLt(prev, cur);
    }
    return !isLoaded(versions[prev]) && versionLt(prev, cur);
  };
  if (useTreesShaking) {
    version = findVersion(shareScopeMap[scope][pkgName], callback);
    if (version) return {
      version,
      useTreesShaking
    };
    useTreesShaking = false;
  }
  return {
    version: findVersion(shareScopeMap[scope][pkgName], callback),
    useTreesShaking
  };
}
const isLoadingOrLoaded = shared => {
  return isLoaded(shared) || isLoading(shared);
};
function findSingletonVersionOrderByLoaded(shareScopeMap, scope, pkgName, treeShaking) {
  const versions = shareScopeMap[scope][pkgName];
  let version = "";
  let useTreesShaking = shouldUseTreeShaking(treeShaking);
  const callback = function (prev, cur) {
    if (useTreesShaking) {
      if (!versions[prev].treeShaking) return true;
      if (!versions[cur].treeShaking) return false;
      if (isLoadingOrLoaded(versions[cur].treeShaking)) if (isLoadingOrLoaded(versions[prev].treeShaking)) return Boolean(versionLt(prev, cur));else return true;
      if (isLoadingOrLoaded(versions[prev].treeShaking)) return false;
    }
    if (isLoadingOrLoaded(versions[cur])) if (isLoadingOrLoaded(versions[prev])) return Boolean(versionLt(prev, cur));else return true;
    if (isLoadingOrLoaded(versions[prev])) return false;
    return versionLt(prev, cur);
  };
  if (useTreesShaking) {
    version = findVersion(shareScopeMap[scope][pkgName], callback);
    if (version) return {
      version,
      useTreesShaking
    };
    useTreesShaking = false;
  }
  return {
    version: findVersion(shareScopeMap[scope][pkgName], callback),
    useTreesShaking
  };
}
function getFindShareFunction(strategy) {
  if (strategy === "loaded-first") return findSingletonVersionOrderByLoaded;
  return findSingletonVersionOrderByVersion;
}
function getRegisteredShare(localShareScopeMap, pkgName, shareInfo, resolveShare) {
  if (!localShareScopeMap) return;
  const {
    shareConfig,
    scope = DEFAULT_SCOPE,
    strategy,
    treeShaking
  } = shareInfo;
  const scopes = Array.isArray(scope) ? scope : [scope];
  for (const sc of scopes) if (shareConfig && localShareScopeMap[sc] && localShareScopeMap[sc][pkgName]) {
    const {
      requiredVersion
    } = shareConfig;
    const {
      version: maxOrSingletonVersion,
      useTreesShaking
    } = getFindShareFunction(strategy)(localShareScopeMap, sc, pkgName, treeShaking);
    const defaultResolver = () => {
      const shared = localShareScopeMap[sc][pkgName][maxOrSingletonVersion];
      if (shareConfig.singleton) {
        if (typeof requiredVersion === "string" && !satisfy(maxOrSingletonVersion, requiredVersion)) {
          const msg = `Version ${maxOrSingletonVersion} from ${maxOrSingletonVersion && shared.from} of shared singleton module ${pkgName} does not satisfy the requirement of ${shareInfo.from} which needs ${requiredVersion})`;
          if (shareConfig.strictVersion) logger_error(msg);else warn$1(msg);
        }
        return {
          shared,
          useTreesShaking
        };
      } else {
        if (requiredVersion === false || requiredVersion === "*") return {
          shared,
          useTreesShaking
        };
        if (satisfy(maxOrSingletonVersion, requiredVersion)) return {
          shared,
          useTreesShaking
        };
        const _usedTreeShaking = shouldUseTreeShaking(treeShaking);
        if (_usedTreeShaking) for (const [versionKey, versionValue] of Object.entries(localShareScopeMap[sc][pkgName])) {
          if (!shouldUseTreeShaking(versionValue.treeShaking, treeShaking?.usedExports)) continue;
          if (satisfy(versionKey, requiredVersion)) return {
            shared: versionValue,
            useTreesShaking: _usedTreeShaking
          };
        }
        for (const [versionKey, versionValue] of Object.entries(localShareScopeMap[sc][pkgName])) if (satisfy(versionKey, requiredVersion)) return {
          shared: versionValue,
          useTreesShaking: false
        };
      }
    };
    const params = {
      shareScopeMap: localShareScopeMap,
      scope: sc,
      pkgName,
      version: maxOrSingletonVersion,
      GlobalFederation: Global.__FEDERATION__,
      shareInfo,
      resolver: defaultResolver
    };
    return (resolveShare.emit(params) || params).resolver();
  }
}
function getGlobalShareScope() {
  return Global.__FEDERATION__.__SHARE__;
}
function getTargetSharedOptions(options) {
  const {
    pkgName,
    extraOptions,
    shareInfos
  } = options;
  const defaultResolver = sharedOptions => {
    if (!sharedOptions) return;
    const shareVersionMap = {};
    sharedOptions.forEach(shared => {
      shareVersionMap[shared.version] = shared;
    });
    const callback = function (prev, cur) {
      return !isLoaded(shareVersionMap[prev]) && versionLt(prev, cur);
    };
    return shareVersionMap[findVersion(shareVersionMap, callback)];
  };
  const resolver = extraOptions?.resolver ?? defaultResolver;
  const isPlainObject = val => {
    return val !== null && typeof val === "object" && !Array.isArray(val);
  };
  const merge = (...sources) => {
    const out = {};
    for (const src of sources) {
      if (!src) continue;
      for (const [key, value] of Object.entries(src)) {
        const prev = out[key];
        if (isPlainObject(prev) && isPlainObject(value)) out[key] = merge(prev, value);else if (value !== void 0) out[key] = value;
      }
    }
    return out;
  };
  return merge(resolver(shareInfos[pkgName]), extraOptions?.customShareInfo);
}
const addUseIn = (shared, from) => {
  if (!shared.useIn) shared.useIn = [];
  addUniqueItem(shared.useIn, from);
};
function directShare(shared, useTreesShaking) {
  if (useTreesShaking && shared.treeShaking) return shared.treeShaking;
  return shared;
}

//#endregion

//# sourceMappingURL=share.js.map
;// ./node_modules/.pnpm/@module-federation+sdk@2.5._a798783c209e371a5dfec692960a63df/node_modules/@module-federation/sdk/dist/dom.js



//#region src/dom.ts
function dom_safeWrapper(_x, _x2) {
  return dist_dom_safeWrapper.apply(this, arguments);
}
function dist_dom_safeWrapper() {
  dist_dom_safeWrapper = (0,asyncToGenerator/* default */.A)(function* (callback, disableWarn) {
    try {
      return yield callback();
    } catch (e) {
      !disableWarn && warn(e);
      return;
    }
  });
  return dist_dom_safeWrapper.apply(this, arguments);
}
function dom_isStaticResourcesEqual(url1, url2) {
  const REG_EXP = /^(https?:)?\/\//i;
  return url1.replace(REG_EXP, "").replace(/\/$/, "") === url2.replace(REG_EXP, "").replace(/\/$/, "");
}
function createScript(info) {
  let script = null;
  let needAttach = true;
  let timeout = 2e4;
  let timeoutId;
  const scripts = document.getElementsByTagName("script");
  for (let i = 0; i < scripts.length; i++) {
    const s = scripts[i];
    const scriptSrc = s.getAttribute("src");
    if (scriptSrc && dom_isStaticResourcesEqual(scriptSrc, info.url)) {
      script = s;
      needAttach = false;
      break;
    }
  }
  if (!script) {
    const attrs = info.attrs;
    script = document.createElement("script");
    script.type = attrs?.["type"] === "module" ? "module" : "text/javascript";
    let createScriptRes = void 0;
    if (info.createScriptHook) {
      createScriptRes = info.createScriptHook(info.url, info.attrs);
      if (createScriptRes instanceof HTMLScriptElement) script = createScriptRes;else if (typeof createScriptRes === "object") {
        if ("script" in createScriptRes && createScriptRes.script) script = createScriptRes.script;
        if ("timeout" in createScriptRes && createScriptRes.timeout) timeout = createScriptRes.timeout;
      }
    }
    if (!script.src) script.src = info.url;
    if (attrs && !createScriptRes) Object.keys(attrs).forEach(name => {
      if (script) {
        if (name === "async" || name === "defer") script[name] = attrs[name];else if (!script.getAttribute(name)) script.setAttribute(name, attrs[name]);
      }
    });
  }
  let executionError = null;
  const executionErrorHandler = typeof window !== "undefined" ? evt => {
    if (evt.filename && dom_isStaticResourcesEqual(evt.filename, info.url)) {
      const err = /* @__PURE__ */new Error(`ScriptExecutionError: Script "${info.url}" loaded but threw a runtime error during execution: ${evt.message} (${evt.filename}:${evt.lineno}:${evt.colno})`);
      err.name = "ScriptExecutionError";
      executionError = err;
    }
  } : null;
  if (executionErrorHandler) window.addEventListener("error", executionErrorHandler);
  const onScriptComplete = /*#__PURE__*/function () {
    var _ref = (0,asyncToGenerator/* default */.A)(function* (prev, event) {
      clearTimeout(timeoutId);
      if (executionErrorHandler) window.removeEventListener("error", executionErrorHandler);
      const onScriptCompleteCallback = () => {
        if (event?.type === "error") {
          const networkError = /* @__PURE__ */new Error(event?.isTimeout ? `ScriptNetworkError: Script "${info.url}" timed out.` : `ScriptNetworkError: Failed to load script "${info.url}" - the script URL is unreachable or the server returned an error (network failure, 404, CORS, etc.)`);
          networkError.name = "ScriptNetworkError";
          info?.onErrorCallback && info?.onErrorCallback(networkError);
        } else if (executionError) info?.onErrorCallback && info?.onErrorCallback(executionError);else info?.cb && info?.cb();
      };
      if (script) {
        script.onerror = null;
        script.onload = null;
        dom_safeWrapper(() => {
          const {
            needDeleteScript = true
          } = info;
          if (needDeleteScript) script?.parentNode && script.parentNode.removeChild(script);
        });
        if (prev && typeof prev === "function") {
          const result = prev(event);
          if (result instanceof Promise) {
            const res = yield result;
            onScriptCompleteCallback();
            return res;
          }
          onScriptCompleteCallback();
          return result;
        }
      }
      onScriptCompleteCallback();
    });
    return function onScriptComplete(_x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
  script.onerror = onScriptComplete.bind(null, script.onerror);
  script.onload = onScriptComplete.bind(null, script.onload);
  timeoutId = setTimeout(() => {
    onScriptComplete(null, {
      type: "error",
      isTimeout: true
    });
  }, timeout);
  return {
    script,
    needAttach
  };
}
function createLink(info) {
  let link = null;
  let needAttach = true;
  let timeout = 2e4;
  let timeoutId;
  const links = document.getElementsByTagName("link");
  for (let i = 0; i < links.length; i++) {
    const l = links[i];
    const linkHref = l.getAttribute("href");
    const linkRel = l.getAttribute("rel");
    if (linkHref && dom_isStaticResourcesEqual(linkHref, info.url) && linkRel === info.attrs["rel"]) {
      link = l;
      needAttach = false;
      break;
    }
  }
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("href", info.url);
    let createLinkRes = void 0;
    let shouldApplyAttrs = true;
    const attrs = info.attrs;
    if (info.createLinkHook) {
      createLinkRes = info.createLinkHook(info.url, attrs);
      if (createLinkRes instanceof HTMLLinkElement) {
        link = createLinkRes;
        shouldApplyAttrs = false;
      } else if (typeof createLinkRes === "object") {
        if ("link" in createLinkRes && createLinkRes.link) {
          link = createLinkRes.link;
          shouldApplyAttrs = false;
        }
        if ("timeout" in createLinkRes && createLinkRes.timeout) timeout = createLinkRes.timeout;
      }
    }
    if (attrs && shouldApplyAttrs) Object.keys(attrs).forEach(name => {
      if (link && !link.getAttribute(name)) link.setAttribute(name, attrs[name]);
    });
  }
  if (!needAttach) {
    Promise.resolve().then(() => {
      info?.cb && info?.cb();
    });
    return {
      link,
      needAttach
    };
  }
  const onLinkComplete = (prev, event) => {
    if (timeoutId) clearTimeout(timeoutId);
    const onLinkCompleteCallback = () => {
      if (event?.type === "error") {
        const linkError = /* @__PURE__ */new Error(event?.isTimeout ? `LinkNetworkError: Link "${info.url}" timed out.` : `LinkNetworkError: Failed to load link "${info.url}" - the URL is unreachable or the server returned an error.`);
        linkError.name = "LinkNetworkError";
        info?.onErrorCallback && info?.onErrorCallback(linkError);
      } else info?.cb && info?.cb();
    };
    if (link) {
      link.onerror = null;
      link.onload = null;
      dom_safeWrapper(() => {
        const {
          needDeleteLink = true
        } = info;
        if (needDeleteLink) link?.parentNode && link.parentNode.removeChild(link);
      });
      if (prev) {
        const res = prev(event);
        onLinkCompleteCallback();
        return res;
      }
    }
    onLinkCompleteCallback();
  };
  link.onerror = onLinkComplete.bind(null, link.onerror);
  link.onload = onLinkComplete.bind(null, link.onload);
  timeoutId = setTimeout(() => {
    onLinkComplete(null, {
      type: "error",
      isTimeout: true
    });
  }, timeout);
  return {
    link,
    needAttach
  };
}
function loadScript(url, info) {
  const {
    attrs = {},
    createScriptHook
  } = info;
  return new Promise((resolve, reject) => {
    const {
      script,
      needAttach
    } = createScript({
      url,
      cb: resolve,
      onErrorCallback: reject,
      attrs: {
        fetchpriority: "high",
        ...attrs
      },
      createScriptHook,
      needDeleteScript: true
    });
    needAttach && document.head.appendChild(script);
  });
}

//#endregion

//# sourceMappingURL=dom.js.map
;// ./node_modules/.pnpm/@module-federation+sdk@2.5._a798783c209e371a5dfec692960a63df/node_modules/@module-federation/sdk/dist/node.js

//#region src/node.ts
const sdkImportCache = /* @__PURE__ */new Map();
function importNodeModule(name) {
  if (!name) throw new Error("import specifier is required");
  if (sdkImportCache.has(name)) return sdkImportCache.get(name);
  const promise = new Function("name", `return import(name)`)(name).then(res => res).catch(error => {
    console.error(`Error importing module ${name}:`, error);
    sdkImportCache.delete(name);
    throw error;
  });
  sdkImportCache.set(name, promise);
  return promise;
}
const loadNodeFetch = /*#__PURE__*/function () {
  var _ref = (0,asyncToGenerator/* default */.A)(function* () {
    const fetchModule = yield importNodeModule("node-fetch");
    return fetchModule.default || fetchModule;
  });
  return function loadNodeFetch() {
    return _ref.apply(this, arguments);
  };
}();
const lazyLoaderHookFetch = /*#__PURE__*/function () {
  var _ref2 = (0,asyncToGenerator/* default */.A)(function* (input, init, loaderHook) {
    const hook = (url, init) => {
      return loaderHook.lifecycle.fetch.emit(url, init);
    };
    const res = yield hook(input, init || {});
    if (!res || !(res instanceof Response)) return (typeof fetch === "undefined" ? yield loadNodeFetch() : fetch)(input, init || {});
    return res;
  });
  return function lazyLoaderHookFetch(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
const createScriptNode = typeof ENV_TARGET === "undefined" || ENV_TARGET !== "web" ? (url, cb, attrs, loaderHook) => {
  if (loaderHook?.createScriptHook) {
    const hookResult = loaderHook.createScriptHook(url);
    if (hookResult && typeof hookResult === "object" && "url" in hookResult) url = hookResult.url;
  }
  let urlObj;
  try {
    urlObj = new URL(url);
  } catch (e) {
    console.error("Error constructing URL:", e);
    cb(/* @__PURE__ */new Error(`Invalid URL: ${e}`));
    return;
  }
  const getFetch = /*#__PURE__*/function () {
    var _ref3 = (0,asyncToGenerator/* default */.A)(function* () {
      if (loaderHook?.fetch) return (input, init) => lazyLoaderHookFetch(input, init, loaderHook);
      return typeof fetch === "undefined" ? loadNodeFetch() : fetch;
    });
    return function getFetch() {
      return _ref3.apply(this, arguments);
    };
  }();
  const handleScriptFetch = /*#__PURE__*/function () {
    var _ref4 = (0,asyncToGenerator/* default */.A)(function* (f, urlObj) {
      try {
        const res = yield f(urlObj.href);
        const data = yield res.text();
        const [path, vm] = yield Promise.all([importNodeModule("path"), importNodeModule("vm")]);
        const scriptContext = {
          exports: {},
          module: {
            exports: {}
          }
        };
        const urlDirname = urlObj.pathname.split("/").slice(0, -1).join("/");
        const filename = path.basename(urlObj.pathname);
        const script = new vm.Script(`(function(exports, module, require, __dirname, __filename) {${data}\n})`, {
          filename,
          importModuleDynamically: vm.constants?.USE_MAIN_CONTEXT_DEFAULT_LOADER ?? importNodeModule
        });
        let requireFn;
        requireFn = (yield importNodeModule("node:module")).createRequire(urlObj.protocol === "file:" || urlObj.protocol === "node:" ? urlObj.href : path.join(process.cwd(), "__mf_require_base__.js"));
        script.runInThisContext()(scriptContext.exports, scriptContext.module, requireFn, urlDirname, filename);
        const exportedInterface = scriptContext.module.exports || scriptContext.exports;
        if (attrs && exportedInterface && attrs["globalName"]) {
          cb(void 0, exportedInterface[attrs["globalName"]] || exportedInterface);
          return;
        }
        cb(void 0, exportedInterface);
      } catch (e) {
        cb(e instanceof Error ? e : /* @__PURE__ */new Error(`Script execution error: ${e}`));
      }
    });
    return function handleScriptFetch(_x4, _x5) {
      return _ref4.apply(this, arguments);
    };
  }();
  getFetch().then(/*#__PURE__*/function () {
    var _ref5 = (0,asyncToGenerator/* default */.A)(function* (f) {
      if (attrs?.["type"] === "esm" || attrs?.["type"] === "module") return loadModule(urlObj.href, {
        fetch: f,
        vm: yield importNodeModule("vm")
      }).then(/*#__PURE__*/function () {
        var _ref6 = (0,asyncToGenerator/* default */.A)(function* (module) {
          yield module.evaluate();
          cb(void 0, module.namespace);
        });
        return function (_x7) {
          return _ref6.apply(this, arguments);
        };
      }()).catch(e => {
        cb(e instanceof Error ? e : /* @__PURE__ */new Error(`Script execution error: ${e}`));
      });
      handleScriptFetch(f, urlObj);
    });
    return function (_x6) {
      return _ref5.apply(this, arguments);
    };
  }()).catch(err => {
    cb(err);
  });
} : (url, cb, attrs, loaderHook) => {
  cb(/* @__PURE__ */new Error("createScriptNode is disabled in non-Node.js environment"));
};
const loadScriptNode = typeof ENV_TARGET === "undefined" || ENV_TARGET !== "web" ? (url, info) => {
  return new Promise((resolve, reject) => {
    createScriptNode(url, (error, scriptContext) => {
      if (error) reject(error);else {
        const remoteEntryKey = info?.attrs?.["globalName"] || `__FEDERATION_${info?.attrs?.["name"]}:custom__`;
        resolve(globalThis[remoteEntryKey] = scriptContext);
      }
    }, info.attrs, info.loaderHook);
  });
} : (url, info) => {
  throw new Error("loadScriptNode is disabled in non-Node.js environment");
};
const esmModuleCache = /* @__PURE__ */new Map();
function loadModule(_x8, _x9) {
  return _loadModule.apply(this, arguments);
} //#endregion
function _loadModule() {
  _loadModule = (0,asyncToGenerator/* default */.A)(function* (url, options) {
    if (esmModuleCache.has(url)) return esmModuleCache.get(url);
    const {
      fetch,
      vm
    } = options;
    const code = yield (yield fetch(url)).text();
    const module = new vm.SourceTextModule(code, {
      importModuleDynamically: function () {
        var _ref7 = (0,asyncToGenerator/* default */.A)(function* (specifier, script) {
          const resolvedUrl = new URL(specifier, url).href;
          return loadModule(resolvedUrl, options);
        });
        return function importModuleDynamically(_x0, _x1) {
          return _ref7.apply(this, arguments);
        };
      }()
    });
    esmModuleCache.set(url, module);
    yield module.link(/*#__PURE__*/function () {
      var _ref8 = (0,asyncToGenerator/* default */.A)(function* (specifier) {
        const resolvedUrl = new URL(specifier, url).href;
        return yield loadModule(resolvedUrl, options);
      });
      return function (_x10) {
        return _ref8.apply(this, arguments);
      };
    }());
    return module;
  });
  return _loadModule.apply(this, arguments);
}

//# sourceMappingURL=node.js.map
;// ./node_modules/.pnpm/@module-federation+error-codes@2.5.1/node_modules/@module-federation/error-codes/dist/error-codes.mjs
//#region src/error-codes.ts
const RUNTIME_001 = "RUNTIME-001";
const RUNTIME_002 = "RUNTIME-002";
const RUNTIME_003 = "RUNTIME-003";
const RUNTIME_004 = "RUNTIME-004";
const RUNTIME_005 = "RUNTIME-005";
const RUNTIME_006 = "RUNTIME-006";
const RUNTIME_007 = "RUNTIME-007";
const RUNTIME_008 = "RUNTIME-008";
const RUNTIME_009 = "RUNTIME-009";
const RUNTIME_010 = "RUNTIME-010";
const RUNTIME_011 = "RUNTIME-011";
const error_codes_RUNTIME_012 = "RUNTIME-012";
const RUNTIME_013 = "RUNTIME-013";
const RUNTIME_014 = "RUNTIME-014";
const RUNTIME_015 = "RUNTIME-015";
const TYPE_001 = "TYPE-001";
const BUILD_001 = "BUILD-001";
const BUILD_002 = "BUILD-002";

//#endregion

//# sourceMappingURL=error-codes.mjs.map
;// ./node_modules/.pnpm/@module-federation+error-codes@2.5.1/node_modules/@module-federation/error-codes/dist/desc.mjs


//#region src/desc.ts
const runtimeDescMap = {
  [RUNTIME_001]: "Failed to get remoteEntry exports.",
  [RUNTIME_002]: "The remote entry interface does not contain \"init\"",
  [RUNTIME_003]: "Failed to get manifest.",
  [RUNTIME_004]: "Failed to locate remote.",
  [RUNTIME_005]: "Invalid loadShareSync function call from bundler runtime",
  [RUNTIME_006]: "Invalid loadShareSync function call from runtime",
  [RUNTIME_007]: "Failed to get remote snapshot.",
  [RUNTIME_008]: "Failed to load script resources.",
  [RUNTIME_009]: "Please call createInstance first.",
  [RUNTIME_010]: "The name option cannot be changed after initialization. If you want to create a new instance with a different name, please use \"createInstance\" api.",
  [RUNTIME_011]: "The remoteEntry URL is missing from the remote snapshot.",
  [error_codes_RUNTIME_012]: "The getter for the shared module is not a function. This may be caused by setting \"shared.import: false\" without the host providing the corresponding lib.",
  [RUNTIME_013]: "The manifest is not a valid Module Federation manifest.",
  [RUNTIME_014]: "The remote does not expose the requested module.",
  [RUNTIME_015]: "Remote container initialization failed."
};
const typeDescMap = {
  [TYPE_001]: "Failed to generate type declaration. Execute the below cmd to reproduce and fix the error."
};
const buildDescMap = {
  [BUILD_001]: "Failed to find expose module.",
  [BUILD_002]: "PublicPath is required in prod mode."
};
const errorDescMap = {
  ...runtimeDescMap,
  ...typeDescMap,
  ...buildDescMap
};

//#endregion

//# sourceMappingURL=desc.mjs.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/load.js







//#region src/utils/load.ts
const importCallback = ".then(callbacks[0]).catch(callbacks[1])";
function loadEsmEntry(_x) {
  return _loadEsmEntry.apply(this, arguments);
}
function _loadEsmEntry() {
  _loadEsmEntry = (0,asyncToGenerator/* default */.A)(function* ({
    entry,
    remoteEntryExports
  }) {
    return new Promise((resolve, reject) => {
      try {
        if (!remoteEntryExports) {
          if (typeof FEDERATION_ALLOW_NEW_FUNCTION !== "undefined") new Function("callbacks", `import("${entry}")${importCallback}`)([resolve, reject]);else import(/* webpackIgnore: true */
          /* @vite-ignore */
          entry).then(resolve).catch(reject);
        } else resolve(remoteEntryExports);
      } catch (e) {
        logger_error(`Failed to load ESM entry from "${entry}". ${e instanceof Error ? e.message : String(e)}`);
      }
    });
  });
  return _loadEsmEntry.apply(this, arguments);
}
function loadSystemJsEntry(_x2) {
  return _loadSystemJsEntry.apply(this, arguments);
}
function _loadSystemJsEntry() {
  _loadSystemJsEntry = (0,asyncToGenerator/* default */.A)(function* ({
    entry,
    remoteEntryExports
  }) {
    return new Promise((resolve, reject) => {
      try {
        if (!remoteEntryExports) {
          if (false) // removed by dead control flow
{}else new Function("callbacks", `System.import("${entry}")${importCallback}`)([resolve, reject]);
        } else resolve(remoteEntryExports);
      } catch (e) {
        logger_error(`Failed to load SystemJS entry from "${entry}". ${e instanceof Error ? e.message : String(e)}`);
      }
    });
  });
  return _loadSystemJsEntry.apply(this, arguments);
}
function handleRemoteEntryLoaded(name, globalName, entry) {
  const {
    remoteEntryKey,
    entryExports
  } = getRemoteEntryExports(name, globalName);
  if (!entryExports) logger_error(RUNTIME_001, runtimeDescMap, {
    remoteName: name,
    remoteEntryUrl: entry,
    remoteEntryKey
  });
  return entryExports;
}
function loadEntryScript(_x3) {
  return _loadEntryScript.apply(this, arguments);
}
function _loadEntryScript() {
  _loadEntryScript = (0,asyncToGenerator/* default */.A)(function* ({
    name,
    globalName,
    entry,
    remoteInfo,
    loaderHook,
    getEntryUrl,
    resourceContext
  }) {
    const {
      entryExports: remoteEntryExports
    } = getRemoteEntryExports(name, globalName);
    if (remoteEntryExports) return remoteEntryExports;
    const url = getEntryUrl ? getEntryUrl(entry) : entry;
    return loadScript(url, {
      attrs: {},
      createScriptHook: (url, attrs) => {
        const res = loaderHook.lifecycle.createScript.emit({
          url,
          attrs,
          remoteInfo,
          resourceContext: resourceContext ? {
            ...resourceContext,
            url
          } : void 0
        });
        if (!res) return;
        if (res instanceof HTMLScriptElement) return res;
        if ("script" in res || "timeout" in res) return res;
      }
    }).then(() => {
      return handleRemoteEntryLoaded(name, globalName, entry);
    }, loadError => {
      const originalMsg = loadError instanceof Error ? loadError.message : String(loadError);
      logger_error(RUNTIME_008, runtimeDescMap, {
        remoteName: name,
        resourceUrl: url
      }, originalMsg);
    });
  });
  return _loadEntryScript.apply(this, arguments);
}
function loadEntryDom(_x4) {
  return _loadEntryDom.apply(this, arguments);
}
function _loadEntryDom() {
  _loadEntryDom = (0,asyncToGenerator/* default */.A)(function* ({
    remoteInfo,
    remoteEntryExports,
    loaderHook,
    getEntryUrl,
    resourceContext
  }) {
    const {
      entry,
      entryGlobalName: globalName,
      name,
      type
    } = remoteInfo;
    switch (type) {
      case "esm":
      case "module":
        return loadEsmEntry({
          entry,
          remoteEntryExports
        });
      case "system":
        return loadSystemJsEntry({
          entry,
          remoteEntryExports
        });
      default:
        return loadEntryScript({
          entry,
          globalName,
          name,
          remoteInfo,
          loaderHook,
          getEntryUrl,
          resourceContext
        });
    }
  });
  return _loadEntryDom.apply(this, arguments);
}
function loadEntryNode(_x5) {
  return _loadEntryNode.apply(this, arguments);
}
function _loadEntryNode() {
  _loadEntryNode = (0,asyncToGenerator/* default */.A)(function* ({
    remoteInfo,
    loaderHook,
    resourceContext
  }) {
    const {
      entry,
      entryGlobalName: globalName,
      name,
      type
    } = remoteInfo;
    const {
      entryExports: remoteEntryExports
    } = getRemoteEntryExports(name, globalName);
    if (remoteEntryExports) return remoteEntryExports;
    return loadScriptNode(entry, {
      attrs: {
        name,
        globalName,
        type
      },
      loaderHook: {
        createScriptHook: (url, attrs = {}) => {
          const res = loaderHook.lifecycle.createScript.emit({
            url,
            attrs,
            remoteInfo,
            resourceContext: resourceContext ? {
              ...resourceContext,
              url
            } : void 0
          });
          if (!res) return;
          if ("url" in res) return res;
        }
      }
    }).then(() => {
      return handleRemoteEntryLoaded(name, globalName, entry);
    }).catch(e => {
      logger_error(`Failed to load Node.js entry for remote "${name}" from "${entry}". ${e instanceof Error ? e.message : String(e)}`);
    });
  });
  return _loadEntryNode.apply(this, arguments);
}
function getRemoteEntryUniqueKey(remoteInfo) {
  const {
    entry,
    name
  } = remoteInfo;
  return composeKeyWithSeparator(name, entry);
}
function getRemoteEntry(_x6) {
  return _getRemoteEntry.apply(this, arguments);
}
function _getRemoteEntry() {
  _getRemoteEntry = (0,asyncToGenerator/* default */.A)(function* (params) {
    const {
      origin,
      remoteEntryExports,
      remoteInfo,
      getEntryUrl,
      resourceContext,
      _inErrorHandling = false
    } = params;
    const uniqueKey = getRemoteEntryUniqueKey(remoteInfo);
    if (remoteEntryExports) return remoteEntryExports;
    if (!globalLoading[uniqueKey]) {
      const loadEntryHook = origin.remoteHandler.hooks.lifecycle.loadEntry;
      const loaderHook = origin.loaderHook;
      globalLoading[uniqueKey] = loadEntryHook.emit({
        origin,
        loaderHook,
        remoteInfo,
        remoteEntryExports
      }).then(res => {
        if (res) return res;
        return (typeof ENV_TARGET !== "undefined" ? ENV_TARGET === "web" : isBrowserEnvValue) ? loadEntryDom({
          remoteInfo,
          remoteEntryExports,
          loaderHook,
          getEntryUrl,
          resourceContext
        }) : loadEntryNode({
          remoteInfo,
          loaderHook,
          resourceContext
        });
      }).then(/*#__PURE__*/function () {
        var _ref = (0,asyncToGenerator/* default */.A)(function* (res) {
          yield origin.loaderHook.lifecycle.afterLoadEntry.emit({
            origin,
            remoteInfo,
            remoteEntryExports: res
          });
          return res;
        });
        return function (_x7) {
          return _ref.apply(this, arguments);
        };
      }()).catch(/*#__PURE__*/function () {
        var _ref2 = (0,asyncToGenerator/* default */.A)(function* (err) {
          const uniqueKey = getRemoteEntryUniqueKey(remoteInfo);
          const isScriptExecutionError = err instanceof Error && err.message.includes("ScriptExecutionError");
          if (err instanceof Error && err.message.includes(RUNTIME_008) && !isScriptExecutionError && !_inErrorHandling) {
            const wrappedGetRemoteEntry = params => {
              return getRemoteEntry({
                ...params,
                _inErrorHandling: true
              });
            };
            const RemoteEntryExports = yield origin.loaderHook.lifecycle.loadEntryError.emit({
              getRemoteEntry: wrappedGetRemoteEntry,
              origin,
              remoteInfo,
              remoteEntryExports,
              globalLoading: globalLoading,
              uniqueKey
            });
            if (RemoteEntryExports) {
              yield origin.loaderHook.lifecycle.afterLoadEntry.emit({
                origin,
                remoteInfo,
                remoteEntryExports: RemoteEntryExports,
                recovered: true
              });
              return RemoteEntryExports;
            }
          }
          yield origin.loaderHook.lifecycle.afterLoadEntry.emit({
            origin,
            remoteInfo,
            error: err
          });
          throw err;
        });
        return function (_x8) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
    return globalLoading[uniqueKey];
  });
  return _getRemoteEntry.apply(this, arguments);
}
function getRemoteInfo(remote) {
  return {
    ...remote,
    entry: "entry" in remote ? remote.entry : "",
    type: remote.type || DEFAULT_REMOTE_TYPE,
    entryGlobalName: remote.entryGlobalName || remote.name,
    shareScope: remote.shareScope || DEFAULT_SCOPE
  };
}

//#endregion

//# sourceMappingURL=load.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/plugin.js


//#region src/utils/plugin.ts
function registerPlugins(plugins, instance) {
  const globalPlugins = getGlobalHostPlugins();
  const hookInstances = [instance.hooks, instance.remoteHandler.hooks, instance.sharedHandler.hooks, instance.snapshotHandler.hooks, instance.loaderHook, instance.bridgeHook];
  if (globalPlugins.length > 0) globalPlugins.forEach(plugin => {
    if (plugins?.find(item => item.name !== plugin.name)) plugins.push(plugin);
  });
  if (plugins && plugins.length > 0) plugins.forEach(plugin => {
    hookInstances.forEach(hookInstance => {
      hookInstance.applyPlugin(plugin, instance);
    });
  });
  return plugins;
}

//#endregion

//# sourceMappingURL=plugin.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/index.js








;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/manifest.js
//#region src/utils/manifest.ts
function composeRemoteRequestId(remoteName, expose) {
  if (!expose || expose === ".") return remoteName;
  return `${remoteName}/${expose.replace(/^\.\//, "")}`;
}
function matchRemoteWithNameAndExpose(remotes, id) {
  for (const remote of remotes) {
    const isNameMatched = id.startsWith(remote.name);
    let expose = id.replace(remote.name, "");
    if (isNameMatched) {
      if (expose.startsWith("/")) {
        const pkgNameOrAlias = remote.name;
        expose = `.${expose}`;
        return {
          pkgNameOrAlias,
          expose,
          remote
        };
      } else if (expose === "") return {
        pkgNameOrAlias: remote.name,
        expose: ".",
        remote
      };
    }
    const isAliasMatched = remote.alias && id.startsWith(remote.alias);
    let exposeWithAlias = remote.alias && id.replace(remote.alias, "");
    if (remote.alias && isAliasMatched) {
      if (exposeWithAlias && exposeWithAlias.startsWith("/")) {
        const pkgNameOrAlias = remote.alias;
        exposeWithAlias = `.${exposeWithAlias}`;
        return {
          pkgNameOrAlias,
          expose: exposeWithAlias,
          remote
        };
      } else if (exposeWithAlias === "") return {
        pkgNameOrAlias: remote.alias,
        expose: ".",
        remote
      };
    }
  }
}
function matchRemote(remotes, nameOrAlias) {
  for (const remote of remotes) {
    if (nameOrAlias === remote.name) return remote;
    if (remote.alias && nameOrAlias === remote.alias) return remote;
  }
}

//#endregion

//# sourceMappingURL=manifest.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/preload.js






//#region src/utils/preload.ts
function defaultPreloadArgs(preloadConfig) {
  return {
    resourceCategory: "sync",
    share: true,
    depsRemote: true,
    ...preloadConfig
  };
}
function formatPreloadArgs(remotes, preloadArgs) {
  return preloadArgs.map(args => {
    const remoteInfo = matchRemote(remotes, args.nameOrAlias);
    logger_assert(remoteInfo, `Unable to preload ${args.nameOrAlias} as it is not included in ${!remoteInfo && safeToString({
      remoteInfo,
      remotes
    })}`);
    return {
      remote: remoteInfo,
      preloadConfig: defaultPreloadArgs(args)
    };
  });
}
function normalizePreloadExposes(exposes) {
  if (!exposes) return [];
  return exposes.map(expose => {
    if (expose === ".") return expose;
    if (expose.startsWith("./")) return expose.replace("./", "");
    return expose;
  });
}
function isTimeoutError(error) {
  if (!(error instanceof Error)) return false;
  return error.message.includes("timed out") || error.name.includes("Timeout");
}
function createAssetResult(context, url, status, error) {
  return {
    url,
    status,
    resourceType: context.resourceType,
    initiator: context.initiator,
    id: context.id,
    error
  };
}
function waitForRemoteEntryPreload(_x, _x2, _x3, _x4) {
  return _waitForRemoteEntryPreload.apply(this, arguments);
}
function _waitForRemoteEntryPreload() {
  _waitForRemoteEntryPreload = (0,asyncToGenerator/* default */.A)(function* (host, remoteInfo, entryRemoteInfo, context) {
    const cachedRemote = host.moduleCache.get(entryRemoteInfo.name);
    const url = entryRemoteInfo.entry;
    if (cachedRemote?.remoteEntryExports) return createAssetResult(context, url, "cached");
    try {
      if (!(yield getRemoteEntry({
        origin: host,
        remoteInfo: entryRemoteInfo,
        remoteEntryExports: cachedRemote?.remoteEntryExports,
        resourceContext: {
          ...context,
          url
        }
      }))) throw new Error(`Failed to load remoteEntry "${url}".`);
      return createAssetResult(context, url, "success");
    } catch (error) {
      return createAssetResult(context, url, isTimeoutError(error) ? "timeout" : "error", error);
    }
  });
  return _waitForRemoteEntryPreload.apply(this, arguments);
}
function waitForLinkPreload({
  host,
  remoteInfo,
  url,
  attrs,
  context,
  needDeleteLink
}) {
  return new Promise(resolve => {
    const {
      link,
      needAttach
    } = createLink({
      url,
      cb: () => {
        resolve(createAssetResult(context, url, needAttach ? "success" : "cached"));
      },
      onErrorCallback: error => {
        resolve(createAssetResult(context, url, isTimeoutError(error) ? "timeout" : "error", error));
      },
      attrs,
      createLinkHook: (hookUrl, hookAttrs) => {
        const res = host.loaderHook.lifecycle.createLink.emit({
          url: hookUrl,
          attrs: hookAttrs,
          remoteInfo,
          resourceContext: {
            ...context,
            url: hookUrl
          }
        });
        if (res instanceof HTMLLinkElement) return res;
        return res;
      },
      needDeleteLink
    });
    needAttach && document.head.appendChild(link);
  });
}
function waitForScriptPreload({
  host,
  remoteInfo,
  url,
  attrs,
  context
}) {
  return new Promise(resolve => {
    const {
      script,
      needAttach
    } = createScript({
      url,
      cb: () => {
        resolve(createAssetResult(context, url, needAttach ? "success" : "cached"));
      },
      onErrorCallback: error => {
        resolve(createAssetResult(context, url, isTimeoutError(error) ? "timeout" : "error", error));
      },
      attrs,
      createScriptHook: (hookUrl, hookAttrs) => {
        const res = host.loaderHook.lifecycle.createScript.emit({
          url: hookUrl,
          attrs: hookAttrs,
          remoteInfo,
          resourceContext: {
            ...context,
            url: hookUrl
          }
        });
        if (res instanceof HTMLScriptElement) return res;
        return res;
      },
      needDeleteScript: true
    });
    needAttach && document.head.appendChild(script);
  });
}
function createResourceContext(baseContext, resourceType) {
  return {
    ...baseContext,
    resourceType
  };
}
function preloadAssets(remoteInfo, host, assets, useLinkPreload = true, baseContext = {
  initiator: "preloadRemote",
  id: remoteInfo.name
}) {
  const {
    cssAssets,
    jsAssetsWithoutEntry,
    entryAssets
  } = assets;
  const results = [];
  if (host.options.inBrowser) {
    entryAssets.forEach(asset => {
      const {
        moduleInfo: entryRemoteInfo
      } = asset;
      results.push(waitForRemoteEntryPreload(host, remoteInfo, entryRemoteInfo, createResourceContext(baseContext, "remoteEntry")));
    });
    if (useLinkPreload) {
      const defaultAttrs = {
        rel: "preload",
        as: "style"
      };
      cssAssets.forEach(cssUrl => {
        results.push(waitForLinkPreload({
          host,
          remoteInfo,
          url: cssUrl,
          attrs: defaultAttrs,
          context: createResourceContext(baseContext, "css")
        }));
      });
    } else {
      const defaultAttrs = {
        rel: "stylesheet",
        type: "text/css"
      };
      cssAssets.forEach(cssUrl => {
        results.push(waitForLinkPreload({
          host,
          remoteInfo,
          url: cssUrl,
          attrs: defaultAttrs,
          needDeleteLink: false,
          context: createResourceContext(baseContext, "css")
        }));
      });
    }
    if (useLinkPreload) {
      const defaultAttrs = {
        rel: "preload",
        as: "script"
      };
      jsAssetsWithoutEntry.forEach(jsUrl => {
        results.push(waitForLinkPreload({
          host,
          remoteInfo,
          url: jsUrl,
          attrs: defaultAttrs,
          context: createResourceContext(baseContext, "js")
        }));
      });
    } else {
      const defaultAttrs = {
        fetchpriority: "high",
        type: remoteInfo?.type === "module" ? "module" : "text/javascript"
      };
      jsAssetsWithoutEntry.forEach(jsUrl => {
        results.push(waitForScriptPreload({
          host,
          remoteInfo,
          url: jsUrl,
          attrs: defaultAttrs,
          context: createResourceContext(baseContext, "js")
        }));
      });
    }
  }
  return Promise.all(results);
}

//#endregion

//# sourceMappingURL=preload.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/helpers.js







//#region src/helpers.ts
const ShareUtils = {
  getRegisteredShare: getRegisteredShare,
  getGlobalShareScope: getGlobalShareScope
};
const GlobalUtils = {
  Global: Global,
  nativeGlobal: nativeGlobal,
  resetFederationGlobalInfo: resetFederationGlobalInfo,
  setGlobalFederationInstance: setGlobalFederationInstance,
  getGlobalFederationConstructor: getGlobalFederationConstructor,
  setGlobalFederationConstructor: setGlobalFederationConstructor,
  getInfoWithoutType: getInfoWithoutType,
  getGlobalSnapshot: getGlobalSnapshot,
  getTargetSnapshotInfoByModuleInfo: getTargetSnapshotInfoByModuleInfo,
  getGlobalSnapshotInfoByModuleInfo: getGlobalSnapshotInfoByModuleInfo,
  setGlobalSnapshotInfoByModuleInfo: setGlobalSnapshotInfoByModuleInfo,
  addGlobalSnapshot: addGlobalSnapshot,
  getRemoteEntryExports: getRemoteEntryExports,
  registerGlobalPlugins: registerGlobalPlugins,
  getGlobalHostPlugins: getGlobalHostPlugins,
  getPreloaded: getPreloaded,
  setPreloaded: setPreloaded
};
var helpers_default = {
  global: GlobalUtils,
  share: ShareUtils,
  utils: {
    matchRemoteWithNameAndExpose: matchRemoteWithNameAndExpose,
    preloadAssets: preloadAssets,
    getRemoteInfo: getRemoteInfo
  }
};

//#endregion

//# sourceMappingURL=helpers.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/context.js
//#region src/utils/context.ts
function remoteToEntry(r) {
  return {
    name: r.name,
    alias: r.alias,
    entry: "entry" in r ? r.entry : void 0,
    version: "version" in r ? r.version : void 0,
    type: r.type,
    entryGlobalName: r.entryGlobalName,
    shareScope: r.shareScope
  };
}
/**
* Build a partial MFContext from runtime Options.
* Used to enrich diagnostic entries with host context at error sites.
*/
function optionsToMFContext(options) {
  const shared = {};
  for (const [pkgName, versions] of Object.entries(options.shared)) {
    const first = versions[0];
    if (first) shared[pkgName] = {
      version: first.version,
      singleton: first.shareConfig?.singleton,
      requiredVersion: first.shareConfig?.requiredVersion === false ? false : first.shareConfig?.requiredVersion,
      eager: first.eager,
      strictVersion: first.shareConfig?.strictVersion
    };
  }
  return {
    project: {
      name: options.name,
      mfRole: options.remotes?.length > 0 ? "host" : "unknown"
    },
    mfConfig: {
      name: options.name,
      remotes: options.remotes?.map(remoteToEntry) ?? [],
      shared
    }
  };
}

//#endregion

//# sourceMappingURL=context.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/module/index.js










//#region src/module/index.ts
function getAvailableExposeNames(remoteSnapshot) {
  if (!remoteSnapshot || !("modules" in remoteSnapshot) || !Array.isArray(remoteSnapshot.modules)) return;
  const exposes = remoteSnapshot.modules.map(module => module.moduleName).filter(Boolean);
  return exposes.length ? exposes.join(",") : void 0;
}
function createRemoteEntryInitOptions(remoteInfo, hostShareScopeMap, rawInitScope) {
  const localShareScopeMap = hostShareScopeMap;
  const shareScopeKeys = Array.isArray(remoteInfo.shareScope) ? remoteInfo.shareScope : [remoteInfo.shareScope];
  if (!shareScopeKeys.length) shareScopeKeys.push("default");
  shareScopeKeys.forEach(shareScopeKey => {
    if (!localShareScopeMap[shareScopeKey]) localShareScopeMap[shareScopeKey] = {};
  });
  const remoteEntryInitOptions = {
    version: remoteInfo.version || "",
    shareScopeKeys: Array.isArray(remoteInfo.shareScope) ? shareScopeKeys : remoteInfo.shareScope || "default"
  };
  Object.defineProperty(remoteEntryInitOptions, "shareScopeMap", {
    value: localShareScopeMap,
    enumerable: false
  });
  return {
    remoteEntryInitOptions,
    shareScope: localShareScopeMap[shareScopeKeys[0]],
    initScope: rawInitScope ?? []
  };
}
var Module$1 = class {
  constructor({
    remoteInfo,
    host
  }) {
    this.inited = false;
    this.initing = false;
    this.lib = void 0;
    this.remoteInfo = remoteInfo;
    this.host = host;
  }
  getEntry(expose) {
    var _this = this;
    return (0,asyncToGenerator/* default */.A)(function* () {
      if (_this.remoteEntryExports) return _this.remoteEntryExports;
      const remoteEntryExports = yield getRemoteEntry({
        origin: _this.host,
        remoteInfo: _this.remoteInfo,
        remoteEntryExports: _this.remoteEntryExports,
        resourceContext: {
          initiator: "loadRemote",
          id: composeRemoteRequestId(_this.remoteInfo.name, expose),
          resourceType: "remoteEntry"
        }
      });
      logger_assert(remoteEntryExports, `remoteEntryExports is undefined \n ${safeToString(_this.remoteInfo)}`);
      _this.remoteEntryExports = remoteEntryExports;
      return _this.remoteEntryExports;
    })();
  }
  init(id, remoteSnapshot, rawInitScope, expose) {
    var _this2 = this;
    return (0,asyncToGenerator/* default */.A)(function* () {
      const remoteEntryExports = yield _this2.getEntry(expose);
      if (_this2.inited) {
        yield _this2.host.loaderHook.lifecycle.afterInitRemote.emit({
          id,
          remoteInfo: _this2.remoteInfo,
          remoteSnapshot,
          remoteEntryExports,
          cached: true,
          origin: _this2.host
        });
        return remoteEntryExports;
      }
      if (_this2.initPromise) {
        try {
          yield _this2.initPromise;
          yield _this2.host.loaderHook.lifecycle.afterInitRemote.emit({
            id,
            remoteInfo: _this2.remoteInfo,
            remoteSnapshot,
            remoteEntryExports,
            cached: true,
            origin: _this2.host
          });
        } catch (initError) {
          yield _this2.host.loaderHook.lifecycle.afterInitRemote.emit({
            id,
            remoteInfo: _this2.remoteInfo,
            remoteSnapshot,
            remoteEntryExports,
            error: initError,
            cached: true,
            origin: _this2.host
          });
          throw initError;
        }
        return remoteEntryExports;
      }
      _this2.initing = true;
      _this2.initPromise = (0,asyncToGenerator/* default */.A)(function* () {
        yield _this2.host.loaderHook.lifecycle.beforeInitRemote.emit({
          id,
          remoteInfo: _this2.remoteInfo,
          remoteSnapshot,
          origin: _this2.host
        });
        const {
          remoteEntryInitOptions,
          shareScope,
          initScope
        } = createRemoteEntryInitOptions(_this2.remoteInfo, _this2.host.shareScopeMap, rawInitScope);
        const initContainerOptions = yield _this2.host.hooks.lifecycle.beforeInitContainer.emit({
          shareScope,
          remoteEntryInitOptions,
          initScope,
          remoteInfo: _this2.remoteInfo,
          origin: _this2.host
        });
        if (typeof remoteEntryExports?.init === "undefined") logger_error(RUNTIME_002, runtimeDescMap, {
          hostName: _this2.host.name,
          remoteName: _this2.remoteInfo.name,
          remoteEntryUrl: _this2.remoteInfo.entry,
          remoteEntryKey: _this2.remoteInfo.entryGlobalName
        }, void 0, optionsToMFContext(_this2.host.options));
        try {
          yield remoteEntryExports.init(initContainerOptions.shareScope, initContainerOptions.initScope, initContainerOptions.remoteEntryInitOptions);
        } catch (initError) {
          logger_error(RUNTIME_015, runtimeDescMap, {
            hostName: _this2.host.name,
            remoteName: _this2.remoteInfo.name,
            remoteEntryUrl: _this2.remoteInfo.entry,
            remoteEntryKey: _this2.remoteInfo.entryGlobalName,
            shareScope: _this2.remoteInfo.shareScope
          }, `${initError}`, optionsToMFContext(_this2.host.options));
        }
        yield _this2.host.hooks.lifecycle.initContainer.emit({
          ...initContainerOptions,
          id,
          remoteSnapshot,
          remoteEntryExports
        });
        _this2.inited = true;
      })();
      try {
        yield _this2.initPromise;
        yield _this2.host.loaderHook.lifecycle.afterInitRemote.emit({
          id,
          remoteInfo: _this2.remoteInfo,
          remoteSnapshot,
          remoteEntryExports,
          origin: _this2.host
        });
      } catch (initError) {
        yield _this2.host.loaderHook.lifecycle.afterInitRemote.emit({
          id,
          remoteInfo: _this2.remoteInfo,
          remoteSnapshot,
          remoteEntryExports,
          error: initError,
          origin: _this2.host
        });
        throw initError;
      } finally {
        _this2.initing = false;
        _this2.initPromise = void 0;
      }
      return remoteEntryExports;
    })();
  }
  get(id, expose, options, remoteSnapshot) {
    var _this3 = this;
    return (0,asyncToGenerator/* default */.A)(function* () {
      const {
        loadFactory = true
      } = options || {
        loadFactory: true
      };
      const remoteEntryExports = yield _this3.init(id, remoteSnapshot, void 0, expose);
      _this3.lib = remoteEntryExports;
      yield _this3.host.loaderHook.lifecycle.beforeGetExpose.emit({
        id,
        expose,
        moduleInfo: _this3.remoteInfo,
        remoteEntryExports,
        origin: _this3.host
      });
      let moduleFactory;
      try {
        const hookModuleFactory = yield _this3.host.loaderHook.lifecycle.getModuleFactory.emit({
          remoteEntryExports,
          expose,
          moduleInfo: _this3.remoteInfo
        });
        moduleFactory = typeof hookModuleFactory === "function" ? hookModuleFactory : void 0;
        if (!moduleFactory) moduleFactory = yield remoteEntryExports.get(expose);
        if (!moduleFactory) logger_error(RUNTIME_014, runtimeDescMap, {
          hostName: _this3.host.name,
          remoteName: _this3.remoteInfo.name,
          remoteEntryUrl: _this3.remoteInfo.entry,
          expose,
          requestId: id,
          availableExposes: getAvailableExposeNames(remoteSnapshot)
        }, void 0, optionsToMFContext(_this3.host.options));
        yield _this3.host.loaderHook.lifecycle.afterGetExpose.emit({
          id,
          expose,
          moduleInfo: _this3.remoteInfo,
          remoteEntryExports,
          moduleFactory,
          origin: _this3.host
        });
      } catch (getExposeError) {
        yield _this3.host.loaderHook.lifecycle.afterGetExpose.emit({
          id,
          expose,
          moduleInfo: _this3.remoteInfo,
          remoteEntryExports,
          error: getExposeError,
          origin: _this3.host
        });
        throw getExposeError;
      }
      const symbolName = processModuleAlias(_this3.remoteInfo.name, expose);
      const wrapModuleFactory = _this3.wraperFactory(moduleFactory, symbolName);
      if (!loadFactory) return wrapModuleFactory;
      yield _this3.host.loaderHook.lifecycle.beforeExecuteFactory.emit({
        id,
        expose,
        moduleInfo: _this3.remoteInfo,
        loadFactory,
        origin: _this3.host
      });
      try {
        const exposeContent = yield wrapModuleFactory();
        yield _this3.host.loaderHook.lifecycle.afterExecuteFactory.emit({
          id,
          expose,
          moduleInfo: _this3.remoteInfo,
          loadFactory,
          exposeModule: exposeContent,
          origin: _this3.host
        });
        return exposeContent;
      } catch (executeFactoryError) {
        yield _this3.host.loaderHook.lifecycle.afterExecuteFactory.emit({
          id,
          expose,
          moduleInfo: _this3.remoteInfo,
          loadFactory,
          error: executeFactoryError,
          origin: _this3.host
        });
        throw executeFactoryError;
      }
    })();
  }
  wraperFactory(moduleFactory, id) {
    function defineModuleId(res, id) {
      if (res && typeof res === "object" && Object.isExtensible(res) && !Object.getOwnPropertyDescriptor(res, Symbol.for("mf_module_id"))) Object.defineProperty(res, Symbol.for("mf_module_id"), {
        value: id,
        enumerable: false
      });
    }
    return () => {
      const res = moduleFactory();
      if (res instanceof Promise) return res.then(asyncRes => {
        defineModuleId(asyncRes, id);
        return asyncRes;
      });
      defineModuleId(res, id);
      return res;
    };
  }
};

//#endregion

//# sourceMappingURL=index.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/env.js


//#region src/utils/env.ts
function getBuilderId() {
  return  true ? "mf_activity:0.0.0" : 0;
}

//#endregion

//# sourceMappingURL=env.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/hooks/syncHook.js
//#region src/utils/hooks/syncHook.ts
var SyncHook = class {
  constructor(type) {
    this.type = "";
    this.listeners = /* @__PURE__ */new Set();
    if (type) this.type = type;
  }
  on(fn) {
    if (typeof fn === "function") this.listeners.add(fn);
  }
  once(fn) {
    const self = this;
    this.on(function wrapper(...args) {
      self.remove(wrapper);
      return fn.apply(null, args);
    });
  }
  emit(...data) {
    let result;
    if (this.listeners.size > 0) this.listeners.forEach(fn => {
      const nextResult = fn(...data);
      if (nextResult !== void 0) result = nextResult;
    });
    return result;
  }
  remove(fn) {
    this.listeners.delete(fn);
  }
  removeAll() {
    this.listeners.clear();
  }
};

//#endregion

//# sourceMappingURL=syncHook.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/hooks/asyncHook.js


//#region src/utils/hooks/asyncHook.ts
var AsyncHook = class extends SyncHook {
  emit(...data) {
    let result;
    const ls = Array.from(this.listeners);
    if (ls.length > 0) {
      let i = 0;
      const call = prev => {
        if (prev === false) return false;else if (i < ls.length) return Promise.resolve(ls[i++].apply(null, data)).then(result => {
          if (result === void 0 || data.length === 1 && result === data[0]) return call(prev);
          return call(result);
        });else return prev;
      };
      result = call();
    }
    return Promise.resolve(result);
  }
};

//#endregion

//# sourceMappingURL=asyncHook.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/hooks/syncWaterfallHook.js




//#region src/utils/hooks/syncWaterfallHook.ts
function checkReturnData(originalData, returnedData) {
  if (!isObject(returnedData)) return false;
  if (originalData !== returnedData) {
    for (const key in originalData) if (!(key in returnedData)) return false;
  }
  return true;
}
var SyncWaterfallHook = class extends SyncHook {
  constructor(type) {
    super();
    this.onerror = logger_error;
    this.type = type;
  }
  emit(data) {
    if (!isObject(data)) logger_error(`The data for the "${this.type}" hook should be an object.`);
    for (const fn of this.listeners) try {
      const tempData = fn(data);
      if (tempData === void 0) continue;
      if (checkReturnData(data, tempData)) data = tempData;else {
        this.onerror(`A plugin returned an unacceptable value for the "${this.type}" type.`);
        break;
      }
    } catch (e) {
      warn$1(e);
      this.onerror(e);
    }
    return data;
  }
};

//#endregion

//# sourceMappingURL=syncWaterfallHook.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/hooks/asyncWaterfallHooks.js





//#region src/utils/hooks/asyncWaterfallHooks.ts
var AsyncWaterfallHook = class extends SyncHook {
  constructor(type) {
    super();
    this.onerror = logger_error;
    this.type = type;
  }
  emit(data) {
    if (!isObject(data)) logger_error(`The response data for the "${this.type}" hook must be an object.`);
    const ls = Array.from(this.listeners);
    if (ls.length > 0) {
      let i = 0;
      const processError = e => {
        warn$1(e);
        this.onerror(e);
        return data;
      };
      const call = prevData => {
        if (prevData !== void 0 && checkReturnData(data, prevData)) data = prevData;else if (prevData !== void 0) {
          this.onerror(`A plugin returned an incorrect value for the "${this.type}" type.`);
          return data;
        }
        if (i < ls.length) try {
          return Promise.resolve(ls[i++](data)).then(call, processError);
        } catch (e) {
          return processError(e);
        }
        return data;
      };
      return Promise.resolve(call(data));
    }
    return Promise.resolve(data);
  }
};

//#endregion

//# sourceMappingURL=asyncWaterfallHooks.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/hooks/pluginSystem.js




//#region src/utils/hooks/pluginSystem.ts
var PluginSystem = class {
  constructor(lifecycle) {
    this.registerPlugins = {};
    this.lifecycle = lifecycle;
    this.lifecycleKeys = Object.keys(lifecycle);
  }
  applyPlugin(plugin, instance) {
    logger_assert(isPlainObject(plugin), "Plugin configuration is invalid.");
    const pluginName = plugin.name;
    logger_assert(pluginName, "A name must be provided by the plugin.");
    if (!this.registerPlugins[pluginName]) {
      this.registerPlugins[pluginName] = plugin;
      plugin.apply?.(instance);
      Object.keys(this.lifecycle).forEach(key => {
        const pluginLife = plugin[key];
        if (pluginLife) this.lifecycle[key].on(pluginLife);
      });
    }
  }
  removePlugin(pluginName) {
    logger_assert(pluginName, "A name is required.");
    const plugin = this.registerPlugins[pluginName];
    logger_assert(plugin, `The plugin "${pluginName}" is not registered.`);
    Object.keys(plugin).forEach(key => {
      if (key !== "name") this.lifecycle[key].remove(plugin[key]);
    });
  }
};

//#endregion

//# sourceMappingURL=pluginSystem.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/utils/hooks/index.js






;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/plugins/snapshot/index.js









//#region src/plugins/snapshot/index.ts
function assignRemoteInfo(remoteInfo, remoteSnapshot) {
  const remoteEntryInfo = getRemoteEntryInfoFromSnapshot(remoteSnapshot);
  if (!remoteEntryInfo.url) logger_error(RUNTIME_011, runtimeDescMap, {
    remoteName: remoteInfo.name
  });
  let entryUrl = getResourceUrl(remoteSnapshot, remoteEntryInfo.url);
  if (!isBrowserEnvValue && !entryUrl.startsWith("http")) entryUrl = `https:${entryUrl}`;
  remoteInfo.type = remoteEntryInfo.type;
  remoteInfo.entryGlobalName = remoteEntryInfo.globalName;
  remoteInfo.entry = entryUrl;
  remoteInfo.version = remoteSnapshot.version;
  remoteInfo.buildVersion = remoteSnapshot.buildVersion;
}
function snapshotPlugin() {
  return {
    name: "snapshot-plugin",
    afterResolve(args) {
      return (0,asyncToGenerator/* default */.A)(function* () {
        const {
          remote,
          pkgNameOrAlias,
          expose,
          origin,
          remoteInfo,
          id
        } = args;
        if (!isRemoteInfoWithEntry(remote) || !isPureRemoteEntry(remote)) {
          const {
            remoteSnapshot,
            globalSnapshot
          } = yield origin.snapshotHandler.loadRemoteSnapshotInfo({
            moduleInfo: remote,
            id: composeRemoteRequestId(remote.name, expose)
          });
          assignRemoteInfo(remoteInfo, remoteSnapshot);
          const preloadOptions = {
            remote,
            preloadConfig: {
              nameOrAlias: pkgNameOrAlias,
              exposes: [expose],
              resourceCategory: "sync",
              share: false,
              depsRemote: false
            }
          };
          const assets = yield origin.remoteHandler.hooks.lifecycle.generatePreloadAssets.emit({
            origin,
            preloadOptions,
            remoteInfo,
            remote,
            remoteSnapshot,
            globalSnapshot
          });
          if (assets) preloadAssets(remoteInfo, origin, assets, false, {
            initiator: "loadRemote",
            id
          }).catch(() => void 0);
          return {
            ...args,
            remoteSnapshot
          };
        }
        return args;
      })();
    }
  };
}

//#endregion

//# sourceMappingURL=index.js.map
;// ./node_modules/.pnpm/@module-federation+sdk@2.5._a798783c209e371a5dfec692960a63df/node_modules/@module-federation/sdk/dist/generateSnapshotFromManifest.js
/* unused harmony import specifier */ var generateSnapshotFromManifest_StatsFileName;
/* unused harmony import specifier */ var generateSnapshotFromManifest_ManifestFileName;


//#region src/generateSnapshotFromManifest.ts
const simpleJoinRemoteEntry = (rPath, rName) => {
  if (!rPath) return rName;
  const transformPath = str => {
    if (str === ".") return "";
    if (str.startsWith("./")) return str.replace("./", "");
    if (str.startsWith("/")) {
      const strWithoutSlash = str.slice(1);
      if (strWithoutSlash.endsWith("/")) return strWithoutSlash.slice(0, -1);
      return strWithoutSlash;
    }
    return str;
  };
  const transformedPath = transformPath(rPath);
  if (!transformedPath) return rName;
  if (transformedPath.endsWith("/")) return `${transformedPath}${rName}`;
  return `${transformedPath}/${rName}`;
};
function inferAutoPublicPath(url) {
  return url.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
}
function generateSnapshotFromManifest(manifest, options = {}) {
  const {
    remotes = {},
    overrides = {},
    version
  } = options;
  let remoteSnapshot;
  const getPublicPath = () => {
    if ("publicPath" in manifest.metaData) {
      if ((manifest.metaData.publicPath === "auto" || manifest.metaData.publicPath === "") && version) return inferAutoPublicPath(version);
      return manifest.metaData.publicPath;
    } else return manifest.metaData.getPublicPath;
  };
  const overridesKeys = Object.keys(overrides);
  let remotesInfo = {};
  if (!Object.keys(remotes).length) remotesInfo = manifest.remotes?.reduce((res, next) => {
    let matchedVersion;
    const name = next.federationContainerName;
    if (overridesKeys.includes(name)) matchedVersion = overrides[name];else if ("version" in next) matchedVersion = next.version;else matchedVersion = next.entry;
    res[name] = {
      matchedVersion
    };
    return res;
  }, {}) || {};
  Object.keys(remotes).forEach(key => remotesInfo[key] = {
    matchedVersion: overridesKeys.includes(key) ? overrides[key] : remotes[key]
  });
  const {
    remoteEntry: {
      path: remoteEntryPath,
      name: remoteEntryName,
      type: remoteEntryType
    },
    types: remoteTypes = {
      path: "",
      name: "",
      zip: "",
      api: ""
    },
    buildInfo: {
      buildVersion
    },
    globalName,
    ssrRemoteEntry
  } = manifest.metaData;
  const {
    exposes
  } = manifest;
  let basicRemoteSnapshot = {
    version: version ? version : "",
    buildVersion,
    globalName,
    remoteEntry: simpleJoinRemoteEntry(remoteEntryPath, remoteEntryName),
    remoteEntryType,
    remoteTypes: simpleJoinRemoteEntry(remoteTypes.path, remoteTypes.name),
    remoteTypesZip: remoteTypes.zip || "",
    remoteTypesAPI: remoteTypes.api || "",
    remotesInfo,
    shared: manifest?.shared.map(item => ({
      assets: item.assets,
      sharedName: item.name,
      version: item.version,
      usedExports: item.referenceExports || []
    })),
    modules: exposes?.map(expose => ({
      moduleName: expose.name,
      modulePath: expose.path,
      assets: expose.assets
    }))
  };
  if ("publicPath" in manifest.metaData) {
    remoteSnapshot = {
      ...basicRemoteSnapshot,
      publicPath: getPublicPath()
    };
    if (typeof manifest.metaData.ssrPublicPath === "string") remoteSnapshot.ssrPublicPath = manifest.metaData.ssrPublicPath;
  } else remoteSnapshot = {
    ...basicRemoteSnapshot,
    getPublicPath: getPublicPath()
  };
  if (ssrRemoteEntry) {
    const fullSSRRemoteEntry = simpleJoinRemoteEntry(ssrRemoteEntry.path, ssrRemoteEntry.name);
    remoteSnapshot.ssrRemoteEntry = fullSSRRemoteEntry;
    remoteSnapshot.ssrRemoteEntryType = ssrRemoteEntry.type || "commonjs-module";
  }
  return remoteSnapshot;
}
function isManifestProvider(moduleInfo) {
  if ("remoteEntry" in moduleInfo && moduleInfo.remoteEntry.includes(MANIFEST_EXT)) return true;else return false;
}
function getManifestFileName(manifestOptions) {
  if (!manifestOptions) return {
    statsFileName: generateSnapshotFromManifest_StatsFileName,
    manifestFileName: generateSnapshotFromManifest_ManifestFileName
  };
  let filePath = typeof manifestOptions === "boolean" ? "" : manifestOptions.filePath || "";
  let fileName = typeof manifestOptions === "boolean" ? "" : manifestOptions.fileName || "";
  const JSON_EXT = ".json";
  const addExt = name => {
    if (name.endsWith(JSON_EXT)) return name;
    return `${name}${JSON_EXT}`;
  };
  const insertSuffix = (name, suffix) => {
    return name.replace(JSON_EXT, `${suffix}${JSON_EXT}`);
  };
  const manifestFileName = fileName ? addExt(fileName) : generateSnapshotFromManifest_ManifestFileName;
  return {
    statsFileName: simpleJoinRemoteEntry(filePath, fileName ? insertSuffix(manifestFileName, "-stats") : generateSnapshotFromManifest_StatsFileName),
    manifestFileName: simpleJoinRemoteEntry(filePath, manifestFileName)
  };
}

//#endregion

//# sourceMappingURL=generateSnapshotFromManifest.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/plugins/generate-preload-assets.js









//#region src/plugins/generate-preload-assets.ts
function splitId(id) {
  const splitInfo = id.split(":");
  if (splitInfo.length === 1) return {
    name: splitInfo[0],
    version: void 0
  };else if (splitInfo.length === 2) return {
    name: splitInfo[0],
    version: splitInfo[1]
  };else return {
    name: splitInfo[1],
    version: splitInfo[2]
  };
}
function traverseModuleInfo(globalSnapshot, remoteInfo, traverse, isRoot, memo = {}, remoteSnapshot) {
  const {
    value: snapshotValue
  } = getInfoWithoutType(globalSnapshot, getFMId(remoteInfo));
  const effectiveRemoteSnapshot = remoteSnapshot || snapshotValue;
  if (effectiveRemoteSnapshot && !isManifestProvider(effectiveRemoteSnapshot)) {
    traverse(effectiveRemoteSnapshot, remoteInfo, isRoot);
    if (effectiveRemoteSnapshot.remotesInfo) {
      const remoteKeys = Object.keys(effectiveRemoteSnapshot.remotesInfo);
      for (const key of remoteKeys) {
        if (memo[key]) continue;
        memo[key] = true;
        const subRemoteInfo = splitId(key);
        const remoteValue = effectiveRemoteSnapshot.remotesInfo[key];
        traverseModuleInfo(globalSnapshot, {
          name: subRemoteInfo.name,
          version: remoteValue.matchedVersion
        }, traverse, false, memo, void 0);
      }
    }
  }
}
const isExisted = (type, url) => {
  return document.querySelector(`${type}[${type === "link" ? "href" : "src"}="${url}"]`);
};
function generatePreloadAssets(origin, preloadOptions, remote, globalSnapshot, remoteSnapshot) {
  const cssAssets = [];
  const jsAssets = [];
  const entryAssets = [];
  const loadedSharedJsAssets = /* @__PURE__ */new Set();
  const loadedSharedCssAssets = /* @__PURE__ */new Set();
  const {
    options
  } = origin;
  const {
    preloadConfig: rootPreloadConfig
  } = preloadOptions;
  const {
    depsRemote
  } = rootPreloadConfig;
  traverseModuleInfo(globalSnapshot, remote, (moduleInfoSnapshot, remoteInfo, isRoot) => {
    let preloadConfig;
    if (isRoot) preloadConfig = rootPreloadConfig;else if (Array.isArray(depsRemote)) {
      const findPreloadConfig = depsRemote.find(remoteConfig => {
        if (remoteConfig.nameOrAlias === remoteInfo.name || remoteConfig.nameOrAlias === remoteInfo.alias) return true;
        return false;
      });
      if (!findPreloadConfig) return;
      preloadConfig = defaultPreloadArgs(findPreloadConfig);
    } else if (depsRemote === true) preloadConfig = rootPreloadConfig;else return;
    const remoteEntryUrl = getResourceUrl(moduleInfoSnapshot, getRemoteEntryInfoFromSnapshot(moduleInfoSnapshot).url);
    if (remoteEntryUrl) entryAssets.push({
      name: remoteInfo.name,
      moduleInfo: {
        name: remoteInfo.name,
        entry: remoteEntryUrl,
        type: "remoteEntryType" in moduleInfoSnapshot ? moduleInfoSnapshot.remoteEntryType : "global",
        entryGlobalName: "globalName" in moduleInfoSnapshot ? moduleInfoSnapshot.globalName : remoteInfo.name,
        shareScope: "",
        version: "version" in moduleInfoSnapshot ? moduleInfoSnapshot.version : void 0
      },
      url: remoteEntryUrl
    });
    let moduleAssetsInfo = "modules" in moduleInfoSnapshot ? moduleInfoSnapshot.modules : [];
    const normalizedPreloadExposes = normalizePreloadExposes(preloadConfig.exposes);
    if (normalizedPreloadExposes.length && "modules" in moduleInfoSnapshot) moduleAssetsInfo = moduleInfoSnapshot?.modules?.reduce((assets, moduleAssetInfo) => {
      if (normalizedPreloadExposes?.indexOf(moduleAssetInfo.moduleName) !== -1) assets.push(moduleAssetInfo);
      return assets;
    }, []);
    function handleAssets(assets) {
      const assetsRes = assets.map(asset => getResourceUrl(moduleInfoSnapshot, asset));
      if (preloadConfig.filter) return assetsRes.filter(preloadConfig.filter);
      return assetsRes;
    }
    if (moduleAssetsInfo) {
      const assetsLength = moduleAssetsInfo.length;
      for (let index = 0; index < assetsLength; index++) {
        const assetsInfo = moduleAssetsInfo[index];
        const exposeFullPath = `${remoteInfo.name}/${assetsInfo.moduleName}`;
        origin.remoteHandler.hooks.lifecycle.handlePreloadModule.emit({
          id: assetsInfo.moduleName === "." ? remoteInfo.name : exposeFullPath,
          name: remoteInfo.name,
          remoteSnapshot: moduleInfoSnapshot,
          preloadConfig,
          remote: remoteInfo,
          origin
        });
        if (getPreloaded(exposeFullPath)) continue;
        if (preloadConfig.resourceCategory === "all") {
          cssAssets.push(...handleAssets(assetsInfo.assets.css.async));
          cssAssets.push(...handleAssets(assetsInfo.assets.css.sync));
          jsAssets.push(...handleAssets(assetsInfo.assets.js.async));
          jsAssets.push(...handleAssets(assetsInfo.assets.js.sync));
        } else if (preloadConfig.resourceCategory === "sync") {
          cssAssets.push(...handleAssets(assetsInfo.assets.css.sync));
          jsAssets.push(...handleAssets(assetsInfo.assets.js.sync));
        }
        setPreloaded(exposeFullPath);
      }
    }
  }, true, {}, remoteSnapshot);
  if (remoteSnapshot.shared && remoteSnapshot.shared.length > 0) {
    const collectSharedAssets = (shareInfo, snapshotShared) => {
      const {
        shared: registeredShared
      } = getRegisteredShare(origin.shareScopeMap, snapshotShared.sharedName, shareInfo, origin.sharedHandler.hooks.lifecycle.resolveShare) || {};
      if (registeredShared && typeof registeredShared.lib === "function") {
        snapshotShared.assets.js.sync.forEach(asset => {
          loadedSharedJsAssets.add(asset);
        });
        snapshotShared.assets.css.sync.forEach(asset => {
          loadedSharedCssAssets.add(asset);
        });
      }
    };
    remoteSnapshot.shared.forEach(shared => {
      const shareInfos = options.shared?.[shared.sharedName];
      if (!shareInfos) return;
      const sharedOptions = shared.version ? shareInfos.find(s => s.version === shared.version) : shareInfos;
      if (!sharedOptions) return;
      arrayOptions(sharedOptions).forEach(s => {
        collectSharedAssets(s, shared);
      });
    });
  }
  const needPreloadJsAssets = jsAssets.filter(asset => !loadedSharedJsAssets.has(asset) && !isExisted("script", asset));
  return {
    cssAssets: cssAssets.filter(asset => !loadedSharedCssAssets.has(asset) && !isExisted("link", asset)),
    jsAssetsWithoutEntry: needPreloadJsAssets,
    entryAssets: entryAssets.filter(entry => !isExisted("script", entry.url))
  };
}
const generatePreloadAssetsPlugin = function () {
  return {
    name: "generate-preload-assets-plugin",
    generatePreloadAssets(args) {
      return (0,asyncToGenerator/* default */.A)(function* () {
        const {
          origin,
          preloadOptions,
          remoteInfo,
          remote,
          globalSnapshot,
          remoteSnapshot
        } = args;
        if (!isBrowserEnvValue) return {
          cssAssets: [],
          jsAssetsWithoutEntry: [],
          entryAssets: []
        };
        if (isRemoteInfoWithEntry(remote) && isPureRemoteEntry(remote)) return {
          cssAssets: [],
          jsAssetsWithoutEntry: [],
          entryAssets: [{
            name: remote.name,
            url: remote.entry,
            moduleInfo: {
              name: remoteInfo.name,
              entry: remote.entry,
              type: remoteInfo.type || "global",
              entryGlobalName: "",
              shareScope: ""
            }
          }]
        };
        assignRemoteInfo(remoteInfo, remoteSnapshot);
        return generatePreloadAssets(origin, preloadOptions, remoteInfo, globalSnapshot, remoteSnapshot);
      })();
    }
  };
};

//#endregion

//# sourceMappingURL=generate-preload-assets.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/plugins/snapshot/SnapshotHandler.js














//#region src/plugins/snapshot/SnapshotHandler.ts
function getGlobalRemoteInfo(moduleInfo, origin) {
  const hostGlobalSnapshot = getGlobalSnapshotInfoByModuleInfo({
    name: origin.name,
    version: origin.options.version
  });
  const globalRemoteInfo = hostGlobalSnapshot && "remotesInfo" in hostGlobalSnapshot && hostGlobalSnapshot.remotesInfo && getInfoWithoutType(hostGlobalSnapshot.remotesInfo, moduleInfo.name).value;
  if (globalRemoteInfo && globalRemoteInfo.matchedVersion) return {
    hostGlobalSnapshot,
    globalSnapshot: getGlobalSnapshot(),
    remoteSnapshot: getGlobalSnapshotInfoByModuleInfo({
      name: moduleInfo.name,
      version: globalRemoteInfo.matchedVersion
    })
  };
  return {
    hostGlobalSnapshot: void 0,
    globalSnapshot: getGlobalSnapshot(),
    remoteSnapshot: getGlobalSnapshotInfoByModuleInfo({
      name: moduleInfo.name,
      version: "version" in moduleInfo ? moduleInfo.version : void 0
    })
  };
}
var SnapshotHandler = class {
  constructor(HostInstance) {
    this.loadingHostSnapshot = null;
    this.manifestCache = /* @__PURE__ */new Map();
    this.hooks = new PluginSystem({
      beforeLoadRemoteSnapshot: new AsyncHook("beforeLoadRemoteSnapshot"),
      loadSnapshot: new AsyncWaterfallHook("loadGlobalSnapshot"),
      loadRemoteSnapshot: new AsyncWaterfallHook("loadRemoteSnapshot"),
      afterLoadSnapshot: new AsyncWaterfallHook("afterLoadSnapshot")
    });
    this.manifestLoading = Global.__FEDERATION__.__MANIFEST_LOADING__;
    this.HostInstance = HostInstance;
    this.loaderHook = HostInstance.loaderHook;
  }
  loadRemoteSnapshotInfo(_x) {
    var _this = this;
    return (0,asyncToGenerator/* default */.A)(function* ({
      moduleInfo,
      id,
      initiator = "loadRemote"
    }) {
      const {
        options
      } = _this.HostInstance;
      yield _this.hooks.lifecycle.beforeLoadRemoteSnapshot.emit({
        options,
        moduleInfo,
        origin: _this.HostInstance
      });
      let hostSnapshot = getGlobalSnapshotInfoByModuleInfo({
        name: _this.HostInstance.options.name,
        version: _this.HostInstance.options.version
      });
      if (!hostSnapshot) {
        hostSnapshot = {
          version: _this.HostInstance.options.version || "",
          remoteEntry: "",
          remotesInfo: {}
        };
        addGlobalSnapshot({
          [_this.HostInstance.options.name]: hostSnapshot
        });
      }
      if (hostSnapshot && "remotesInfo" in hostSnapshot && !getInfoWithoutType(hostSnapshot.remotesInfo, moduleInfo.name).value) {
        if ("version" in moduleInfo || "entry" in moduleInfo) hostSnapshot.remotesInfo = {
          ...hostSnapshot?.remotesInfo,
          [moduleInfo.name]: {
            matchedVersion: "version" in moduleInfo ? moduleInfo.version : moduleInfo.entry
          }
        };
      }
      const {
        hostGlobalSnapshot,
        remoteSnapshot,
        globalSnapshot
      } = _this.getGlobalRemoteInfo(moduleInfo);
      const {
        remoteSnapshot: globalRemoteSnapshot,
        globalSnapshot: globalSnapshotRes
      } = yield _this.hooks.lifecycle.loadSnapshot.emit({
        options,
        moduleInfo,
        hostGlobalSnapshot,
        remoteSnapshot,
        globalSnapshot
      });
      let mSnapshot;
      let gSnapshot;
      if (globalRemoteSnapshot) {
        if (isManifestProvider(globalRemoteSnapshot)) {
          const remoteEntry = isBrowserEnvValue ? globalRemoteSnapshot.remoteEntry : globalRemoteSnapshot.ssrRemoteEntry || globalRemoteSnapshot.remoteEntry || "";
          const moduleSnapshot = yield _this.loadManifestSnapshot(remoteEntry, moduleInfo, {}, {
            initiator,
            id: id || moduleInfo.name
          });
          const globalSnapshotRes = setGlobalSnapshotInfoByModuleInfo({
            ...moduleInfo,
            entry: remoteEntry
          }, moduleSnapshot);
          mSnapshot = moduleSnapshot;
          gSnapshot = globalSnapshotRes;
        } else {
          const {
            remoteSnapshot: remoteSnapshotRes
          } = yield _this.hooks.lifecycle.loadRemoteSnapshot.emit({
            options: _this.HostInstance.options,
            moduleInfo,
            remoteSnapshot: globalRemoteSnapshot,
            from: "global"
          });
          mSnapshot = remoteSnapshotRes;
          gSnapshot = globalSnapshotRes;
        }
      } else if (isRemoteInfoWithEntry(moduleInfo)) {
        const moduleSnapshot = yield _this.loadManifestSnapshot(moduleInfo.entry, moduleInfo, {}, {
          initiator,
          id: id || moduleInfo.name
        });
        const globalSnapshotRes = setGlobalSnapshotInfoByModuleInfo(moduleInfo, moduleSnapshot);
        mSnapshot = moduleSnapshot;
        gSnapshot = globalSnapshotRes;
      } else logger_error(RUNTIME_007, runtimeDescMap, {
        remoteName: moduleInfo.name,
        remoteVersion: moduleInfo.version,
        hostName: _this.HostInstance.options.name,
        globalSnapshot: JSON.stringify(globalSnapshotRes)
      }, void 0, optionsToMFContext(_this.HostInstance.options));
      yield _this.hooks.lifecycle.afterLoadSnapshot.emit({
        id,
        host: _this.HostInstance,
        options,
        moduleInfo,
        remoteSnapshot: mSnapshot
      });
      return {
        remoteSnapshot: mSnapshot,
        globalSnapshot: gSnapshot
      };
    }).apply(this, arguments);
  }
  getGlobalRemoteInfo(moduleInfo) {
    return getGlobalRemoteInfo(moduleInfo, this.HostInstance);
  }
  getManifestJson(manifestUrl, moduleInfo, extraOptions, resourceOptions) {
    var _this2 = this;
    return (0,asyncToGenerator/* default */.A)(function* () {
      const getManifest = /*#__PURE__*/function () {
        var _ref = (0,asyncToGenerator/* default */.A)(function* () {
          const remoteInfo = getRemoteInfo(moduleInfo);
          let manifestJson = _this2.manifestCache.get(manifestUrl);
          if (manifestJson) return manifestJson;
          try {
            let res = yield _this2.loaderHook.lifecycle.fetch.emit(manifestUrl, {}, remoteInfo, resourceOptions ? {
              ...resourceOptions,
              url: manifestUrl,
              resourceType: "manifest"
            } : void 0);
            if (!res || !(res instanceof Response)) res = yield fetch(manifestUrl, {});
            manifestJson = yield res.json();
          } catch (err) {
            manifestJson = yield _this2.HostInstance.remoteHandler.hooks.lifecycle.errorLoadRemote.emit({
              id: manifestUrl,
              error: err,
              from: "runtime",
              lifecycle: "afterResolve",
              remote: remoteInfo,
              origin: _this2.HostInstance
            });
            if (!manifestJson) {
              delete _this2.manifestLoading[manifestUrl];
              logger_error(RUNTIME_003, runtimeDescMap, {
                manifestUrl,
                moduleName: moduleInfo.name,
                hostName: _this2.HostInstance.options.name
              }, `${err}`, optionsToMFContext(_this2.HostInstance.options));
            }
          }
          const missingRequiredFields = [!manifestJson.metaData && "metaData", !manifestJson.exposes && "exposes", !manifestJson.shared && "shared"].filter(Boolean);
          if (missingRequiredFields.length > 0) yield _this2.HostInstance.remoteHandler.hooks.lifecycle.errorLoadRemote.emit({
            id: manifestUrl,
            error: /* @__PURE__ */new Error(`"${manifestUrl}" is not a valid federation manifest for remote "${moduleInfo.name}". Missing required fields: ${missingRequiredFields.join(", ")}.`),
            from: "runtime",
            lifecycle: "afterResolve",
            remote: remoteInfo,
            origin: _this2.HostInstance
          });
          if (missingRequiredFields.length > 0) logger_error(RUNTIME_013, runtimeDescMap, {
            manifestUrl,
            moduleName: moduleInfo.name,
            hostName: _this2.HostInstance.options.name,
            missingFields: missingRequiredFields.join(",")
          }, void 0, optionsToMFContext(_this2.HostInstance.options));
          _this2.manifestCache.set(manifestUrl, manifestJson);
          return manifestJson;
        });
        return function getManifest() {
          return _ref.apply(this, arguments);
        };
      }();
      return getManifest();
    })();
  }
  loadManifestSnapshot(manifestUrl, moduleInfo, extraOptions, resourceOptions) {
    var _this3 = this;
    return (0,asyncToGenerator/* default */.A)(function* () {
      const asyncLoadProcess = /*#__PURE__*/function () {
        var _ref2 = (0,asyncToGenerator/* default */.A)(function* () {
          const manifestJson = yield _this3.getManifestJson(manifestUrl, moduleInfo, extraOptions, resourceOptions);
          const remoteSnapshot = generateSnapshotFromManifest(manifestJson, {
            version: manifestUrl
          });
          const {
            remoteSnapshot: remoteSnapshotRes
          } = yield _this3.hooks.lifecycle.loadRemoteSnapshot.emit({
            options: _this3.HostInstance.options,
            moduleInfo,
            manifestJson,
            remoteSnapshot,
            manifestUrl,
            from: "manifest"
          });
          return remoteSnapshotRes;
        });
        return function asyncLoadProcess() {
          return _ref2.apply(this, arguments);
        };
      }();
      if (!_this3.manifestLoading[manifestUrl]) _this3.manifestLoading[manifestUrl] = asyncLoadProcess().then(res => res);
      return _this3.manifestLoading[manifestUrl];
    })();
  }
};

//#endregion

//# sourceMappingURL=SnapshotHandler.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/shared/index.js














//#region src/shared/index.ts
var SharedHandler = class {
  constructor(host) {
    this.hooks = new PluginSystem({
      beforeRegisterShare: new SyncWaterfallHook("beforeRegisterShare"),
      afterResolve: new AsyncWaterfallHook("afterResolve"),
      beforeLoadShare: new AsyncWaterfallHook("beforeLoadShare"),
      loadShare: new AsyncHook(),
      afterLoadShare: new SyncHook("afterLoadShare"),
      errorLoadShare: new SyncHook("errorLoadShare"),
      resolveShare: new SyncWaterfallHook("resolveShare"),
      initContainerShareScopeMap: new SyncWaterfallHook("initContainerShareScopeMap")
    });
    this.host = host;
    this.shareScopeMap = {};
    this.initTokens = {};
    this._setGlobalShareScopeMap(host.options);
  }
  emitAfterLoadShare({
    lifecycle,
    pkgName,
    shareInfo,
    selectedShared
  }) {
    try {
      this.hooks.lifecycle.afterLoadShare.emit({
        pkgName,
        shareInfo,
        selectedShared,
        shared: this.host.options.shared,
        shareScopeMap: this.shareScopeMap,
        lifecycle,
        origin: this.host
      });
    } catch (error) {
      warn$1(error);
    }
  }
  emitErrorLoadShare({
    lifecycle,
    pkgName,
    shareInfo,
    error,
    recovered
  }) {
    try {
      this.hooks.lifecycle.errorLoadShare.emit({
        pkgName,
        shareInfo,
        shared: this.host.options.shared,
        shareScopeMap: this.shareScopeMap,
        lifecycle,
        origin: this.host,
        error,
        recovered
      });
    } catch (hookError) {
      warn$1(hookError);
    }
  }
  registerShared(globalOptions, userOptions) {
    const {
      newShareInfos,
      allShareInfos
    } = formatShareConfigs(globalOptions, userOptions);
    Object.keys(newShareInfos).forEach(sharedKey => {
      newShareInfos[sharedKey].forEach(sharedVal => {
        sharedVal.scope.forEach(sc => {
          this.hooks.lifecycle.beforeRegisterShare.emit({
            origin: this.host,
            pkgName: sharedKey,
            shared: sharedVal
          });
          if (!this.shareScopeMap[sc]?.[sharedKey]) this.setShared({
            pkgName: sharedKey,
            lib: sharedVal.lib,
            get: sharedVal.get,
            loaded: sharedVal.loaded || Boolean(sharedVal.lib),
            shared: sharedVal,
            from: userOptions.name
          });
        });
      });
    });
    return {
      newShareInfos,
      allShareInfos
    };
  }
  loadShare(pkgName, extraOptions) {
    var _this = this;
    return (0,asyncToGenerator/* default */.A)(function* () {
      const {
        host
      } = _this;
      const shareOptions = getTargetSharedOptions({
        pkgName,
        extraOptions,
        shareInfos: host.options.shared
      });
      let shareOptionsRes = shareOptions;
      try {
        if (shareOptions?.scope) yield Promise.all(shareOptions.scope.map(/*#__PURE__*/function () {
          var _ref = (0,asyncToGenerator/* default */.A)(function* (shareScope) {
            yield Promise.all(_this.initializeSharing(shareScope, {
              strategy: shareOptions.strategy
            }));
          });
          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }()));
        shareOptionsRes = (yield _this.hooks.lifecycle.beforeLoadShare.emit({
          pkgName,
          shareInfo: shareOptions,
          shared: host.options.shared,
          origin: host
        })).shareInfo;
        logger_assert(shareOptionsRes, `Cannot find shared "${pkgName}" in host "${host.options.name}". Ensure the shared config for "${pkgName}" is declared in the federation plugin options and the host has been initialized before loading shares.`);
        const resolvedShareOptions = shareOptionsRes;
        const {
          shared: registeredShared,
          useTreesShaking
        } = getRegisteredShare(_this.shareScopeMap, pkgName, shareOptionsRes, _this.hooks.lifecycle.resolveShare) || {};
        if (registeredShared) {
          const targetShared = directShare(registeredShared, useTreesShaking);
          if (targetShared.lib) {
            addUseIn(targetShared, host.options.name);
            _this.emitAfterLoadShare({
              lifecycle: "loadShare",
              pkgName,
              shareInfo: resolvedShareOptions,
              selectedShared: registeredShared
            });
            return targetShared.lib;
          } else if (targetShared.loading && !targetShared.loaded) {
            const factory = yield targetShared.loading;
            targetShared.loaded = true;
            if (!targetShared.lib) targetShared.lib = factory;
            addUseIn(targetShared, host.options.name);
            _this.emitAfterLoadShare({
              lifecycle: "loadShare",
              pkgName,
              shareInfo: resolvedShareOptions,
              selectedShared: registeredShared
            });
            return factory;
          } else {
            const asyncLoadProcess = /*#__PURE__*/function () {
              var _ref2 = (0,asyncToGenerator/* default */.A)(function* () {
                const factory = yield targetShared.get();
                addUseIn(targetShared, host.options.name);
                targetShared.loaded = true;
                targetShared.lib = factory;
                return factory;
              });
              return function asyncLoadProcess() {
                return _ref2.apply(this, arguments);
              };
            }();
            const loading = asyncLoadProcess();
            _this.setShared({
              pkgName,
              loaded: false,
              shared: registeredShared,
              from: host.options.name,
              lib: null,
              loading,
              treeShaking: useTreesShaking ? targetShared : void 0
            });
            const factory = yield loading;
            _this.emitAfterLoadShare({
              lifecycle: "loadShare",
              pkgName,
              shareInfo: resolvedShareOptions,
              selectedShared: registeredShared
            });
            return factory;
          }
        } else {
          if (extraOptions?.customShareInfo) {
            _this.emitErrorLoadShare({
              lifecycle: "loadShare",
              pkgName,
              shareInfo: resolvedShareOptions,
              recovered: true
            });
            return false;
          }
          const _useTreeShaking = shouldUseTreeShaking(resolvedShareOptions.treeShaking);
          const targetShared = directShare(resolvedShareOptions, _useTreeShaking);
          const asyncLoadProcess = /*#__PURE__*/function () {
            var _ref3 = (0,asyncToGenerator/* default */.A)(function* () {
              const factory = yield targetShared.get();
              targetShared.lib = factory;
              targetShared.loaded = true;
              addUseIn(targetShared, host.options.name);
              const {
                shared: gShared,
                useTreesShaking: gUseTreeShaking
              } = getRegisteredShare(_this.shareScopeMap, pkgName, resolvedShareOptions, _this.hooks.lifecycle.resolveShare) || {};
              if (gShared) {
                const targetGShared = directShare(gShared, gUseTreeShaking);
                targetGShared.lib = factory;
                targetGShared.loaded = true;
                gShared.from = resolvedShareOptions.from;
              }
              return factory;
            });
            return function asyncLoadProcess() {
              return _ref3.apply(this, arguments);
            };
          }();
          const loading = asyncLoadProcess();
          _this.setShared({
            pkgName,
            loaded: false,
            shared: resolvedShareOptions,
            from: host.options.name,
            lib: null,
            loading,
            treeShaking: _useTreeShaking ? targetShared : void 0
          });
          const factory = yield loading;
          _this.emitAfterLoadShare({
            lifecycle: "loadShare",
            pkgName,
            shareInfo: resolvedShareOptions,
            selectedShared: resolvedShareOptions
          });
          return factory;
        }
      } catch (shareError) {
        _this.emitErrorLoadShare({
          lifecycle: "loadShare",
          pkgName,
          shareInfo: shareOptionsRes,
          error: shareError
        });
        throw shareError;
      }
    })();
  }
  /**
  * This function initializes the sharing sequence (executed only once per share scope).
  * It accepts one argument, the name of the share scope.
  * If the share scope does not exist, it creates one.
  */
  initializeSharing(shareScopeName = DEFAULT_SCOPE, extraOptions) {
    const {
      host
    } = this;
    const from = extraOptions?.from;
    const strategy = extraOptions?.strategy;
    let initScope = extraOptions?.initScope;
    const promises = [];
    if (from !== "build") {
      const {
        initTokens
      } = this;
      if (!initScope) initScope = [];
      let initToken = initTokens[shareScopeName];
      if (!initToken) initToken = initTokens[shareScopeName] = {
        from: this.host.name
      };
      if (initScope.indexOf(initToken) >= 0) return promises;
      initScope.push(initToken);
    }
    const shareScope = this.shareScopeMap;
    const hostName = host.options.name;
    if (!shareScope[shareScopeName]) shareScope[shareScopeName] = {};
    const scope = shareScope[shareScopeName];
    const register = (name, shared) => {
      const {
        version,
        eager
      } = shared;
      scope[name] = scope[name] || {};
      const versions = scope[name];
      const activeVersion = versions[version] && directShare(versions[version]);
      const activeVersionEager = Boolean(activeVersion && ("eager" in activeVersion && activeVersion.eager || "shareConfig" in activeVersion && activeVersion.shareConfig?.eager));
      if (!activeVersion || activeVersion.strategy !== "loaded-first" && !activeVersion.loaded && (Boolean(!eager) !== !activeVersionEager ? eager : hostName > versions[version].from)) versions[version] = shared;
    };
    const initRemoteModule = /*#__PURE__*/function () {
      var _ref4 = (0,asyncToGenerator/* default */.A)(function* (key) {
        const {
          module
        } = yield host.remoteHandler.getRemoteModuleAndOptions({
          id: key
        });
        let remoteEntryExports = void 0;
        try {
          remoteEntryExports = yield module.getEntry();
        } catch (error) {
          remoteEntryExports = yield host.remoteHandler.hooks.lifecycle.errorLoadRemote.emit({
            id: key,
            error,
            from: "runtime",
            lifecycle: "beforeLoadShare",
            remote: module.remoteInfo,
            origin: host
          });
          if (!remoteEntryExports) return;
        } finally {
          if (remoteEntryExports?.init && !module.initing) {
            module.remoteEntryExports = remoteEntryExports;
            yield module.init(void 0, void 0, initScope);
          }
        }
      });
      return function initRemoteModule(_x2) {
        return _ref4.apply(this, arguments);
      };
    }();
    Object.keys(host.options.shared).forEach(shareName => {
      host.options.shared[shareName].forEach(shared => {
        if (shared.scope.includes(shareScopeName)) register(shareName, shared);
      });
    });
    if (host.options.shareStrategy === "version-first" || strategy === "version-first") host.options.remotes.forEach(remote => {
      if (remote.shareScope === shareScopeName) promises.push(initRemoteModule(remote.name));
    });
    return promises;
  }
  loadShareSync(pkgName, extraOptions) {
    const {
      host
    } = this;
    const shareOptions = getTargetSharedOptions({
      pkgName,
      extraOptions,
      shareInfos: host.options.shared
    });
    try {
      if (shareOptions?.scope) shareOptions.scope.forEach(shareScope => {
        this.initializeSharing(shareScope, {
          strategy: shareOptions.strategy
        });
      });
      const {
        shared: registeredShared
      } = getRegisteredShare(this.shareScopeMap, pkgName, shareOptions, this.hooks.lifecycle.resolveShare) || {};
      if (registeredShared) {
        if (typeof registeredShared.lib === "function") {
          addUseIn(registeredShared, host.options.name);
          if (!registeredShared.loaded) {
            registeredShared.loaded = true;
            if (registeredShared.from === host.options.name) shareOptions.loaded = true;
          }
          this.emitAfterLoadShare({
            lifecycle: "loadShareSync",
            pkgName,
            shareInfo: shareOptions,
            selectedShared: registeredShared
          });
          return registeredShared.lib;
        }
        if (typeof registeredShared.get === "function") {
          const module = registeredShared.get();
          if (!(module instanceof Promise)) {
            addUseIn(registeredShared, host.options.name);
            this.setShared({
              pkgName,
              loaded: true,
              from: host.options.name,
              lib: module,
              shared: registeredShared
            });
            this.emitAfterLoadShare({
              lifecycle: "loadShareSync",
              pkgName,
              shareInfo: shareOptions,
              selectedShared: registeredShared
            });
            return module;
          }
        }
      }
      if (shareOptions.lib) {
        if (!shareOptions.loaded) shareOptions.loaded = true;
        this.emitAfterLoadShare({
          lifecycle: "loadShareSync",
          pkgName,
          shareInfo: shareOptions,
          selectedShared: shareOptions
        });
        return shareOptions.lib;
      }
      if (shareOptions.get) {
        const module = shareOptions.get();
        if (module instanceof Promise) logger_error(extraOptions?.from === "build" ? RUNTIME_005 : RUNTIME_006, runtimeDescMap, {
          hostName: host.options.name,
          sharedPkgName: pkgName
        }, void 0, optionsToMFContext(host.options));
        shareOptions.lib = module;
        this.setShared({
          pkgName,
          loaded: true,
          from: host.options.name,
          lib: shareOptions.lib,
          shared: shareOptions
        });
        this.emitAfterLoadShare({
          lifecycle: "loadShareSync",
          pkgName,
          shareInfo: shareOptions,
          selectedShared: shareOptions
        });
        return shareOptions.lib;
      }
      logger_error(RUNTIME_006, runtimeDescMap, {
        hostName: host.options.name,
        sharedPkgName: pkgName
      }, void 0, optionsToMFContext(host.options));
    } catch (shareError) {
      this.emitErrorLoadShare({
        lifecycle: "loadShareSync",
        pkgName,
        shareInfo: shareOptions,
        error: shareError
      });
      throw shareError;
    }
  }
  initShareScopeMap(scopeName, shareScope, extraOptions = {}) {
    const {
      host
    } = this;
    this.shareScopeMap[scopeName] = shareScope;
    this.hooks.lifecycle.initContainerShareScopeMap.emit({
      shareScope,
      options: host.options,
      origin: host,
      scopeName,
      hostShareScopeMap: extraOptions.hostShareScopeMap
    });
  }
  setShared({
    pkgName,
    shared,
    from,
    lib,
    loading,
    loaded,
    get,
    treeShaking
  }) {
    const {
      version,
      scope = "default",
      ...shareInfo
    } = shared;
    const scopes = Array.isArray(scope) ? scope : [scope];
    const mergeAttrs = shared => {
      const merge = (s, key, val) => {
        if (val && !s[key]) s[key] = val;
      };
      const targetShared = treeShaking ? shared.treeShaking : shared;
      merge(targetShared, "loaded", loaded);
      merge(targetShared, "loading", loading);
      merge(targetShared, "get", get);
    };
    scopes.forEach(sc => {
      if (!this.shareScopeMap[sc]) this.shareScopeMap[sc] = {};
      if (!this.shareScopeMap[sc][pkgName]) this.shareScopeMap[sc][pkgName] = {};
      if (!this.shareScopeMap[sc][pkgName][version]) this.shareScopeMap[sc][pkgName][version] = {
        version,
        scope: [sc],
        ...shareInfo,
        lib
      };
      const registeredShared = this.shareScopeMap[sc][pkgName][version];
      mergeAttrs(registeredShared);
      if (from && registeredShared.from !== from) registeredShared.from = from;
    });
  }
  _setGlobalShareScopeMap(hostOptions) {
    const globalShareScopeMap = getGlobalShareScope();
    const identifier = hostOptions.id || hostOptions.name;
    if (identifier && !globalShareScopeMap[identifier]) globalShareScopeMap[identifier] = this.shareScopeMap;
  }
};

//#endregion

//# sourceMappingURL=index.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/remote/index.js





















//#region src/remote/index.ts
var RemoteHandler = class {
  constructor(host) {
    this.hooks = new PluginSystem({
      beforeRegisterRemote: new SyncWaterfallHook("beforeRegisterRemote"),
      registerRemote: new SyncWaterfallHook("registerRemote"),
      beforeRequest: new AsyncWaterfallHook("beforeRequest"),
      afterMatchRemote: new AsyncHook("afterMatchRemote"),
      onLoad: new AsyncHook("onLoad"),
      afterLoadRemote: new AsyncHook("afterLoadRemote"),
      handlePreloadModule: new SyncHook("handlePreloadModule"),
      errorLoadRemote: new AsyncHook("errorLoadRemote"),
      beforePreloadRemote: new AsyncHook("beforePreloadRemote"),
      generatePreloadAssets: new AsyncHook("generatePreloadAssets"),
      afterPreloadRemote: new AsyncHook("afterPreloadRemote"),
      loadEntry: new AsyncHook()
    });
    this.host = host;
    this.idToRemoteMap = {};
  }
  formatAndRegisterRemote(globalOptions, userOptions) {
    return (userOptions.remotes || []).reduce((res, remote) => {
      this.registerRemote(remote, res, {
        force: false
      });
      return res;
    }, globalOptions.remotes);
  }
  setIdToRemoteMap(id, remoteMatchInfo) {
    const {
      remote,
      expose
    } = remoteMatchInfo;
    const {
      name,
      alias
    } = remote;
    this.idToRemoteMap[id] = {
      name: remote.name,
      expose
    };
    if (alias && id.startsWith(name)) {
      const idWithAlias = id.replace(name, alias);
      this.idToRemoteMap[idWithAlias] = {
        name: remote.name,
        expose
      };
      return;
    }
    if (alias && id.startsWith(alias)) {
      const idWithName = id.replace(alias, name);
      this.idToRemoteMap[idWithName] = {
        name: remote.name,
        expose
      };
    }
  }
  loadRemote(id, options) {
    var _this = this;
    return (0,asyncToGenerator/* default */.A)(function* () {
      const {
        host
      } = _this;
      const startMatchInfo = matchRemoteWithNameAndExpose(host.options.remotes, id);
      let completeRequestId = id;
      let completeExpose = startMatchInfo?.expose;
      let completeRemote = startMatchInfo ? getRemoteInfo(startMatchInfo.remote) : void 0;
      let afterLoadRemoteArgs;
      try {
        const {
          loadFactory = true
        } = options || {
          loadFactory: true
        };
        const {
          module,
          moduleOptions,
          remoteMatchInfo
        } = yield _this.getRemoteModuleAndOptions({
          id
        });
        const {
          pkgNameOrAlias,
          remote,
          expose,
          id: idRes,
          remoteSnapshot
        } = remoteMatchInfo;
        completeRequestId = idRes;
        completeExpose = expose;
        completeRemote = getRemoteInfo(remote);
        const moduleOrFactory = yield module.get(idRes, expose, options, remoteSnapshot);
        const moduleWrapper = yield _this.hooks.lifecycle.onLoad.emit({
          id: idRes,
          pkgNameOrAlias,
          expose,
          exposeModule: loadFactory ? moduleOrFactory : void 0,
          exposeModuleFactory: loadFactory ? void 0 : moduleOrFactory,
          remote,
          options: moduleOptions,
          moduleInstance: module,
          origin: host
        });
        _this.setIdToRemoteMap(id, remoteMatchInfo);
        afterLoadRemoteArgs = {
          id: completeRequestId,
          expose: completeExpose,
          remote: completeRemote,
          options,
          origin: host
        };
        if (typeof moduleWrapper === "function") return moduleWrapper;
        return moduleOrFactory;
      } catch (error) {
        const {
          from = "runtime"
        } = options || {
          from: "runtime"
        };
        let failOver;
        try {
          failOver = yield _this.hooks.lifecycle.errorLoadRemote.emit({
            id,
            error,
            from,
            lifecycle: "onLoad",
            expose: completeExpose,
            remote: completeRemote,
            origin: host
          });
        } catch (hookError) {
          afterLoadRemoteArgs = {
            id: completeRequestId,
            expose: completeExpose,
            remote: completeRemote,
            options,
            error: hookError,
            origin: host
          };
          throw hookError;
        }
        if (!failOver) {
          afterLoadRemoteArgs = {
            id: completeRequestId,
            expose: completeExpose,
            remote: completeRemote,
            options,
            error,
            origin: host
          };
          throw error;
        }
        afterLoadRemoteArgs = {
          id: completeRequestId,
          expose: completeExpose,
          remote: completeRemote,
          options,
          error,
          origin: host,
          recovered: true
        };
        return failOver;
      } finally {
        if (afterLoadRemoteArgs) yield _this.hooks.lifecycle.afterLoadRemote.emit(afterLoadRemoteArgs);
      }
    })();
  }
  preloadRemote(preloadOptions) {
    var _this2 = this;
    return (0,asyncToGenerator/* default */.A)(function* () {
      const {
        host
      } = _this2;
      const preloadResults = [];
      yield _this2.hooks.lifecycle.beforePreloadRemote.emit({
        preloadOps: preloadOptions,
        options: host.options,
        origin: host
      });
      const preloadOps = formatPreloadArgs(host.options.remotes, preloadOptions);
      const createPreloadAssetOps = ops => {
        const {
          preloadConfig,
          remote
        } = ops;
        const exposes = preloadConfig.exposes || [];
        if (!exposes.length) return [{
          ops,
          id: `${remote.name}/*`
        }];
        return exposes.map(expose => ({
          ops: {
            ...ops,
            preloadConfig: {
              ...preloadConfig,
              exposes: [expose]
            }
          },
          id: composeRemoteRequestId(remote.name, expose)
        }));
      };
      let preloadError;
      yield Promise.all(preloadOps.flatMap(createPreloadAssetOps).map(/*#__PURE__*/function () {
        var _ref = (0,asyncToGenerator/* default */.A)(function* (assetOps) {
          const {
            ops,
            id: preloadId
          } = assetOps;
          const {
            remote,
            preloadConfig
          } = ops;
          const remoteInfo = getRemoteInfo(remote);
          try {
            const {
              globalSnapshot,
              remoteSnapshot
            } = yield host.snapshotHandler.loadRemoteSnapshotInfo({
              moduleInfo: remote,
              id: preloadId,
              initiator: "preloadRemote"
            });
            const assets = yield _this2.hooks.lifecycle.generatePreloadAssets.emit({
              origin: host,
              preloadOptions: ops,
              remote,
              remoteInfo,
              globalSnapshot,
              remoteSnapshot
            });
            if (!assets) return;
            const results = yield preloadAssets(remoteInfo, host, assets, true, {
              initiator: "preloadRemote",
              id: preloadId
            });
            preloadResults.push({
              remote,
              remoteInfo,
              preloadConfig,
              id: preloadId,
              results
            });
          } catch (error) {
            preloadResults.push({
              remote,
              remoteInfo,
              preloadConfig,
              id: preloadId,
              results: [{
                url: remoteInfo.entry,
                status: "error",
                resourceType: /\.json(?:$|[?#])/i.test(remoteInfo.entry) ? "manifest" : "remoteEntry",
                initiator: "preloadRemote",
                id: preloadId,
                error
              }]
            });
          }
        });
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }()));
      const failedResults = preloadResults.flatMap(preloadResult => preloadResult.results.filter(result => result.status === "error" || result.status === "timeout"));
      if (failedResults.length > 0) {
        preloadError = /* @__PURE__ */new Error(`preloadRemote failed to load ${failedResults.length} resource(s).`);
        Object.assign(preloadError, {
          results: preloadResults,
          failedResults
        });
      }
      yield _this2.hooks.lifecycle.afterPreloadRemote.emit({
        preloadOps: preloadOptions,
        options: host.options,
        origin: host,
        results: preloadResults,
        error: preloadError
      });
      if (preloadError) throw preloadError;
    })();
  }
  registerRemotes(remotes, options) {
    const {
      host
    } = this;
    remotes.forEach(remote => {
      this.registerRemote(remote, host.options.remotes, {
        force: options?.force
      });
    });
  }
  getRemoteModuleAndOptions(options) {
    var _this3 = this;
    return (0,asyncToGenerator/* default */.A)(function* () {
      const {
        host
      } = _this3;
      const {
        id
      } = options;
      let loadRemoteArgs;
      try {
        loadRemoteArgs = yield _this3.hooks.lifecycle.beforeRequest.emit({
          id,
          options: host.options,
          origin: host
        });
      } catch (error) {
        loadRemoteArgs = yield _this3.hooks.lifecycle.errorLoadRemote.emit({
          id,
          options: host.options,
          origin: host,
          from: "runtime",
          error,
          lifecycle: "beforeRequest"
        });
        if (!loadRemoteArgs) throw error;
      }
      const {
        id: idRes
      } = loadRemoteArgs;
      const remoteSplitInfo = matchRemoteWithNameAndExpose(host.options.remotes, idRes);
      if (!remoteSplitInfo) try {
        logger_error(RUNTIME_004, runtimeDescMap, {
          hostName: host.options.name,
          requestId: idRes
        }, void 0, optionsToMFContext(host.options));
      } catch (matchError) {
        yield _this3.hooks.lifecycle.afterMatchRemote.emit({
          id: idRes,
          options: host.options,
          error: matchError,
          origin: host
        });
        throw matchError;
      }
      const {
        remote: rawRemote
      } = remoteSplitInfo;
      const remoteInfo = getRemoteInfo(rawRemote);
      yield _this3.hooks.lifecycle.afterMatchRemote.emit({
        id: idRes,
        ...remoteSplitInfo,
        options: host.options,
        remoteInfo,
        origin: host
      });
      const matchInfo = yield host.sharedHandler.hooks.lifecycle.afterResolve.emit({
        id: idRes,
        ...remoteSplitInfo,
        options: host.options,
        origin: host,
        remoteInfo
      });
      const {
        remote,
        expose
      } = matchInfo;
      logger_assert(remote && expose, `The 'beforeRequest' hook was executed, but it failed to return the correct 'remote' and 'expose' values while loading ${idRes}.`);
      let module = host.moduleCache.get(remote.name);
      const moduleOptions = {
        host,
        remoteInfo
      };
      if (!module) {
        module = new Module$1(moduleOptions);
        host.moduleCache.set(remote.name, module);
      }
      return {
        module,
        moduleOptions,
        remoteMatchInfo: matchInfo
      };
    })();
  }
  registerRemote(remote, targetRemotes, options) {
    const {
      host
    } = this;
    const normalizeRemote = () => {
      if (remote.alias) {
        const findEqual = targetRemotes.find(item => remote.alias && (item.name.startsWith(remote.alias) || item.alias?.startsWith(remote.alias)));
        logger_assert(!findEqual, `The alias ${remote.alias} of remote ${remote.name} is not allowed to be the prefix of ${findEqual && findEqual.name} name or alias`);
      }
      if ("entry" in remote) {
        if (isBrowserEnvValue && typeof window !== "undefined" && !remote.entry.startsWith("http")) remote.entry = new URL(remote.entry, window.location.origin).href;
      }
      if (!remote.shareScope) remote.shareScope = DEFAULT_SCOPE;
      if (!remote.type) remote.type = DEFAULT_REMOTE_TYPE;
    };
    this.hooks.lifecycle.beforeRegisterRemote.emit({
      remote,
      origin: host
    });
    const registeredRemote = targetRemotes.find(item => item.name === remote.name);
    if (!registeredRemote) {
      normalizeRemote();
      targetRemotes.push(remote);
      this.hooks.lifecycle.registerRemote.emit({
        remote,
        origin: host
      });
    } else {
      const messages = [`The remote "${remote.name}" is already registered.`, "Please note that overriding it may cause unexpected errors."];
      if (options?.force) {
        this.removeRemote(registeredRemote);
        normalizeRemote();
        targetRemotes.push(remote);
        this.hooks.lifecycle.registerRemote.emit({
          remote,
          origin: host
        });
        warn(messages.join(" "));
      }
    }
  }
  removeRemote(remote) {
    try {
      const {
        host
      } = this;
      const {
        name
      } = remote;
      const remoteIndex = host.options.remotes.findIndex(item => item.name === name);
      if (remoteIndex !== -1) host.options.remotes.splice(remoteIndex, 1);
      const loadedModule = host.moduleCache.get(remote.name);
      if (loadedModule) {
        const remoteInfo = loadedModule.remoteInfo;
        const key = remoteInfo.entryGlobalName;
        if (CurrentGlobal[key]) if (Object.getOwnPropertyDescriptor(CurrentGlobal, key)?.configurable) delete CurrentGlobal[key];else CurrentGlobal[key] = void 0;
        const remoteEntryUniqueKey = getRemoteEntryUniqueKey(loadedModule.remoteInfo);
        if (globalLoading[remoteEntryUniqueKey]) delete globalLoading[remoteEntryUniqueKey];
        host.snapshotHandler.manifestCache.delete(remoteInfo.entry);
        let remoteInsId = remoteInfo.buildVersion ? composeKeyWithSeparator(remoteInfo.name, remoteInfo.buildVersion) : remoteInfo.name;
        const remoteInsIndex = CurrentGlobal.__FEDERATION__.__INSTANCES__.findIndex(ins => {
          if (remoteInfo.buildVersion) return ins.options.id === remoteInsId;else return ins.name === remoteInsId;
        });
        if (remoteInsIndex !== -1) {
          const remoteIns = CurrentGlobal.__FEDERATION__.__INSTANCES__[remoteInsIndex];
          remoteInsId = remoteIns.options.id || remoteInsId;
          const globalShareScopeMap = getGlobalShareScope();
          let isAllSharedNotUsed = true;
          const needDeleteKeys = [];
          Object.keys(globalShareScopeMap).forEach(instId => {
            const shareScopeMap = globalShareScopeMap[instId];
            shareScopeMap && Object.keys(shareScopeMap).forEach(shareScope => {
              const shareScopeVal = shareScopeMap[shareScope];
              shareScopeVal && Object.keys(shareScopeVal).forEach(shareName => {
                const sharedPkgs = shareScopeVal[shareName];
                sharedPkgs && Object.keys(sharedPkgs).forEach(shareVersion => {
                  const shared = sharedPkgs[shareVersion];
                  if (shared && typeof shared === "object" && shared.from === remoteInfo.name) if (shared.loaded || shared.loading) {
                    shared.useIn = shared.useIn.filter(usedHostName => usedHostName !== remoteInfo.name);
                    if (shared.useIn.length) isAllSharedNotUsed = false;else needDeleteKeys.push([instId, shareScope, shareName, shareVersion]);
                  } else needDeleteKeys.push([instId, shareScope, shareName, shareVersion]);
                });
              });
            });
          });
          if (isAllSharedNotUsed) {
            remoteIns.shareScopeMap = {};
            delete globalShareScopeMap[remoteInsId];
          }
          needDeleteKeys.forEach(([insId, shareScope, shareName, shareVersion]) => {
            delete globalShareScopeMap[insId]?.[shareScope]?.[shareName]?.[shareVersion];
          });
          CurrentGlobal.__FEDERATION__.__INSTANCES__.splice(remoteInsIndex, 1);
        }
        const {
          hostGlobalSnapshot
        } = getGlobalRemoteInfo(remote, host);
        if (hostGlobalSnapshot) {
          const remoteKey = hostGlobalSnapshot && "remotesInfo" in hostGlobalSnapshot && hostGlobalSnapshot.remotesInfo && getInfoWithoutType(hostGlobalSnapshot.remotesInfo, remote.name).key;
          if (remoteKey) {
            delete hostGlobalSnapshot.remotesInfo[remoteKey];
            if (Boolean(Global.__FEDERATION__.__MANIFEST_LOADING__[remoteKey])) delete Global.__FEDERATION__.__MANIFEST_LOADING__[remoteKey];
          }
        }
        host.moduleCache.delete(remote.name);
      }
    } catch (err) {
      logger_logger.error(`removeRemote failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
};

//#endregion

//# sourceMappingURL=index.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/core.js























//#region src/core.ts
const USE_SNAPSHOT =  true ? !false : 0;
var ModuleFederation = class {
  constructor(userOptions) {
    this.hooks = new PluginSystem({
      beforeInit: new SyncWaterfallHook("beforeInit"),
      init: new SyncHook(),
      beforeInitContainer: new AsyncWaterfallHook("beforeInitContainer"),
      initContainer: new AsyncWaterfallHook("initContainer")
    });
    this.version = "2.5.1";
    this.moduleCache = /* @__PURE__ */new Map();
    this.loaderHook = new PluginSystem({
      getModuleInfo: new SyncHook(),
      createScript: new SyncHook(),
      createLink: new SyncHook(),
      fetch: new AsyncHook(),
      loadEntryError: new AsyncHook(),
      afterLoadEntry: new AsyncHook("afterLoadEntry"),
      beforeInitRemote: new AsyncHook("beforeInitRemote"),
      afterInitRemote: new AsyncHook("afterInitRemote"),
      beforeGetExpose: new AsyncHook("beforeGetExpose"),
      afterGetExpose: new AsyncHook("afterGetExpose"),
      beforeExecuteFactory: new AsyncHook("beforeExecuteFactory"),
      afterExecuteFactory: new AsyncHook("afterExecuteFactory"),
      getModuleFactory: new AsyncHook()
    });
    this.bridgeHook = new PluginSystem({
      beforeBridgeRender: new SyncHook(),
      afterBridgeRender: new SyncHook(),
      beforeBridgeDestroy: new SyncHook(),
      afterBridgeDestroy: new SyncHook()
    });
    const plugins = USE_SNAPSHOT ? [snapshotPlugin(), generatePreloadAssetsPlugin()] : [];
    const defaultOptions = {
      id: getBuilderId(),
      name: userOptions.name,
      plugins,
      remotes: [],
      shared: {},
      inBrowser: isBrowserEnvValue
    };
    this.name = userOptions.name;
    this.options = defaultOptions;
    this.snapshotHandler = new SnapshotHandler(this);
    this.sharedHandler = new SharedHandler(this);
    this.remoteHandler = new RemoteHandler(this);
    this.shareScopeMap = this.sharedHandler.shareScopeMap;
    this.registerPlugins([...defaultOptions.plugins, ...(userOptions.plugins || [])]);
    this.options = this.formatOptions(defaultOptions, userOptions);
  }
  initOptions(userOptions) {
    if (userOptions.name && userOptions.name !== this.options.name) logger_error(getShortErrorMsg_getShortErrorMsg(RUNTIME_010, runtimeDescMap));
    this.registerPlugins(userOptions.plugins);
    const options = this.formatOptions(this.options, userOptions);
    this.options = options;
    return options;
  }
  loadShare(pkgName, extraOptions) {
    var _this = this;
    return (0,asyncToGenerator/* default */.A)(function* () {
      return _this.sharedHandler.loadShare(pkgName, extraOptions);
    })();
  }
  loadShareSync(pkgName, extraOptions) {
    return this.sharedHandler.loadShareSync(pkgName, extraOptions);
  }
  initializeSharing(shareScopeName = DEFAULT_SCOPE, extraOptions) {
    return this.sharedHandler.initializeSharing(shareScopeName, extraOptions);
  }
  initRawContainer(name, url, container) {
    const remoteInfo = getRemoteInfo({
      name,
      entry: url
    });
    const module = new Module$1({
      host: this,
      remoteInfo
    });
    module.remoteEntryExports = container;
    this.moduleCache.set(name, module);
    return module;
  }
  loadRemote(id, options) {
    var _this2 = this;
    return (0,asyncToGenerator/* default */.A)(function* () {
      return _this2.remoteHandler.loadRemote(id, options);
    })();
  }
  preloadRemote(preloadOptions) {
    var _this3 = this;
    return (0,asyncToGenerator/* default */.A)(function* () {
      return _this3.remoteHandler.preloadRemote(preloadOptions);
    })();
  }
  initShareScopeMap(scopeName, shareScope, extraOptions = {}) {
    this.sharedHandler.initShareScopeMap(scopeName, shareScope, extraOptions);
  }
  formatOptions(globalOptions, userOptions) {
    const {
      allShareInfos: shared
    } = formatShareConfigs(globalOptions, userOptions);
    const {
      userOptions: userOptionsRes,
      options: globalOptionsRes
    } = this.hooks.lifecycle.beforeInit.emit({
      origin: this,
      userOptions,
      options: globalOptions,
      shareInfo: shared
    });
    const remotes = this.remoteHandler.formatAndRegisterRemote(globalOptionsRes, userOptionsRes);
    const {
      allShareInfos
    } = this.sharedHandler.registerShared(globalOptionsRes, userOptionsRes);
    const plugins = [...globalOptionsRes.plugins];
    if (userOptionsRes.plugins) userOptionsRes.plugins.forEach(plugin => {
      if (!plugins.includes(plugin)) plugins.push(plugin);
    });
    const optionsRes = {
      ...globalOptions,
      ...userOptions,
      plugins,
      remotes,
      shared: allShareInfos,
      id: userOptionsRes.id || globalOptions.id
    };
    this.hooks.lifecycle.init.emit({
      origin: this,
      options: optionsRes
    });
    return optionsRes;
  }
  registerPlugins(plugins) {
    const pluginRes = registerPlugins(plugins, this);
    this.options.plugins = this.options.plugins.reduce((res, plugin) => {
      if (!plugin) return res;
      if (res && !res.find(item => item.name === plugin.name)) res.push(plugin);
      return res;
    }, pluginRes || []);
  }
  registerRemotes(remotes, options) {
    return this.remoteHandler.registerRemotes(remotes, options);
  }
  registerShared(shared) {
    this.sharedHandler.registerShared(this.options, {
      ...this.options,
      shared
    });
  }
};

//#endregion

//# sourceMappingURL=core.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/_virtual/_rolldown/runtime.js
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
  let target = {};
  for (var name in all) {
    __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  }
  if (!no_symbols) {
    __defProp(target, Symbol.toStringTag, {
      value: "Module"
    });
  }
  return target;
};

//#endregion

;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/type/index.js


//#region src/type/index.ts
var type_exports = /* @__PURE__ */__exportAll({});

//#endregion

//# sourceMappingURL=index.js.map
;// ./node_modules/.pnpm/@module-federation+runtime-_4785f168e51f727e59980a19184e0b38/node_modules/@module-federation/runtime-core/dist/index.js














//#region src/index.ts
const helpers = helpers_default;

//#endregion

//# sourceMappingURL=index.js.map
;// ./node_modules/.pnpm/@module-federation+runtime@_aa07f8e6c2f14d1107e37642ec194e65/node_modules/@module-federation/runtime/dist/utils.js


//#region src/utils.ts
function utils_getBuilderId() {
  return  true ? "mf_activity:0.0.0" : 0;
}
function getGlobalFederationInstance(name, version) {
  const buildId = utils_getBuilderId();
  return CurrentGlobal.__FEDERATION__.__INSTANCES__.find(GMInstance => {
    if (buildId && GMInstance.options.id === buildId) return true;
    if (GMInstance.options.name === name && !GMInstance.options.version && !version) return true;
    if (GMInstance.options.name === name && version && GMInstance.options.version === version) return true;
    return false;
  });
}

//#endregion

//# sourceMappingURL=utils.js.map
;// ./node_modules/.pnpm/@module-federation+runtime@_aa07f8e6c2f14d1107e37642ec194e65/node_modules/@module-federation/runtime/dist/index.js




//#region src/index.ts
function createInstance(options) {
  const instance = new (getGlobalFederationConstructor() || ModuleFederation)({
    id: `${options.name}@${options.version || Date.now()}`,
    ...options
  });
  setGlobalFederationInstance(instance);
  return instance;
}
let FederationInstance = null;
function init(options) {
  const instance = getGlobalFederationInstance(options.name, options.version);
  const normalizedOptions = {
    ...options,
    id: options.id || ""
  };
  if (!instance) {
    FederationInstance = createInstance(normalizedOptions);
    return FederationInstance;
  } else {
    instance.initOptions(normalizedOptions);
    if (!FederationInstance) FederationInstance = instance;
    return instance;
  }
}
function loadRemote(...args) {
  logger_assert(FederationInstance, RUNTIME_009, runtimeDescMap);
  return FederationInstance.loadRemote.apply(FederationInstance, args);
}
function loadShare(...args) {
  logger_assert(FederationInstance, RUNTIME_009, runtimeDescMap);
  return FederationInstance.loadShare.apply(FederationInstance, args);
}
function loadShareSync(...args) {
  logger_assert(FederationInstance, RUNTIME_009, runtimeDescMap);
  return FederationInstance.loadShareSync.apply(FederationInstance, args);
}
function preloadRemote(...args) {
  logger_assert(FederationInstance, RUNTIME_009, runtimeDescMap);
  return FederationInstance.preloadRemote.apply(FederationInstance, args);
}
function registerRemotes(...args) {
  logger_assert(FederationInstance, RUNTIME_009, runtimeDescMap);
  return FederationInstance.registerRemotes.apply(FederationInstance, args);
}
function dist_registerPlugins(...args) {
  logger_assert(FederationInstance, RUNTIME_009, runtimeDescMap);
  return FederationInstance.registerPlugins.apply(FederationInstance, args);
}
function getInstance(finder) {
  if (!finder) return FederationInstance;
  return CurrentGlobal.__FEDERATION__.__INSTANCES__.find(finder) || null;
}
function registerShared(...args) {
  logger_assert(FederationInstance, RUNTIME_009, runtimeDescMap);
  return FederationInstance.registerShared.apply(FederationInstance, args);
}
setGlobalFederationConstructor(ModuleFederation);

//#endregion

//# sourceMappingURL=index.js.map
;// ./node_modules/.pnpm/@module-federation+runtime@_aa07f8e6c2f14d1107e37642ec194e65/node_modules/@module-federation/runtime/dist/bundler.js


;// ./node_modules/.pnpm/@module-federation+runtime@_aa07f8e6c2f14d1107e37642ec194e65/node_modules/@module-federation/runtime/dist/helpers.js



//#region src/helpers.ts
const global = {
  ...helpers.global,
  getGlobalFederationInstance: getGlobalFederationInstance
};
const share = helpers.share;
const utils = helpers.utils;
const runtimeHelpers = {
  global,
  share,
  utils
};

//#endregion

//# sourceMappingURL=helpers.js.map
;// ./node_modules/.pnpm/@module-federation+webpack-_50a6c8031394c685b97cf731a2b434f2/node_modules/@module-federation/webpack-bundler-runtime/dist/init.js




//#region src/init.ts
function init_init({
  webpackRequire
}) {
  const {
    initOptions,
    runtime,
    sharedFallback,
    bundlerRuntime,
    libraryType
  } = webpackRequire.federation;
  if (!initOptions) throw new Error("initOptions is required!");
  const treeShakingSharePlugin = function () {
    return {
      name: "tree-shake-plugin",
      beforeInit(args) {
        const {
          userOptions,
          origin,
          options: registeredOptions
        } = args;
        const version = userOptions.version || registeredOptions.version;
        if (!sharedFallback) return args;
        const currentShared = userOptions.shared || {};
        const shared = [];
        Object.keys(currentShared).forEach(sharedName => {
          (Array.isArray(currentShared[sharedName]) ? currentShared[sharedName] : [currentShared[sharedName]]).forEach(sharedArg => {
            shared.push([sharedName, sharedArg]);
            if ("get" in sharedArg) {
              sharedArg.treeShaking ||= {};
              sharedArg.treeShaking.get = sharedArg.get;
              sharedArg.get = bundlerRuntime.getSharedFallbackGetter({
                shareKey: sharedName,
                factory: sharedArg.get,
                webpackRequire,
                libraryType,
                version: sharedArg.version
              });
            }
          });
        });
        const hostGlobalSnapshot = runtimeHelpers.global.getGlobalSnapshotInfoByModuleInfo({
          name: origin.name,
          version
        });
        if (!hostGlobalSnapshot || !("shared" in hostGlobalSnapshot)) return args;
        Object.keys(registeredOptions.shared || {}).forEach(pkgName => {
          registeredOptions.shared[pkgName].forEach(sharedArg => {
            shared.push([pkgName, sharedArg]);
          });
        });
        const patchShared = (pkgName, shared) => {
          const shareSnapshot = hostGlobalSnapshot.shared.find(item => item.sharedName === pkgName);
          if (!shareSnapshot) return;
          const {
            treeShaking
          } = shared;
          if (!treeShaking) return;
          const {
            secondarySharedTreeShakingName,
            secondarySharedTreeShakingEntry,
            treeShakingStatus
          } = shareSnapshot;
          if (treeShaking.status === treeShakingStatus) return;
          treeShaking.status = treeShakingStatus;
          if (secondarySharedTreeShakingEntry && libraryType && secondarySharedTreeShakingName) treeShaking.get = /*#__PURE__*/(0,asyncToGenerator/* default */.A)(function* () {
            const shareEntry = yield getRemoteEntry({
              origin,
              remoteInfo: {
                name: secondarySharedTreeShakingName,
                entry: secondarySharedTreeShakingEntry,
                type: libraryType,
                entryGlobalName: secondarySharedTreeShakingName,
                shareScope: "default"
              }
            });
            yield shareEntry.init(origin, __webpack_require__.federation.bundlerRuntime);
            return shareEntry.get();
          });
        };
        shared.forEach(([pkgName, sharedArg]) => {
          patchShared(pkgName, sharedArg);
        });
        return args;
      }
    };
  };
  initOptions.plugins ||= [];
  initOptions.plugins.push(treeShakingSharePlugin());
  return runtime.init(initOptions);
}

//#endregion

//# sourceMappingURL=init.js.map
;// ./node_modules/.pnpm/@module-federation+webpack-_50a6c8031394c685b97cf731a2b434f2/node_modules/@module-federation/webpack-bundler-runtime/dist/getSharedFallbackGetter.js
//#region src/getSharedFallbackGetter.ts
const getSharedFallbackGetter = ({
  shareKey,
  factory,
  version,
  webpackRequire,
  libraryType = "global"
}) => {
  const {
    runtime,
    instance,
    bundlerRuntime,
    sharedFallback
  } = webpackRequire.federation;
  if (!sharedFallback) return factory;
  const fallbackItems = sharedFallback[shareKey];
  if (!fallbackItems) return factory;
  const fallbackItem = version ? fallbackItems.find(item => item[1] === version) : fallbackItems[0];
  if (!fallbackItem) throw new Error(`No fallback item found for shareKey: ${shareKey} and version: ${version}`);
  return () => runtime.getRemoteEntry({
    origin: webpackRequire.federation.instance,
    remoteInfo: {
      name: fallbackItem[2],
      entry: `${webpackRequire.p}${fallbackItem[0]}`,
      type: libraryType,
      entryGlobalName: fallbackItem[2],
      shareScope: "default"
    }
  }).then(shareEntry => {
    if (!shareEntry) throw new Error(`Failed to load fallback entry for shareKey: ${shareKey} and version: ${version}`);
    return shareEntry.init(webpackRequire.federation.instance, bundlerRuntime).then(() => shareEntry.get());
  });
};

//#endregion

//# sourceMappingURL=getSharedFallbackGetter.js.map
;// ./node_modules/.pnpm/@module-federation+webpack-_50a6c8031394c685b97cf731a2b434f2/node_modules/@module-federation/webpack-bundler-runtime/dist/index.js










//#region src/index.ts
const federation = {
  runtime: bundler_namespaceObject,
  instance: void 0,
  initOptions: void 0,
  bundlerRuntime: {
    remotes: remotes,
    consumes: consumes,
    I: initializeSharing,
    S: {},
    installInitialConsumes: installInitialConsumes,
    initContainerEntry: initContainerEntry,
    init: init_init,
    getSharedFallbackGetter: getSharedFallbackGetter
  },
  attachShareScopeMap: attachShareScopeMap,
  bundlerRuntimeOptions: {}
};
const instance = federation.instance;
const initOptions = federation.initOptions;
const bundlerRuntime = federation.bundlerRuntime;
const bundlerRuntimeOptions = federation.bundlerRuntimeOptions;

//#endregion

//# sourceMappingURL=index.js.map
;// ./node_modules/.pnpm/@module-federation+webpack-_50a6c8031394c685b97cf731a2b434f2/node_modules/@module-federation/webpack-bundler-runtime/dist/bundler.js



;// ./node_modules/.federation/entry.7be76b17aecaa849951d7c1229c9678d.js

if (!__webpack_require__.federation.runtime || !__webpack_require__.federation.bundlerRuntime) {
  var prevFederation = __webpack_require__.federation;
  __webpack_require__.federation = {};
  for (var key in federation) {
    __webpack_require__.federation[key] = federation[key];
  }
  for (var key in prevFederation) {
    __webpack_require__.federation[key] = prevFederation[key];
  }
}
if (!__webpack_require__.federation.instance) {
  __webpack_require__.federation.instance = __webpack_require__.federation.bundlerRuntime.init({
    webpackRequire: __webpack_require__
  });
  if (__webpack_require__.federation.attachShareScopeMap) {
    __webpack_require__.federation.attachShareScopeMap(__webpack_require__);
  }
  if (__webpack_require__.federation.installInitialConsumes) {
    __webpack_require__.federation.installInitialConsumes();
  }
}

/***/ },

/***/ 4035
(__unused_webpack_module, exports, __webpack_require__) {

var moduleMap = {
	"./Routes": () => {
		return Promise.all(/* __federation_expose_Routes */[__webpack_require__.e(755), __webpack_require__.e(343), __webpack_require__.e(286)]).then(() => (() => ((__webpack_require__(7957)))));
	}
};
var get = (module, getScope) => {
	__webpack_require__.R = getScope;
	getScope = (
		__webpack_require__.o(moduleMap, module)
			? moduleMap[module]()
			: Promise.resolve().then(() => {
				throw new Error('Module "' + module + '" does not exist in container.');
			})
	);
	__webpack_require__.R = undefined;
	return getScope;
};
var init = (shareScope, initScope, remoteEntryInitOptions) => {
	return __webpack_require__.federation.bundlerRuntime.initContainerEntry({	webpackRequire: __webpack_require__,
		shareScope: shareScope,
		initScope: initScope,
		remoteEntryInitOptions: remoteEntryInitOptions,
		shareScopeKey: "default"
	})
};
// This exports getters to disallow modifications
__webpack_require__.d(exports, {
	get: () => (get),
	init: () => (init)
});

/***/ },

/***/ 8740
() {






/***/ },

/***/ 6151
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* unused harmony export createModuleFederationConfig */
//#region src/createModuleFederationConfig.ts
const createModuleFederationConfig = options => {
  return options;
};

//#endregion

//# sourceMappingURL=createModuleFederationConfig.js.map

/***/ },

/***/ 1226
() {


















/***/ },

/***/ 3423
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* unused harmony export normalizeOptions */
//#region src/normalizeOptions.ts
function normalizeOptions(enableDefault, defaultOptions, key) {
  return function (options) {
    if (options === false) return false;
    if (typeof options === "undefined") if (enableDefault) return defaultOptions;else return false;
    if (options === true) return defaultOptions;
    if (options && typeof options === "object") return {
      ...defaultOptions,
      ...options
    };
    throw new Error(`Unexpected type for \`${key}\`, expect boolean/undefined/object, got: ${typeof options}`);
  };
}

//#endregion

//# sourceMappingURL=normalizeOptions.js.map

/***/ },

/***/ 7223
() {


// UNUSED EXPORTS: ContainerPlugin_exports

;// ./node_modules/.pnpm/@module-federation+sdk@2.5._a798783c209e371a5dfec692960a63df/node_modules/@module-federation/sdk/dist/_virtual/_rolldown/runtime.js
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
  let target = {};
  for (var name in all) {
    __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  }
  if (!no_symbols) {
    __defProp(target, Symbol.toStringTag, {
      value: "Module"
    });
  }
  return target;
};

//#endregion

;// ./node_modules/.pnpm/@module-federation+sdk@2.5._a798783c209e371a5dfec692960a63df/node_modules/@module-federation/sdk/dist/types/plugins/ContainerPlugin.js


//#region src/types/plugins/ContainerPlugin.ts
var ContainerPlugin_exports = /* @__PURE__ *//* unused export */ undefined({});

//#endregion

//# sourceMappingURL=ContainerPlugin.js.map

/***/ },

/***/ 2088
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}


/***/ }

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 	__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 	module = execOptions.module;
/******/ 	execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/******/ // expose the modules object (__webpack_modules__)
/******/ __webpack_require__.m = __webpack_modules__;
/******/ 
/******/ // expose the module cache
/******/ __webpack_require__.c = __webpack_module_cache__;
/******/ 
/******/ // expose the module execution interceptor
/******/ __webpack_require__.i = [];
/******/ 
/******/ // the startup function
/******/ __webpack_require__.x = x => {};
/************************************************************************/
/******/ /* webpack/runtime/federation runtime */
/******/ (() => {
/******/ 	if(!__webpack_require__.federation){
/******/ 		__webpack_require__.federation = {
/******/ 			initOptions: {"name":"mf_activity","remotes":[],"shareStrategy":"version-first"},
/******/ 			chunkMatcher: function(chunkId) {return !/^(581|755|839)$/.test(chunkId)},
/******/ 			rootOutputDir: "",
/******/ 			bundlerRuntimeOptions: { remotes: { remoteInfos: {}, webpackRequire: __webpack_require__,idToRemoteMap: {}, chunkMapping: {},idToExternalAndNameMapping: {} } }
/******/ 		};
/******/ 	__webpack_require__.consumesLoadingData = {}
/******/ 	__webpack_require__.remotesLoadingData = {}
/******/ 	}
/******/ })();
/******/ 
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/ensure chunk */
/******/ (() => {
/******/ 	__webpack_require__.f = {};
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = (chunkId) => {
/******/ 		return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 			__webpack_require__.f[key](chunkId, promises);
/******/ 			return promises;
/******/ 		}, []));
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/get javascript chunk filename */
/******/ (() => {
/******/ 	// This function allow to reference async chunks
/******/ 	__webpack_require__.u = (chunkId) => {
/******/ 		// return url for filenames based on template
/******/ 		return "" + ({"76":"common","286":"__federation_expose_Routes"}[chunkId] || chunkId) + "." + {"76":"0ece381b0fec6021","189":"783943b44a1a70f2","286":"0919df3276547432","343":"eb162cd91e018f52","475":"a514f077201cf989","583":"54004a2418947eec","662":"bffea7f01ca581d4","672":"06784a378bd55f2c","689":"93d6be157e63a0e9"}[chunkId] + ".js";
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/get mini-css chunk filename */
/******/ (() => {
/******/ 	// This function allow to reference async chunks
/******/ 	__webpack_require__.miniCssF = (chunkId) => {
/******/ 		// return url for filenames based on template
/******/ 		return undefined;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/load script */
/******/ (() => {
/******/ 	var inProgress = {};
/******/ 	var dataWebpackPrefix = "mf_activity:";
/******/ 	// loadScript function to load a script via script tag
/******/ 	__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 		if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 		var script, needAttach;
/******/ 		if(key !== undefined) {
/******/ 			var scripts = document.getElementsByTagName("script");
/******/ 			for(var i = 0; i < scripts.length; i++) {
/******/ 				var s = scripts[i];
/******/ 				if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 			}
/******/ 		}
/******/ 		if(!script) {
/******/ 			needAttach = true;
/******/ 			script = document.createElement('script');
/******/ 			script.type = "module";
/******/ 			script.charset = 'utf-8';
/******/ 			if (__webpack_require__.nc) {
/******/ 				script.setAttribute("nonce", __webpack_require__.nc);
/******/ 			}
/******/ 			script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 	
/******/ 			script.src = __webpack_require__.tu(url);
/******/ 		}
/******/ 		inProgress[url] = [done];
/******/ 		var onScriptComplete = (prev, event) => {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var doneFns = inProgress[url];
/******/ 			delete inProgress[url];
/******/ 			script.parentNode && script.parentNode.removeChild(script);
/******/ 			doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 			if(prev) return prev(event);
/******/ 		}
/******/ 		var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 		script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 		script.onload = onScriptComplete.bind(null, script.onload);
/******/ 		needAttach && document.head.appendChild(script);
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/sharing */
/******/ (() => {
/******/ 	__webpack_require__.S = {};
/******/ 	var initPromises = {};
/******/ 	var initTokens = {};
/******/ 	__webpack_require__.I = (name, initScope) => {
/******/ 		if(!initScope) initScope = [];
/******/ 		// handling circular init calls
/******/ 		var initToken = initTokens[name];
/******/ 		if(!initToken) initToken = initTokens[name] = {};
/******/ 		if(initScope.indexOf(initToken) >= 0) return;
/******/ 		initScope.push(initToken);
/******/ 		// only runs once
/******/ 		if(initPromises[name]) return initPromises[name];
/******/ 		// creates a new share scope if needed
/******/ 		if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 		// runs all init snippets from all modules reachable
/******/ 		var scope = __webpack_require__.S[name];
/******/ 		var warn = (msg) => {
/******/ 			if (typeof console !== "undefined" && console.warn) console.warn(msg);
/******/ 		};
/******/ 		var uniqueName = "mf_activity";
/******/ 		var register = (name, version, factory, eager) => {
/******/ 			var versions = scope[name] = scope[name] || {};
/******/ 			var activeVersion = versions[version];
/******/ 			if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 		};
/******/ 		var initExternal = (id) => {
/******/ 			var handleError = (err) => (warn("Initialization of sharing external failed: " + err));
/******/ 			try {
/******/ 				var module = __webpack_require__(id);
/******/ 				if(!module) return;
/******/ 				var initFn = (module) => (module && module.init && module.init(__webpack_require__.S[name], initScope))
/******/ 				if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 				var initResult = initFn(module);
/******/ 				if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 			} catch(err) { handleError(err); }
/******/ 		}
/******/ 		var promises = [];
/******/ 		switch(name) {
/******/ 			case "default": {
/******/ 				register("@angular/common/http", "21.2.17", () => (Promise.all([__webpack_require__.e(839), __webpack_require__.e(689), __webpack_require__.e(189)]).then(() => (() => (__webpack_require__(5189))))));
/******/ 				register("@angular/common", "21.2.17", () => (Promise.all([__webpack_require__.e(839), __webpack_require__.e(583)]).then(() => (() => (__webpack_require__(9583))))));
/******/ 				register("@angular/core/primitives/di", "21.2.17", () => (__webpack_require__.e(76).then(() => (() => (__webpack_require__(9777))))));
/******/ 				register("@angular/core/primitives/signals", "21.2.17", () => (__webpack_require__.e(76).then(() => (() => (__webpack_require__(1755))))));
/******/ 				register("@angular/core", "21.2.17", () => (Promise.all([__webpack_require__.e(76), __webpack_require__.e(475)]).then(() => (() => (__webpack_require__(1475))))));
/******/ 				register("@angular/platform-browser", "21.2.17", () => (Promise.all([__webpack_require__.e(839), __webpack_require__.e(755), __webpack_require__.e(662)]).then(() => (() => (__webpack_require__(662))))));
/******/ 				register("@angular/router", "21.2.17", () => (Promise.all([__webpack_require__.e(839), __webpack_require__.e(689), __webpack_require__.e(755), __webpack_require__.e(672), __webpack_require__.e(581)]).then(() => (() => (__webpack_require__(1672))))));
/******/ 			}
/******/ 			break;
/******/ 		}
/******/ 		if(!promises.length) return initPromises[name] = 1;
/******/ 		return initPromises[name] = Promise.all(promises).then(() => (initPromises[name] = 1));
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/trusted types policy */
/******/ (() => {
/******/ 	var policy;
/******/ 	__webpack_require__.tt = () => {
/******/ 		// Create Trusted Type policy if Trusted Types are available and the policy doesn't exist yet.
/******/ 		if (policy === undefined) {
/******/ 			policy = {
/******/ 				createScriptURL: (url) => (url)
/******/ 			};
/******/ 			if (typeof trustedTypes !== "undefined" && trustedTypes.createPolicy) {
/******/ 				policy = trustedTypes.createPolicy("angular#bundler", policy);
/******/ 			}
/******/ 		}
/******/ 		return policy;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/trusted types script url */
/******/ (() => {
/******/ 	__webpack_require__.tu = (url) => (__webpack_require__.tt().createScriptURL(url));
/******/ })();
/******/ 
/******/ /* webpack/runtime/sharing */
/******/ (() => {
/******/ 	__webpack_require__.federation.initOptions.shared = {	"@angular/common/http": [{	version: "21.2.17",
/******/ 			get: () => (Promise.all([__webpack_require__.e(839), __webpack_require__.e(689), __webpack_require__.e(189)]).then(() => (() => (__webpack_require__(5189))))),
/******/ 			scope: ["default"],
/******/ 			shareConfig: {"eager":false,"requiredVersion":"~21.2.0","strictVersion":true,"singleton":true,"layer":null},
/******/ 		},],	"@angular/common": [{	version: "21.2.17",
/******/ 			get: () => (Promise.all([__webpack_require__.e(839), __webpack_require__.e(583)]).then(() => (() => (__webpack_require__(9583))))),
/******/ 			scope: ["default"],
/******/ 			shareConfig: {"eager":false,"requiredVersion":"~21.2.0","strictVersion":true,"singleton":true,"layer":null},
/******/ 		},],	"@angular/core/primitives/di": [{	version: "21.2.17",
/******/ 			get: () => (__webpack_require__.e(76).then(() => (() => (__webpack_require__(9777))))),
/******/ 			scope: ["default"],
/******/ 			shareConfig: {"eager":false,"requiredVersion":"~21.2.0","strictVersion":true,"singleton":true,"layer":null},
/******/ 		},],	"@angular/core/primitives/signals": [{	version: "21.2.17",
/******/ 			get: () => (__webpack_require__.e(76).then(() => (() => (__webpack_require__(1755))))),
/******/ 			scope: ["default"],
/******/ 			shareConfig: {"eager":false,"requiredVersion":"~21.2.0","strictVersion":true,"singleton":true,"layer":null},
/******/ 		},],	"@angular/core": [{	version: "21.2.17",
/******/ 			get: () => (Promise.all([__webpack_require__.e(76), __webpack_require__.e(475)]).then(() => (() => (__webpack_require__(1475))))),
/******/ 			scope: ["default"],
/******/ 			shareConfig: {"eager":false,"requiredVersion":"~21.2.0","strictVersion":true,"singleton":true,"layer":null},
/******/ 		},],	"@angular/platform-browser": [{	version: "21.2.17",
/******/ 			get: () => (Promise.all([__webpack_require__.e(839), __webpack_require__.e(755), __webpack_require__.e(662)]).then(() => (() => (__webpack_require__(662))))),
/******/ 			scope: ["default"],
/******/ 			shareConfig: {"eager":false,"requiredVersion":"~21.2.0","strictVersion":true,"singleton":true,"layer":null},
/******/ 		},],	"@angular/router": [{	version: "21.2.17",
/******/ 			get: () => (Promise.all([__webpack_require__.e(839), __webpack_require__.e(689), __webpack_require__.e(755), __webpack_require__.e(672), __webpack_require__.e(581)]).then(() => (() => (__webpack_require__(1672))))),
/******/ 			scope: ["default"],
/******/ 			shareConfig: {"eager":false,"requiredVersion":"~21.2.0","strictVersion":true,"singleton":true,"layer":null},
/******/ 		},],}
/******/ 	__webpack_require__.S = {};
/******/ 	var initPromises = {};
/******/ 	var initTokens = {};
/******/ 	__webpack_require__.I = (name, initScope) => {
/******/ 		return __webpack_require__.federation.bundlerRuntime.I({	shareScopeName: name,
/******/ 			webpackRequire: __webpack_require__,
/******/ 			initPromises: initPromises,
/******/ 			initTokens: initTokens,
/******/ 			initScope: initScope,
/******/ 		})
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/publicPath */
/******/ (() => {
/******/ 	var scriptUrl;
/******/ 	if (typeof import.meta.url === "string") scriptUrl = import.meta.url
/******/ 	// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 	// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 	if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 	scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 	__webpack_require__.p = scriptUrl;
/******/ })();
/******/ 
/******/ /* webpack/runtime/consumes */
/******/ (() => {
/******/ 	var installedModules = {};
/******/ 	__webpack_require__.consumesLoadingData.moduleIdToConsumeDataMapping = {
/******/ 		8755: {
/******/ 			fallback: () => (__webpack_require__.e(583).then(() => (() => (__webpack_require__(9583))))),
/******/ 			shareScope: ["default"],
/******/ 			singleton: true,
/******/ 			requiredVersion: "~21.2.0",
/******/ 			strictVersion: true,
/******/ 			eager: false,
/******/ 			layer: undefined,
/******/ 			shareKey: "@angular/common",
/******/ 	
/******/ 		},
/******/ 		5839: {
/******/ 			fallback: () => (Promise.all([__webpack_require__.e(76), __webpack_require__.e(475)]).then(() => (() => (__webpack_require__(1475))))),
/******/ 			shareScope: ["default"],
/******/ 			singleton: true,
/******/ 			requiredVersion: "~21.2.0",
/******/ 			strictVersion: true,
/******/ 			eager: false,
/******/ 			layer: undefined,
/******/ 			shareKey: "@angular/core",
/******/ 	
/******/ 		},
/******/ 		2481: {
/******/ 			fallback: () => (__webpack_require__.e(76).then(() => (() => (__webpack_require__(1755))))),
/******/ 			shareScope: ["default"],
/******/ 			singleton: true,
/******/ 			requiredVersion: "~21.2.0",
/******/ 			strictVersion: true,
/******/ 			eager: false,
/******/ 			layer: undefined,
/******/ 			shareKey: "@angular/core/primitives/signals",
/******/ 	
/******/ 		},
/******/ 		7409: {
/******/ 			fallback: () => (__webpack_require__.e(76).then(() => (() => (__webpack_require__(9777))))),
/******/ 			shareScope: ["default"],
/******/ 			singleton: true,
/******/ 			requiredVersion: "~21.2.0",
/******/ 			strictVersion: true,
/******/ 			eager: false,
/******/ 			layer: undefined,
/******/ 			shareKey: "@angular/core/primitives/di",
/******/ 	
/******/ 		},
/******/ 		7105: {
/******/ 			fallback: () => (Promise.all([__webpack_require__.e(689), __webpack_require__.e(189)]).then(() => (() => (__webpack_require__(5189))))),
/******/ 			shareScope: ["default"],
/******/ 			singleton: true,
/******/ 			requiredVersion: "~21.2.0",
/******/ 			strictVersion: true,
/******/ 			eager: false,
/******/ 			layer: undefined,
/******/ 			shareKey: "@angular/common/http",
/******/ 	
/******/ 		},
/******/ 		2581: {
/******/ 			fallback: () => (__webpack_require__.e(662).then(() => (() => (__webpack_require__(662))))),
/******/ 			shareScope: ["default"],
/******/ 			singleton: true,
/******/ 			requiredVersion: "~21.2.0",
/******/ 			strictVersion: true,
/******/ 			eager: false,
/******/ 			layer: undefined,
/******/ 			shareKey: "@angular/platform-browser",
/******/ 	
/******/ 		}
/******/ 	};
/******/ 	var moduleToHandlerMapping = {};
/******/ 	// no consumes in initial chunks
/******/ 	__webpack_require__.consumesLoadingData.chunkMapping = {
/******/ 		"286": [
/******/ 			5839
/******/ 		],
/******/ 		"475": [
/******/ 			2481,
/******/ 			7409
/******/ 		],
/******/ 		"581": [
/******/ 			2581
/******/ 		],
/******/ 		"662": [
/******/ 			7105
/******/ 		],
/******/ 		"755": [
/******/ 			8755
/******/ 		],
/******/ 		"839": [
/******/ 			5839
/******/ 		]
/******/ 	};
/******/ 	__webpack_require__.f.consumes = (chunkId, promises) => {
/******/ 		__webpack_require__.federation.bundlerRuntime.consumes({
/******/ 		chunkMapping: __webpack_require__.consumesLoadingData.chunkMapping,
/******/ 		installedModules: installedModules,
/******/ 		chunkId: chunkId,
/******/ 		moduleToHandlerMapping,
/******/ 		promises: promises,
/******/ 		webpackRequire:__webpack_require__
/******/ 		});
/******/ 	}
/******/ })();
/******/ 
/******/ /* webpack/runtime/embed/federation */
/******/ (() => {
/******/ 	var prevStartup = __webpack_require__.x;
/******/ 	var hasRun = false;
/******/ 	__webpack_require__.x = () => {
/******/ 		if (!hasRun) {
/******/ 		  hasRun = true;
/******/ 		  __webpack_require__(496);
/******/ 		}
/******/ 		if (typeof prevStartup === 'function') {
/******/ 		  return prevStartup();
/******/ 		} else {
/******/ 		  console.warn('[Module Federation] prevStartup is not a function, skipping startup execution');
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/jsonp chunk loading */
/******/ (() => {
/******/ 	// no baseURI
/******/ 	
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		858: 0
/******/ 	};
/******/ 	
/******/ 	__webpack_require__.f.j = (chunkId, promises) => {
/******/ 			// JSONP chunk loading for javascript
/******/ 			var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 			if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 	
/******/ 				// a Promise means "currently loading".
/******/ 				if(installedChunkData) {
/******/ 					promises.push(installedChunkData[2]);
/******/ 				} else {
/******/ 					if(!/^(581|755|839)$/.test(chunkId)) {
/******/ 						// setup Promise in chunk cache
/******/ 						var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 						promises.push(installedChunkData[2] = promise);
/******/ 	
/******/ 						// start chunk loading
/******/ 						var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 						// create error before stack unwound to get useful stacktrace later
/******/ 						var error = new Error();
/******/ 						var loadingEnded = (event) => {
/******/ 							if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 								installedChunkData = installedChunks[chunkId];
/******/ 								if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 								if(installedChunkData) {
/******/ 									var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 									var realSrc = event && event.target && event.target.src;
/******/ 									error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 									error.name = 'ChunkLoadError';
/******/ 									error.type = errorType;
/******/ 									error.request = realSrc;
/******/ 									installedChunkData[1](error);
/******/ 								}
/******/ 							}
/******/ 						};
/******/ 						__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 					} else installedChunks[chunkId] = 0;
/******/ 				}
/******/ 			}
/******/ 	};
/******/ 	
/******/ 	// no prefetching
/******/ 	
/******/ 	// no preloaded
/******/ 	
/******/ 	// no HMR
/******/ 	
/******/ 	// no HMR manifest
/******/ 	
/******/ 	// no on chunks loaded
/******/ 	
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 		var [chunkIds, moreModules, runtime] = data;
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0;
/******/ 		if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 		}
/******/ 		if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				installedChunks[chunkId][0]();
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 	
/******/ 	}
/******/ 	
/******/ 	var chunkLoadingGlobal = self["webpackChunkmf_activity"] = self["webpackChunkmf_activity"] || [];
/******/ 	chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 	chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ })();
/******/ 
/************************************************************************/
/******/ // run runtime startup
/******/ __webpack_require__.x();
/******/ // module cache are used so entry inlining is disabled
/******/ // startup
/******/ // Load entry module and return exports
/******/ var __webpack_exports__ = __webpack_require__(4035);
/******/ const __webpack_exports__get = __webpack_exports__.get;
/******/ const __webpack_exports__init = __webpack_exports__.init;
/******/ export { __webpack_exports__get as get, __webpack_exports__init as init };
/******/ 

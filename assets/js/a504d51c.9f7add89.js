(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2795],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return u},kt:function(){return h}});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=i.createContext({}),c=function(e){var t=i.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return i.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},p=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),p=c(n),h=a,g=p["".concat(l,".").concat(h)]||p[h]||d[h]||r;return n?i.createElement(g,s(s({ref:t},u),{},{components:n})):i.createElement(g,s({ref:t},u))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,s=new Array(r);s[0]=p;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:a,s[1]=o;for(var c=2;c<r;c++)s[c]=n[c];return i.createElement.apply(null,s)}return i.createElement.apply(null,n)}p.displayName="MDXCreateElement"},2528:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return o},metadata:function(){return l},toc:function(){return c},default:function(){return d}});var i=n(2122),a=n(9756),r=(n(7294),n(3905)),s=["components"],o={id:"erc1271-extension",title:"ERC1271 Signatures"},l={unversionedId:"contracts/extensions/erc1271-extension",id:"contracts/extensions/erc1271-extension",isDocsHomePage:!1,title:"ERC1271 Signatures",description:"Extension description and scope",source:"@site/docs/contracts/extensions/ERC1271.md",sourceDirName:"contracts/extensions",slug:"/contracts/extensions/erc1271-extension",permalink:"/docs/contracts/extensions/erc1271-extension",editUrl:"https://github.com/openlawteam/tribute-contracts/edit/docs/website/docs/contracts/extensions/ERC1271.md",version:"current",frontMatter:{id:"erc1271-extension",title:"ERC1271 Signatures"}},c=[{value:"Extension description and scope",id:"extension-description-and-scope",children:[]},{value:"Extension workflow",id:"extension-workflow",children:[]},{value:"Extension state",id:"extension-state",children:[{value:"DaoRegistry public dao;",id:"daoregistry-public-dao",children:[]},{value:"bool public initialized = false;",id:"bool-public-initialized--false",children:[]},{value:"DAOSignature struct",id:"daosignature-struct",children:[]}]},{value:"Dependencies and interactions (internal / external)",id:"dependencies-and-interactions-internal--external",children:[]},{value:"Functions description and assumptions / checks",id:"functions-description-and-assumptions--checks",children:[{value:"function initialize",id:"function-initialize",children:[]},{value:"function sign",id:"function-sign",children:[]},{value:"function isValidSignature",id:"function-isvalidsignature",children:[]}]},{value:"Events",id:"events",children:[]}],u={toc:c};function d(e){var t=e.components,n=(0,a.Z)(e,s);return(0,r.kt)("wrapper",(0,i.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"extension-description-and-scope"},"Extension description and scope"),(0,r.kt)("p",null,"The ERC1271 extension allows DAOs to collectively sign messages and typed data through signatures. ERC1271 is a contract signature standard that enables smart contract wallets to behave like EOAs (externally owned accounts). Signatures are critical when interacting with various types of decentralized applications. Developers use signatures for authentication, meta-transactions, order books, and anything that requires delegated permission or proof of ownership of an address. ERC1271 has widespread adoption and is used in applications like Argent and Snapshot."),(0,r.kt)("h2",{id:"extension-workflow"},"Extension workflow"),(0,r.kt)("p",null,"In order to register a signature with the DAO, a member must submit a proposal in which they specify the signature message digest, the signature, and the magic value to return on success."),(0,r.kt)("p",null,"The message digest must be the hash of the message to sign. This can be a simple message hash, a personal signature (message with special prefix), or a typed data signature (message created using structured data)."),(0,r.kt)("p",null,"The proposal enters the voting process."),(0,r.kt)("p",null,"If the vote passes, the extension returns the magic value when queried via the ERC1271 interface."),(0,r.kt)("h2",{id:"extension-state"},"Extension state"),(0,r.kt)("h3",{id:"daoregistry-public-dao"},"DaoRegistry public dao;"),(0,r.kt)("p",null,"The DAO address that this extension belongs to"),(0,r.kt)("h3",{id:"bool-public-initialized--false"},"bool public initialized = false;"),(0,r.kt)("p",null,"Internally tracks deployment under ERC-1167 proxy pattern"),(0,r.kt)("h3",{id:"daosignature-struct"},"DAOSignature struct"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"signatureProposals"),": all signature proposals handled by each DAO."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"SignatureDetails"),":",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"signature"),": the signature associated with this proposal. May be used to encode other attributes for efficiency, since it is not a real signature and would just be wasted storage space"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"msgHash"),": the digest of the data to sign"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"magicValue"),": the value to return if a signature proposal has passed")))),(0,r.kt)("h2",{id:"dependencies-and-interactions-internal--external"},"Dependencies and interactions (internal / external)"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Voting"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"starts new voting for the signature proposal."),(0,r.kt)("li",{parentName:"ul"},"checks the voting results.")))),(0,r.kt)("h2",{id:"functions-description-and-assumptions--checks"},"Functions description and assumptions / checks"),(0,r.kt)("h3",{id:"function-initialize"},"function initialize"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"/**\n  * @notice Initializes the extension with the DAO that it belongs to,\n  * and checks if the parameters were set.\n  * @param _dao The address of the DAO that owns the extension.\n  * @param creator The owner of the DAO and Extension that is also a member of the DAO.\n  */\nfunction initialize(DaoRegistry _dao, address creator) external override\n")),(0,r.kt)("h3",{id:"function-sign"},"function sign"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    /**\n     * @notice Registers a valid signature in the extension\n     * @dev Only DAOs with this extension registered can call this function\n     * @param signatureHash The hash of the signature\n     * @param permissionHash The digest of the data to be signed\n     * @param magicValue The value to be returned by the ERC1271 interface upon success\n     */\n    function sign(\n        bytes32 permissionHash,\n        bytes32 signatureHash,\n        bytes4 magicValue\n    ) internal virtual hasExtensionAccess(AclFlag.SIGN)\n")),(0,r.kt)("h3",{id:"function-isvalidsignature"},"function isValidSignature"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    function isValidSignature(bytes32 permissionHash, bytes memory signature)\n        public\n        view\n        override\n        returns (bytes4)\n")),(0,r.kt)("h2",{id:"events"},"Events"),(0,r.kt)("p",null,"List all the events that are emitted by the function in this Extension implementation."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"event Signed(bytes32 PermissionHash)")))}d.isMDXComponent=!0}}]);
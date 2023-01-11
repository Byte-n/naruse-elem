
import { renderComponentOnPage, renderComponentOnPageWithCode } from "../expand/index";
import { naruseInit } from "./init";
import { createMainBehavior } from "./mainComponent";
import { Naruse, naruseExtend } from "./naurse";

naruseExtend({ renderComponentOnPage });


export {
    createMainBehavior,
    Naruse,
    naruseInit,
    naruseExtend,
    renderComponentOnPageWithCode,
};
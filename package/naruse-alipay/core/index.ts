
import { renderComponentOnPage, renderComponentOnPageWithCode } from "../expand/index";
import { naruseInit } from "./init";
import { createMainBehavior } from "./mainComponent";
import { Naruse, naruseExtend } from "./naurse";
import { createSubBehavior } from "./subComponent";

naruseExtend({ renderComponentOnPage });

export {
    createMainBehavior,
    createSubBehavior,
    Naruse,
    naruseInit,
    naruseExtend,
    renderComponentOnPageWithCode,
};
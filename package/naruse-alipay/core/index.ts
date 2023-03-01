
import { renderComponentOnPage, renderComponentOnPageWithCode } from "../expand/index";
import { createMiniFactory } from "./hybrid/createMiniFactory";
import { naruseInit } from "./init";
import { createMainBehavior } from "./mainComponent";
import { Naruse, naruseExtend } from "./naurse";

naruseExtend({
    renderComponentOnPage,
    createMainBehavior,
    naruseInit,
    naruseExtend,
    renderComponentOnPageWithCode,
    createMiniFactory,
    Naruse,
});

export default Naruse;

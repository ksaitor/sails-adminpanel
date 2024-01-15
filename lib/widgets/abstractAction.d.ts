import BaseWidget from "./abstractWidgetBase";
export default abstract class ActionBase extends BaseWidget {
    /** Widget background css (color, Image) */
    abstract readonly backgroundCSS: string | null;
    abstract action(): Promise<void>;
}

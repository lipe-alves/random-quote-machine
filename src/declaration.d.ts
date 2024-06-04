import jquery from "jquery";

declare const $: typeof jquery;

declare global {
    interface Window {
        $: typeof jquery;
    }
}

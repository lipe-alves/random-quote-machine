var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
$(document).ready(() => {
    const quoteContainer = $("#quote-container");
    const quoteText = $("#text");
    const quoteAuthor = $("#author");
    const newQuote = $("#new-quote");
    const tweetQuote = $("#tweet-quote");
    const handleFetchNewQuote = () => __awaiter(this, void 0, void 0, function* () {
        const newQuote = yield fecthRandomQuote();
        quoteContainer.css("opacity", "0");
        const quoteColor = generateColorFromText(newQuote.content);
        $("html").css("--quote-color", quoteColor);
        const newHref = generateTwitterLink(newQuote);
        tweetQuote.attr("href", newHref);
        setTimeout(() => {
            quoteText.html(`<span class="QuoteBox-quotationMark">"</span>${newQuote.content}`);
            quoteAuthor.text(`- ${newQuote.author}`);
            quoteContainer.css("opacity", "1");
        }, 500);
    });
    newQuote.on("click", handleFetchNewQuote);
    newQuote.click();
    setInterval(() => {
        newQuote.click();
    }, 8 * 1000);
});
function fecthRandomQuote() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch("https://api.quotable.io/random");
        const quote = yield resp.json();
        return quote;
    });
}
function generateColorFromText(text) {
    let hash = 0;
    const chars = text.split("");
    for (const char of chars) {
        hash = char.charCodeAt(0) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += value.toString(16);
    }
    return color;
}
function translateText(text_1) {
    return __awaiter(this, arguments, void 0, function* (text, targetLanguage = window.navigator.language) {
        const encodedParams = new URLSearchParams();
        encodedParams.set("q", text);
        encodedParams.set("target", targetLanguage);
        encodedParams.set("source", "en");
        const response = yield fetch("https://google-translate1.p.rapidapi.com/language/translate/v2", {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "application/gzip",
                "X-RapidAPI-Key": "7ffb4ea935msha2b6d36218feef5p1b97c3jsn9bd136a761f1",
                "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
            },
            body: encodedParams,
        }).then((response) => response.json());
        const [result] = response.data.translations;
        return result.translatedText;
    });
}
function generateTwitterLink(quote) {
    return `https://twitter.com/intent/tweet?${encodeURIComponent(`hashtags=citacao&text="${quote.content} por ${quote.author}"`)}`;
}
//# sourceMappingURL=script.js.map
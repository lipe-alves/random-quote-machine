$(document).ready(() => {
    const quoteContainer = $("#quote-container");
    const quoteText = $("#text");
    const quoteAuthor = $("#author");
    const newQuote = $("#new-quote");
    const tweetQuote = $("#tweet-quote");

    const handleFetchNewQuote = async () => {
        const newQuote = await fecthRandomQuote();

        quoteContainer.css("opacity", "0");

        const quoteColor = generateColorFromText(newQuote.content);
        $("html").css("--quote-color", quoteColor);

        const newHref = generateTwitterLink(newQuote);
        tweetQuote.attr("href", newHref);

        setTimeout(() => {
            quoteText.html(
                `<span class="QuoteBox-quotationMark">"</span>${newQuote.content}`
            );
            quoteAuthor.text(`- ${newQuote.author}`);
            quoteContainer.css("opacity", "1");
        }, 500);
    };

    newQuote.on("click", handleFetchNewQuote);
    newQuote.click();

    setInterval(() => {
        newQuote.click();
    }, 8 * 1000);
});

interface QuoteData {
    content: string;
    author: string;
    authorSlug: string;
}

async function fecthRandomQuote(): Promise<QuoteData> {
    const resp = await fetch("https://api.quotable.io/random");
    const quote = await resp.json();
    return quote;
}

function generateColorFromText(text: string): `#${string}` {
    let hash = 0;

    const chars = text.split("");

    for (const char of chars) {
        hash = char.charCodeAt(0) + ((hash << 5) - hash);
    }

    let color: `#${string}` = "#";

    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += value.toString(16);
    }

    return color;
}

async function translateText(
    text: string,
    targetLanguage = window.navigator.language
): Promise<string> {
    const encodedParams = new URLSearchParams();
    encodedParams.set("q", text);
    encodedParams.set("target", targetLanguage);
    encodedParams.set("source", "en");

    const response = await fetch(
        "https://google-translate1.p.rapidapi.com/language/translate/v2",
        {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "application/gzip",
                "X-RapidAPI-Key":
                    "7ffb4ea935msha2b6d36218feef5p1b97c3jsn9bd136a761f1",
                "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
            },
            body: encodedParams,
        }
    ).then((response) => response.json());

    const [result] = response.data.translations;
    return result.translatedText;
}

function generateTwitterLink(quote: QuoteData) {
    return `https://twitter.com/intent/tweet?${encodeURIComponent(
        `hashtags=citacao&text="${quote.content} por ${quote.author}"`
    )}`;
}

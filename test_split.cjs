const config = { headline: '초일류 금융사부터\n공공 비즈니스까지, 금융의 미래를 구축하고 있습니다.' };
const linesSplit = config.headline.trim().split('\n');
if (linesSplit.length > 1) {
    let secondLine = linesSplit[1];
    let commaIndex = secondLine.indexOf(', ');
    if (commaIndex !== -1) {
        const boldPart = secondLine.substring(0, commaIndex + 2);
        const normalPart = secondLine.substring(commaIndex + 2);
        secondLine = `<span style="opacity: 1;">${boldPart}<span style="color: #0f172a; font-weight: 400;">${normalPart}</span></span>`;
    }
    console.log(linesSplit[0] + '<br>' + secondLine);
}

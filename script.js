function startMessageCounter(){
    if(messageCountStarted) return;
    messageCountStarted = true;

    const finalNumber = 64725; // number only
    const containerId = "msg-number";
    const suffix = "k+";

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    // Animate each digit
    [...finalNumber.toString()].forEach((num,i)=>{
        const span = document.createElement("span");
        span.className = "digit";
        span.textContent = "0";
        container.appendChild(span);

        let currentDigit = 0;
        const interval = setInterval(()=>{
            span.textContent = currentDigit;
            currentDigit = (currentDigit + 1) % 10;
        }, 50);

        setTimeout(()=>{
            clearInterval(interval);
            span.textContent = num;
        }, 800 + i * 400);
    });

    // Add the k+ suffix after all digits animate
    setTimeout(()=>{
        const suffixSpan = document.createElement("span");
        suffixSpan.textContent = suffix;
        suffixSpan.style.marginLeft = "4px";
        suffixSpan.style.color = "#ff3b3b";
        suffixSpan.style.fontWeight = "800";
        container.appendChild(suffixSpan);
    }, 800 + finalNumber.toString().length * 400);
}
